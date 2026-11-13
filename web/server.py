#!/usr/bin/env python3
"""Local interactive server for zig-katas web tutorial.

Serves static files from web/ and provides POST /api/run-test to compile
and execute `zig test` against user-submitted code using the local Zig binary.
"""

import argparse
import http.server
import json
import os
import shutil
import subprocess
import tempfile
import time
from pathlib import Path

WEB_DIR = Path(__file__).resolve().parent


def find_zig() -> str:
    zig = shutil.which("zig")
    if zig:
        return zig
    local_zig = Path.home() / ".local" / "bin" / "zig"
    if local_zig.exists():
        return str(local_zig)
    return "zig"


ZIG_BIN = find_zig()


class KataHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(WEB_DIR), **kwargs)

    def do_GET(self):
        if self.path == "/api/health":
            self._send_json(200, {"ok": True, "zig": ZIG_BIN})
            return
        super().do_GET()

    def do_POST(self):
        if self.path not in ("/api/run-test", "/api/fmt"):
            self._send_json(404, {"error": "Not found"})
            return

        length = int(self.headers.get("Content-Length", "0"))
        if length <= 0 or length > 200_000:
            self._send_json(400, {"error": "Invalid payload size"})
            return

        try:
            body = json.loads(self.rfile.read(length).decode("utf-8"))
            code = body.get("code", "")
            if not isinstance(code, str):
                self._send_json(400, {"error": "Missing 'code' string"})
                return
        except Exception as exc:
            self._send_json(400, {"error": f"Invalid JSON: {exc}"})
            return

        if self.path == "/api/fmt":
            try:
                proc = subprocess.run(
                    [ZIG_BIN, "fmt", "--stdin"],
                    input=code,
                    capture_output=True,
                    text=True,
                    timeout=5,
                )
                if proc.returncode == 0:
                    self._send_json(200, {"ok": True, "code": proc.stdout})
                else:
                    self._send_json(200, {"ok": False, "error": proc.stderr.strip()})
            except Exception as exc:
                self._send_json(500, {"error": str(exc)})
            return

        start = time.monotonic()
        cache_dir = Path(tempfile.gettempdir()) / "zig_katas_global_cache"
        cache_dir.mkdir(parents=True, exist_ok=True)
        env = dict(os.environ)
        env["ZIG_GLOBAL_CACHE_DIR"] = str(cache_dir)

        with tempfile.TemporaryDirectory(prefix="zig_kata_") as tmpdir:
            kata_path = Path(tmpdir) / "kata.zig"
            kata_path.write_text(code, encoding="utf-8")
            try:
                proc = subprocess.run(
                    [ZIG_BIN, "test", str(kata_path)],
                    cwd=tmpdir,
                    env=env,
                    capture_output=True,
                    text=True,
                    timeout=20,
                )
                duration_ms = int((time.monotonic() - start) * 1000)
                self._send_json(
                    200,
                    {
                        "ok": proc.returncode == 0,
                        "exitCode": proc.returncode,
                        "stdout": proc.stdout,
                        "stderr": proc.stderr,
                        "durationMs": duration_ms,
                    },
                )
            except subprocess.TimeoutExpired:
                self._send_json(
                    200,
                    {
                        "ok": False,
                        "exitCode": -1,
                        "stdout": "",
                        "stderr": "Timed out after 12s.",
                        "durationMs": 12000,
                    },
                )
            except FileNotFoundError:
                self._send_json(
                    500,
                    {"error": f"Zig binary not found at '{ZIG_BIN}'"},
                )

    def _send_json(self, status: int, data: dict):
        payload = json.dumps(data).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def log_message(self, format, *args):
        # Keep console output concise
        pass


def main():
    default_port = int(os.environ.get("PORT", "8787"))
    default_host = "0.0.0.0" if "PORT" in os.environ else "127.0.0.1"

    parser = argparse.ArgumentParser(description="Run zig-katas interactive web server")
    parser.add_argument("--host", default=default_host)
    parser.add_argument("--port", type=int, default=default_port)
    args = parser.parse_args()

    server = http.server.ThreadingHTTPServer((args.host, args.port), KataHandler)
    print(f"zig-katas web UI running at http://{args.host}:{args.port} (using {ZIG_BIN})")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down.")
        server.server_close()


if __name__ == "__main__":
    main()

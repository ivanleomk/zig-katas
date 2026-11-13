FROM python:3.12-slim

ARG ZIG_VERSION=0.17.1
ARG ZIG_SHA256=3581863e3cbcfd0fce0efc682ce7e9e93da96668a977791d356a26d2a7e9b17a

RUN apt-get update && apt-get install -y --no-install-recommends curl xz-utils ca-certificates \
    && curl -fsSL "https://ziglang.org/download/${ZIG_VERSION}/zig-x86_64-linux-${ZIG_VERSION}.tar.xz" -o /tmp/zig.tar.xz \
    && echo "${ZIG_SHA256}  /tmp/zig.tar.xz" | sha256sum -c - \
    && tar -xf /tmp/zig.tar.xz -C /opt \
    && mv "/opt/zig-x86_64-linux-${ZIG_VERSION}" /opt/zig \
    && ln -s /opt/zig/zig /usr/local/bin/zig \
    && rm -rf /tmp/zig.tar.xz /var/lib/apt/lists/*

WORKDIR /app
COPY web/ /app/web/

# Pre-warm Zig's global stdlib cache so first user test runs are fast
RUN mkdir -p /tmp/zig_katas_global_cache \
    && ZIG_GLOBAL_CACHE_DIR=/tmp/zig_katas_global_cache zig test -e /dev/null 2>/dev/null || true

ENV PORT=8080
EXPOSE 8080

CMD ["python3", "/app/web/server.py"]

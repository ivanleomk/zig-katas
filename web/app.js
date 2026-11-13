(() => {
  const katas = window.ZIG_KATAS || [];
  const STORAGE_CODE_KEY = "zig_katas_code_v1";
  const STORAGE_PASS_KEY = "zig_katas_passed_v1";

  let currentIdx = 0;
  let showingSolution = false;
  let serverOnline = false;
  let highlighter = null;

  const savedCode = loadJson(STORAGE_CODE_KEY, {});
  const passedMap = loadJson(STORAGE_PASS_KEY, {});

  // DOM refs
  const sidebarEl = document.getElementById("sidebar");
  const progressPillEl = document.getElementById("progress-pill");
  const lessonEyebrowEl = document.getElementById("lesson-eyebrow");
  const lessonTitleEl = document.getElementById("lesson-title");
  const conceptListEl = document.getElementById("concept-list");
  const lessonBodyEl = document.getElementById("lesson-body");
  const hintBoxEl = document.getElementById("hint-box");
  const hintTextEl = document.getElementById("hint-text");
  const editorFilenameEl = document.getElementById("editor-filename");
  const editorStageEl = document.getElementById("editor-stage");
  const editorHighlightEl = document.getElementById("editor-highlight");
  const editorEl = document.getElementById("code-editor");
  const consoleStatusEl = document.getElementById("console-status");
  const consoleBadgeEl = document.getElementById("console-badge");
  const consoleOutputEl = document.getElementById("console-output");

  const btnRun = document.getElementById("btn-run");
  const btnReset = document.getElementById("btn-reset");
  const btnSolution = document.getElementById("btn-solution");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const btnStartKatas = document.getElementById("btn-start-katas");

  function loadJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function saveJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore storage quota errors
    }
  }

  function updateProgress() {
    const passedCount = katas.filter((k) => passedMap[k.id]).length;
    progressPillEl.textContent = `${passedCount} / ${katas.length} passed`;
  }

  function renderSidebar() {
    sidebarEl.innerHTML = "";
    const groups = new Map();
    katas.forEach((kata, idx) => {
      if (!groups.has(kata.group)) groups.set(kata.group, []);
      groups.get(kata.group).push({ kata, idx });
    });

    for (const [groupName, items] of groups.entries()) {
      const groupEl = document.createElement("div");
      groupEl.className = "sidebar-group";

      const titleEl = document.createElement("div");
      titleEl.className = "sidebar-group-title";
      titleEl.textContent = groupName;
      groupEl.appendChild(titleEl);

      for (const { kata, idx } of items) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "kata-item" + (idx === currentIdx ? " active" : "");

        const label = document.createElement("span");
        label.className = "kata-item-label";
        label.textContent = `${kata.number.replace("Kata ", "")}. ${kata.title}`;

        const status = document.createElement("span");
        const isPassed = Boolean(passedMap[kata.id]);
        status.className = "kata-status" + (isPassed ? " passed" : "");
        status.textContent = isPassed ? "PASS" : "TODO";

        btn.appendChild(label);
        btn.appendChild(status);
        btn.addEventListener("click", () => selectKata(idx));
        groupEl.appendChild(btn);
      }

      sidebarEl.appendChild(groupEl);
    }
  }

  function selectKata(idx) {
    currentIdx = idx;
    showingSolution = false;
    btnSolution.textContent = "Show Solution";

    const kata = katas[idx];
    lessonEyebrowEl.textContent = `${kata.group} · ${kata.number}`;
    lessonTitleEl.textContent = kata.title;
    editorFilenameEl.textContent = kata.file;

    conceptListEl.innerHTML = "";
    for (const concept of kata.concepts) {
      const tag = document.createElement("span");
      tag.className = "concept-tag";
      tag.textContent = concept;
      conceptListEl.appendChild(tag);
    }

    lessonBodyEl.innerHTML = kata.lessonHtml;
    if (kata.hint) {
      hintBoxEl.hidden = false;
      hintBoxEl.open = false;
      hintTextEl.innerHTML = kata.hint.replace(/`([^`]+)`/g, "<code>$1</code>");
    } else {
      hintBoxEl.hidden = true;
    }
    editorEl.value = savedCode[kata.id] ?? kata.starter;
    renderHighlight();
    highlightLessonExamples();

    btnPrev.disabled = idx === 0;
    btnNext.disabled = idx === katas.length - 1;

    clearConsole();
    renderSidebar();
  }

  function renderHighlight() {
    if (!highlighter) return;
    // Append a space after trailing newline so Shiki's <pre> height matches <textarea>
    const raw = editorEl.value;
    const code = raw.endsWith("\n") ? raw + " " : raw;
    editorHighlightEl.innerHTML = highlighter.codeToHtml(code, {
      lang: "zig",
      theme: "github-dark",
    });
    syncScroll();
  }

  function highlightLessonExamples() {
    if (!highlighter) return;
    lessonBodyEl.querySelectorAll("pre code").forEach((codeEl) => {
      const pre = codeEl.parentElement;
      const html = highlighter.codeToHtml(codeEl.textContent || "", {
        lang: "zig",
        theme: "github-dark",
      });
      const wrapper = document.createElement("div");
      wrapper.innerHTML = html;
      const shikiPre = wrapper.firstElementChild;
      if (shikiPre && pre) pre.replaceWith(shikiPre);
    });
  }

  function syncScroll() {
    editorHighlightEl.scrollTop = editorEl.scrollTop;
    editorHighlightEl.scrollLeft = editorEl.scrollLeft;
  }

  async function initShiki() {
    try {
      const { createHighlighter } = await import("https://esm.sh/shiki@3");
      highlighter = await createHighlighter({
        themes: ["github-dark"],
        langs: ["zig"],
      });
      editorStageEl.classList.add("shiki-ready");
      renderHighlight();
      highlightLessonExamples();

      // Highlight Zig 101 Guide code blocks
      document.querySelectorAll(".guide-section pre code").forEach((codeEl) => {
        const pre = codeEl.parentElement;
        const html = highlighter.codeToHtml(codeEl.textContent || "", {
          lang: "zig",
          theme: "github-dark",
        });
        const wrapper = document.createElement("div");
        wrapper.innerHTML = html;
        const shikiPre = wrapper.firstElementChild;
        if (shikiPre && pre) pre.replaceWith(shikiPre);
      });
    } catch {
      // Fallback: plain textarea remains visible if CDN is unreachable
    }
  }

  function clearConsole() {
    consoleBadgeEl.hidden = true;
    consoleOutputEl.textContent = "";
    consoleStatusEl.textContent = serverOnline
      ? "Ready — click Run Tests or press ⌘/Ctrl + Enter"
      : "Static mode — run `python3 web/server.py` locally to execute `zig test` in browser";
  }

  async function runTests() {
    const kata = katas[currentIdx];
    const code = editorEl.value;
    savedCode[kata.id] = code;
    saveJson(STORAGE_CODE_KEY, savedCode);

    btnRun.disabled = true;
    consoleBadgeEl.hidden = true;
    consoleStatusEl.textContent = "Compiling and running `zig test`...";
    consoleOutputEl.textContent = "";

    try {
      const resp = await fetch("/api/run-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status}`);
      }

      const data = await resp.json();
      consoleBadgeEl.hidden = false;
      if (data.ok) {
        consoleBadgeEl.className = "console-badge pass";
        consoleBadgeEl.textContent = `PASS (${data.durationMs}ms)`;
        consoleStatusEl.textContent = `${kata.number} passed all tests!`;
        consoleOutputEl.textContent = (data.stderr || data.stdout || "All tests passed.").trim();
        passedMap[kata.id] = true;
        saveJson(STORAGE_PASS_KEY, passedMap);
        updateProgress();
        renderSidebar();
      } else {
        consoleBadgeEl.className = "console-badge fail";
        consoleBadgeEl.textContent = `FAIL (${data.durationMs}ms)`;
        consoleStatusEl.textContent = "Compilation or test failure";
        consoleOutputEl.textContent = [data.stderr, data.stdout].filter(Boolean).join("\n").trim();
      }
    } catch {
      consoleBadgeEl.hidden = false;
      consoleBadgeEl.className = "console-badge fail";
      consoleBadgeEl.textContent = "OFFLINE";
      consoleStatusEl.textContent = "Local test runner not detected";
      consoleOutputEl.textContent =
        "To run `zig test` directly from this page, start the local server:\n\n" +
        "  python3 web/server.py\n\n" +
        "Then open http://127.0.0.1:8787";
    } finally {
      btnRun.disabled = false;
    }
  }

  function switchView(viewName) {
    document.querySelectorAll(".nav-tab").forEach((t) => {
      t.classList.toggle("active", t.dataset.view === viewName);
    });
    document.querySelectorAll(".view").forEach((v) => {
      v.classList.toggle("active", v.id === `view-${viewName}`);
    });
  }

  // Event listeners
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.addEventListener("click", () => switchView(tab.dataset.view));
  });

  btnStartKatas.addEventListener("click", () => {
    switchView("katas");
    selectKata(0);
  });

  btnRun.addEventListener("click", runTests);

  btnReset.addEventListener("click", () => {
    const kata = katas[currentIdx];
    showingSolution = false;
    btnSolution.textContent = "Show Solution";
    editorEl.value = kata.starter;
    delete savedCode[kata.id];
    saveJson(STORAGE_CODE_KEY, savedCode);
    renderHighlight();
    clearConsole();
  });

  btnSolution.addEventListener("click", () => {
    const kata = katas[currentIdx];
    showingSolution = !showingSolution;
    if (showingSolution) {
      savedCode[kata.id] = editorEl.value;
      saveJson(STORAGE_CODE_KEY, savedCode);
      editorEl.value = kata.solution;
      btnSolution.textContent = "Back to My Code";
    } else {
      editorEl.value = savedCode[kata.id] ?? kata.starter;
      btnSolution.textContent = "Show Solution";
    }
    renderHighlight();
  });

  btnPrev.addEventListener("click", () => {
    if (currentIdx > 0) selectKata(currentIdx - 1);
  });

  btnNext.addEventListener("click", () => {
    if (currentIdx < katas.length - 1) selectKata(currentIdx + 1);
  });

  editorEl.addEventListener("input", () => {
    renderHighlight();
    if (!showingSolution) {
      const kata = katas[currentIdx];
      savedCode[kata.id] = editorEl.value;
      saveJson(STORAGE_CODE_KEY, savedCode);
    }
  });

  editorEl.addEventListener("scroll", syncScroll);

  editorEl.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      runTests();
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const start = editorEl.selectionStart;
      const end = editorEl.selectionEnd;
      editorEl.value = editorEl.value.slice(0, start) + "    " + editorEl.value.slice(end);
      editorEl.selectionStart = editorEl.selectionEnd = start + 4;
      renderHighlight();
    }
  });

  // Check if local server is running
  fetch("/api/health")
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      if (data && data.ok) {
        serverOnline = true;
        clearConsole();
      }
    })
    .catch(() => {});

  updateProgress();
  if (katas.length > 0) selectKata(0);
  initShiki();
})();

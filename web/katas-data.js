// Auto-generated 23-step smooth Zig 0.17 curriculum.
window.ZIG_KATAS = [
  {
    "id": "step01",
    "number": "Step 01",
    "group": "Part 0 \u2014 Baby Steps",
    "title": "Make a const",
    "file": "step01_const.zig",
    "concepts": [
      "const",
      "i32",
      "test"
    ],
    "lessonHtml": "\n<p>Every Zig program starts with values that don't change, called <code>const</code>.</p>\n<h3>Example</h3>\n<pre><code>const port: i32 = 8080;</code></pre>\n<ul>\n  <li><code>const</code> = immutable binding (cannot be reassigned).</li>\n  <li><code>: i32</code> = 32-bit signed integer (types go <strong>after</strong> the name, like TypeScript).</li>\n  <li><code>test \"...\" { ... }</code> = built-in unit test block (no external test framework needed!).</li>\n</ul>\n<h3>Your Task</h3>\n<p>Change <code>answer</code> from <code>0</code> to <code>42</code> so the test passes.</p>\n",
    "hint": "Change `const answer: i32 = 0;` to `const answer: i32 = 42;`.",
    "starter": "const std = @import(\"std\");\n\ntest \"make a const\" {\n    // TODO: change 0 to 42\n    const answer: i32 = 0;\n\n    try std.testing.expectEqual(@as(i32, 42), answer);\n}\n",
    "solution": "const std = @import(\"std\");\n\ntest \"make a const\" {\n    const answer: i32 = 42;\n\n    try std.testing.expectEqual(@as(i32, 42), answer);\n}\n"
  },
  {
    "id": "step02",
    "number": "Step 02",
    "group": "Part 0 \u2014 Baby Steps",
    "title": "Arithmetic & var",
    "file": "step02_arithmetic_and_var.zig",
    "concepts": [
      "+",
      "*",
      "var",
      "+="
    ],
    "lessonHtml": "\n<p>Normal math uses <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>. If a variable needs to change later, declare it with <code>var</code> instead of <code>const</code>.</p>\n<h3>Example</h3>\n<pre><code>const a: i32 = 10;\nvar total: i32 = a * 2;\ntotal += 5; // now 25</code></pre>\n<p>Note: Zig gives a compile error if you declare a <code>var</code> and never mutate it!</p>\n<h3>Your Task</h3>\n<ul>\n  <li>Set <code>sum</code> to <code>x + y</code>.</li>\n  <li>Change <code>score</code> from <code>const</code> to <code>var</code> and add <code>10</code> to it.</li>\n</ul>\n",
    "hint": "Write `const sum: i32 = x + y;` and `var score: i32 = 5; score += 10;`.",
    "starter": "const std = @import(\"std\");\n\ntest \"arithmetic and var\" {\n    const x: i32 = 6;\n    const y: i32 = 7;\n\n    // TODO: set sum to x + y\n    const sum: i32 = 0;\n\n    // TODO: change `const` to `var` and add 10 to score\n    const score: i32 = 5;\n\n    try std.testing.expectEqual(@as(i32, 13), sum);\n    try std.testing.expectEqual(@as(i32, 15), score);\n}\n",
    "solution": "const std = @import(\"std\");\n\ntest \"arithmetic and var\" {\n    const x: i32 = 6;\n    const y: i32 = 7;\n\n    const sum: i32 = x + y;\n\n    var score: i32 = 5;\n    score += 10;\n\n    try std.testing.expectEqual(@as(i32, 13), sum);\n    try std.testing.expectEqual(@as(i32, 15), score);\n}\n"
  },
  {
    "id": "step03",
    "number": "Step 03",
    "group": "Part 0 \u2014 Baby Steps",
    "title": "Your First Function (fn)",
    "file": "step03_functions.zig",
    "concepts": [
      "fn",
      "return"
    ],
    "lessonHtml": "\n<p>Functions start with <code>fn</code>, list parameters with types, and put the return type right before <code>{</code>. Always write an explicit <code>return</code>.</p>\n<h3>Example</h3>\n<pre><code>fn double(n: i32) i32 {\n    return n * 2;\n}</code></pre>\n<p><em>Why <code>_ = a;</code> in the starter?</em> Zig refuses to compile unused parameters, so the starter discards them until you use them.</p>\n<h3>Your Task</h3>\n<p>Make <code>add(a, b)</code> return <code>a + b</code>.</p>\n",
    "hint": "Remove `_ = a; _ = b;` and write `return a + b;`.",
    "starter": "const std = @import(\"std\");\n\nfn add(a: i32, b: i32) i32 {\n    // TODO: return a + b\n    _ = a;\n    _ = b;\n    return 0;\n}\n\ntest \"first function\" {\n    try std.testing.expectEqual(@as(i32, 9), add(4, 5));\n    try std.testing.expectEqual(@as(i32, 0), add(-3, 3));\n}\n",
    "solution": "const std = @import(\"std\");\n\nfn add(a: i32, b: i32) i32 {\n    return a + b;\n}\n\ntest \"first function\" {\n    try std.testing.expectEqual(@as(i32, 9), add(4, 5));\n    try std.testing.expectEqual(@as(i32, 0), add(-3, 3));\n}\n"
  },
  {
    "id": "step04",
    "number": "Step 04",
    "group": "Part 0 \u2014 Baby Steps",
    "title": "if / else",
    "file": "step04_if_else.zig",
    "concepts": [
      "if",
      "else",
      "bool"
    ],
    "lessonHtml": "\n<p><code>if</code> / <code>else</code> works like TypeScript or C. You can also use <code>if (cond) a else b</code> as an inline expression (like a ternary <code>cond ? a : b</code>).</p>\n<h3>Example</h3>\n<pre><code>if (a &gt; b) {\n    return a;\n} else {\n    return b;\n}</code></pre>\n<h3>Your Task</h3>\n<p>Implement <code>max(a, b)</code> to return the larger of the two numbers.</p>\n",
    "hint": "Write `if (a > b) return a; return b;`.",
    "starter": "const std = @import(\"std\");\n\nfn max(a: i32, b: i32) i32 {\n    // TODO: return the larger number\n    _ = a;\n    _ = b;\n    return 0;\n}\n\ntest \"if and else\" {\n    try std.testing.expectEqual(@as(i32, 10), max(10, 3));\n    try std.testing.expectEqual(@as(i32, 8), max(2, 8));\n}\n",
    "solution": "const std = @import(\"std\");\n\nfn max(a: i32, b: i32) i32 {\n    if (a > b) return a;\n    return b;\n}\n\ntest \"if and else\" {\n    try std.testing.expectEqual(@as(i32, 10), max(10, 3));\n    try std.testing.expectEqual(@as(i32, 8), max(2, 8));\n}\n"
  },
  {
    "id": "step05",
    "number": "Step 05",
    "group": "Part 0 \u2014 Baby Steps",
    "title": "for Loops & Slices",
    "file": "step05_for_loops.zig",
    "concepts": [
      "[]const i32",
      "for (nums) |n|"
    ],
    "lessonHtml": "\n<p>In Python you write <code>for n in nums:</code>. In Zig, you put the loop variable inside pipes <code>|n|</code>.</p>\n<h3>Example</h3>\n<pre><code>var total: i32 = 0;\nfor (nums) |n| {\n    total += n;\n}</code></pre>\n<p><code>nums: []const i32</code> means \"a read-only slice (view) of <code>i32</code> integers\".</p>\n<h3>Your Task</h3>\n<p>Implement <code>sumAll(nums)</code> to add up every number in <code>nums</code>.</p>\n",
    "hint": "Use `for (nums) |n| { total += n; }`.",
    "starter": "const std = @import(\"std\");\n\nfn sumAll(nums: []const i32) i32 {\n    var total: i32 = 0;\n    // TODO: loop over `nums` with `for (nums) |n|` and add to `total`\n    _ = nums;\n    return total;\n}\n\ntest \"for loop\" {\n    try std.testing.expectEqual(@as(i32, 10), sumAll(&.{ 1, 2, 3, 4 }));\n    try std.testing.expectEqual(@as(i32, 0), sumAll(&.{}));\n}\n",
    "solution": "const std = @import(\"std\");\n\nfn sumAll(nums: []const i32) i32 {\n    var total: i32 = 0;\n    for (nums) |n| {\n        total += n;\n    }\n    return total;\n}\n\ntest \"for loop\" {\n    try std.testing.expectEqual(@as(i32, 10), sumAll(&.{ 1, 2, 3, 4 }));\n    try std.testing.expectEqual(@as(i32, 0), sumAll(&.{}));\n}\n"
  },
  {
    "id": "step06",
    "number": "Step 06",
    "group": "Part 0 \u2014 Baby Steps",
    "title": "Strings ([]const u8)",
    "file": "step06_strings.zig",
    "concepts": [
      "[]const u8",
      "std.mem.eql"
    ],
    "lessonHtml": "\n<p>Strings in Zig are just byte slices: <code>[]const u8</code>. You can't use <code>==</code> on slices \u2014 always use <code>std.mem.eql(u8, a, b)</code>.</p>\n<div id=\"byte-viz\" class=\"byte-viz\">\n  <div class=\"byte-viz-controls\">\n    <input id=\"byte-viz-input\" class=\"byte-viz-input\" type=\"text\" value=\"zig\" maxlength=\"24\" aria-label=\"Inspect bytes\" />\n    <button class=\"byte-viz-preset\" type=\"button\" data-val=\"zig\">\"zig\"</button>\n    <button class=\"byte-viz-preset\" type=\"button\" data-val=\"rust\">\"rust\"</button>\n    <button class=\"byte-viz-preset\" type=\"button\" data-val=\"hi \ud83d\udc4b\">\"hi \ud83d\udc4b\" (UTF-8)</button>\n  </div>\n  <div id=\"byte-viz-ptr\" class=\"slice-fat-ptr\"></div>\n  <div id=\"byte-viz-cells\" class=\"byte-cells\"></div>\n  <div id=\"byte-viz-eql\" class=\"byte-eql-result\"></div>\n</div>\n<h3>Example</h3>\n<pre><code>return std.mem.eql(u8, name, \"zig\");</code></pre>\n<h3>Your Task</h3>\n<p>Implement <code>isZig(text)</code> so it returns <code>true</code> only when <code>text</code> is <code>\"zig\"</code>.</p>\n",
    "hint": "Write `return std.mem.eql(u8, text, \"zig\");`.",
    "starter": "const std = @import(\"std\");\n\nfn isZig(text: []const u8) bool {\n    // TODO: return true if `text` equals \"zig\"\n    _ = text;\n    return false;\n}\n\ntest \"strings\" {\n    try std.testing.expect(isZig(\"zig\"));\n    try std.testing.expect(!isZig(\"rust\"));\n}\n",
    "solution": "const std = @import(\"std\");\n\nfn isZig(text: []const u8) bool {\n    return std.mem.eql(u8, text, \"zig\");\n}\n\ntest \"strings\" {\n    try std.testing.expect(isZig(\"zig\"));\n    try std.testing.expect(!isZig(\"rust\"));\n}\n"
  },
  {
    "id": "step07",
    "number": "Step 07",
    "group": "Part 0 \u2014 Baby Steps",
    "title": "Optionals (?T & orelse)",
    "file": "step07_optionals.zig",
    "concepts": [
      "?i32",
      "null",
      "orelse"
    ],
    "lessonHtml": "\n<p>Normal Zig variables can <strong>never</strong> be <code>null</code>. To allow <code>null</code>, put <code>?</code> in front of the type (e.g. <code>?i32</code>), and unwrap it with <code>orelse</code>.</p>\n<h3>Example</h3>\n<pre><code>const val = maybe_num orelse 0;</code></pre>\n<h3>Your Task</h3>\n<p>Implement <code>unwrapOrZero</code> using <code>orelse</code>.</p>\n",
    "hint": "Write `return maybe orelse 0;`.",
    "starter": "const std = @import(\"std\");\n\nfn unwrapOrZero(maybe: ?i32) i32 {\n    // TODO: return the number inside `maybe`, or 0 if it is null\n    _ = maybe;\n    return -1;\n}\n\ntest \"optionals\" {\n    try std.testing.expectEqual(@as(i32, 42), unwrapOrZero(42));\n    try std.testing.expectEqual(@as(i32, 0), unwrapOrZero(null));\n}\n",
    "solution": "const std = @import(\"std\");\n\nfn unwrapOrZero(maybe: ?i32) i32 {\n    return maybe orelse 0;\n}\n\ntest \"optionals\" {\n    try std.testing.expectEqual(@as(i32, 42), unwrapOrZero(42));\n    try std.testing.expectEqual(@as(i32, 0), unwrapOrZero(null));\n}\n"
  },
  {
    "id": "step08",
    "number": "Step 08",
    "group": "Part 1 \u2014 Slices, Formatting & Errors",
    "title": "Indexed Loops (for (s, 0..))",
    "file": "step08_indexed_loops.zig",
    "concepts": [
      "for (s, 0..)",
      "|byte, i|",
      "?usize"
    ],
    "lessonHtml": "\n<p>In Python you write <code>for i, b in enumerate(s):</code>. In Zig, pass a second range <code>0..</code> (meaning 0, 1, 2, ...) into the <code>for</code> loop and capture both <code>|b, i|</code>!</p>\n<h3>Example</h3>\n<pre><code>for (slice, 0..) |b, i| {\n    if (b == target) return i;\n}\nreturn null;</code></pre>\n<p>Notice the return type is <code>?usize</code> (optional array index): it returns <code>i</code> if found, or <code>null</code> if the loop finishes without finding it.</p>\n<h3>Your Task</h3>\n<p>Implement <code>indexOfByte</code> to return the first index of <code>needle</code> in <code>slice</code>, or <code>null</code>.</p>\n",
    "hint": "Loop with `for (slice, 0..) |b, i| { if (b == needle) return i; } return null;`.",
    "starter": "const std = @import(\"std\");\n\nfn indexOfByte(slice: []const u8, needle: u8) ?usize {\n    // TODO: return the index of `needle`, or `null` if not found\n    _ = slice;\n    _ = needle;\n    return null;\n}\n\ntest \"indexOfByte\" {\n    try std.testing.expectEqual(@as(?usize, 4), indexOfByte(\"host:8080\", ':'));\n    try std.testing.expectEqual(@as(?usize, null), indexOfByte(\"host\", ':'));\n}\n",
    "solution": "const std = @import(\"std\");\n\nfn indexOfByte(slice: []const u8, needle: u8) ?usize {\n    for (slice, 0..) |b, i| {\n        if (b == needle) return i;\n    }\n    return null;\n}\n\ntest \"indexOfByte\" {\n    try std.testing.expectEqual(@as(?usize, 4), indexOfByte(\"host:8080\", ':'));\n    try std.testing.expectEqual(@as(?usize, null), indexOfByte(\"host\", ':'));\n}\n"
  },
  {
    "id": "step09",
    "number": "Step 09",
    "group": "Part 1 \u2014 Slices, Formatting & Errors",
    "title": "Sub-slicing (text[0..n])",
    "file": "step09_subslicing.zig",
    "concepts": [
      "text[0..n]",
      "bounds check",
      "std.mem.eql"
    ],
    "lessonHtml": "\n<p>Just like Python's <code>text[0:n]</code>, Zig lets you take a sub-slice with <code>text[0..n]</code> \u2014 with <strong>zero copying</strong>!</p>\n<h3>Watch Out for Out-of-Bounds!</h3>\n<p>If <code>text</code> is shorter than <code>prefix</code> (<code>text.len &lt; prefix.len</code>), slicing <code>text[0..prefix.len]</code> would panic. Always check the length first.</p>\n<h3>Example</h3>\n<pre><code>if (text.len &lt; prefix.len) return false;\nreturn std.mem.eql(u8, text[0..prefix.len], prefix);</code></pre>\n<h3>Your Task</h3>\n<p>Implement <code>hasPrefix</code> using a length check + sub-slice + <code>std.mem.eql</code>.</p>\n",
    "hint": "Write `if (text.len < prefix.len) return false; return std.mem.eql(u8, text[0..prefix.len], prefix);`.",
    "starter": "const std = @import(\"std\");\n\nfn hasPrefix(text: []const u8, prefix: []const u8) bool {\n    // TODO: check length, then compare text[0..prefix.len] with prefix\n    _ = text;\n    _ = prefix;\n    return false;\n}\n\ntest \"hasPrefix\" {\n    try std.testing.expect(hasPrefix(\"zig-katas\", \"zig\"));\n    try std.testing.expect(!hasPrefix(\"zig\", \"zig-katas\"));\n    try std.testing.expect(!hasPrefix(\"rust\", \"zig\"));\n}\n",
    "solution": "const std = @import(\"std\");\n\nfn hasPrefix(text: []const u8, prefix: []const u8) bool {\n    if (text.len < prefix.len) return false;\n    return std.mem.eql(u8, text[0..prefix.len], prefix);\n}\n\ntest \"hasPrefix\" {\n    try std.testing.expect(hasPrefix(\"zig-katas\", \"zig\"));\n    try std.testing.expect(!hasPrefix(\"zig\", \"zig-katas\"));\n    try std.testing.expect(!hasPrefix(\"rust\", \"zig\"));\n}\n"
  },
  {
    "id": "step10",
    "number": "Step 10",
    "group": "Part 1 \u2014 Slices, Formatting & Errors",
    "title": "Mutable Slices ([]u8)",
    "file": "step10_mutable_slices.zig",
    "concepts": [
      "[]u8",
      "while",
      "std.mem.swap"
    ],
    "lessonHtml": "\n<p>Notice the parameter type here: <code>slice: []u8</code> (no <code>const</code>!). That means the function is allowed to modify the bytes in place, with zero heap allocation.</p>\n<h3>Example</h3>\n<pre><code>var left: usize = 0;\nvar right: usize = slice.len - 1;\nwhile (left &lt; right) {\n    std.mem.swap(u8, &amp;slice[left], &amp;slice[right]);\n    left += 1;\n    right -= 1;\n}</code></pre>\n<p><strong>Important:</strong> <code>slice.len</code> is unsigned (<code>usize</code>), so if <code>slice.len == 0</code>, <code>slice.len - 1</code> would underflow! Guard with <code>if (slice.len &lt; 2) return;</code>.</p>\n<h3>Your Task</h3>\n<p>Implement <code>reverseInPlace</code>.</p>\n",
    "hint": "Guard with `if (slice.len < 2) return;`, then use a `while (left < right)` loop with `std.mem.swap(u8, &slice[left], &slice[right]);`.",
    "starter": "const std = @import(\"std\");\n\nfn reverseInPlace(slice: []u8) void {\n    // TODO: guard against len < 2, then swap from both ends inward\n    _ = slice;\n}\n\ntest \"reverseInPlace\" {\n    var word = \"zig!\".*;\n    reverseInPlace(&word);\n    try std.testing.expectEqualStrings(\"!giz\", &word);\n\n    var empty = [_]u8{};\n    reverseInPlace(&empty);\n}\n",
    "solution": "const std = @import(\"std\");\n\nfn reverseInPlace(slice: []u8) void {\n    if (slice.len < 2) return;\n    var left: usize = 0;\n    var right: usize = slice.len - 1;\n    while (left < right) {\n        std.mem.swap(u8, &slice[left], &slice[right]);\n        left += 1;\n        right -= 1;\n    }\n}\n\ntest \"reverseInPlace\" {\n    var word = \"zig!\".*;\n    reverseInPlace(&word);\n    try std.testing.expectEqualStrings(\"!giz\", &word);\n\n    var empty = [_]u8{};\n    reverseInPlace(&empty);\n}\n"
  },
  {
    "id": "step11",
    "number": "Step 11",
    "group": "Part 1 \u2014 Slices, Formatting & Errors",
    "title": "Formatting Into a Buffer (bufPrint)",
    "file": "step11_bufprint.zig",
    "concepts": [
      "std.fmt.bufPrint",
      "![]const u8",
      ".{ ... }",
      "{s} {d}"
    ],
    "lessonHtml": "\n<p>Because Zig has no hidden heap allocations, formatting a string like <code>\"localhost:8080\"</code> writes into a buffer <code>buf: []u8</code> you provide:</p>\n<pre><code>return std.fmt.bufPrint(buf, \"{s}:{d}\", .{ host, port });</code></pre>\n<h3>Decoding the Symbols</h3>\n<ul>\n  <li><code>{s}</code> = format a string slice (<code>[]const u8</code>); <code>{d}</code> = format a decimal number.</li>\n  <li><code>.{ host, port }</code> = anonymous tuple of arguments.</li>\n  <li><code>![]const u8</code> = <strong>error union</strong> return type! If <code>buf</code> is too small, <code>bufPrint</code> returns <code>error.NoSpaceLeft</code>.</li>\n</ul>\n<h3>Your Task</h3>\n<p>Implement <code>formatEndpoint</code> using <code>std.fmt.bufPrint</code>.</p>\n",
    "hint": "Write `return std.fmt.bufPrint(buf, \"{s}:{d}\", .{ host, port });`.",
    "starter": "const std = @import(\"std\");\n\nfn formatEndpoint(buf: []u8, host: []const u8, port: u16) ![]const u8 {\n    // TODO: format \"<host>:<port>\" into `buf` using std.fmt.bufPrint\n    _ = buf;\n    _ = host;\n    _ = port;\n    return error.NoSpaceLeft;\n}\n\ntest \"formatEndpoint\" {\n    var buf: [64]u8 = undefined;\n    const out = try formatEndpoint(&buf, \"localhost\", 8080);\n    try std.testing.expectEqualStrings(\"localhost:8080\", out);\n}\n",
    "solution": "const std = @import(\"std\");\n\nfn formatEndpoint(buf: []u8, host: []const u8, port: u16) ![]const u8 {\n    return std.fmt.bufPrint(buf, \"{s}:{d}\", .{ host, port });\n}\n\ntest \"formatEndpoint\" {\n    var buf: [64]u8 = undefined;\n    const out = try formatEndpoint(&buf, \"localhost\", 8080);\n    try std.testing.expectEqualStrings(\"localhost:8080\", out);\n}\n"
  },
  {
    "id": "step12",
    "number": "Step 12",
    "group": "Part 1 \u2014 Slices, Formatting & Errors",
    "title": "Error Sets & catch (parseHostPort)",
    "file": "step12_errors.zig",
    "concepts": [
      "error{...}",
      "ParseError!HostPort",
      "orelse return",
      "catch return"
    ],
    "lessonHtml": "\n<p>Zig has <strong>no exceptions</strong>. Functions that can fail return an error union like <code>ParseError!HostPort</code> \u2014 either one of the errors in <code>ParseError</code>, or a <code>HostPort</code> struct.</p>\n<h3>Useful Patterns</h3>\n<ul>\n  <li><code>const colon = indexOfByte(input, ':') orelse return error.MissingSeparator;</code></li>\n  <li><code>const port = std.fmt.parseInt(u16, port_str, 10) catch return error.InvalidPort;</code></li>\n  <li>Return a struct with inferred type: <code>return .{ .host = host, .port = port };</code></li>\n</ul>\n<h3>Your Task</h3>\n<p>Implement <code>parseHostPort</code> (checking empty input, missing <code>:</code>, and invalid port).</p>\n",
    "hint": "Check `if (input.len == 0) return error.EmptyInput;`, find `:` with `indexOfByte`, check `if (host.len == 0) return error.EmptyInput;`, and parse `input[colon + 1 ..]` with `std.fmt.parseInt(u16, ..., 10) catch return error.InvalidPort`.",
    "starter": "const std = @import(\"std\");\n\nconst ParseError = error{\n    EmptyInput,\n    MissingSeparator,\n    InvalidPort,\n};\n\nconst HostPort = struct {\n    host: []const u8,\n    port: u16,\n};\n\nfn indexOfByte(slice: []const u8, byte: u8) ?usize {\n    for (slice, 0..) |b, i| {\n        if (b == byte) return i;\n    }\n    return null;\n}\n\nfn parseHostPort(input: []const u8) ParseError!HostPort {\n    // TODO:\n    // 1. If input.len == 0 -> return error.EmptyInput\n    // 2. Find ':' using indexOfByte(...) orelse return error.MissingSeparator\n    // 3. Slice host = input[0..colon]; if host.len == 0 -> return error.EmptyInput\n    // 4. Parse port from input[colon + 1 ..] using std.fmt.parseInt(u16, ..., 10) catch return error.InvalidPort\n    // 5. Return .{ .host = host, .port = port }\n    _ = input;\n    return error.EmptyInput;\n}\n\ntest \"parseHostPort\" {\n    const hp = try parseHostPort(\"127.0.0.1:443\");\n    try std.testing.expectEqualStrings(\"127.0.0.1\", hp.host);\n    try std.testing.expectEqual(@as(u16, 443), hp.port);\n\n    try std.testing.expectError(error.EmptyInput, parseHostPort(\"\"));\n    try std.testing.expectError(error.MissingSeparator, parseHostPort(\"localhost\"));\n    try std.testing.expectError(error.InvalidPort, parseHostPort(\"localhost:99999\"));\n}\n",
    "solution": "const std = @import(\"std\");\n\nconst ParseError = error{\n    EmptyInput,\n    MissingSeparator,\n    InvalidPort,\n};\n\nconst HostPort = struct {\n    host: []const u8,\n    port: u16,\n};\n\nfn indexOfByte(slice: []const u8, byte: u8) ?usize {\n    for (slice, 0..) |b, i| {\n        if (b == byte) return i;\n    }\n    return null;\n}\n\nfn parseHostPort(input: []const u8) ParseError!HostPort {\n    if (input.len == 0) return error.EmptyInput;\n    const colon = indexOfByte(input, ':') orelse return error.MissingSeparator;\n    const host = input[0..colon];\n    if (host.len == 0) return error.EmptyInput;\n\n    const port_str = input[colon + 1 ..];\n    const port = std.fmt.parseInt(u16, port_str, 10) catch return error.InvalidPort;\n\n    return .{ .host = host, .port = port };\n}\n\ntest \"parseHostPort\" {\n    const hp = try parseHostPort(\"127.0.0.1:443\");\n    try std.testing.expectEqualStrings(\"127.0.0.1\", hp.host);\n    try std.testing.expectEqual(@as(u16, 443), hp.port);\n\n    try std.testing.expectError(error.EmptyInput, parseHostPort(\"\"));\n    try std.testing.expectError(error.MissingSeparator, parseHostPort(\"localhost\"));\n    try std.testing.expectError(error.InvalidPort, parseHostPort(\"localhost:99999\"));\n}\n"
  },
  {
    "id": "step13",
    "number": "Step 13",
    "group": "Part 1 \u2014 Slices, Formatting & Errors",
    "title": "Inspecting Errors (catch |err|)",
    "file": "step13_catch_switch.zig",
    "concepts": [
      "catch |err|",
      "switch (err)",
      "else => |e|"
    ],
    "lessonHtml": "\n<p>Sometimes you want to recover from <strong>one specific error</strong> (like <code>error.MissingSeparator</code>) while propagating any other error (like <code>error.InvalidPort</code>).</p>\n<h3>Example</h3>\n<pre><code>const hp = parseHostPort(input) catch |err| switch (err) {\n    error.MissingSeparator =&gt; return default_port,\n    else =&gt; |e| return e,\n};\nreturn hp.port;</code></pre>\n<h3>Your Task</h3>\n<p>Implement <code>parsePortOrDefault</code> so <code>MissingSeparator</code> returns <code>default_port</code>, and other errors are returned.</p>\n",
    "hint": "Use `const hp = parseHostPort(input) catch |err| switch (err) { error.MissingSeparator => return default_port, else => |e| return e }; return hp.port;`.",
    "starter": "const std = @import(\"std\");\n\nconst ParseError = error{ EmptyInput, MissingSeparator, InvalidPort };\nconst HostPort = struct { host: []const u8, port: u16 };\n\nfn parseHostPort(input: []const u8) ParseError!HostPort {\n    if (input.len == 0) return error.EmptyInput;\n    const colon = std.mem.indexOfScalar(u8, input, ':') orelse return error.MissingSeparator;\n    const port = std.fmt.parseInt(u16, input[colon + 1 ..], 10) catch return error.InvalidPort;\n    return .{ .host = input[0..colon], .port = port };\n}\n\nfn parsePortOrDefault(input: []const u8, default_port: u16) ParseError!u16 {\n    // TODO: call parseHostPort(input), catch `MissingSeparator` -> default_port, propagate others\n    _ = input;\n    _ = default_port;\n    return 0;\n}\n\ntest \"parsePortOrDefault\" {\n    try std.testing.expectEqual(@as(u16, 8080), try parsePortOrDefault(\"localhost:8080\", 80));\n    try std.testing.expectEqual(@as(u16, 80), try parsePortOrDefault(\"localhost\", 80));\n    try std.testing.expectError(error.InvalidPort, parsePortOrDefault(\"localhost:abc\", 80));\n}\n",
    "solution": "const std = @import(\"std\");\n\nconst ParseError = error{ EmptyInput, MissingSeparator, InvalidPort };\nconst HostPort = struct { host: []const u8, port: u16 };\n\nfn parseHostPort(input: []const u8) ParseError!HostPort {\n    if (input.len == 0) return error.EmptyInput;\n    const colon = std.mem.indexOfScalar(u8, input, ':') orelse return error.MissingSeparator;\n    const port = std.fmt.parseInt(u16, input[colon + 1 ..], 10) catch return error.InvalidPort;\n    return .{ .host = input[0..colon], .port = port };\n}\n\nfn parsePortOrDefault(input: []const u8, default_port: u16) ParseError!u16 {\n    const hp = parseHostPort(input) catch |err| switch (err) {\n        error.MissingSeparator => return default_port,\n        else => |e| return e,\n    };\n    return hp.port;\n}\n\ntest \"parsePortOrDefault\" {\n    try std.testing.expectEqual(@as(u16, 8080), try parsePortOrDefault(\"localhost:8080\", 80));\n    try std.testing.expectEqual(@as(u16, 80), try parsePortOrDefault(\"localhost\", 80));\n    try std.testing.expectError(error.InvalidPort, parsePortOrDefault(\"localhost:abc\", 80));\n}\n"
  },
  {
    "id": "step14",
    "number": "Step 14",
    "group": "Part 2 \u2014 Structs, Enums & Cleanup",
    "title": "Enums & Exhaustive switch",
    "file": "step14_enums.zig",
    "concepts": [
      "enum",
      "switch",
      "self: Status"
    ],
    "lessonHtml": "\n<p>In Zig, <code>enum</code>s can have methods right inside them, and <code>switch</code> is <strong>exhaustive</strong> \u2014 if you add a new enum variant later, the compiler forces you to update every <code>switch</code>!</p>\n<h3>Example</h3>\n<pre><code>pub fn isTerminal(self: Status) bool {\n    return switch (self) {\n        .pending, .running =&gt; false,\n        .passed, .failed =&gt; true,\n    };\n}</code></pre>\n<h3>Your Task</h3>\n<p>Implement <code>Status.isTerminal</code>.</p>\n",
    "hint": "Return `switch (self) { .pending, .running => false, .passed, .failed => true };`.",
    "starter": "const std = @import(\"std\");\n\nconst Status = enum {\n    pending,\n    running,\n    passed,\n    failed,\n\n    pub fn isTerminal(self: Status) bool {\n        // TODO: return true for .passed and .failed, false otherwise\n        _ = self;\n        return false;\n    }\n};\n\ntest \"Status.isTerminal\" {\n    try std.testing.expect(!Status.pending.isTerminal());\n    try std.testing.expect(!Status.running.isTerminal());\n    try std.testing.expect(Status.passed.isTerminal());\n    try std.testing.expect(Status.failed.isTerminal());\n}\n",
    "solution": "const std = @import(\"std\");\n\nconst Status = enum {\n    pending,\n    running,\n    passed,\n    failed,\n\n    pub fn isTerminal(self: Status) bool {\n        return switch (self) {\n            .pending, .running => false,\n            .passed, .failed => true,\n        };\n    }\n};\n\ntest \"Status.isTerminal\" {\n    try std.testing.expect(!Status.pending.isTerminal());\n    try std.testing.expect(!Status.running.isTerminal());\n    try std.testing.expect(Status.passed.isTerminal());\n    try std.testing.expect(Status.failed.isTerminal());\n}\n"
  },
  {
    "id": "step15",
    "number": "Step 15",
    "group": "Part 2 \u2014 Structs, Enums & Cleanup",
    "title": "Structs & Tagged Unions",
    "file": "step15_tagged_unions.zig",
    "concepts": [
      "struct",
      "*Job",
      "union(enum)",
      "switch (ev)"
    ],
    "lessonHtml": "\n<p>A <code>union(enum)</code> is a <strong>tagged union</strong> (like TypeScript discriminated unions or Rust's <code>enum</code> with data): each variant carries a different payload type.</p>\n<h3>Decoding the Syntax</h3>\n<ul>\n  <li><code>self: *Job</code> = mutable pointer to the struct (needed because <code>apply</code> modifies <code>self.status</code>).</li>\n  <li><code>switch (ev) { .start =&gt; |ts| { ... }, ... }</code> = unpacks each variant's payload.</li>\n  <li><code>@min(pct, 100)</code> = builtin to clamp <code>pct</code> to at most 100.</li>\n</ul>\n<h3>Your Task</h3>\n<p>Implement <code>Job.apply</code> for <code>.start</code>, <code>.progress</code> (only if not terminal), and <code>.finish</code>.</p>\n",
    "hint": "Use `switch (ev)` with `.start => |ts|`, `.progress => |pct|`, and `.finish => |ok|`.",
    "starter": "const std = @import(\"std\");\n\nconst Status = enum {\n    pending,\n    running,\n    passed,\n    failed,\n\n    pub fn isTerminal(self: Status) bool {\n        return self == .passed or self == .failed;\n    }\n};\n\nconst Event = union(enum) {\n    start: u64,\n    progress: u8,\n    finish: bool,\n};\n\nconst Job = struct {\n    id: []const u8,\n    status: Status = .pending,\n    percent: u8 = 0,\n    started_at_ms: ?u64 = null,\n\n    pub fn apply(self: *Job, ev: Event) void {\n        // TODO: switch on `ev`:\n        // - .start => |ts|: status = .running, started_at_ms = ts, percent = 0\n        // - .progress => |pct|: if (!self.status.isTerminal()) self.percent = @min(pct, 100)\n        // - .finish => |ok|: status = if (ok) .passed else .failed; if (ok) percent = 100\n        _ = self;\n        _ = ev;\n    }\n};\n\ntest \"Job state machine\" {\n    var job: Job = .{ .id = \"kata\" };\n    job.apply(.{ .start = 1000 });\n    try std.testing.expectEqual(Status.running, job.status);\n    try std.testing.expectEqual(@as(?u64, 1000), job.started_at_ms);\n\n    job.apply(.{ .progress = 150 });\n    try std.testing.expectEqual(@as(u8, 100), job.percent);\n\n    job.apply(.{ .finish = false });\n    try std.testing.expectEqual(Status.failed, job.status);\n\n    job.apply(.{ .progress = 50 });\n    try std.testing.expectEqual(@as(u8, 100), job.percent);\n}\n",
    "solution": "const std = @import(\"std\");\n\nconst Status = enum {\n    pending,\n    running,\n    passed,\n    failed,\n\n    pub fn isTerminal(self: Status) bool {\n        return self == .passed or self == .failed;\n    }\n};\n\nconst Event = union(enum) {\n    start: u64,\n    progress: u8,\n    finish: bool,\n};\n\nconst Job = struct {\n    id: []const u8,\n    status: Status = .pending,\n    percent: u8 = 0,\n    started_at_ms: ?u64 = null,\n\n    pub fn apply(self: *Job, ev: Event) void {\n        switch (ev) {\n            .start => |ts| {\n                self.status = .running;\n                self.started_at_ms = ts;\n                self.percent = 0;\n            },\n            .progress => |pct| {\n                if (!self.status.isTerminal()) {\n                    self.percent = @min(pct, 100);\n                }\n            },\n            .finish => |ok| {\n                self.status = if (ok) .passed else .failed;\n                if (ok) self.percent = 100;\n            },\n        }\n    }\n};\n\ntest \"Job state machine\" {\n    var job: Job = .{ .id = \"kata\" };\n    job.apply(.{ .start = 1000 });\n    try std.testing.expectEqual(Status.running, job.status);\n    try std.testing.expectEqual(@as(?u64, 1000), job.started_at_ms);\n\n    job.apply(.{ .progress = 150 });\n    try std.testing.expectEqual(@as(u8, 100), job.percent);\n\n    job.apply(.{ .finish = false });\n    try std.testing.expectEqual(Status.failed, job.status);\n\n    job.apply(.{ .progress = 50 });\n    try std.testing.expectEqual(@as(u8, 100), job.percent);\n}\n"
  },
  {
    "id": "step16",
    "number": "Step 16",
    "group": "Part 2 \u2014 Structs, Enums & Cleanup",
    "title": "defer (LIFO Cleanup)",
    "file": "step16_defer.zig",
    "concepts": [
      "defer",
      "LIFO order"
    ],
    "lessonHtml": "\n<p>Zig has <strong>no destructors</strong>. Instead, <code>defer</code> schedules a statement to run when the current block exits \u2014 in <strong>reverse (LIFO) order</strong>.</p>\n<h3>Example</h3>\n<pre><code>defer stepLast();\ndefer stepFirst(); // runs BEFORE stepLast()!</code></pre>\n<h3>Your Task</h3>\n<p>In <code>appendLifo</code>, register three <code>defer</code> blocks so <code>log</code> ends up containing <code>\"ABC\"</code>.</p>\n",
    "hint": "Register `defer log[idx] = 'C';` first, then `defer { log[idx] = 'B'; idx += 1; }`, then `defer { log[idx] = 'A'; idx += 1; }`.",
    "starter": "const std = @import(\"std\");\n\nfn appendLifo(log: *[3]u8) void {\n    var idx: usize = 0;\n    // TODO: use three `defer` blocks so `log` becomes \"ABC\"\n    _ = &idx;\n    log.* = \"___\".*;\n}\n\ntest \"appendLifo\" {\n    var log: [3]u8 = undefined;\n    appendLifo(&log);\n    try std.testing.expectEqualStrings(\"ABC\", &log);\n}\n",
    "solution": "const std = @import(\"std\");\n\nfn appendLifo(log: *[3]u8) void {\n    var idx: usize = 0;\n    defer log[idx] = 'C';\n    defer {\n        log[idx] = 'B';\n        idx += 1;\n    }\n    defer {\n        log[idx] = 'A';\n        idx += 1;\n    }\n}\n\ntest \"appendLifo\" {\n    var log: [3]u8 = undefined;\n    appendLifo(&log);\n    try std.testing.expectEqualStrings(\"ABC\", &log);\n}\n"
  },
  {
    "id": "step17",
    "number": "Step 17",
    "group": "Part 2 \u2014 Structs, Enums & Cleanup",
    "title": "errdefer (Rollback on Error)",
    "file": "step17_errdefer.zig",
    "concepts": [
      "errdefer",
      "defer",
      "std.testing.allocator"
    ],
    "lessonHtml": "\n<p>What if you allocate <code>result</code> to return to the caller, but step 2 fails? <code>defer allocator.free(result)</code> would free it even on success! Instead, use <code>errdefer</code> \u2014 it runs <strong>only when returning an error</strong>.</p>\n<h3>Example</h3>\n<pre><code>const result = try allocator.alloc(u8, 4);\nerrdefer allocator.free(result); // only freed on error!\n\nconst scratch = try allocator.alloc(u8, 8);\ndefer allocator.free(scratch);   // always freed!</code></pre>\n<p><code>std.testing.allocator</code> automatically fails the test if anything leaks.</p>\n<h3>Your Task</h3>\n<p>Implement <code>buildWithRollback</code> with <code>errdefer</code> on <code>result</code> and <code>defer</code> on <code>scratch</code>.</p>\n",
    "hint": "Allocate `result` with `errdefer allocator.free(result);`, check `fail_step_two`, allocate `scratch` with `defer allocator.free(scratch);`, `@memset(scratch, 'x');`, check `fail_step_three`, `@memcpy(result, scratch[0..4]); return result;`.",
    "starter": "const std = @import(\"std\");\n\nconst StepError = error{ StepTwoFailed, StepThreeFailed };\n\nfn buildWithRollback(\n    allocator: std.mem.Allocator,\n    fail_step_two: bool,\n    fail_step_three: bool,\n) ![]u8 {\n    // TODO:\n    // 1. const result = try allocator.alloc(u8, 4);\n    // 2. errdefer allocator.free(result);\n    // 3. if (fail_step_two) return error.StepTwoFailed;\n    // 4. const scratch = try allocator.alloc(u8, 8);\n    // 5. defer allocator.free(scratch);\n    // 6. @memset(scratch, 'x');\n    // 7. if (fail_step_three) return error.StepThreeFailed;\n    // 8. @memcpy(result, scratch[0..4]); return result;\n    _ = allocator;\n    _ = fail_step_two;\n    _ = fail_step_three;\n    return error.StepTwoFailed;\n}\n\ntest \"buildWithRollback has zero leaks\" {\n    const gpa = std.testing.allocator;\n    try std.testing.expectError(error.StepTwoFailed, buildWithRollback(gpa, true, false));\n    try std.testing.expectError(error.StepThreeFailed, buildWithRollback(gpa, false, true));\n\n    const out = try buildWithRollback(gpa, false, false);\n    defer gpa.free(out);\n    try std.testing.expectEqualStrings(\"xxxx\", out);\n}\n",
    "solution": "const std = @import(\"std\");\n\nconst StepError = error{ StepTwoFailed, StepThreeFailed };\n\nfn buildWithRollback(\n    allocator: std.mem.Allocator,\n    fail_step_two: bool,\n    fail_step_three: bool,\n) ![]u8 {\n    const result = try allocator.alloc(u8, 4);\n    errdefer allocator.free(result);\n\n    if (fail_step_two) return error.StepTwoFailed;\n\n    const scratch = try allocator.alloc(u8, 8);\n    defer allocator.free(scratch);\n\n    @memset(scratch, 'x');\n    if (fail_step_three) return error.StepThreeFailed;\n\n    @memcpy(result, scratch[0..4]);\n    return result;\n}\n\ntest \"buildWithRollback has zero leaks\" {\n    const gpa = std.testing.allocator;\n    try std.testing.expectError(error.StepTwoFailed, buildWithRollback(gpa, true, false));\n    try std.testing.expectError(error.StepThreeFailed, buildWithRollback(gpa, false, true));\n\n    const out = try buildWithRollback(gpa, false, false);\n    defer gpa.free(out);\n    try std.testing.expectEqualStrings(\"xxxx\", out);\n}\n"
  },
  {
    "id": "step18",
    "number": "Step 18",
    "group": "Part 3 \u2014 Memory, Comptime & Systems",
    "title": "Allocators & Leak Detection",
    "file": "step18_allocators.zig",
    "concepts": [
      "std.mem.Allocator",
      "alloc/free",
      "@memcpy"
    ],
    "lessonHtml": "\n<p>In Zig, nothing allocates behind your back. Any function that needs heap memory takes <code>allocator: std.mem.Allocator</code>.</p>\n<h3>Example</h3>\n<pre><code>const out = try allocator.alloc(u8, total_len);\n@memcpy(out[0..part.len], part);</code></pre>\n<h3>Your Task</h3>\n<p>Implement <code>joinWithSep</code> to join <code>parts</code> with <code>sep</code> into a newly allocated slice.</p>\n",
    "hint": "If `parts.len == 0` return `allocator.alloc(u8, 0)`. Otherwise sum `total_len`, allocate `out`, and copy each part (with `sep` before parts `i > 0`) using `@memcpy`.",
    "starter": "const std = @import(\"std\");\n\nfn joinWithSep(\n    allocator: std.mem.Allocator,\n    parts: []const []const u8,\n    sep: []const u8,\n) ![]u8 {\n    _ = allocator;\n    _ = parts;\n    _ = sep;\n    @panic(\"TODO: implement joinWithSep\");\n}\n\ntest \"joinWithSep\" {\n    const gpa = std.testing.allocator;\n    const joined = try joinWithSep(gpa, &.{ \"zig\", \"is\", \"fast\" }, \"-\");\n    defer gpa.free(joined);\n    try std.testing.expectEqualStrings(\"zig-is-fast\", joined);\n}\n",
    "solution": "const std = @import(\"std\");\n\nfn joinWithSep(\n    allocator: std.mem.Allocator,\n    parts: []const []const u8,\n    sep: []const u8,\n) ![]u8 {\n    if (parts.len == 0) return allocator.alloc(u8, 0);\n\n    var total_len: usize = sep.len * (parts.len - 1);\n    for (parts) |p| total_len += p.len;\n\n    const out = try allocator.alloc(u8, total_len);\n    var pos: usize = 0;\n    for (parts, 0..) |p, i| {\n        if (i > 0) {\n            @memcpy(out[pos .. pos + sep.len], sep);\n            pos += sep.len;\n        }\n        @memcpy(out[pos .. pos + p.len], p);\n        pos += p.len;\n    }\n    return out;\n}\n\ntest \"joinWithSep\" {\n    const gpa = std.testing.allocator;\n    const joined = try joinWithSep(gpa, &.{ \"zig\", \"is\", \"fast\" }, \"-\");\n    defer gpa.free(joined);\n    try std.testing.expectEqualStrings(\"zig-is-fast\", joined);\n}\n"
  },
  {
    "id": "step19",
    "number": "Step 19",
    "group": "Part 3 \u2014 Memory, Comptime & Systems",
    "title": "ArenaAllocator",
    "file": "step19_arena.zig",
    "concepts": [
      "ArenaAllocator",
      "dupe",
      "defer arena.deinit()"
    ],
    "lessonHtml": "\n<p><code>std.heap.ArenaAllocator</code> lets you make many temporary allocations and free them <strong>all at once</strong> with <code>defer arena.deinit();</code>.</p>\n<h3>Example</h3>\n<pre><code>var arena = std.heap.ArenaAllocator.init(backing_allocator);\ndefer arena.deinit();\nconst tmp = try arena.allocator().alloc(u8, input.len);\n// ... fill tmp ...\nreturn backing_allocator.dupe(u8, tmp);</code></pre>\n<h3>Your Task</h3>\n<p>Implement <code>upperCloneViaArena</code> to uppercase <code>input</code> using an arena scratch buffer, then return a <code>dupe</code> on <code>backing_allocator</code>.</p>\n",
    "hint": "Use `std.ascii.toUpper(c)` for each byte in `scratch`, then `return backing_allocator.dupe(u8, scratch);`.",
    "starter": "const std = @import(\"std\");\n\nfn upperCloneViaArena(backing_allocator: std.mem.Allocator, input: []const u8) ![]u8 {\n    _ = backing_allocator;\n    _ = input;\n    @panic(\"TODO: implement upperCloneViaArena\");\n}\n\ntest \"upperCloneViaArena\" {\n    const gpa = std.testing.allocator;\n    const upper = try upperCloneViaArena(gpa, \"hello zig\");\n    defer gpa.free(upper);\n    try std.testing.expectEqualStrings(\"HELLO ZIG\", upper);\n}\n",
    "solution": "const std = @import(\"std\");\n\nfn upperCloneViaArena(backing_allocator: std.mem.Allocator, input: []const u8) ![]u8 {\n    var arena = std.heap.ArenaAllocator.init(backing_allocator);\n    defer arena.deinit();\n\n    const scratch = try arena.allocator().alloc(u8, input.len);\n    for (input, 0..) |c, i| {\n        scratch[i] = std.ascii.toUpper(c);\n    }\n    return backing_allocator.dupe(u8, scratch);\n}\n\ntest \"upperCloneViaArena\" {\n    const gpa = std.testing.allocator;\n    const upper = try upperCloneViaArena(gpa, \"hello zig\");\n    defer gpa.free(upper);\n    try std.testing.expectEqualStrings(\"HELLO ZIG\", upper);\n}\n"
  },
  {
    "id": "step20",
    "number": "Step 20",
    "group": "Part 3 \u2014 Memory, Comptime & Systems",
    "title": "ArrayList & StringHashMap",
    "file": "step20_collections.zig",
    "concepts": [
      "ArrayList.empty",
      "toOwnedSlice",
      "StringHashMap",
      "getOrPut"
    ],
    "lessonHtml": "\n<p>In Zig <code>0.17</code>, <code>std.ArrayList(T)</code> is <strong>unmanaged</strong>: start with <code>.empty</code> and pass <code>allocator</code> to mutating methods.</p>\n<h3>Example</h3>\n<pre><code>var list: std.ArrayList(i32) = .empty;\nerrdefer list.deinit(allocator);\ntry list.append(allocator, n);\nreturn list.toOwnedSlice(allocator);</code></pre>\n<h3>Your Task</h3>\n<p>Implement <code>filterEvens</code> and <code>wordCounts</code>.</p>\n",
    "hint": "In `wordCounts`, tokenize with `std.mem.tokenizeScalar(u8, text, ' ')` and use `const gop = try map.getOrPut(word);`.",
    "starter": "const std = @import(\"std\");\n\nfn filterEvens(allocator: std.mem.Allocator, nums: []const i32) ![]i32 {\n    _ = allocator;\n    _ = nums;\n    @panic(\"TODO: implement filterEvens\");\n}\n\nfn wordCounts(allocator: std.mem.Allocator, text: []const u8) !std.StringHashMap(usize) {\n    _ = allocator;\n    _ = text;\n    @panic(\"TODO: implement wordCounts\");\n}\n\ntest \"collections\" {\n    const gpa = std.testing.allocator;\n    const evens = try filterEvens(gpa, &.{ 1, 2, 3, 4, 5, 6 });\n    defer gpa.free(evens);\n    try std.testing.expectEqualSlices(i32, &.{ 2, 4, 6 }, evens);\n\n    var counts = try wordCounts(gpa, \"zig is fast zig\");\n    defer counts.deinit();\n    try std.testing.expectEqual(@as(?usize, 2), counts.get(\"zig\"));\n    try std.testing.expectEqual(@as(?usize, 1), counts.get(\"fast\"));\n}\n",
    "solution": "const std = @import(\"std\");\n\nfn filterEvens(allocator: std.mem.Allocator, nums: []const i32) ![]i32 {\n    var list: std.ArrayList(i32) = .empty;\n    errdefer list.deinit(allocator);\n\n    for (nums) |n| {\n        if (@mod(n, 2) == 0) try list.append(allocator, n);\n    }\n    return list.toOwnedSlice(allocator);\n}\n\nfn wordCounts(allocator: std.mem.Allocator, text: []const u8) !std.StringHashMap(usize) {\n    var map = std.StringHashMap(usize).init(allocator);\n    errdefer map.deinit();\n\n    var it = std.mem.tokenizeScalar(u8, text, ' ');\n    while (it.next()) |word| {\n        const gop = try map.getOrPut(word);\n        if (gop.found_existing) {\n            gop.value_ptr.* += 1;\n        } else {\n            gop.value_ptr.* = 1;\n        }\n    }\n    return map;\n}\n\ntest \"collections\" {\n    const gpa = std.testing.allocator;\n    const evens = try filterEvens(gpa, &.{ 1, 2, 3, 4, 5, 6 });\n    defer gpa.free(evens);\n    try std.testing.expectEqualSlices(i32, &.{ 2, 4, 6 }, evens);\n\n    var counts = try wordCounts(gpa, \"zig is fast zig\");\n    defer counts.deinit();\n    try std.testing.expectEqual(@as(?usize, 2), counts.get(\"zig\"));\n    try std.testing.expectEqual(@as(?usize, 1), counts.get(\"fast\"));\n}\n"
  },
  {
    "id": "step21",
    "number": "Step 21",
    "group": "Part 3 \u2014 Memory, Comptime & Systems",
    "title": "comptime & Generic Types",
    "file": "step21_comptime.zig",
    "concepts": [
      "comptime T: type",
      "RingBuffer",
      "@This()"
    ],
    "lessonHtml": "\n<p>Zig has no <code>&lt;T&gt;</code> generics syntax because <strong>types are values at <code>comptime</code></strong>. A generic container is just a function returning <code>type</code>!</p>\n<h3>Example</h3>\n<pre><code>fn RingBuffer(comptime T: type, comptime capacity: usize) type {\n    return struct { items: [capacity]T = undefined, ... };\n}</code></pre>\n<h3>Your Task</h3>\n<p>Implement <code>RingBuffer.push</code> and <code>RingBuffer.pop</code>.</p>\n",
    "hint": "On `push`: if `self.len == capacity` return `false`; write at `(self.head + self.len) % capacity`, increment `len`, return `true`. On `pop`: if `self.len == 0` return `null`; read `self.items[self.head]`, advance `head = (self.head + 1) % capacity`, decrement `len`.",
    "starter": "const std = @import(\"std\");\n\nfn RingBuffer(comptime T: type, comptime capacity: usize) type {\n    return struct {\n        const Self = @This();\n        items: [capacity]T = undefined,\n        head: usize = 0,\n        len: usize = 0,\n\n        pub fn push(self: *Self, value: T) bool {\n            _ = self;\n            _ = value;\n            @panic(\"TODO: implement push\");\n        }\n\n        pub fn pop(self: *Self) ?T {\n            _ = self;\n            @panic(\"TODO: implement pop\");\n        }\n    };\n}\n\ntest \"RingBuffer(u32, 3)\" {\n    var rb: RingBuffer(u32, 3) = .{};\n    try std.testing.expect(rb.push(10));\n    try std.testing.expect(rb.push(20));\n    try std.testing.expect(rb.push(30));\n    try std.testing.expect(!rb.push(40));\n    try std.testing.expectEqual(@as(?u32, 10), rb.pop());\n    try std.testing.expect(rb.push(40));\n    try std.testing.expectEqual(@as(?u32, 20), rb.pop());\n}\n",
    "solution": "const std = @import(\"std\");\n\nfn RingBuffer(comptime T: type, comptime capacity: usize) type {\n    return struct {\n        const Self = @This();\n        items: [capacity]T = undefined,\n        head: usize = 0,\n        len: usize = 0,\n\n        pub fn push(self: *Self, value: T) bool {\n            if (self.len == capacity) return false;\n            const idx = (self.head + self.len) % capacity;\n            self.items[idx] = value;\n            self.len += 1;\n            return true;\n        }\n\n        pub fn pop(self: *Self) ?T {\n            if (self.len == 0) return null;\n            const val = self.items[self.head];\n            self.head = (self.head + 1) % capacity;\n            self.len -= 1;\n            return val;\n        }\n    };\n}\n\ntest \"RingBuffer(u32, 3)\" {\n    var rb: RingBuffer(u32, 3) = .{};\n    try std.testing.expect(rb.push(10));\n    try std.testing.expect(rb.push(20));\n    try std.testing.expect(rb.push(30));\n    try std.testing.expect(!rb.push(40));\n    try std.testing.expectEqual(@as(?u32, 10), rb.pop());\n    try std.testing.expect(rb.push(40));\n    try std.testing.expectEqual(@as(?u32, 20), rb.pop());\n}\n"
  },
  {
    "id": "step22",
    "number": "Step 22",
    "group": "Part 3 \u2014 Memory, Comptime & Systems",
    "title": "Io.Writer & Custom Formatting",
    "file": "step22_writers.zig",
    "concepts": [
      "*std.Io.Writer",
      "Io.Writer.fixed",
      "format ({f})"
    ],
    "lessonHtml": "\n<p>Zig <code>0.17</code> uses <code>*std.Io.Writer</code> for streaming output. Implement <code>pub fn format(self: SemVer, w: *Io.Writer) Io.Writer.Error!void</code> so any struct formats with <code>{f}</code>.</p>\n<h3>Example</h3>\n<pre><code>try w.print(\"v{d}.{d}.{d}\", .{ self.major, self.minor, self.patch });</code></pre>\n<h3>Your Task</h3>\n<p>Implement <code>SemVer.format</code>.</p>\n",
    "hint": "Call `try w.print(\"v{d}.{d}.{d}\", .{ self.major, self.minor, self.patch });`.",
    "starter": "const std = @import(\"std\");\nconst Io = std.Io;\n\nconst SemVer = struct {\n    major: u16,\n    minor: u16,\n    patch: u16,\n\n    pub fn format(self: SemVer, w: *Io.Writer) Io.Writer.Error!void {\n        _ = self;\n        _ = w;\n        @panic(\"TODO: implement SemVer.format\");\n    }\n};\n\ntest \"SemVer format\" {\n    const ver: SemVer = .{ .major = 0, .minor = 17, .patch = 1 };\n    var buf: [32]u8 = undefined;\n    const s = try std.fmt.bufPrint(&buf, \"zig {f}\", .{ver});\n    try std.testing.expectEqualStrings(\"zig v0.17.1\", s);\n}\n",
    "solution": "const std = @import(\"std\");\nconst Io = std.Io;\n\nconst SemVer = struct {\n    major: u16,\n    minor: u16,\n    patch: u16,\n\n    pub fn format(self: SemVer, w: *Io.Writer) Io.Writer.Error!void {\n        try w.print(\"v{d}.{d}.{d}\", .{ self.major, self.minor, self.patch });\n    }\n};\n\ntest \"SemVer format\" {\n    const ver: SemVer = .{ .major = 0, .minor = 17, .patch = 1 };\n    var buf: [32]u8 = undefined;\n    const s = try std.fmt.bufPrint(&buf, \"zig {f}\", .{ver});\n    try std.testing.expectEqualStrings(\"zig v0.17.1\", s);\n}\n"
  },
  {
    "id": "step23",
    "number": "Step 23",
    "group": "Part 3 \u2014 Memory, Comptime & Systems",
    "title": "Binary Wire Framing",
    "file": "step23_binary_framing.zig",
    "concepts": [
      "std.mem.readInt",
      "std.mem.writeInt",
      "packed struct(u8)",
      "@bitCast"
    ],
    "lessonHtml": "\n<p><code>std.mem.writeInt</code> / <code>readInt</code> encode/decode integers with explicit endianness (<code>.little</code> or <code>.big</code>), and <code>packed struct(u8)</code> packs bitfields into a single byte.</p>\n<h3>Your Task</h3>\n<p>Implement <code>encodeHeader</code> and <code>decodeHeader</code> for a 7-byte packet header.</p>\n",
    "hint": "Use `std.mem.writeInt(u16, buf[0..2], header.magic, .little);`, `buf[2] = @bitCast(header.flags);`, and `std.mem.writeInt(u32, buf[3..7], header.payload_len, .big);`.",
    "starter": "const std = @import(\"std\");\n\nconst FrameFlags = packed struct(u8) {\n    compressed: bool,\n    encrypted: bool,\n    priority: u2,\n    _reserved: u4 = 0,\n};\n\nconst FrameHeader = struct {\n    magic: u16,\n    flags: FrameFlags,\n    payload_len: u32,\n};\n\nconst FrameError = error{ Truncated, BadMagic };\n\nfn encodeHeader(header: FrameHeader) [7]u8 {\n    _ = header;\n    @panic(\"TODO: implement encodeHeader\");\n}\n\nfn decodeHeader(bytes: []const u8) FrameError!FrameHeader {\n    _ = bytes;\n    @panic(\"TODO: implement decodeHeader\");\n}\n\ntest \"binary framing\" {\n    const hdr: FrameHeader = .{\n        .magic = 0xCAFE,\n        .flags = .{ .compressed = true, .encrypted = false, .priority = 3 },\n        .payload_len = 0x11223344,\n    };\n    const wire = encodeHeader(hdr);\n    const decoded = try decodeHeader(&wire);\n    try std.testing.expectEqual(hdr.magic, decoded.magic);\n    try std.testing.expectEqual(@as(u32, 0x11223344), decoded.payload_len);\n    try std.testing.expectError(error.Truncated, decodeHeader(&.{ 0xFE, 0xCA }));\n}\n",
    "solution": "const std = @import(\"std\");\n\nconst FrameFlags = packed struct(u8) {\n    compressed: bool,\n    encrypted: bool,\n    priority: u2,\n    _reserved: u4 = 0,\n};\n\nconst FrameHeader = struct {\n    magic: u16,\n    flags: FrameFlags,\n    payload_len: u32,\n};\n\nconst FrameError = error{ Truncated, BadMagic };\n\nfn encodeHeader(header: FrameHeader) [7]u8 {\n    var buf: [7]u8 = undefined;\n    std.mem.writeInt(u16, buf[0..2], header.magic, .little);\n    buf[2] = @bitCast(header.flags);\n    std.mem.writeInt(u32, buf[3..7], header.payload_len, .big);\n    return buf;\n}\n\nfn decodeHeader(bytes: []const u8) FrameError!FrameHeader {\n    if (bytes.len < 7) return error.Truncated;\n    const magic = std.mem.readInt(u16, bytes[0..2], .little);\n    if (magic != 0xCAFE) return error.BadMagic;\n    return .{\n        .magic = magic,\n        .flags = @bitCast(bytes[2]),\n        .payload_len = std.mem.readInt(u32, bytes[3..7], .big),\n    };\n}\n\ntest \"binary framing\" {\n    const hdr: FrameHeader = .{\n        .magic = 0xCAFE,\n        .flags = .{ .compressed = true, .encrypted = false, .priority = 3 },\n        .payload_len = 0x11223344,\n    };\n    const wire = encodeHeader(hdr);\n    const decoded = try decodeHeader(&wire);\n    try std.testing.expectEqual(hdr.magic, decoded.magic);\n    try std.testing.expectEqual(@as(u32, 0x11223344), decoded.payload_len);\n    try std.testing.expectError(error.Truncated, decodeHeader(&.{ 0xFE, 0xCA }));\n}\n"
  }
];

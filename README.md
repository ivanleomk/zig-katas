# `zig-katas` — From Zero Zig to Systems Mastery

Built for experienced Python / TypeScript / C# / Rust engineers with **zero prior Zig experience** who want to go from reading Zig's symbols (`.{}`, `?T`, `!T`, `try`, `defer`, `comptime`) to writing leak-free, allocator-explicit, systems-level Zig (`0.17+`).

---

## Step 1: Never Written Zig Before? Start Here!

Read **[`ZIG_101.md`](./ZIG_101.md)** (~10–15 minutes). It translates every Zig concept—slices, optionals, error unions, `defer`/`errdefer`, explicit allocators, `comptime` generics, `Io.Writer`, and binary framing—directly from Python / TypeScript / Rust.

---

## Step 2: Run the Interactive Dojo

```bash
# View your live 10-kata scoreboard:
zig build dojo

# Run a single kata's unit tests while editing:
zig test src/kata01_basics_and_slices.zig

# Run all kata tests at once:
zig build test

# Stuck? Peek at the verified reference solution on the `solutions` branch anytime:
git diff HEAD..solutions -- src/kata01_basics_and_slices.zig
```

---

## Curriculum

### Part 1 — Core Language & Safety

| Kata | File | What You Practice |
| :--- | :--- | :--- |
| **Kata 01** | `src/kata01_basics_and_slices.zig` | `const` vs `var`, `[]const u8` slices, `for (s, 0..)`, `std.mem.eql`, `std.fmt.bufPrint` |
| **Kata 02** | `src/kata02_optionals_and_errors.zig` | `?T` optionals, `orelse`, `error{...}`, `!T` error unions, `try`, `catch \|err\|` |
| **Kata 03** | `src/kata03_structs_enums_unions.zig` | `struct` methods (`*Self` vs `Self`), exhaustive `switch`, tagged `union(enum)` |
| **Kata 04** | `src/kata04_defer_and_errdefer.zig` | Explicit cleanup without RAII: LIFO `defer` and error-only `errdefer` |

### Part 2 — Memory, Allocators & Data Structures

| Kata | File | What You Practice |
| :--- | :--- | :--- |
| **Kata 05** | `src/kata05_allocators_and_leaks.zig` | `std.mem.Allocator`, `std.testing.allocator` leak detection, `ArenaAllocator` |
| **Kata 06** | `src/kata06_arraylist_and_hashmap.zig` | Unmanaged `std.ArrayList` (`.empty`), `std.StringHashMap`, `getOrPut` |

### Part 3 — Comptime, I/O & Systems

| Kata | File | What You Practice |
| :--- | :--- | :--- |
| **Kata 07** | `src/kata07_comptime_generics.zig` | `comptime` type functions (`RingBuffer(T, N)`), `anytype`, `@typeInfo`, `inline for` |
| **Kata 08** | `src/kata08_writers_and_formatting.zig` | `*std.Io.Writer`, `Io.Writer.fixed`, `Io.Writer.Allocating`, custom `format` (`{f}`) |
| **Kata 09** | `src/kata09_binary_wire_framing.zig` | `std.mem.readInt` / `writeInt` (`.little` / `.big`), `packed struct(u8)` bitfields |
| **Kata 10** | `src/kata10_testing_and_c_interop.zig` | `extern struct`, `export fn ... callconv(.c)`, `[*:0]const u8` & `std.mem.span` |

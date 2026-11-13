const std = @import("std");
const Io = std.Io;

const Kata = struct {
    id: []const u8,
    title: []const u8,
    path: []const u8,
};

const katas = [_]Kata{
    .{ .id = "Kata 01", .title = "Basics, Mutability & Slices", .path = "src/kata01_basics_and_slices.zig" },
    .{ .id = "Kata 02", .title = "Optionals & Error Unions", .path = "src/kata02_optionals_and_errors.zig" },
    .{ .id = "Kata 03", .title = "Structs, Enums & Tagged Unions", .path = "src/kata03_structs_enums_unions.zig" },
    .{ .id = "Kata 04", .title = "defer & errdefer", .path = "src/kata04_defer_and_errdefer.zig" },
    .{ .id = "Kata 05", .title = "Allocators & Leak Detection", .path = "src/kata05_allocators_and_leaks.zig" },
    .{ .id = "Kata 06", .title = "ArrayList & StringHashMap", .path = "src/kata06_arraylist_and_hashmap.zig" },
    .{ .id = "Kata 07", .title = "comptime & Generic Types", .path = "src/kata07_comptime_generics.zig" },
    .{ .id = "Kata 08", .title = "Io.Writer & Custom Formatting", .path = "src/kata08_writers_and_formatting.zig" },
    .{ .id = "Kata 09", .title = "Binary Wire Framing & Packed Structs", .path = "src/kata09_binary_wire_framing.zig" },
    .{ .id = "Kata 10", .title = "Testing Patterns & C-ABI Interop", .path = "src/kata10_testing_and_c_interop.zig" },
};

pub fn main(init: std.process.Init) !void {
    const arena = init.arena.allocator();
    const io = init.io;

    var stdout_buf: [4096]u8 = undefined;
    var stdout_fw: Io.File.Writer = .init(.stdout(), io, &stdout_buf);
    const out = &stdout_fw.interface;

    try out.print("\n=== zig-katas Dojo Scoreboard ===\n\n", .{});
    try out.flush();

    var passed: usize = 0;
    for (katas) |kata| {
        const res = try std.process.run(arena, io, .{
            .argv = &.{ "zig", "test", kata.path },
        });

        const ok = switch (res.term) {
            .exited => |code| code == 0,
            else => false,
        };

        if (ok) {
            passed += 1;
            try out.print("  [PASS] {s}: {s}\n", .{ kata.id, kata.title });
        } else {
            try out.print("  [TODO] {s}: {s}  (run: zig test {s})\n", .{ kata.id, kata.title, kata.path });
        }
        try out.flush();
    }

    try out.print("\nProgress: {d}/{d} katas passing.\n", .{ passed, katas.len });
    if (passed == katas.len) {
        try out.print("All katas complete! You are ready to write production Zig.\n\n", .{});
    } else {
        try out.print("Tip: Peek at a solution anytime with `git diff HEAD..solutions -- <file>`\n\n", .{});
    }
    try out.flush();
}

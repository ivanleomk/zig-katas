//! Kata 05: Allocators & Leak Detection
//!
//! Key concepts:
//! - Zig has NO hidden global `malloc`. Any function that allocates takes `allocator: std.mem.Allocator`.
//! - `std.testing.allocator` automatically fails any test that leaks or double-frees memory!
//! - `std.heap.ArenaAllocator` lets you allocate many small objects and free them all in one shot.

const std = @import("std");

/// Joins `parts` with `sep` into a newly allocated slice owned by the caller.
pub fn joinWithSep(
    allocator: std.mem.Allocator,
    parts: []const []const u8,
    sep: []const u8,
) std.mem.Allocator.Error![]u8 {
    if (parts.len == 0) return allocator.alloc(u8, 0);

    var total_len: usize = sep.len * (parts.len - 1);
    for (parts) |p| total_len += p.len;

    const out = try allocator.alloc(u8, total_len);
    var pos: usize = 0;
    for (parts, 0..) |p, i| {
        if (i > 0) {
            @memcpy(out[pos .. pos + sep.len], sep);
            pos += sep.len;
        }
        @memcpy(out[pos .. pos + p.len], p);
        pos += p.len;
    }
    return out;
}

/// Uses an `ArenaAllocator` internally for temporary scratch work,
/// returning only a single duplicated result on `backing_allocator`.
pub fn upperCloneViaArena(
    backing_allocator: std.mem.Allocator,
    input: []const u8,
) std.mem.Allocator.Error![]u8 {
    var arena = std.heap.ArenaAllocator.init(backing_allocator);
    defer arena.deinit();
    const tmp_alloc = arena.allocator();

    // Scratch allocation on the arena — never individually freed!
    const scratch = try tmp_alloc.alloc(u8, input.len);
    for (input, 0..) |c, i| {
        scratch[i] = std.ascii.toUpper(c);
    }

    // Copy final result onto backing_allocator so it outlives the arena.
    return backing_allocator.dupe(u8, scratch);
}

test "joinWithSep" {
    const gpa = std.testing.allocator;
    const joined = try joinWithSep(gpa, &.{ "zig", "is", "fast" }, "-");
    defer gpa.free(joined);
    try std.testing.expectEqualStrings("zig-is-fast", joined);

    const empty = try joinWithSep(gpa, &.{}, ",");
    defer gpa.free(empty);
    try std.testing.expectEqualStrings("", empty);
}

test "upperCloneViaArena" {
    const gpa = std.testing.allocator;
    const upper = try upperCloneViaArena(gpa, "hello zig");
    defer gpa.free(upper);
    try std.testing.expectEqualStrings("HELLO ZIG", upper);
}

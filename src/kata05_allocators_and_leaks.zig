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
    _ = allocator;
    _ = parts;
    _ = sep;
    @panic("TODO: implement joinWithSep");
}

/// Uses an `ArenaAllocator` internally for temporary scratch work,
/// returning only a single duplicated result on `backing_allocator`.
pub fn upperCloneViaArena(
    backing_allocator: std.mem.Allocator,
    input: []const u8,
) std.mem.Allocator.Error![]u8 {
    _ = backing_allocator;
    _ = input;
    @panic("TODO: implement upperCloneViaArena");
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

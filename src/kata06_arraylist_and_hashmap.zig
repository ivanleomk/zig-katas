//! Kata 06: `ArrayList` & `StringHashMap`
//!
//! Key concepts:
//! - In modern Zig, `std.ArrayList(T)` is *unmanaged*: initialized with `.empty`,
//!   and you pass `gpa` only to methods that allocate (`append`, `deinit`, etc.).
//! - `std.StringHashMap(V)` maps `[]const u8` keys to `V` values.
//! - `getOrPut` avoids double-hashing when inserting or updating a key.

const std = @import("std");

/// Filters `nums` to keep only even numbers, returning an owned slice.
pub fn filterEvens(allocator: std.mem.Allocator, nums: []const i32) ![]i32 {
    var list: std.ArrayList(i32) = .empty;
    errdefer list.deinit(allocator);

    for (nums) |n| {
        if (@mod(n, 2) == 0) {
            try list.append(allocator, n);
        }
    }
    return list.toOwnedSlice(allocator);
}

/// Counts occurrences of each whitespace-separated word in `text`.
/// Caller owns the returned `StringHashMap` (call `.deinit()` when done).
/// Note: keys are slices into `text`, so they don't need separate allocations!
pub fn wordCounts(
    allocator: std.mem.Allocator,
    text: []const u8,
) !std.StringHashMap(usize) {
    var map = std.StringHashMap(usize).init(allocator);
    errdefer map.deinit();

    var it = std.mem.tokenizeScalar(u8, text, ' ');
    while (it.next()) |word| {
        const gop = try map.getOrPut(word);
        if (gop.found_existing) {
            gop.value_ptr.* += 1;
        } else {
            gop.value_ptr.* = 1;
        }
    }
    return map;
}

test "filterEvens" {
    const gpa = std.testing.allocator;
    const evens = try filterEvens(gpa, &.{ 1, 2, 3, 4, 5, 6 });
    defer gpa.free(evens);
    try std.testing.expectEqualSlices(i32, &.{ 2, 4, 6 }, evens);
}

test "wordCounts" {
    const gpa = std.testing.allocator;
    var counts = try wordCounts(gpa, "zig is fast zig is simple");
    defer counts.deinit();

    try std.testing.expectEqual(@as(?usize, 2), counts.get("zig"));
    try std.testing.expectEqual(@as(?usize, 2), counts.get("is"));
    try std.testing.expectEqual(@as(?usize, 1), counts.get("fast"));
    try std.testing.expectEqual(@as(?usize, 1), counts.get("simple"));
    try std.testing.expectEqual(@as(?usize, null), counts.get("rust"));
}

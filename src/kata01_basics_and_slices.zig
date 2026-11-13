//! Kata 01: Basics, Mutability & Slices
//!
//! Key concepts:
//! - `const` (immutable) vs `var` (mutable)
//! - Strings in Zig are just slices of bytes: `[]const u8`
//! - `for (slice, 0..) |item, index|` for indexed iteration
//! - `std.mem.eql(u8, a, b)` for comparing slices (never use `==` on slices!)
//! - `std.fmt.bufPrint` for zero-allocation formatting into a stack buffer

const std = @import("std");

/// Counts how many times `needle` appears in `haystack`.
pub fn countOccurrences(haystack: []const u8, needle: u8) usize {
    _ = haystack;
    _ = needle;
    @panic("TODO: implement countOccurrences");
}

/// Returns true if `text` starts with `prefix` (case-sensitive).
pub fn hasPrefix(text: []const u8, prefix: []const u8) bool {
    _ = text;
    _ = prefix;
    @panic("TODO: implement hasPrefix");
}

/// Reverses `slice` in-place using a mutable slice `[]u8`.
pub fn reverseInPlace(slice: []u8) void {
    _ = slice;
    @panic("TODO: implement reverseInPlace");
}

/// Formats "<name>:<port>" into `buf` without heap allocation and returns the written slice.
pub fn formatEndpoint(buf: []u8, host: []const u8, port: u16) ![]const u8 {
    _ = buf;
    _ = host;
    _ = port;
    @panic("TODO: implement formatEndpoint");
}

test "countOccurrences" {
    try std.testing.expectEqual(@as(usize, 3), countOccurrences("banana", 'a'));
    try std.testing.expectEqual(@as(usize, 0), countOccurrences("", 'z'));
}

test "hasPrefix" {
    try std.testing.expect(hasPrefix("zig-katas", "zig"));
    try std.testing.expect(!hasPrefix("zig", "zig-katas"));
    try std.testing.expect(!hasPrefix("rust", "zig"));
}

test "reverseInPlace" {
    var word = "zig!".*;
    reverseInPlace(&word);
    try std.testing.expectEqualStrings("!giz", &word);

    var empty = [_]u8{};
    reverseInPlace(&empty);
}

test "formatEndpoint" {
    var buf: [64]u8 = undefined;
    const out = try formatEndpoint(&buf, "localhost", 8080);
    try std.testing.expectEqualStrings("localhost:8080", out);
}

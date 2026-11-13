//! Kata 07: `comptime` & Generic Types
//!
//! Key concepts:
//! - Zig has NO separate generics syntax (`<T>`). Functions simply take `comptime T: type`!
//! - A function returning `type` creates a generic data structure at compile time.
//! - `anytype` + `@TypeOf` / `@typeInfo` lets you write type-safe duck-typed helpers.
//! - `inline for` unrolls loops at compile time (e.g. over struct fields).

const std = @import("std");

/// A fixed-capacity, zero-allocation ring buffer parameterized at compile time.
pub fn RingBuffer(comptime T: type, comptime capacity: usize) type {
    comptime {
        if (capacity == 0) @compileError("RingBuffer capacity must be > 0");
    }

    return struct {
        const Self = @This();

        items: [capacity]T = undefined,
        head: usize = 0,
        len: usize = 0,

        pub fn push(self: *Self, value: T) bool {
            _ = self;
            _ = value;
            @panic("TODO: implement RingBuffer.push");
        }

        pub fn pop(self: *Self) ?T {
            _ = self;
            @panic("TODO: implement RingBuffer.pop");
        }
    };
}

/// Sums all integer fields of any struct at compile-time-verified zero cost.
pub fn sumStructFields(s: anytype) i64 {
    _ = s;
    @panic("TODO: implement sumStructFields using @typeInfo and inline for");
}

test "RingBuffer(u32, 3)" {
    var rb: RingBuffer(u32, 3) = .{};
    try std.testing.expect(rb.push(10));
    try std.testing.expect(rb.push(20));
    try std.testing.expect(rb.push(30));
    try std.testing.expect(!rb.push(40)); // full

    try std.testing.expectEqual(@as(?u32, 10), rb.pop());
    try std.testing.expect(rb.push(40)); // wraps around!
    try std.testing.expectEqual(@as(?u32, 20), rb.pop());
    try std.testing.expectEqual(@as(?u32, 30), rb.pop());
    try std.testing.expectEqual(@as(?u32, 40), rb.pop());
    try std.testing.expectEqual(@as(?u32, null), rb.pop());
}

test "sumStructFields" {
    const Metrics = struct {
        hits: u32,
        misses: u16,
        label: []const u8,
    };
    const m: Metrics = .{ .hits = 40, .misses = 2, .label = "cache" };
    try std.testing.expectEqual(@as(i64, 42), sumStructFields(m));
}

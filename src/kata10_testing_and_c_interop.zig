//! Kata 10: Testing Patterns & C-ABI Interop
//!
//! Key concepts:
//! - Zig has first-class C ABI compatibility without FFI glue:
//!   - `extern struct` guarantees C-compatible field layout.
//!   - `callconv(.c)` exports a function with the C calling convention.
//!   - `[*:0]const u8` is a null-terminated C string pointer; `std.mem.span(ptr)`
//!     converts it to a safe Zig slice `[:0]const u8`.

const std = @import("std");

pub const CPoint = extern struct {
    x: i32,
    y: i32,
};

/// C-ABI function that adds two `CPoint` structs.
pub export fn cpoint_add(a: CPoint, b: CPoint) callconv(.c) CPoint {
    _ = a;
    _ = b;
    @panic("TODO: implement cpoint_add");
}

/// Converts a null-terminated C string `[*:0]const u8` into a Zig slice
/// and returns its length (excluding the null terminator).
pub fn cStringLen(c_str: [*:0]const u8) usize {
    _ = c_str;
    @panic("TODO: implement cStringLen");
}

test "CPoint C ABI layout and function" {
    try std.testing.expectEqual(@as(usize, 8), @sizeOf(CPoint));
    const sum = cpoint_add(.{ .x = 3, .y = -1 }, .{ .x = 7, .y = 5 });
    try std.testing.expectEqual(CPoint{ .x = 10, .y = 4 }, sum);
}

test "cStringLen from sentinel-terminated string" {
    const c_str: [*:0]const u8 = "hello C ABI";
    try std.testing.expectEqual(@as(usize, 11), cStringLen(c_str));
}

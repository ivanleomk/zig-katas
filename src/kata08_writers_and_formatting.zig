//! Kata 08: `Io.Writer` & Custom Formatting
//!
//! Key concepts:
//! - Zig 0.17 uses `*std.Io.Writer` as the universal streaming writer interface.
//! - `std.Io.Writer.fixed(&buf)` writes into a stack buffer with zero heap allocations.
//! - `std.Io.Writer.Allocating` writes into a growable heap buffer.
//! - Defining `pub fn format(self: @This(), w: *std.Io.Writer) std.Io.Writer.Error!void`
//!   lets any struct be formatted with `{f}`!

const std = @import("std");
const Io = std.Io;

pub const SemVer = struct {
    major: u16,
    minor: u16,
    patch: u16,

    /// Formats SemVer as "v<major>.<minor>.<patch>".
    pub fn format(self: SemVer, w: *Io.Writer) Io.Writer.Error!void {
        try w.print("v{d}.{d}.{d}", .{ self.major, self.minor, self.patch });
    }
};

/// Writes a CSV row of `items` into `w` separated by commas (with a trailing `\n`).
pub fn writeCsvRow(w: *Io.Writer, items: []const []const u8) Io.Writer.Error!void {
    for (items, 0..) |item, i| {
        if (i > 0) try w.writeByte(',');
        try w.writeAll(item);
    }
    try w.writeByte('\n');
}

test "SemVer custom format with Io.Writer.fixed" {
    const ver: SemVer = .{ .major = 0, .minor = 17, .patch = 1 };
    var buf: [32]u8 = undefined;
    const s = try std.fmt.bufPrint(&buf, "zig {f}", .{ver});
    try std.testing.expectEqualStrings("zig v0.17.1", s);
}

test "writeCsvRow with Io.Writer.fixed and Io.Writer.Allocating" {
    var buf: [64]u8 = undefined;
    var fw: Io.Writer = .fixed(&buf);
    try writeCsvRow(&fw, &.{ "alpha", "beta", "gamma" });
    try std.testing.expectEqualStrings("alpha,beta,gamma\n", fw.buffered());

    var aw: Io.Writer.Allocating = .init(std.testing.allocator);
    defer aw.deinit();
    try writeCsvRow(&aw.writer, &.{ "one", "two" });
    try std.testing.expectEqualStrings("one,two\n", aw.written());
}

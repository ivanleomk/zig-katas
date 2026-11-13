//! Kata 09: Binary Wire Framing & Packed Structs
//!
//! Key concepts:
//! - `std.mem.readInt(T, bytes, .little/.big)` and `std.mem.writeInt(...)` decode/encode
//!   unaligned network/file wire integers safely with zero undefined behavior.
//! - `packed struct(u16)` packs bitfields into an exact integer width with deterministic layout.

const std = @import("std");

pub const FrameFlags = packed struct(u8) {
    compressed: bool,
    encrypted: bool,
    priority: u2,
    _reserved: u4 = 0,
};

pub const FrameHeader = struct {
    magic: u16, // little-endian 0xCAFE
    flags: FrameFlags,
    payload_len: u32, // big-endian
};

pub const FrameError = error{
    Truncated,
    BadMagic,
};

/// Encodes `header` into a 7-byte wire buffer:
/// [0..2]: magic (little-endian u16)
/// [2]:    flags (u8 bitcast)
/// [3..7]: payload_len (big-endian u32)
pub fn encodeHeader(header: FrameHeader) [7]u8 {
    _ = header;
    @panic("TODO: implement encodeHeader");
}

/// Decodes a 7-byte wire header from `bytes`.
/// Returns `error.Truncated` if `bytes.len < 7`, or `error.BadMagic` if `magic != 0xCAFE`.
pub fn decodeHeader(bytes: []const u8) FrameError!FrameHeader {
    _ = bytes;
    @panic("TODO: implement decodeHeader");
}

test "encodeHeader and decodeHeader roundtrip" {
    const hdr: FrameHeader = .{
        .magic = 0xCAFE,
        .flags = .{ .compressed = true, .encrypted = false, .priority = 3 },
        .payload_len = 0x11223344,
    };

    const wire = encodeHeader(hdr);
    // 0xCAFE in little-endian is [0xFE, 0xCA]
    try std.testing.expectEqual(@as(u8, 0xFE), wire[0]);
    try std.testing.expectEqual(@as(u8, 0xCA), wire[1]);
    // 0x11223344 in big-endian is [0x11, 0x22, 0x33, 0x44]
    try std.testing.expectEqualSlices(u8, &.{ 0x11, 0x22, 0x33, 0x44 }, wire[3..7]);

    const decoded = try decodeHeader(&wire);
    try std.testing.expectEqual(hdr.magic, decoded.magic);
    try std.testing.expectEqual(true, decoded.flags.compressed);
    try std.testing.expectEqual(false, decoded.flags.encrypted);
    try std.testing.expectEqual(@as(u2, 3), decoded.flags.priority);
    try std.testing.expectEqual(@as(u32, 0x11223344), decoded.payload_len);
}

test "decodeHeader errors" {
    try std.testing.expectError(error.Truncated, decodeHeader(&.{ 0xFE, 0xCA }));
    try std.testing.expectError(error.BadMagic, decodeHeader(&.{ 0, 0, 0, 0, 0, 0, 0 }));
}

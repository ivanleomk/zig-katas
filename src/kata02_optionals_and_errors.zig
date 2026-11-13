//! Kata 02: Optionals & Error Unions
//!
//! Key concepts:
//! - Zig has NO null pointers for normal types. Nullable values use `?T`.
//! - Unwrap optionals with `if (opt) |val| { ... }`, `orelse`, or `.?` (assert non-null).
//! - Errors are values (`error{ InvalidPort, EmptyInput }`), returned via `!T` (error union).
//! - Propagate errors with `try` and handle them with `catch |err|`.

const std = @import("std");

pub const ParseError = error{
    EmptyInput,
    MissingSeparator,
    InvalidPort,
};

pub const HostPort = struct {
    host: []const u8,
    port: u16,
};

/// Finds the first index of `byte` in `slice`, or returns `null` if not found.
pub fn indexOfByte(slice: []const u8, byte: u8) ?usize {
    for (slice, 0..) |b, i| {
        if (b == byte) return i;
    }
    return null;
}

/// Parses `"host:port"` into `HostPort`.
/// Returns `error.EmptyInput` if empty, `error.MissingSeparator` if no `:`,
/// or `error.InvalidPort` if the port isn't a valid u16.
pub fn parseHostPort(input: []const u8) ParseError!HostPort {
    if (input.len == 0) return error.EmptyInput;
    const colon = indexOfByte(input, ':') orelse return error.MissingSeparator;
    const host = input[0..colon];
    if (host.len == 0) return error.EmptyInput;

    const port_str = input[colon + 1 ..];
    const port = std.fmt.parseInt(u16, port_str, 10) catch return error.InvalidPort;

    return .{ .host = host, .port = port };
}

/// Parses `input`, falling back to `default_port` if `MissingSeparator` occurs.
/// Any other error is still propagated!
pub fn parsePortOrDefault(input: []const u8, default_port: u16) ParseError!u16 {
    const hp = parseHostPort(input) catch |err| switch (err) {
        error.MissingSeparator => return default_port,
        else => |e| return e,
    };
    return hp.port;
}

test "indexOfByte" {
    try std.testing.expectEqual(@as(?usize, 4), indexOfByte("host:8080", ':'));
    try std.testing.expectEqual(@as(?usize, null), indexOfByte("host", ':'));
}

test "parseHostPort" {
    const hp = try parseHostPort("127.0.0.1:443");
    try std.testing.expectEqualStrings("127.0.0.1", hp.host);
    try std.testing.expectEqual(@as(u16, 443), hp.port);

    try std.testing.expectError(error.EmptyInput, parseHostPort(""));
    try std.testing.expectError(error.MissingSeparator, parseHostPort("localhost"));
    try std.testing.expectError(error.InvalidPort, parseHostPort("localhost:99999"));
}

test "parsePortOrDefault" {
    try std.testing.expectEqual(@as(u16, 8080), try parsePortOrDefault("localhost:8080", 80));
    try std.testing.expectEqual(@as(u16, 80), try parsePortOrDefault("localhost", 80));
    try std.testing.expectError(error.InvalidPort, parsePortOrDefault("localhost:abc", 80));
}

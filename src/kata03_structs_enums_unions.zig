//! Kata 03: Structs, Enums & Tagged Unions
//!
//! Key concepts:
//! - `struct` can hold fields AND `pub fn` methods (no inheritance, no classes).
//! - Methods take `self: Self` (by value / read-only) or `self: *Self` (mutable pointer).
//! - `enum` + `switch` is exhaustive — the compiler forces you to handle every case.
//! - `union(enum)` is a tagged union (like Rust's `enum` with data or TS discriminated unions).

const std = @import("std");

pub const Status = enum {
    pending,
    running,
    passed,
    failed,

    pub fn isTerminal(self: Status) bool {
        return switch (self) {
            .pending, .running => false,
            .passed, .failed => true,
        };
    }
};

pub const Event = union(enum) {
    start: u64, // timestamp_ms
    progress: u8, // percent 0..100
    finish: bool, // true = success, false = failure
};

pub const Job = struct {
    id: []const u8,
    status: Status = .pending,
    percent: u8 = 0,
    started_at_ms: ?u64 = null,

    pub fn apply(self: *Job, ev: Event) void {
        switch (ev) {
            .start => |ts| {
                self.status = .running;
                self.started_at_ms = ts;
                self.percent = 0;
            },
            .progress => |pct| {
                if (!self.status.isTerminal()) {
                    self.percent = @min(pct, 100);
                }
            },
            .finish => |ok| {
                self.status = if (ok) .passed else .failed;
                if (ok) self.percent = 100;
            },
        }
    }
};

test "Status.isTerminal" {
    try std.testing.expect(!Status.pending.isTerminal());
    try std.testing.expect(!Status.running.isTerminal());
    try std.testing.expect(Status.passed.isTerminal());
    try std.testing.expect(Status.failed.isTerminal());
}

test "Job state machine with tagged union events" {
    var job: Job = .{ .id = "kata-03" };
    try std.testing.expectEqual(Status.pending, job.status);

    job.apply(.{ .start = 1000 });
    try std.testing.expectEqual(Status.running, job.status);
    try std.testing.expectEqual(@as(?u64, 1000), job.started_at_ms);

    job.apply(.{ .progress = 150 });
    try std.testing.expectEqual(@as(u8, 100), job.percent);

    job.apply(.{ .finish = false });
    try std.testing.expectEqual(Status.failed, job.status);

    // Terminal jobs ignore further progress updates
    job.apply(.{ .progress = 50 });
    try std.testing.expectEqual(@as(u8, 100), job.percent);
}

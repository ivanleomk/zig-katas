//! Kata 04: `defer` & `errdefer`
//!
//! Key concepts:
//! - Zig has NO RAII / destructors (`Drop`). Cleanup is always explicit and visible!
//! - `defer expr;` runs when the current scope exits (in LIFO reverse order).
//! - `errdefer expr;` runs ONLY if the current function returns an error.
//! - This makes multi-step resource acquisition leak-free without try/finally pyramids.

const std = @import("std");

pub const StepError = error{
    StepTwoFailed,
    StepThreeFailed,
};

/// Acquires two buffers, runs `fail_at` simulation:
/// - Always frees temporary `scratch` buffer via `defer`.
/// - Only frees `result` via `errdefer` if an error occurs before returning it!
pub fn buildWithRollback(
    allocator: std.mem.Allocator,
    fail_step_two: bool,
    fail_step_three: bool,
) (std.mem.Allocator.Error || StepError)![]u8 {
    _ = allocator;
    _ = fail_step_two;
    _ = fail_step_three;
    @panic("TODO: implement buildWithRollback using defer and errdefer");
}

/// Appends `'A'`, `'B'`, `'C'` to `log` in LIFO order using `defer`!
/// Hint: `defer` statements execute in reverse order of registration.
pub fn appendLifo(log: *[3]u8) void {
    _ = log;
    @panic("TODO: implement appendLifo using defer");
}

test "buildWithRollback frees everything on error and returns owned slice on success" {
    const gpa = std.testing.allocator;

    // On error, errdefer + defer must free both allocations (testing.allocator checks for leaks!)
    try std.testing.expectError(error.StepTwoFailed, buildWithRollback(gpa, true, false));
    try std.testing.expectError(error.StepThreeFailed, buildWithRollback(gpa, false, true));

    // On success, scratch is freed by defer, and caller owns `out`
    const out = try buildWithRollback(gpa, false, false);
    defer gpa.free(out);
    try std.testing.expectEqualStrings("xxxx", out);
}

test "appendLifo executes defers in reverse order" {
    var log: [3]u8 = undefined;
    appendLifo(&log);
    try std.testing.expectEqualStrings("ABC", &log);
}

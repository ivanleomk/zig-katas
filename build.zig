const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    const mod = b.addModule("zig_katas", .{
        .root_source_file = b.path("src/root.zig"),
        .target = target,
        .optimize = optimize,
    });

    const dojo_exe = b.addExecutable(.{
        .name = "dojo",
        .root_module = b.createModule(.{
            .root_source_file = b.path("src/dojo.zig"),
            .target = target,
            .optimize = optimize,
            .imports = &.{
                .{ .name = "zig_katas", .module = mod },
            },
        }),
    });

    b.installArtifact(dojo_exe);

    const run_dojo = b.addRunArtifact(dojo_exe);
    run_dojo.step.dependOn(b.getInstallStep());

    const dojo_step = b.step("dojo", "Run the interactive Zig Katas scoreboard");
    dojo_step.dependOn(&run_dojo.step);

    const run_step = b.step("run", "Run the interactive Zig Katas scoreboard");
    run_step.dependOn(&run_dojo.step);

    const mod_tests = b.addTest(.{
        .root_module = mod,
    });
    const run_mod_tests = b.addRunArtifact(mod_tests);

    const test_step = b.step("test", "Run all kata tests");
    test_step.dependOn(&run_mod_tests.step);
}

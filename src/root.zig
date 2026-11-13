//! Root module for zig-katas.
//! Importing all katas in `comptime` ensures `zig build test` executes every kata's tests.
pub const kata01 = @import("kata01_basics_and_slices.zig");
pub const kata02 = @import("kata02_optionals_and_errors.zig");
pub const kata03 = @import("kata03_structs_enums_unions.zig");
pub const kata04 = @import("kata04_defer_and_errdefer.zig");
pub const kata05 = @import("kata05_allocators_and_leaks.zig");
pub const kata06 = @import("kata06_arraylist_and_hashmap.zig");
pub const kata07 = @import("kata07_comptime_generics.zig");
pub const kata08 = @import("kata08_writers_and_formatting.zig");
pub const kata09 = @import("kata09_binary_wire_framing.zig");
pub const kata10 = @import("kata10_testing_and_c_interop.zig");

test {
    @import("std").testing.refAllDecls(@This());
}

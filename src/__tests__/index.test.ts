import RpFmt from "..";

describe("format currency values with Rp symbols", function () {
    test("should format with formal notation", function () {
        expect(RpFmt(10000.55)).toBe("Rp10.000,55");
        expect(RpFmt(10000.5)).toBe("Rp10.000,50");
        expect(RpFmt(10000)).toBe("Rp10.000,00");
    });

    test("should format with informal notation", function () {
        expect(RpFmt(10000.55, { formal: false })).toBe("Rp 10.000,55");
        expect(RpFmt(10000.5, { formal: false })).toBe("Rp 10.000,50");
        expect(RpFmt(10000, { formal: false })).toBe("Rp 10.000,00");
    });
});

describe("format currency values with IDR symbols", function () {
    test("should format with formal notation", function () {
        expect(RpFmt(10000.55, { currency: "IDR" })).toBe("10.000,55 IDR");
        expect(RpFmt(10000.5, { currency: "IDR" })).toBe("10.000,50 IDR");
        expect(RpFmt(10000, { currency: "IDR" })).toBe("10.000,00 IDR");
    });

    test("should format with informal notation", function () {
        expect(RpFmt(10000.55, { currency: "IDR", formal: false })).toBe(
            "IDR 10.000,55",
        );
        expect(RpFmt(10000.5, { currency: "IDR", formal: false })).toBe(
            "IDR 10.000,50",
        );
        expect(RpFmt(10000, { currency: "IDR", formal: false })).toBe(
            "IDR 10.000,00",
        );
    });
});

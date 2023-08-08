type CurrencyType = "Rp" | "IDR" | null;

interface CurrencyFormattingSettings {
    currencyType: CurrencyType;
    decimalPlaces: number;
    decimalSeparator: string;
    formalNotation: boolean;
    includeCurrencySymbol: boolean;
    longUnitNames: boolean;
    omitZeroDecimals: boolean;
    replaceZeroDecimals: boolean;
    spaceBeforeUnit: boolean;
    thousandSeparator: string;
}

const defaultCurrencyFormattingSettings: CurrencyFormattingSettings = {
    currencyType: "Rp",
    decimalPlaces: 2,
    decimalSeparator: ",",
    formalNotation: true,
    includeCurrencySymbol: false,
    longUnitNames: false,
    omitZeroDecimals: false,
    replaceZeroDecimals: false,
    spaceBeforeUnit: false,
    thousandSeparator: ".",
};

function formatDecimalPart(
    value: string,
    settings: CurrencyFormattingSettings,
): string {
    if (!value) {
        value = settings.replaceZeroDecimals ? "-" : "00";
    }

    const missingDecimals = settings.decimalPlaces - value.length;

    if (missingDecimals > 0) {
        return value + "0".repeat(missingDecimals);
    } else if (missingDecimals < 0) {
        return value.slice(0, missingDecimals);
    }

    return value;
}

function formatThousandPart(
    value: string,
    settings: CurrencyFormattingSettings,
): string {
    const part = value.split(".");
    const integerPart = part[0];
    const formattedPart: string[] = [];

    for (let i = integerPart.length - 1, count = 0; i >= 0; i--, count++) {
        if (count === 3) {
            formattedPart.push(settings.thousandSeparator);
            count = 0;
        }
        formattedPart.push(integerPart[i]);
    }

    const formattedIntPart = formattedPart.reverse().join("");
    const formattedDecPart = formatDecimalPart(part[1], settings);

    if (settings.omitZeroDecimals && !part[1]) {
        return formattedIntPart;
    }

    return settings.decimalPlaces > 0
        ? formattedIntPart + settings.decimalSeparator + formattedDecPart
        : formattedIntPart;
}

function formatUnitName(
    value: string,
    settings: CurrencyFormattingSettings,
): string {
    const unitIndex = Math.ceil(value.length / 3) - 2;
    const unitNames = settings.longUnitNames
        ? ["ribu", "juta", "miliar", "triliun"]
        : ["K", "M", "B", "T"];

    if (unitIndex >= 0 && unitIndex <= 3) {
        let unit = unitNames[unitIndex];

        if (settings.spaceBeforeUnit) {
            unit = " " + unit;
        }

        const moduloDigit = value.length % 3;
        const sliceIndex = moduloDigit === 0 ? 3 : moduloDigit;
        const beforeDecimal = value.slice(0, sliceIndex);
        const afterDecimal = value.slice(
            sliceIndex,
            sliceIndex + settings.decimalPlaces,
        );

        return (
            beforeDecimal +
            (unitIndex >= 0 && settings.decimalPlaces > 0
                ? settings.decimalSeparator
                : "") +
            afterDecimal +
            unit
        );
    }

    return formatThousandPart(value, settings);
}

function formatCurrencyValue(
    value: string,
    settings: CurrencyFormattingSettings,
): string {
    if (settings.currencyType === "Rp") {
        return settings.formalNotation ? "Rp" + value : "Rp " + value;
    } else if (settings.currencyType === "IDR") {
        return settings.formalNotation ? value + " IDR" : "IDR " + value;
    }

    return value;
}

export default function RpFmt(
    value: string | number,
    settings?: Partial<CurrencyFormattingSettings>,
): string {
    value = typeof value !== "string" ? value.toString() : value;
    const mergedSettings: CurrencyFormattingSettings = {
        ...defaultCurrencyFormattingSettings,
        ...settings,
    };

    return mergedSettings.includeCurrencySymbol
        ? formatCurrencyValue(
              formatUnitName(value, mergedSettings),
              mergedSettings,
          )
        : formatCurrencyValue(
              formatThousandPart(value, mergedSettings),
              mergedSettings,
          );
}

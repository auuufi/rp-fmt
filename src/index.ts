type CurrencyType = "Rp" | "IDR";

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

function formatDecimal(
    value: string,
    settings: CurrencyFormattingSettings,
): string {
    if (!value) {
        return settings.replaceZeroDecimals ? "-" : "00";
    }

    const diffLength = settings.decimalPlaces - value.length;

    if (diffLength > 0) {
        return value + "0".repeat(diffLength);
    } else if (diffLength < 0) {
        return value.slice(0, diffLength);
    }

    return value;
}

function formatThousand(
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

    const formattedIntegerPart = formattedPart.reverse().join("");
    const formattedDecimalPart = formatDecimal(part[1], settings);

    if (settings.omitZeroDecimals && !part[1]) {
        return formattedIntegerPart;
    }

    return settings.decimalPlaces > 0
        ? formattedIntegerPart +
              settings.decimalSeparator +
              formattedDecimalPart
        : formattedIntegerPart;
}

function formatUnit(
    value: string,
    settings: CurrencyFormattingSettings,
): string {
    const unitIndex = Math.ceil(value.length / 3) - 2;
    const unitNames = settings.longUnitNames
        ? [
              "ribu",
              "juta",
              "miliar",
              "triliun",
              "kuadriliun",
              "kuintiliun",
              "sekstiliun",
              "septiliun",
              "oktiliun",
              "noniliun",
              "desiliun",
          ]
        : ["K"];

    if (unitIndex >= 0 && unitIndex <= 3) {
        let unit = unitNames[unitIndex];

        if (settings.spaceBeforeUnit) {
            unit = " " + unit;
        }

        const moduloDigit = value.length % 3;
        const sliceIndex = moduloDigit === 0 ? 3 : moduloDigit;
        const beforeDecimal = value.slice(0, sliceIndex);
        const afterDecimal = value.slice(sliceIndex, settings.decimalPlaces);

        return (
            beforeDecimal +
            (unitIndex >= 0 && settings.decimalPlaces > 0
                ? settings.decimalSeparator
                : "") +
            afterDecimal +
            unit
        );
    }

    return formatThousand(value, settings);
}

function formatCurrency(
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

export function RpFmt(
    value: string | number,
    settings?: Partial<CurrencyFormattingSettings>,
): string {
    value = typeof value !== "string" ? value.toString() : value;
    const mergedSettings: CurrencyFormattingSettings = {
        ...defaultCurrencyFormattingSettings,
        ...settings,
    };

    return mergedSettings.includeCurrencySymbol
        ? formatCurrency(formatUnit(value, mergedSettings), mergedSettings)
        : formatCurrency(formatThousand(value, mergedSettings), mergedSettings);
}

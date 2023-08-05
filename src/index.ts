type CurrencyType = "Rp" | "IDR";

interface CurrencyFormattingSettings {
    currencyType: CurrencyType;
    decimalPlaces: number;
    decimalSeparator: string;
    includeCurrencyUnit: boolean;
    omitZeroDecimals: boolean;
    replaceZeroDecimals: boolean;
    thousandSeparator: string;
    useFormalNotation: boolean;
}

const defaultCurrencyFormattingSettings: CurrencyFormattingSettings = {
    currencyType: "Rp",
    decimalPlaces: 2,
    decimalSeparator: ",",
    includeCurrencyUnit: false,
    omitZeroDecimals: false,
    replaceZeroDecimals: false,
    thousandSeparator: ".",
    useFormalNotation: true,
};

function formatComma(
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
    const parts = value.split(".");
    const integerPart = parts[0];
    const integerPartLength = integerPart.length;
    const formattedParts: string[] = [];

    for (let i = integerPartLength - 1, count = 0; i >= 0; i--, count++) {
        if (count === 3) {
            formattedParts.push(settings.thousandSeparator);
            count = 0;
        }
        formattedParts.push(integerPart[i]);
    }

    const formattedIntegerPart = formattedParts.reverse().join("");
    const formattedDecimalPart = formatComma(parts[1], settings);

    if (settings.omitZeroDecimals && !parts[1]) {
        return formattedIntegerPart;
    }

    return settings.decimalPlaces > 0
        ? formattedIntegerPart +
              settings.decimalSeparator +
              formattedDecimalPart
        : formattedIntegerPart;
}

function formatCurrency(
    value: string,
    settings: CurrencyFormattingSettings,
): string {
    if (settings.currencyType === "Rp") {
        value = settings.useFormalNotation ? "Rp" + value : "Rp " + value;
    } else if (settings.currencyType === "IDR") {
        value = settings.useFormalNotation ? value + " IDR" : "IDR " + value;
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

    return mergedSettings.includeCurrencyUnit
        ? formatCurrency(value, mergedSettings)
        : formatCurrency(formatThousand(value, mergedSettings), mergedSettings);
}

import { CurrencyFormattingSettings } from "./settings";

export function formatDecimalPart(
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

export function formatThousandPart(
    value: string,
    settings: CurrencyFormattingSettings,
): string {
    const [intPart, decPart] = value.split(".");
    const formattedPart: string[] = [];

    for (let i = intPart.length - 1, count = 0; i >= 0; i--, count++) {
        if (count === 3) {
            formattedPart.push(settings.thousandSeparator);
            count = 0;
        }
        formattedPart.push(intPart[i]);
    }

    const formattedIntPart = formattedPart.reverse().join("");
    const formattedDecPart = formatDecimalPart(decPart, settings);

    if (settings.omitZeroDecimals && !decPart) {
        return formattedIntPart;
    }

    return settings.decimalPlaces > 0
        ? formattedIntPart + settings.decimalSeparator + formattedDecPart
        : formattedIntPart;
}

export function formatUnitName(
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

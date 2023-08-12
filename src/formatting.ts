import { Fmt } from "./types";

function decimal({ value, settings }: Fmt): string {
    if (!value) {
        value = settings.replaceZeroDecimals ? "-" : "00";
    }

    const valueLength = settings.decimalPlaces - value.length;

    if (valueLength > 0) {
        return value + "0".repeat(valueLength);
    } else if (valueLength < 0) {
        return value.slice(0, valueLength);
    }

    return value;
}

export function thousand({ value, settings }: Fmt): string {
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
    const formattedDecPart = decimal({
        value: decPart,
        settings,
    });

    if (settings.omitZeroDecimals && !decPart) {
        return formattedIntPart;
    }

    return settings.decimalPlaces > 0
        ? formattedIntPart + settings.decimalSeparator + formattedDecPart
        : formattedIntPart;
}

export function unit({ value, settings }: Fmt): string {
    const unitIndex = Math.ceil(value.length / 3) - 2;
    const unitNames = settings.longUnitNames
        ? ["ribu", "juta", "miliar", "triliun"]
        : ["K", "M", "B", "T"];

    if (unitIndex >= 0 && unitIndex <= 3) {
        let units = unitNames[unitIndex];

        if (settings.spaceBeforeUnit) {
            units = " " + units;
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
            units
        );
    }

    return thousand({ value, settings });
}

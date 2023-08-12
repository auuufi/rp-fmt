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
    const unitLength = Math.ceil(value.length / 3) - 2;
    const unitLabels = settings.longUnitNames
        ? ["ribu", "juta", "miliar", "triliun"]
        : ["K", "M", "B", "T"];

    if (unitLength >= 0 && unitLength <= 3) {
        let units = unitLabels[unitLength];

        if (settings.spaceBeforeUnit) {
            units = " " + units;
        }

        const remainingDigits = value.length % 3;
        const sliceLength = remainingDigits === 0 ? 3 : remainingDigits;
        const intPart = value.slice(0, sliceLength);
        const sep = settings.decimalPlaces > 0 ? settings.decimalSeparator : "";
        const decPart = value.slice(
            sliceLength,
            sliceLength + settings.decimalPlaces,
        );

        return intPart + sep + decPart + units;
    }

    return thousand({ value, settings });
}

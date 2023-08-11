import { formatThousandPart, formatUnitName } from "./formatting";
import {
    CurrencyFormattingSettings,
    defaultCurrencyFormattingSettings,
} from "./settings";

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

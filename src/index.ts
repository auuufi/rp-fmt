import { thousand, unit } from "./formatting";
import { defaultCurrencyFormattingSettings } from "./settings";
import { CurrencyFormattingSettings, Fmt } from "./types";

function currency({ value, settings }: Fmt): string {
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
    const mergeSettings: CurrencyFormattingSettings = {
        ...defaultCurrencyFormattingSettings,
        ...settings,
    };

    return mergeSettings.includeCurrencySymbol
        ? currency({
              value: unit({ value, settings: mergeSettings }),
              settings: mergeSettings,
          })
        : currency({
              value: thousand({ value, settings: mergeSettings }),
              settings: mergeSettings,
          });
}

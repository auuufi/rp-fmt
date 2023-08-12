import { thousand, unit } from "./formatting";
import { defaultCurrencyFormatSettings } from "./settings";
import { CurrencyFormatSettings, Fmt } from "./types";

function currency({ value, settings }: Fmt): string {
    if (settings.currency === "Rp") {
        return settings.formal ? "Rp" + value : "Rp " + value;
    } else if (settings.currency === "IDR") {
        return settings.formal ? value + " IDR" : "IDR " + value;
    }

    return value;
}

export default function RpFmt(
    value: string | number,
    settings?: Partial<CurrencyFormatSettings>,
): string {
    value = typeof value !== "string" ? value.toString() : value;
    const mergeSettings = {
        ...defaultCurrencyFormatSettings,
        ...settings,
    };

    return mergeSettings.symbol
        ? currency({
              value: unit({ value, settings: mergeSettings }),
              settings: mergeSettings,
          })
        : currency({
              value: thousand({ value, settings: mergeSettings }),
              settings: mergeSettings,
          });
}

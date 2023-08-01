type Currency = "Rp" | "IDR";

interface IDefaultSettings {
    currency: Currency;
    dot: string;
    formal: boolean;
    removeZeroDecimals: boolean;
    useUnit: boolean;
}

const defaultSettings: IDefaultSettings = {
    currency: "Rp",
    dot: ".",
    formal: true,
    removeZeroDecimals: false,
    useUnit: false,
};

function dotFormatter(nominal: string, settings: IDefaultSettings): string {
    const value = nominal.split(".");
    const size = value[0].length;
    const result: string[] = [];

    for (let i = size - 1, count = 0; i >= 0; i--, count++) {
        if (count === 3) {
            result.push(settings.dot);
            count = 0;
        }
        result.push(value[0][i]);
    }

    return result.reverse().join("");
}

function currencyFormatter(
    nominal: string,
    settings: IDefaultSettings,
): string {
    if (settings.currency === "Rp") {
        nominal = settings.formal ? "Rp" + nominal : "Rp " + nominal;
    } else if (settings.currency === "IDR") {
        nominal = settings.formal ? nominal + " IDR" : "IDR " + nominal;
    }

    return nominal;
}

export function RpFmt(
    nominal: string | number,
    settings: Partial<IDefaultSettings>,
): string {
    nominal = typeof nominal !== "string" ? nominal.toString() : nominal;
    const mergedSettings: IDefaultSettings = {
        ...defaultSettings,
        ...settings,
    };

    return mergedSettings.useUnit
        ? currencyFormatter(nominal, mergedSettings)
        : currencyFormatter(
              dotFormatter(nominal, mergedSettings),
              mergedSettings,
          );
}

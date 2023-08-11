export type CurrencyType = "Rp" | "IDR" | null;

export interface CurrencyFormattingSettings {
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

export const defaultCurrencyFormattingSettings: CurrencyFormattingSettings = {
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

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

export interface Fmt {
    value: string;
    settings: CurrencyFormattingSettings;
}

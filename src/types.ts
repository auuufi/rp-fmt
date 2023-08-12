export type CurrencyType = "Rp" | "IDR" | null;

export interface CurrencyFormatSettings {
    currency: CurrencyType;
    decimalSep: string;
    decimals: number;
    formal: boolean;
    longUnits: boolean;
    omitZero: boolean;
    replaceZero: boolean;
    spaceBeforeUnit: boolean;
    symbol: boolean;
    thousandSep: string;
}

export interface Fmt {
    value: string;
    settings: CurrencyFormatSettings;
}

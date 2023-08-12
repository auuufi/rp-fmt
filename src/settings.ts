import { CurrencyFormattingSettings } from "./types";

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

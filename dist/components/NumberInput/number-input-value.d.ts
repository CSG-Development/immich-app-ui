export declare const toNumberInputText: (value: number | undefined) => string;
/**
 * Keep in-progress input (e.g. "34." or "-") instead of rewriting the bound number,
 * which resets the caret to the start of the field.
 */
export declare const getNumberInputDisplayValue: (text: string, value: number | undefined) => string;

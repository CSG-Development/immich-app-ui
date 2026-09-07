export const toNumberInputText = (value) => typeof value === 'number' ? String(value) : '';
/**
 * Keep in-progress input (e.g. "34." or "-") instead of rewriting the bound number,
 * which resets the caret to the start of the field.
 */
export const getNumberInputDisplayValue = (text, value) => {
    if (typeof value !== 'number') {
        return text;
    }
    const parsed = Number.parseFloat(text);
    if (text !== '' && (Number.isNaN(parsed) || parsed === value)) {
        return text;
    }
    return String(value);
};

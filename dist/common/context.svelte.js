import { withPrefix } from '../utils.js';
import { getContext, hasContext, setContext } from 'svelte';
const fieldKey = Symbol(withPrefix('field'));
export const setFieldContext = (field) => setContext(fieldKey, field);
export const hasFieldContext = () => hasContext(fieldKey);
export const getFieldContext = () => {
    const { label, color = 'secondary', invalid = false, readOnly = false, required = false, disabled = false, description, } = getContext(fieldKey) || {};
    return { label, description, color, invalid, readOnly, required, disabled };
};

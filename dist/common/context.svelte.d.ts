import type { FieldContext } from '../types.js';
export declare const setFieldContext: (field: FieldContext) => FieldContext;
export declare const hasFieldContext: () => boolean;
export declare const getFieldContext: () => {
    label: string | undefined;
    description: string | undefined;
    color: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "muted";
    invalid: boolean;
    readOnly: boolean;
    required: boolean;
    disabled: boolean;
};

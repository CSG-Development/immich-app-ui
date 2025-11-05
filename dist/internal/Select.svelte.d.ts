import type { SelectCommonProps, SelectItem } from '../types.js';
import { Select } from 'bits-ui';
type T = SelectItem;
type Props = {
    multiple?: boolean;
    values: T[];
    asLabel?: (items: T[]) => string;
    onChange?: (values: T[]) => void;
} & SelectCommonProps<T>;
declare const Select: import("svelte").Component<Props, {}, "values">;
type Select = ReturnType<typeof Select>;
export default Select;

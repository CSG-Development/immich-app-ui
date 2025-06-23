import type { TextColor } from '../../types.js';
import type { Snippet } from 'svelte';
type Props = {
    color?: TextColor;
    class?: string;
    children?: Snippet;
};
declare const HelperText: import("svelte").Component<Props, {}, "">;
type HelperText = ReturnType<typeof HelperText>;
export default HelperText;

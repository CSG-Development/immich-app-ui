import type { Size, TextColor } from '../../types.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
type Props = {
    color?: TextColor;
    class?: string;
    size?: Size;
    children: Snippet;
    variant?: 'italic';
    fontWeight?: 'light' | 'normal' | 'semi-bold' | 'bold';
} & HTMLAttributes<HTMLParagraphElement>;
declare const Text: import("svelte").Component<Props, {}, "">;
type Text = ReturnType<typeof Text>;
export default Text;

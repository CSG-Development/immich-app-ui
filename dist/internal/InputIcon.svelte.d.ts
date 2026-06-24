import type { IconLike, Size } from '../types.js';
import type { Snippet } from 'svelte';
type Props = {
    icon?: IconLike | Snippet;
    size?: Size;
};
declare const InputIcon: import("svelte").Component<Props, {}, "">;
type InputIcon = ReturnType<typeof InputIcon>;
export default InputIcon;

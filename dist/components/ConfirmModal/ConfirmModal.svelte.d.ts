import type { Color } from '../../types.js';
import type { Snippet } from 'svelte';
interface Props {
    title?: string;
    icon?: string | boolean;
    prompt?: string;
    confirmText?: string;
    confirmColor?: Color;
    disabled?: boolean;
    size?: 'small' | 'medium';
    onClose: (confirmed: boolean) => void;
    promptSnippet?: Snippet;
}
declare const ConfirmModal: import("svelte").Component<Props, {}, "">;
type ConfirmModal = ReturnType<typeof ConfirmModal>;
export default ConfirmModal;

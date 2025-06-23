import type { ModalSize } from '../../types.js';
import { type Snippet } from 'svelte';
type Props = {
    title: string;
    size?: ModalSize;
    class?: string;
    open?: boolean;
    icon?: string | boolean;
    expandable?: boolean;
    children: Snippet;
    onClose?: () => void;
};
declare const Modal: import("svelte").Component<Props, {}, "">;
type Modal = ReturnType<typeof Modal>;
export default Modal;

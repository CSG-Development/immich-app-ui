import type { Snippet } from 'svelte';
type Props = {
    class?: string;
    text?: string;
    children: Snippet;
};
declare const Tooltip: import("svelte").Component<Props, {}, "">;
type Tooltip = ReturnType<typeof Tooltip>;
export default Tooltip;

import type { Snippet } from 'svelte';
interface Props {
    title?: string | undefined;
    description?: string | undefined;
    scrollbar?: boolean;
    buttons?: Snippet;
    children?: Snippet;
}
declare const PageLayout: import("svelte").Component<Props, {}, "">;
type PageLayout = ReturnType<typeof PageLayout>;
export default PageLayout;

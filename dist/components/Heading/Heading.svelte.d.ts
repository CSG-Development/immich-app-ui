import type { HeadingColor, HeadingSize, HeadingTag } from '../../types.js';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
type Props = {
    size?: HeadingSize;
    /**
     * The HTML element type.
     */
    tag?: HeadingTag;
    color?: HeadingColor;
    class?: string;
    children: Snippet;
} & HTMLAttributes<HTMLHeadingElement>;
declare const Heading: import("svelte").Component<Props, {}, "">;
type Heading = ReturnType<typeof Heading>;
export default Heading;

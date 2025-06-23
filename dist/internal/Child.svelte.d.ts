import { ChildKey } from '../constants.js';
import { type Snippet } from 'svelte';
type Props = {
    for: ChildKey;
    as: ChildKey;
    class?: string;
    children: Snippet;
};
declare const Child: import("svelte").Component<Props, {}, "">;
type Child = ReturnType<typeof Child>;
export default Child;

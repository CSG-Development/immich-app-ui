import { ChildKey } from '../constants.js';
import { withPrefix } from '../utilities/internal.js';
import { setContext } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';
export const withChildrenSnippets = (key) => {
    const map = new SvelteMap();
    setContext(withPrefix(key), {
        register: (child, data) => map.set(child, data),
    });
    return {
        getChildren: (key) => map.get(key)?.(),
    };
};

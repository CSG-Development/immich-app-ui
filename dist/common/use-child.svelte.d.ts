import { ChildKey } from '../constants.js';
import type { ChildData } from '../types.js';
export declare const withChildrenSnippets: (key: ChildKey) => {
    getChildren: (key: ChildKey) => ChildData | undefined;
};

import { twMerge } from 'tailwind-merge';
export const cleanClass = (...classNames) => {
    return twMerge(classNames
        .filter((className) => {
        if (!className || typeof className === 'boolean') {
            return false;
        }
        return typeof className === 'string';
    })
        .join(' '));
};
export const withPrefix = (key) => `immich-ui-${key}`;
let _count = 0;
export const generateId = () => `ui-id-${_count++}`;

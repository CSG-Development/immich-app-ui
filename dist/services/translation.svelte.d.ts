import type { TranslationProps } from '../types.js';
declare const defaultTranslations: {
    close: string;
    showPassword: string;
    hidePassword: string;
    darkTheme: string;
};
export type Translations = typeof defaultTranslations;
export declare const translate: <T extends keyof Translations>(key: T, overrides?: TranslationProps<T>) => string;
export declare const t: <T extends keyof Translations>(key: T, overrides?: TranslationProps<T>) => string;
export declare const setTranslations: (newTranslations: Partial<Translations>) => void;
export {};

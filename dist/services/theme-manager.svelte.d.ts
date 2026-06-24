import { Theme } from '../types.js';
export type ThemeOptions = {
    lightClass?: string;
    darkClass?: string;
    selector?: string;
};
declare class ThemeManager {
    #private;
    get value(): Theme;
    initialize(options?: ThemeOptions): void;
    setOptions(newOptions: ThemeOptions): void;
    toggle(): void;
}
export declare const themeManager: ThemeManager;
export {};

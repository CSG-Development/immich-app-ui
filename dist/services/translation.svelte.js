const defaultTranslations = {
    close: 'Close',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    darkTheme: 'Toggle dark theme',
};
let translations = $state(defaultTranslations);
export const translate = (key, overrides) => overrides?.[key] ?? translations[key];
export const t = translate;
export const setTranslations = (newTranslations) => {
    translations = { ...defaultTranslations, ...newTranslations };
};

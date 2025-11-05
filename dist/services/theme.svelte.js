import { browser } from '$app/environment';
import { preference } from './preference.svelte.js';
import { Theme } from '../types.js';
const isDark = globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
const defaultOptions = {
  darkClass: 'dark',
  lightClass: 'light',
  selector: 'body',
};
let options = defaultOptions;
export const setThemeOptions = (newOptions) => (options = { ...defaultOptions, ...newOptions });
const defaultTheme = {
  value: isDark ? Theme.Dark : Theme.Light,
};
const { state, sync: syncToLocalStorage } = preference({
  key: 'theme',
  defaults: defaultTheme,
  onReadError: (error) => console.log(`Preference read error: ${error}`),
  onWriteError: (error) => console.log(`Preference write error: ${error}`),
});
export const theme = state;
export const onThemeChange = () => {
  syncToDom();
  syncToLocalStorage();
};
const syncToDom = () => {
  const { lightClass, darkClass, selector } = options;
  if (!browser || !selector) {
    return;
  }
  const element = document.querySelector(selector);
  if (!element) {
    return;
  }
  switch (theme.value) {
    case Theme.Dark: {
      element.classList.remove(lightClass);
      element.classList.add(darkClass);
      const darkReaderLock = document.createElement('meta');
      darkReaderLock.name = 'darkreader-lock';
      document.head.appendChild(darkReaderLock);
      break;
    }
    case Theme.Light: {
      element.classList.add(lightClass);
      element.classList.remove(darkClass);
      const darkReaderLock = document.querySelector('head > meta[name=darkreader-lock]');
      if (darkReaderLock) {
        document.head.removeChild(darkReaderLock);
      }
      break;
    }
  }
};
export const toggleTheme = () => {
  theme.value = theme.value === Theme.Dark ? Theme.Light : Theme.Dark;
  onThemeChange();
};
export const initializeTheme = (options) => {
  if (options) {
    setThemeOptions(options);
  }
  syncToDom();
};

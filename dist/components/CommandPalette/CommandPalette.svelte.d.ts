import type { TranslationProps } from '../../types.js';
type Props = {
    translations?: TranslationProps<'search_placeholder' | 'search_no_results' | 'search_recently_used' | 'command_palette_prompt_default'>;
};
declare const CommandPalette: import("svelte").Component<Props, {}, "">;
type CommandPalette = ReturnType<typeof CommandPalette>;
export default CommandPalette;

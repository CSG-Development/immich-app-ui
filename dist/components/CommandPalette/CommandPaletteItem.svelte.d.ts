import type { CommandItem } from '../../services/command-palette-manager.svelte';
type Props = {
    item: CommandItem;
    selected: boolean;
    onSelect: () => void;
    onRemove?: () => void;
};
declare const CommandPaletteItem: import("svelte").Component<Props, {}, "">;
type CommandPaletteItem = ReturnType<typeof CommandPaletteItem>;
export default CommandPaletteItem;

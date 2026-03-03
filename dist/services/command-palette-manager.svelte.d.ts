export type CommandItem = {
    icon: string;
    iconClass: string;
    type: string;
    title: string;
    description?: string;
    text: string;
} & ({
    href: string;
} | {
    action: () => void;
});
export declare const asText: (...items: unknown[]) => string;
declare class CommandPaletteManager {
    isEnabled: boolean;
    isOpen: boolean;
    query: string;
    selectedIndex: number;
    private normalizedQuery;
    items: CommandItem[];
    filteredItems: CommandItem[];
    recentItems: CommandItem[];
    results: CommandItem[];
    enable(): void;
    open(): Promise<void>;
    close(): void;
    select(selectedIndex?: number): Promise<void>;
    remove(index: number): void;
    up(): void;
    down(): void;
    reset(): void;
    addCommands(itemOrItems: CommandItem | CommandItem[]): void;
    removeCommands(itemOrItems: CommandItem | CommandItem[]): void;
}
export declare const commandPaletteManager: CommandPaletteManager;
export {};

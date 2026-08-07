import { matchesShortcut, shortcuts, shouldIgnoreEvent } from '../actions/shortcut.js';
import CommandPaletteModal from '../internal/CommandPaletteModal.svelte';
import { modalManager } from './modal-manager.svelte.js';
import { isModalOpen } from '../state/modal-state.svelte.js';
import { isEnabled } from '../utilities/common.js';
import { asArray, generateId, getSearchString } from '../utilities/internal.js';
import { on } from 'svelte/events';
export const defaultProvider = ({ name, types, actions }) => ({
    name,
    types,
    onSearch: (query) => query ? actions.filter((action) => getSearchString(action).includes(query.toLowerCase())) : actions,
});
const TYPE_REGEX = /type:("(?<quoted>[^"]+)"|(?<plain>\S+))/g;
class CommandPaletteManager {
    #translations = {};
    #providers = [];
    #isEnabled = false;
    #isOpen = false;
    #results = $state([]);
    #selectedGroupIndex = $state(0);
    #selectedItemIndex = $state(0);
    get isEnabled() {
        return this.#isEnabled;
    }
    get results() {
        return this.#results;
    }
    get selectedItem() {
        const group = this.#results[this.#selectedGroupIndex];
        return group?.items[this.#selectedItemIndex];
    }
    isSelected(item) {
        return this.selectedItem?.id === item.id;
    }
    enable() {
        if (this.#isEnabled) {
            return;
        }
        this.#isEnabled = true;
        if (globalThis.window && document.body) {
            shortcuts(document.body, [
                {
                    shortcut: { key: 'k', meta: true },
                    ignoreInputFields: false,
                    preventDefault: false,
                    onShortcut: (event) => this.#onOpenShortcut(event),
                },
                {
                    shortcut: { key: 'k', ctrl: true },
                    ignoreInputFields: false,
                    preventDefault: false,
                    onShortcut: (event) => this.#onOpenShortcut(event),
                },
                { shortcut: { key: '/' }, preventDefault: true, onShortcut: () => this.open() },
            ]);
            on(document.body, 'keydown', (event) => this.#handleKeydown(event));
        }
    }
    #onOpenShortcut(event) {
        if (this.#isOpen) {
            // Let the open palette handle vim-style Ctrl/Cmd+K navigation.
            return;
        }
        event.preventDefault();
        this.open();
    }
    setTranslations(translations = {}) {
        this.#translations = translations;
    }
    async #onSearch(query) {
        let type;
        if (query) {
            for (const matches of query.matchAll(TYPE_REGEX)) {
                query = query.replaceAll(TYPE_REGEX, '');
                type = matches.groups?.quoted ?? matches.groups?.plain;
                break;
            }
        }
        const newResults = await Promise.all(this.#providers
            .filter(({ types }) => !type || (types && types.includes(type)))
            .map(async (provider) => {
            const items = await provider.onSearch(query);
            return {
                provider,
                items: items.filter((item) => isEnabled(item)).map((item) => ({ ...item, id: generateId() })),
            };
        }));
        this.#selectedGroupIndex = 0;
        this.#selectedItemIndex = 0;
        this.#results = newResults.filter((result) => result.items.length > 0);
    }
    queryUpdate(query) {
        if (!query) {
            this.#results = [];
            return;
        }
        void this.#onSearch(query);
    }
    async #handleKeydown(event) {
        if (event.defaultPrevented || isModalOpen()) {
            return;
        }
        const actions = await Promise.all(this.#providers.map((provider) => Promise.resolve(provider.onSearch())));
        for (const action of actions.flat()) {
            if (!asArray(action.shortcuts).some((shortcut) => matchesShortcut(event, shortcut))) {
                continue;
            }
            if (!isEnabled(action)) {
                continue;
            }
            const { ignoreInputFields = true, preventDefault = true } = action.shortcutOptions || {};
            if (ignoreInputFields && shouldIgnoreEvent(event)) {
                continue;
            }
            if (preventDefault) {
                event.preventDefault();
            }
            action?.onAction(action);
            return;
        }
    }
    async #onClose(action) {
        // Clear open state before running the action so the palette can be reopened
        // even if onAction hangs or throws (nested modals, navigation, etc.).
        this.#isOpen = false;
        this.#results = [];
        try {
            await action?.onAction(action);
        }
        catch (error) {
            console.error('Command palette action failed', error);
        }
    }
    #resetOpenState() {
        this.#isOpen = false;
        this.#results = [];
    }
    open(initialQuery) {
        if (this.#isOpen) {
            return;
        }
        const { onClose } = modalManager.open(CommandPaletteModal, {
            translations: this.#translations,
            initialQuery,
        });
        this.#isOpen = true;
        void onClose.then((action) => this.#onClose(action), () => this.#resetOpenState());
    }
    navigateUp() {
        const groups = this.#results;
        if (groups.length === 0) {
            return;
        }
        this.#selectedItemIndex--;
        if (this.#selectedItemIndex < 0) {
            this.#selectedGroupIndex--; // previous group
            if (this.#selectedGroupIndex < 0) {
                this.#selectedGroupIndex = groups.length - 1; // first group
            }
            this.#selectedItemIndex = groups[this.#selectedGroupIndex].items.length - 1;
        }
    }
    navigateDown() {
        const groups = this.#results;
        if (groups.length === 0) {
            return;
        }
        const group = groups[this.#selectedGroupIndex];
        this.#selectedItemIndex++;
        if (this.#selectedItemIndex >= group.items.length) {
            this.#selectedItemIndex = 0;
            this.#selectedGroupIndex++; // next group
            if (this.#selectedGroupIndex >= groups.length) {
                this.#selectedGroupIndex = 0; // first group
            }
        }
    }
    loadAllItems() {
        void this.#onSearch();
    }
    addProvider(provider) {
        this.#providers.push(provider);
        return () => this.#removeProvider(provider);
    }
    #removeProvider(provider) {
        this.#providers = this.#providers.filter((actionProvider) => actionProvider !== provider);
    }
}
export const commandPaletteManager = new CommandPaletteManager();

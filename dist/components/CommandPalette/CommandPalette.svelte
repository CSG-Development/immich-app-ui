<script lang="ts">
  import { shortcuts } from '../../actions/shortcut.js';
  import CloseButton from '../CloseButton/CloseButton.svelte';
  import CommandPaletteItem from './CommandPaletteItem.svelte';
  import Icon from '../Icon/Icon.svelte';
  import Input from '../Input/Input.svelte';
  import Modal from '../Modal/Modal.svelte';
  import ModalBody from '../Modal/ModalBody.svelte';
  import ModalFooter from '../Modal/ModalFooter.svelte';
  import ModalHeader from '../Modal/ModalHeader.svelte';
  import Stack from '../Stack/Stack.svelte';
  import Text from '../Text/Text.svelte';
  import { commandPaletteManager } from '../../services/command-palette-manager.svelte';
  import { t } from '../../services/translation.svelte.js';
  import type { TranslationProps } from '../../types.js';
  import { mdiArrowDown, mdiArrowUp, mdiKeyboardEsc, mdiKeyboardReturn, mdiMagnify } from '@mdi/js';

  type Props = {
    translations?: TranslationProps<
      'search_placeholder' | 'search_no_results' | 'search_recently_used' | 'command_palette_prompt_default'
    >;
  };

  let { translations }: Props = $props();

  let inputElement = $state<HTMLInputElement | null>(null);

  const handleOpen = () => commandPaletteManager.open();
  const handleClose = () => commandPaletteManager.close();
  const handleUp = (event: KeyboardEvent) => handleNavigate(event, 'up');
  const handleDown = (event: KeyboardEvent) => handleNavigate(event, 'down');
  const handleSelect = (event: KeyboardEvent) => handleNavigate(event, 'select');
  const handleNavigate = async (event: KeyboardEvent, direction: 'up' | 'down' | 'select') => {
    if (!commandPaletteManager.isOpen) {
      return;
    }

    event.preventDefault();

    switch (direction) {
      case 'up': {
        commandPaletteManager.up();
        break;
      }

      case 'down': {
        commandPaletteManager.down();
        break;
      }

      case 'select': {
        await commandPaletteManager.select();
        break;
      }
    }
  };
</script>

<svelte:window
  use:shortcuts={[
    { shortcut: { key: 'k', meta: true }, preventDefault: true, onShortcut: handleOpen },
    { shortcut: { key: 'k', ctrl: true }, preventDefault: true, onShortcut: handleOpen },
    { shortcut: { key: '/' }, preventDefault: true, onShortcut: handleOpen },
    { shortcut: { key: 'ArrowUp' }, ignoreInputFields: false, onShortcut: handleUp },
    { shortcut: { key: 'ArrowDown' }, ignoreInputFields: false, onShortcut: handleDown },
    { shortcut: { key: 'k', ctrl: true }, ignoreInputFields: false, onShortcut: handleUp },
    { shortcut: { key: 'k', meta: true }, ignoreInputFields: false, onShortcut: handleUp },
    { shortcut: { key: 'j', ctrl: true }, ignoreInputFields: false, onShortcut: handleDown },
    { shortcut: { key: 'j', meta: true }, ignoreInputFields: false, onShortcut: handleDown },
    { shortcut: { key: 'Enter' }, ignoreInputFields: false, onShortcut: handleSelect },
    { shortcut: { key: 'Escape' }, onShortcut: handleClose },
  ]}
/>

{#if commandPaletteManager.isOpen}
  <Modal size="large" onClose={handleClose} closeOnBackdropClick>
    <ModalHeader>
      <div class="flex place-items-center gap-1">
        <Input
          bind:ref={inputElement}
          bind:value={commandPaletteManager.query}
          placeholder={t('search_placeholder', translations)}
          leadingIcon={mdiMagnify}
          tabindex={1}
        />
        <div>
          <CloseButton onclick={() => commandPaletteManager.close()} class="md:hidden" />
        </div>
      </div>
    </ModalHeader>
    <ModalBody>
      <Stack gap={2}>
        {#if commandPaletteManager.query}
          {#if commandPaletteManager.results.length === 0}
            <Text>{t('search_no_results', translations)}</Text>
          {/if}
        {:else if commandPaletteManager.recentItems.length > 0}
          <Text>{t('search_recently_used', translations)}</Text>
        {:else}
          <Text>{t('command_palette_prompt_default', translations)}</Text>
        {/if}

        {#if commandPaletteManager.results.length > 0}
          <div class="flex flex-col">
            {#each commandPaletteManager.results as item, i (i)}
              <CommandPaletteItem
                {item}
                selected={commandPaletteManager.selectedIndex === i}
                onRemove={commandPaletteManager.query ? undefined : () => commandPaletteManager.remove(i)}
                onSelect={() => commandPaletteManager.select(i)}
              />
            {/each}
          </div>
        {/if}
      </Stack>
    </ModalBody>
    <ModalFooter>
      <div class="flex w-full justify-around">
        <div class="flex gap-4">
          <div class="flex place-items-center gap-1">
            <span class="rounded bg-gray-300 p-1 dark:bg-gray-500">
              <Icon icon={mdiKeyboardReturn} size="1rem" />
            </span>
            <Text size="small">to select</Text>
          </div>

          <div class="flex place-items-center gap-1">
            <span class="flex gap-1 rounded bg-gray-300 p-1 dark:bg-gray-500">
              <Icon icon={mdiArrowUp} size="1rem" />
              <Icon icon={mdiArrowDown} size="1rem" />
            </span>
            <Text size="small">to navigate</Text>
          </div>

          <div class="flex place-items-center gap-1">
            <span class="rounded bg-gray-300 p-1 dark:bg-gray-500">
              <Icon icon={mdiKeyboardEsc} size="1rem" />
            </span>
            <Text size="small">to close</Text>
          </div>
        </div>
      </div>
    </ModalFooter>
  </Modal>
{/if}

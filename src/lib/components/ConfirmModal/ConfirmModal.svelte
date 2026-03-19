<script lang="ts">
  import Button from '$lib/components/Button/Button.svelte';
  import Modal from '$lib/components/Modal/Modal.svelte';
  import ModalBody from '$lib/components/Modal/ModalBody.svelte';
  import ModalFooter from '$lib/components/Modal/ModalFooter.svelte';
  import HStack from '$lib/components/Stack/HStack.svelte';
  import type { Color } from '$lib/types.js';
  import { t } from '$lib/services/translation.svelte.js';
  import type { Snippet } from 'svelte';

  interface Props {
    title?: string;
    icon?: string | boolean;
    prompt?: string;
    confirmText?: string;
    confirmColor?: Color;
    disabled?: boolean;
    size?: 'small' | 'medium';
    onClose: (confirmed: boolean) => void;
    promptSnippet?: Snippet;
    mdFullSize?: boolean;
  }

  let {
    title = t('confirm'),
    icon,
    prompt = t('prompt_default'),
    confirmText = t('confirm'),
    confirmColor = 'danger',
    disabled = false,
    size = 'small',
    onClose,
    promptSnippet,
    mdFullSize = true,
  }: Props = $props();

  const handleConfirm = () => {
    onClose(true);
  };
</script>

<Modal {title} onClose={() => onClose(false)} {size} {icon} {mdFullSize}>
  <ModalBody>
    {#if promptSnippet}{@render promptSnippet()}{:else}
      <p>{prompt}</p>
    {/if}
  </ModalBody>

  <ModalFooter>
    <HStack fullWidth>
      <Button
        shape="round"
        color="secondary"
        size="standard-large"
        class="font-normal"
        fullWidth
        onclick={() => onClose(false)}
      >
        {t('cancel')}
      </Button>
      <Button
        shape="round"
        color={confirmColor}
        size="standard-large"
        class="font-normal"
        fullWidth
        onclick={handleConfirm}
        {disabled}
      >
        {confirmText}
      </Button>
    </HStack>
  </ModalFooter>
</Modal>

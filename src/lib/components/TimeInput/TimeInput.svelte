<script lang="ts">
  import { TimepickerUI } from 'timepicker-ui';
  import Input from '../Input/Input.svelte';
  import 'timepicker-ui/main.css';
  import { theme } from '$lib/services/theme.svelte.js';
  import { Theme, type InputProps } from '$lib/types.js';

  let inputEl = $derived<HTMLInputElement | null>(null);

  let { value = $bindable<string>() }: InputProps = $props();
  let picker: TimepickerUI;

  $effect(() => {
    if (inputEl) {
      picker = new TimepickerUI(inputEl, {
        ui: { cssClass: theme.value === Theme.Dark ? 'custom-picker-dark' : 'custom-picker' },
        callbacks: {
          onConfirm: (data) => console.log('Confirmed:', data),
        },
      });
      picker.create();
    }

    return () => picker.destroy();
  });
</script>

<Input bind:ref={inputEl} bind:value placeholder="Select time" />

<style>
  :global(.tp-ui-wrapper.custom-picker) {
    --tp-bg: var(--color-light);
    --tp-primary: var(--color-primary);
    --tp-surface: var(--color-bg);
    --tp-input-bg: var(--color-bg);
    --tp-primary-container: var(--color-primary);
    --tp-on-primary-container: var(--color-light);
    --tp-hover-bg: var(--color-primary-hover);
    --tp-am-pm-active: var(--color-primary);
    --tp-am-pm-text-selected: var(--color-light);
    --tp-am-pm-text-unselected: var(--color-dark);
    --tp-text: var(--color-dark);
    --tp-text-secondary: var(--color-dark);
    --tp-outline: var(--color-primary);
    --tp-surface-hover: var(--color-primary-hover);
    --tp-border: var(--color-gray-border);
    --tp-duration-ripple: 100ms;
    --tp-duration-ripple-fade: 0ms;
    --tp-size-wrapper: 312px;
    width: 312px;
  }

  :global(.tp-ui-header) {
    padding-left: 16px;
    padding-right: 16px;
  }

  :global(.tp-ui-wrapper.custom-picker-dark) {
    --tp-bg: var(--color-light);
    --tp-primary: var(--color-primary);
    --tp-surface: var(--color-bg);
    --tp-input-bg: var(--color-bg);
    --tp-primary-container: var(--color-primary);
    --tp-on-primary-container: var(--color-light);
    --tp-am-pm-active: var(--color-primary);
    --tp-am-pm-text-selected: var(--color-light);
    --tp-am-pm-text-unselected: var(--color-dark);
    --tp-text: var(--color-dark);
    --tp-text-secondary: var(--color-dark);
    --tp-outline: var(--color-primary);
    --tp-border: var(--color-gray-border);
  }

  :global(.tp-ui-minutes),
  :global(.tp-ui-hour) {
    -moz-appearance: textfield;
    appearance: textfield;
    caret-color: transparent;
  }

  :global(.tp-ui-am),
  :global(.tp-ui-pm) {
    background-color: var(--color-bg);
  }

  :global(.tp-ui-minutes),
  :global(.tp-ui-hour) {
    font-weight: 300;
  }

  :global(.tp-ui-am:hover),
  :global(.tp-ui-pm:hover),
  :global(.tp-ui-minutes:hover),
  :global(.tp-ui-hour:hover) {
    background-color: rgba(25, 118, 210, 0.12);
  }

  :global(.tp-ui-minutes.active:hover),
  :global(.tp-ui-hour.active:hover) {
    background-color: var(--color-primary);
  }

  :global(.tp-ui-select-time) {
    font-size: 16px;
    font-weight: 700;
  }

  :global(.tp-ui-cancel-btn),
  :global(.tp-ui-ok-btn) {
    border-radius: 24px;
    padding: 10px 12px 10px 12px;
    margin: 0px;
  }
</style>

<script lang="ts">
  import { TimepickerUI } from 'timepicker-ui';
  import Input from '../Input/Input.svelte';
  import 'timepicker-ui/main.css';
  import { theme } from '../../services/theme.svelte.js';
  import { Theme, type InputProps } from '../../types.js';
  import { mdiClockOutline } from '@mdi/js';

  let inputEl = $derived<HTMLInputElement | null>(null);

  let { value = $bindable<string>('03:52 PM') }: InputProps = $props();

  $effect(() => {
    let picker: TimepickerUI;
    if (inputEl) {
      picker = new TimepickerUI(inputEl, {
        ui: { cssClass: theme.value === Theme.Dark ? 'custom-picker-dark' : 'custom-picker' },
        callbacks: {
          onConfirm: (data) => {
            value = `${data.hour}:${data.minutes} ${data.type}`;
          },
        },
      });
      picker.create();
    }

    return () => picker.destroy();
  });
</script>

<Input bind:ref={inputEl} bind:value leadingIcon={mdiClockOutline} placeholder="Select time" />
{console.log(value)}

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

  :global(.tp-ui-wrapper.custom-picker),
  :global(.tp-ui-wrapper.custom-picker-dark) {
    --tp-duration-ripple: 100ms;
    --tp-duration-ripple-fade: 0ms;
    --tp-size-wrapper: 312px;
    width: 312px;
  }

  :global(.tp-ui-wrapper.custom-picker) {
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

  :global(.tp-ui-wrapper.custom-picker-dark) {
    --tp-bg: rgb(38 39 41);
    --tp-primary: rgb(100 181 246);
    --tp-surface: rgb(61 62 65);
    --tp-input-bg: rgb(61 62 65);
    --tp-primary-container: rgb(100 181 246);
    --tp-on-primary-container: rgba(0 0 0 / 0.87);
    --tp-on-primary: rgba(0 0 0 / 0.87);
    --tp-am-pm-active: rgb(100 181 246);
    --tp-am-pm-text-selected: rgba(0 0 0 / 0.87);
    --tp-am-pm-text-unselected: rgba(255 255 255 / 0.87);
    --tp-text: rgba(255 255 255 / 0.87);
    --tp-text-secondary: rgba(255 255 255 / 0.87);
    --tp-outline: rgb(100 181 246);
    --tp-border: rgb(97 97 97);
  }

  :global(.tp-ui),
  :global(.tp-ui-input) {
    width: 100%;
  }

  :global(.tp-ui-header) {
    padding-inline: 16px;
  }

  :global(.tp-ui-minutes),
  :global(.tp-ui-hour) {
    appearance: textfield;
    -moz-appearance: textfield;
    caret-color: transparent;
    font-weight: 300;
  }

  :global(.tp-ui-am),
  :global(.tp-ui-pm) {
    font-weight: 400;
  }

  /* Light theme */

  :global(.light .tp-ui-am),
  :global(.light .tp-ui-pm) {
    background-color: var(--color-bg);
  }

  :global(.light .tp-ui-am.active),
  :global(.light .tp-ui-pm.active),
  :global(.light .tp-ui-minutes.active:hover),
  :global(.light .tp-ui-hour.active:hover) {
    background-color: var(--color-primary);
  }

  :global(.light .tp-ui-am:hover),
  :global(.light .tp-ui-pm:hover),
  :global(.light .tp-ui-minutes:hover),
  :global(.light .tp-ui-hour:hover) {
    background-color: rgba(25 118 210 / 0.12);
  }

  /* Dark theme */

  :global(.dark .tp-ui-am),
  :global(.dark .tp-ui-pm) {
    background-color: rgb(61 62 65);
  }

  :global(.dark .tp-ui-am.active),
  :global(.dark .tp-ui-pm.active),
  :global(.dark .tp-ui-minutes.active:hover),
  :global(.dark .tp-ui-hour.active:hover) {
    background-color: rgb(100 181 246);
  }

  :global(.dark .tp-ui-am:hover),
  :global(.dark .tp-ui-pm:hover),
  :global(.dark .tp-ui-minutes:hover),
  :global(.dark .tp-ui-hour:hover) {
    background-color: rgba(100 181 246 / 0.12);
  }

  :global(.tp-ui-select-time) {
    font-size: 16px;
    font-weight: 700;
  }

  :global(.tp-ui-cancel-btn),
  :global(.tp-ui-ok-btn) {
    border-radius: 24px;
    padding: 10px 12px;
    margin: 0;
  }
</style>

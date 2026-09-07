<script lang="ts">
  import Input from '$lib/components/Input/Input.svelte';
  import type { NumberInputProps } from '$lib/types.js';

  let { value = $bindable(), color = 'secondary', size, ...props }: NumberInputProps = $props();

  let inputEl: HTMLInputElement | null = $state(null);

  const getValue = () => {
    // type="number" reports "" for in-progress values like "34." or "-".
    // Echo that back so Svelte does not write String(value) and reset the caret.
    if (inputEl?.validity.badInput) {
      return inputEl.value;
    }

    return typeof value === 'number' ? String(value) : '';
  };

  const setValue = (newValue: string | number | null) => {
    if (inputEl?.validity.badInput) {
      return;
    }

    if (typeof newValue === 'number') {
      value = newValue;
      return;
    }

    // empty string or null
    if (!newValue) {
      value = undefined;
      return;
    }

    const parsed = Number.parseFloat(newValue);
    if (Number.isNaN(parsed)) {
      return;
    }

    value = parsed;
  };
</script>

<Input {size} type="number" {color} {...props} bind:ref={inputEl} bind:value={getValue, setValue} />

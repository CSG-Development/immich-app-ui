<script lang="ts">
  import Input from '$lib/components/Input/Input.svelte';
  import type { NumberInputProps } from '$lib/types.js';
  import { getNumberInputDisplayValue, toNumberInputText } from './number-input-value.js';

  let { value = $bindable(), color = 'secondary', size, ...props }: NumberInputProps = $props();

  let text = $state(toNumberInputText(value));

  const getValue = () => getNumberInputDisplayValue(text, value);

  const setValue = (newValue: string | number | null) => {
    if (typeof newValue === 'number') {
      value = newValue;
      text = String(newValue);
      return;
    }

    text = newValue ?? '';

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

<Input bind:value={getValue, setValue} {size} type="number" {color} {...props} />

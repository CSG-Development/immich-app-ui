<script lang="ts">
  import Input from '../Input/Input.svelte';
  import type { NumberInputProps } from '../../types.js';

  let { value = $bindable(), color = 'secondary', size, ...props }: NumberInputProps = $props();

  // Svelte's type="number" binding uses `null` for empty/in-progress values (e.g. "1." or "-").
  // Returning a string here would write back to the input and clear the decimal/sign.
  const getValue = () => value ?? null;
  const setValue = (newValue: string | number | null) => {
    if (typeof newValue === 'number') {
      value = Number.isNaN(newValue) ? undefined : newValue;
      return;
    }

    if (newValue === null || newValue === '') {
      value = undefined;
      return;
    }

    const parsed = Number.parseFloat(newValue);
    value = Number.isNaN(parsed) ? undefined : parsed;
  };
</script>

<Input
  {size}
  {color}
  {...props}
  type="number"
  step="any"
  inputmode="decimal"
  bind:value={getValue as unknown as () => string, setValue}
/>

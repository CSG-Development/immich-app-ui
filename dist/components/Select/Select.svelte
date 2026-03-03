<script lang="ts">
	import InternalSelect from '../../internal/Select.svelte';
	import type { SelectItem, SelectProps } from '../../types.js';

	type T = SelectItem;

	let { onChange, value = $bindable(), ...restProps }: SelectProps<T> = $props();

	let values = $derived(value ? [value] : []);

	const handleChange = (items: T[]) => {
		value = items[0];
		onChange?.(value);
	};
</script>

<InternalSelect bind:values onChange={handleChange} {...restProps} />

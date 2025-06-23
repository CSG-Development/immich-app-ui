<script lang="ts">
	import InternalSelect from '../../internal/Select.svelte';
	import type { SelectItem, SelectProps } from '../../types.js';

	type T = SelectItem;

	let { value = $bindable(), onChange, ...restProps }: SelectProps<T> = $props();

	const handleChange = (items: T[]) => {
		value = items[0] as T;
		onChange?.(value);
	};
</script>

<InternalSelect onChange={handleChange} {...restProps} />

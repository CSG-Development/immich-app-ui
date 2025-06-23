<script lang="ts">
	import InternalSelect from '../../internal/Select.svelte';
	import type { MultiSelectProps, SelectItem } from '../../types.js';

	type T = SelectItem;

	let { value = $bindable(), onChange, ...restProps }: MultiSelectProps<T> = $props();

	const handleChange = (items: T[]) => {
		value = items;
		onChange?.(value);
	};
</script>

<InternalSelect multiple onChange={handleChange} {...restProps} />

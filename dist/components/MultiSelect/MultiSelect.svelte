<script lang="ts">
	import InternalSelect from '../../internal/Select.svelte';
	import type { MultiSelectProps, SelectItem } from '../../types.js';

	type T = SelectItem;

	let { onChange, values = $bindable([]), ...restProps }: MultiSelectProps<T> = $props();

	const handleChange = (items: T[]) => {
		onChange?.(items);
	};
</script>

<InternalSelect multiple bind:values onChange={handleChange} {...restProps} />

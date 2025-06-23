<script lang="ts">
	import { ChildKey } from '../../constants.js';
	import Child from '../../internal/Child.svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<Child for={ChildKey.Modal} as={ChildKey.ModalFooter}>
	{@render children?.()}
</Child>

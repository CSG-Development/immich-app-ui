<script lang="ts">
	import Scrollable from '../Scrollable/Scrollable.svelte';
	import { ChildKey } from '../../constants.js';
	import Child from '../../internal/Child.svelte';
	import { cleanClass } from '../../utils.js';
	import { type Snippet } from 'svelte';

	type Props = {
		class?: string;
		children: Snippet;
		open?: boolean;
	};

	let { class: className, children, open = $bindable(true) }: Props = $props();
</script>

<Child for={ChildKey.AppShell} as={ChildKey.AppShellSidebar}>
	<Scrollable
		class={cleanClass(
			'bg-light text-dark relative shrink-0 transition-all duration-200',
			open ? 'w-[min(100vw,16rem)]' : 'w-[0px]',
			className,
		)}
	>
		{@render children?.()}
	</Scrollable>
</Child>

<script lang="ts">
	import { cleanClass } from '../../utils.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import Tooltip from '../Tooltip/Tooltip.svelte';

	type Props = {
		class?: string;
		children: Snippet;
		href: string;
	} & HTMLAnchorAttributes;

	const {
		href,
		class: className,
		'aria-label': ariaLabel,
		children,
		...restProps
	}: Props = $props();

	const title = $derived(restProps?.title || ariaLabel || '');
</script>

<Tooltip text={title}>
	<a {href} class={cleanClass('underline', className)} {...restProps}>
		{@render children()}
	</a>
</Tooltip>

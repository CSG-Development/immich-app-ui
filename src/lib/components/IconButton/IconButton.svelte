<script lang="ts">
	import Button from '$lib/internal/Button.svelte';
	import Icon from '$lib/components/Icon/Icon.svelte';
	import type { IconButtonProps } from '$lib/types.js';
	import Tooltip from '../Tooltip/Tooltip.svelte';

	const {
		icon,
		flipped,
		flopped,
		title,
		'aria-label': ariaLabel,
		...buttonProps
	}: IconButtonProps = $props();

	const buttonTitle = $derived(title || ariaLabel);
</script>

<Tooltip text={buttonTitle}>
	<Button icon {...buttonProps} aria-label={ariaLabel}>
		<Icon {icon} {flipped} {flopped} size="60%" aria-hidden />
	</Button>
</Tooltip>

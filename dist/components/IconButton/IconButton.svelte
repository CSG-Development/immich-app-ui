<script lang="ts">
	import Button from '../../internal/Button.svelte';
	import Icon from '../Icon/Icon.svelte';
	import type { IconButtonProps } from '../../types.js';
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

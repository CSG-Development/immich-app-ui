<script lang="ts">
	import { styles } from '../../styles.js';
	import type { LabelProps } from '../../types.js';
	import { cleanClass } from '../../utils.js';

	const { label, size, color, class: className, children, ...restProps }: LabelProps = $props();
</script>

<label class={cleanClass(styles.label({ size, color }), className)} {...restProps}>
	{#if label}{label}{/if}
	{@render children?.()}
</label>

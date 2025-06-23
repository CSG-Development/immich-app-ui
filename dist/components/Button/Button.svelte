<script lang="ts">
	import Button from '../../internal/Button.svelte';
	import type { ButtonProps } from '../../types.js';

	const props: ButtonProps = $props();
</script>

<Button {...props} />

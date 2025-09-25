<script lang="ts">
	import Text from '../Text/Text.svelte';
	import { cleanClass } from '../../index.ts/utils.js';
	import type { Snippet } from 'svelte';
	import { tick } from 'svelte';

	type Props = {
		class?: string;
		text?: string;
		children: Snippet;
	};

	const { class: className, text = '', children }: Props = $props();

	let isVisible = $derived(false);
	let posX = $derived(0);
	let posY = $derived(0);
	const tooltipStyle = $derived(`top:${posY}px; left:${posX}px`);

	const offset = 12;
	let tooltipEl: HTMLElement | null = $derived(null);

	let showTimeout: ReturnType<typeof setTimeout> | null = $derived(null);

	let latestMouseEvent: MouseEvent | null = $derived(null);

	const updateFromMouse = (e: MouseEvent) => {
		if (!tooltipEl) return;

		const tooltipW = tooltipEl.offsetWidth;
		const tooltipH = tooltipEl.offsetHeight;
		const vw = window.innerWidth;
		const vh = window.innerHeight;

		let newX = e.clientX + offset;
		let newY = e.clientY + offset;

		const maxX = vw - tooltipW;
		const maxY = vh - tooltipH - offset;

		if (newX > maxX) {
			newX = e.clientX;
			newY = e.clientY + offset + 10;
		}
		if (newY > maxY) {
			newY = e.clientY - tooltipH - offset;
		}

		posX = Math.max(offset, Math.min(newX, maxX));
		posY = Math.max(offset, Math.min(newY, maxY));
	};

	const show = (e: MouseEvent) => {
		latestMouseEvent = e;

		if (showTimeout) {
			clearTimeout(showTimeout);
		}

		showTimeout = setTimeout(async () => {
			isVisible = true;
			await tick();

			if (latestMouseEvent) {
				updateFromMouse(latestMouseEvent);
				latestMouseEvent = null;
			}

			showTimeout = null;
		}, 500);
	};

	const hide = () => {
		if (showTimeout) {
			clearTimeout(showTimeout);
			showTimeout = null;
			latestMouseEvent = null;
		}
		isVisible = false;
	};

	const onMouseMove = (e: MouseEvent) => {
		latestMouseEvent = e;

		if (isVisible) {
			updateFromMouse(e);
		}
		isVisible = false;
	};
</script>

<div
	role="presentation"
	onmouseenter={show}
	onmouseleave={hide}
	onmousemove={onMouseMove}
	class="inline-flex"
>
	{@render children?.()}
</div>

{#if isVisible && text}
	<div
		bind:this={tooltipEl}
		class="pointer-events-none fixed z-50"
		style={tooltipStyle}
		aria-hidden="true"
	>
		<Text
			class={cleanClass(
				'border-gray-border bg-gray-bg border px-2 py-1 text-sm leading-none text-white/87 dark:bg-white dark:text-black/87',
				className,
			)}
		>
			{text}
		</Text>
	</div>
{/if}

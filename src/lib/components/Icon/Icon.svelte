<script lang="ts">
  import type { IconProps } from '$lib/types.js';
  import { cleanClass } from '$lib/utilities/internal.js';
  import type { HTMLAttributes } from 'svelte/elements';

  const {
    size = '1em',
    viewBox = '0 0 24 24',
    class: className = '',
    flipped = false,
    flopped = false,
    spin = false,
    strokeColor = 'transparent',
    strokeWidth = 2,
    role = 'img',
    title,
    icon,
    color = 'currentColor',
    description,
    progress = undefined,
    ...restProps
  }: IconProps & HTMLAttributes<EventTarget> = $props();

  const radius = 10;
  const circumference = 2 * Math.PI * radius;

  let progressOffset = $state(
    progress !== undefined ? circumference - (Math.min(Math.max(progress, 0), 100) / 100) * circumference : 0,
  );
</script>

<svg
  width={size}
  height={size}
  {viewBox}
  class={cleanClass(className, flipped && '-scale-x-100', flopped && 'rotate-180', spin && 'animate-spin')}
  stroke={strokeColor}
  stroke-width={strokeWidth}
  {role}
  {...restProps}
>
  {#if title}
    <title>{title}</title>
  {/if}
  {#if description}
    <desc>{description}</desc>
  {/if}
  {#if progress !== undefined}
    <circle
      cx="12"
      cy="12"
      r={radius}
      fill="none"
      stroke="primary"
      stroke-width={3}
      stroke-dasharray={circumference}
      stroke-dashoffset={progressOffset}
      stroke-linecap="round"
      transform="rotate(-90 12 12)"
    />
  {/if}
  <path d={typeof icon === 'string' ? icon : icon.path} fill={color} />
</svg>

<style>
  svg {
    transition: transform 0.2s ease;
  }

  circle {
    transition: stroke-dashoffset 0.35s ease;
  }
</style>

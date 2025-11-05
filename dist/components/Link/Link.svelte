<script lang="ts">
  import { isExternalLink, resolveUrl } from '../../utilities/common.js';
  import { cleanClass } from '../../utilities/internal.js';
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes } from 'svelte/elements';
  import Tooltip from '../Tooltip/Tooltip.svelte';

  type Props = {
    class?: string;
    children?: Snippet;
    href: string;
    underline?: boolean;
  } & HTMLAnchorAttributes;

  const { href, class: className, underline = true, 'aria-label': ariaLabel, children, ...restProps }: Props = $props();

  const title = $derived(restProps?.title || ariaLabel || '');
  let resolved = $derived(resolveUrl(href));
  let external = $derived(isExternalLink(resolved));
</script>

<Tooltip text={title}>
  <a
    href={resolved}
    draggable="false"
    class={cleanClass(underline && 'underline', className)}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    {...restProps}
  >
    {#if children}
      {@render children()}
    {:else}
      {href}
    {/if}
  </a>
</Tooltip>

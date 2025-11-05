<script lang="ts">
  import { setFieldContext } from '../../common/context.svelte.js';
  import { withChildrenSnippets } from '../../common/use-child.svelte.js';
  import { ChildKey } from '../../constants.js';
  import type { FieldContext } from '../../types.js';
  import { cleanClass } from '../../utilities/internal.js';
  import { type Snippet } from 'svelte';

  type Props = FieldContext & {
    class?: string;
    children: Snippet;
  };

  const { class: className, children, ...props }: Props = $props();

  const state = $state(props);

  setFieldContext(state);

  const { getChildren: getChildSnippet } = withChildrenSnippets(ChildKey.Field);
  const helperTextChildren = $derived(getChildSnippet(ChildKey.HelperText));
</script>

<div class={cleanClass('w-full', className)}>
  {@render children()}
  {#if helperTextChildren}
    <div class={cleanClass('pt-1', helperTextChildren.class)}>
      {@render helperTextChildren.snippet()}
    </div>
  {/if}
</div>

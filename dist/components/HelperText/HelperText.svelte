<script lang="ts">
  import Text from '../Text/Text.svelte';
  import { ChildKey } from '../../constants.js';
  import Child from '../../internal/Child.svelte';
  import type { TextColor } from '../../types.js';
  import { cleanClass } from '../../utilities/internal.js';
  import type { Snippet } from 'svelte';

  type Props = {
    color?: TextColor;
    class?: string;
    children?: Snippet;
  };

  let { class: className, children, color = 'muted' }: Props = $props();
</script>

<Child for={ChildKey.Field} as={ChildKey.HelperText}>
  <div class={cleanClass(className)}>
    <Text {color} size="small">
      {@render children?.()}
    </Text>
  </div>
</Child>

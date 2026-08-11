<script lang="ts">
  import type { Size } from '../../types.js';
  import { cleanClass } from '../../utilities/internal.js';
  import { tv } from 'tailwind-variants';

  type Props = {
    size?: Size;
    color?: 'primary' | 'pink' | 'red' | 'yellow' | 'blue' | 'green' | 'purple' | 'orange' | 'gray' | 'amber';
    name: string;
    class?: string;
  };

  const { color = 'primary', size = 'medium', name, class: className }: Props = $props();

  const styles = tv({
    base: 'flex items-center overflow-hidden rounded-full align-middle text-white shadow-md',
    variants: {
      color: {
        primary: 'bg-primary-700/12 dark:bg-primary-700/24 text-primary-700',
        pink: 'bg-pink-400/12 dark:bg-pink-400/24 text-pink-400',
        red: 'bg-red-500/12 dark:bg-red-500/24 text-red-500',
        yellow: 'bg-yellow-500/12 dark:bg-yellow-500/24 text-yellow-500',
        blue: 'bg-blue-500/12 dark:bg-blue-500/24 text-blue-500',
        green: 'bg-green-600/12 dark:bg-green-600/24 text-green-600',
        purple: 'bg-purple-600/12 dark:bg-purple-600/24 text-purple-600',
        orange: 'bg-orange-600/12 dark:bg-orange-600/24 text-orange-600',
        gray: 'bg-gray-600/12 dark:bg-gray-400/24 text-gray-600 dark:text-gray-400',
        amber: 'bg-amber-600/12 dark:bg-amber-600/24 text-amber-600',
      },
      size: {
        tiny: 'h-5 w-5 text-xs',
        small: 'h-7 w-7 text-sm',
        medium: 'h-10 w-10 text-base',
        large: 'h-12 w-12 text-lg',
        giant: 'h-16 w-16 text-xl',
      },
    },
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part.at(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const initials = $derived(getInitials(name));
</script>

<figure class={cleanClass(styles({ size, color }), className)}>
  <span class="w-full text-center font-medium select-none">{initials}</span>
</figure>

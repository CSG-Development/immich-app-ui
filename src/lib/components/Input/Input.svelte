<script lang="ts">
  import { getFieldContext } from '../../common/context.svelte.js';
  import Icon from '../Icon/Icon.svelte';
  import Label from '../Label/Label.svelte';
  import Text from '../Text/Text.svelte';
  import type { InputProps } from '../../types.js';
  import { cleanClass, generateId, isIconLike } from '../../utilities/internal.js';
  import { tv } from 'tailwind-variants';

  let {
    ref = $bindable(null),
    containerRef = $bindable(null),
    shape = 'semi-round',
    size = 'medium',
    class: className,
    value = $bindable<string>(),
    leadingIcon,
    trailingIcon,
    trailingText,
    inputSize,
    ...restProps
  }: InputProps = $props();

  const context = getFieldContext();
  const { label, description, readOnly, required, invalid, disabled, ...labelProps } = $derived(context());

  const iconStyles = tv({
    base: 'me-1 ms-2 flex shrink-0 items-center justify-center',
    variants: {
      size: {
        tiny: 'w-6',
        small: 'w-8',
        medium: 'w-10',
        large: 'w-12',
        giant: 'w-14',
      },
    },
  });

  const containerStyles = tv({
    base: 'immich-border bg-primary/12 focus-within:border-primary flex w-full items-center rounded-3xl border text-sm outline-none aria-disabled:cursor-not-allowed aria-disabled:bg-gray-200 aria-disabled:text-gray-800 dark:aria-disabled:bg-gray-500 dark:aria-disabled:text-gray-200',
    variants: {
      shape: {
        rectangle: 'rounded-none',
        'semi-round': '',
        round: 'rounded-full overflow-hidden',
      },
      roundedSize: {
        tiny: 'rounded-3xl',
        small: 'rounded-3xl',
        medium: 'rounded-3xl',
        large: 'rounded-3xl',
        giant: 'rounded-3xl',
      },
      invalid: {
        true: 'border-danger/80!',
        false: '',
      },
    },
  });

  const inputStyles = tv({
    base: 'placeholder:text-gray-placeholder min-w-0 flex-1 bg-transparent outline-none disabled:cursor-not-allowed',
    variants: {
      textSize: {
        tiny: 'text-xs',
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
        giant: 'text-xl',
      },
      leadingPadding: {
        base: 'pl-4',
        icon: 'pl-0',
      },
      trailingPadding: {
        base: 'pr-4',
        icon: 'pr-0',
      },
      size: {
        tiny: 'h-11',
        small: 'h-12',
        medium: 'h-13',
        large: 'h-14',
        giant: 'h-15',
      },
    },
  });

  const trailingTextStyles = tv({
    variants: {
      padding: {
        base: 'px-4',
        icon: 'pl-4',
      },
    },
  });

  const id = generateId();
  const inputId = `input-${id}`;
  const labelId = `label-${id}`;
  const descriptionId = $derived(description ? `description-${id}` : undefined);
</script>

<div class="flex w-full flex-col gap-1" bind:this={containerRef}>
  {#if label}
    <Label id={labelId} for={inputId} {label} {...labelProps} />
  {/if}

  {#if description}
    <Text color="secondary" size="small" id={descriptionId}>{description}</Text>
  {/if}

  <div
    class={cleanClass(
      containerStyles({
        shape,
        roundedSize: shape === 'semi-round' ? size : undefined,
        invalid,
      }),
      className,
    )}
    aria-disabled={disabled}
  >
    {#if leadingIcon}
      <div tabindex="-1" class={iconStyles({ size })}>
        {#if isIconLike(leadingIcon)}
          <Icon size="60%" icon={leadingIcon} />
        {:else}
          {@render leadingIcon()}
        {/if}
      </div>
    {/if}

    <input
      id={inputId}
      aria-labelledby={label && labelId}
      {required}
      aria-required={required}
      {disabled}
      aria-disabled={disabled}
      aria-describedby={descriptionId}
      readonly={readOnly}
      size={inputSize}
      aria-readonly={readOnly}
      class={inputStyles({
        textSize: size,
        leadingPadding: leadingIcon ? 'icon' : 'base',
        trailingPadding: trailingIcon || trailingText ? 'icon' : 'base',
        size,
      })}
      bind:this={ref}
      bind:value
      {...restProps}
    />
    {#if trailingText}
      <Text {size} color="muted" class={trailingTextStyles({ padding: trailingIcon ? 'icon' : 'base' })}
        >{trailingText}</Text
      >
    {/if}

    {#if trailingIcon}
      <div tabindex="-1" class={iconStyles({ size })}>
        {#if isIconLike(trailingIcon)}
          <Icon size="60%" icon={trailingIcon} />
        {:else}
          {@render trailingIcon()}
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  input::-ms-reveal {
    display: none;
  }
</style>

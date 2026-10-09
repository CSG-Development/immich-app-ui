<script lang="ts">
  import { getFieldContext } from '../common/context.svelte.js';
  import IconButton from '../components/IconButton/IconButton.svelte';
  import Label from '../components/Label/Label.svelte';
  import DateCalendar from './DateCalendar.svelte';
  import { zIndex } from '../constants.js';
  import { t } from '../services/translation.svelte.js';
  import { getLocale } from '../state/locale-state.svelte.js';
  import { styleVariants } from '../styles.js';
  import type { Shape, Size } from '../types.js';
  import { cleanClass } from '../utilities/internal.js';
  import type { DateValue } from '@internationalized/date';
  import { mdiCalendar } from '@mdi/js';
  import { DatePicker } from 'bits-ui';
  import { tv } from 'tailwind-variants';

  type Props = {
    onChange?: (date?: DateValue) => void;
    minDate?: DateValue;
    maxDate?: DateValue;
    date?: DateValue;
    class?: string;
    shape?: Shape;
    size?: Size;
  };

  let {
    onChange,
    minDate,
    maxDate,
    date = $bindable<DateValue | undefined>(undefined),
    class: className,
    shape = 'semi-round',
    size: initialSize,
  }: Props = $props();

  const context = getFieldContext();
  const { readOnly, required, invalid, disabled, label, ...labelProps } = $derived(context());
  const size = $derived(initialSize ?? labelProps.size ?? 'small');

  let open = $state(false);
  let prevDate = $state<DateValue | undefined>(undefined);

  const containerStyles = tv({
    base: cleanClass(styleVariants.inputContainerCommon, 'flex w-full items-center'),
    variants: {
      shape: styleVariants.shape,
      roundedSize: styleVariants.inputRoundedSize,
      invalid: {
        true: 'border-danger/80 border',
        false: '',
      },
    },
  });

  const segmentStyles = tv({
    base: 'focus:bg-light-300 focus:text-light-900 data-focused:bg-light-300 data-focused:text-light-900 data-placeholder:text-light-400 dark:focus:bg-light-700 dark:focus:text-light-100 dark:data-focused:bg-light-300 dark:data-focused:text-light-900 rounded px-1 py-0.5 tabular-nums outline-none data-disabled:cursor-not-allowed',
    variants: {
      textSize: styleVariants.textSize,
    },
  });

  const getOpen = () => open;

  const setOpen = (isOpen: boolean) => {
    if (isOpen) {
      prevDate = date;
    }
    open = isOpen;
  };

  const handleClear = () => {
    date = undefined;
    onChange?.(undefined);
    open = false;
  };

  const handleCancel = () => {
    date = prevDate;
    onChange?.(prevDate);
    open = false;
  };

  const handleOk = () => {
    prevDate = date;
    open = false;
  };
</script>

<div class={cleanClass('calendar flex w-full flex-col gap-1', className)}>
  <DatePicker.Root
    onValueChange={onChange}
    minValue={minDate}
    maxValue={maxDate}
    bind:value={date}
    bind:open={getOpen, setOpen}
    closeOnDateSelect={false}
    readonly={readOnly}
    locale={getLocale()}
    {disabled}
  >
    {#if label}
      <DatePicker.Label>
        {#snippet child({ props })}
          <Label
            {...labelProps}
            {...props}
            class={cleanClass(labelProps.class, props.class)}
            requiredIndicator={required === 'indicator'}
            {label}
            {size}
          />
        {/snippet}
      </DatePicker.Label>
    {/if}

    <DatePicker.Input
      class={containerStyles({
        shape,
        roundedSize: shape === 'semi-round' ? size : undefined,
        invalid,
      })}
    >
      {#snippet children({ segments })}
        <div class={cleanClass(styleVariants.inputCommon, 'w-full px-3 py-2 font-medium')}>
          {#each segments as { part, value }, i (`segment-${i}`)}
            <DatePicker.Segment {part} class={segmentStyles({ textSize: size })}>
              {value}
            </DatePicker.Segment>
          {/each}
        </div>
        <DatePicker.Trigger>
          {#snippet child({ props })}
            <IconButton
              {...props}
              class="me-2 shrink-0 rounded-full"
              variant="ghost"
              shape="round"
              color="secondary"
              {size}
              icon={mdiCalendar}
              {disabled}
              aria-label={t('open_calendar')}
            />
          {/snippet}
        </DatePicker.Trigger>
      {/snippet}
    </DatePicker.Input>
    <DatePicker.Portal>
      <DatePicker.Content
        class="rounded-xl outline-none select-none {zIndex.SelectDropdown}"
        sideOffset={10}
      >
        <DateCalendar
          selectedValue={date}
          onClear={handleClear}
          onCancel={handleCancel}
          onOk={handleOk}
        />
      </DatePicker.Content>
    </DatePicker.Portal>
  </DatePicker.Root>
</div>

{#if open}
  <div
    class="fixed inset-0 z-40 bg-black/50 md:hidden"
    role="button"
    tabindex="0"
    onclick={() => (open = false)}
    onkeydown={(e) => e.key === 'Escape' && (open = false)}
  ></div>
{/if}

<style>
  :global(.calendar) {
    font-family: 'Roboto', sans-serif;
  }
</style>

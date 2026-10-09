<script lang="ts">
  import { DatePicker } from 'bits-ui';
  import { mdiCalendarRangeOutline } from '@mdi/js';
  import Icon from '../Icon/Icon.svelte';
  import type { InputProps } from '../../types.js';
  import { getLocalTimeZone, parseDate, today, type DateValue } from '@internationalized/date';
  import { onDestroy, onMount } from 'svelte';
  import DateCalendar from '../../internal/DateCalendar.svelte';

  type Props = {
    label?: string;
  };

  let { label = '', value = $bindable<string>() }: Props & InputProps = $props();

  let open = $state(false);

  const getOpen = () => {
    return open;
  };

  const setOpen = (newOpen: boolean) => {
    open = newOpen;
  };

  let selectedValue = $derived<DateValue | undefined>(value ? parseDate(value) : undefined);

  let prevValue = $state<DateValue | undefined>(value ? parseDate(value) : undefined);

  const getValue = () => {
    return selectedValue;
  };

  const setValue = (newValue: DateValue | undefined) => {
    value = newValue ? newValue.toString() : '';
  };

  const getSegmentValue = (part: string, value: string) => {
    if (part === 'day') {
      return selectedValue ? value.padStart(2, '0') : today(getLocalTimeZone()).day.toLocaleString().padStart(2, '0');
    }
    if (part === 'month') {
      return selectedValue ? value.padStart(2, '0') : today(getLocalTimeZone()).month.toLocaleString().padStart(2, '0');
    }
    return selectedValue ? value : today(getLocalTimeZone()).year;
  };

  const handleClear = () => {
    setValue(undefined);
    setOpen(false);
  };

  const handleCancel = () => {
    setValue(prevValue);
    setOpen(false);
  };

  const handleOk = () => {
    prevValue = selectedValue;
    setOpen(false);
  };

  $effect(() => {
    if (selectedValue) {
      value = selectedValue.toString();
    } else {
      value = '';
    }
  });

  let inputEl = $state<HTMLElement | null>(null);
  let calendarEl = $state<HTMLElement | null>(null);
  let top = $state(0);
  let alignOffset = $state(0);

  const positionCalendar = () => {
    if (!inputEl || !calendarEl) return;

    const elemRect = inputEl.getBoundingClientRect();
    const calendarHeight = calendarEl.offsetHeight;
    const calendarWidth = calendarEl.offsetWidth;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const spaceBelow = viewportHeight - elemRect.bottom;

    if (spaceBelow < calendarHeight) {
      top = spaceBelow - calendarHeight;
    } else {
      top = 0;
    }

    const centeredLeft = elemRect.left + elemRect.width / 2 - calendarWidth / 2;
    const viewportPadding = 10;
    const minLeft = viewportPadding;
    const maxLeft = viewportWidth - calendarWidth - viewportPadding;

    if (centeredLeft < minLeft) {
      alignOffset = minLeft - centeredLeft;
    } else if (centeredLeft > maxLeft) {
      alignOffset = maxLeft - centeredLeft;
    } else {
      alignOffset = 0;
    }
  };

  const repositionOnOpen = () => {
    if (!open || !calendarEl) return;

    // Wait for the calendar to be fully rendered and measured
    let attempts = 0;
    const maxAttempts = 50; // 500ms max

    const checkAndPosition = () => {
      const calendarRect = calendarEl?.getBoundingClientRect();
      const calendarHeight = calendarRect?.height || 0;
      const calendarWidth = calendarRect?.width || 0;

      // If calendar has a width/height > 0, it's been rendered
      if (calendarHeight > 0 && calendarWidth > 0) {
        positionCalendar();
      } else if (attempts < maxAttempts) {
        attempts++;
        requestAnimationFrame(checkAndPosition);
      }
    };

    requestAnimationFrame(checkAndPosition);
  };

  onMount(() => {
    window.addEventListener('resize', positionCalendar);
  });

  onDestroy(() => {
    window.removeEventListener('resize', positionCalendar);
  });

  $effect(() => {
    if (open && calendarEl) {
      repositionOnOpen();
    }
  });
</script>

<DatePicker.Root
  bind:open={getOpen, setOpen}
  bind:value={getValue, setValue}
  closeOnDateSelect={false}
  maxValue={today(getLocalTimeZone())}
  locale="en-GB"
  weekStartsOn={0}
>
  <div class="calendar flex w-full flex-col gap-1.5">
    <DatePicker.Label class="block pb-1 text-base select-none">{label}</DatePicker.Label>
    <DatePicker.Input
      onclick={() => positionCalendar()}
      bind:ref={inputEl}
      class="immich-border bg-primary/12 focus:border-primary flex h-13 w-full items-center rounded-3xl border py-2.5 pr-3 pl-4 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-100 dark:disabled:bg-gray-800 dark:disabled:text-gray-200"
    >
      {#snippet children({ segments })}
        <DatePicker.Trigger class="flex w-full cursor-pointer transition-all disabled:cursor-not-allowed">
          <Icon icon={mdiCalendarRangeOutline} size="24" class="mr-3" />

          {#each segments as { part, value }, i (part + i)}
            <div class="z-5 inline-block cursor-text select-none disabled:cursor-not-allowed">
              {#if part === 'literal'}
                <DatePicker.Segment
                  {part}
                  class="{selectedValue ? '' : 'text-gray-placeholder'} focus-visible:outline-0!"
                >
                  {value}
                </DatePicker.Segment>
              {:else}
                <DatePicker.Segment
                  {part}
                  class="placeholder:text-gray-placeholder rounded-5px aria-[valuetext=Empty]:text-gray-placeholder focus-visible:outline-0!"
                >
                  {getSegmentValue(part, value)}
                </DatePicker.Segment>
              {/if}
            </div>
          {/each}
        </DatePicker.Trigger>
      {/snippet}
    </DatePicker.Input>
    <DatePicker.Content
      bind:ref={calendarEl}
      side="bottom"
      align="center"
      avoidCollisions={true}
      collisionPadding={10}
      sideOffset={top}
      {alignOffset}
      class="z-50"
      preventScroll
    >
      <DateCalendar
        {selectedValue}
        onClear={handleClear}
        onCancel={handleCancel}
        onOk={handleOk}
      />
    </DatePicker.Content>
  </div>
</DatePicker.Root>

{#if open}
  <div
    class="fixed inset-0 z-40 bg-black/50 md:hidden"
    role="button"
    tabindex="0"
    onclick={() => setOpen(false)}
    onkeydown={(e) => e.key === 'Escape' && setOpen(false)}
  ></div>
{/if}

<style>
  :global(.calendar) {
    font-family: 'Roboto', sans-serif;
  }
</style>

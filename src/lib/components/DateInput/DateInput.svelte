<script lang="ts">
  import { DatePicker, type SegmentPart } from 'bits-ui';
  import { mdiCalendarRangeOutline, mdiChevronLeft, mdiChevronRight } from '@mdi/js';
  import Icon from '$lib/components/Icon/Icon.svelte';
  import type { InputProps } from '../../types.js';
  import { getLocalTimeZone, today, type DateValue } from '@internationalized/date';

  type Props = {
    label?: string;
  };

  const { label = 'Label', value = $bindable<string>() }: Props & InputProps = $props();

  let selectedValue = $state<DateValue>(value);

  function getValue() {
    return selectedValue;
  }

  function setValue(newValue: DateValue) {
    selectedValue = newValue;
  }

  const getSegmentValue = (part: string, value: string) => {
    if (part === 'day') {
      return selectedValue ? value.padStart(2, '0') : today(getLocalTimeZone()).day.toLocaleString().padStart(2, '0');
    }
    if (part === 'month') {
      return selectedValue ? value.padStart(2, '0') : today(getLocalTimeZone()).month.toLocaleString().padStart(2, '0');
    }
    return selectedValue ? value : today(getLocalTimeZone()).year;
  };

  const swapSegments = (
    segments: {
      part: SegmentPart;
      value: string;
    }[],
    index1: number,
    index2: number,
  ) => {
    [segments[index1], segments[index2]] = [segments[index2], segments[index1]];
  };
</script>

<DatePicker.Root bind:value={getValue, setValue} closeOnDateSelect={false} maxValue={today(getLocalTimeZone())}>
  <div class="flex w-full flex-col gap-1.5">
    <DatePicker.Label class="block pb-1 text-base select-none">{label}</DatePicker.Label>
    <DatePicker.Input
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
    <DatePicker.Content sideOffset={6} class="z-50">
      <DatePicker.Calendar class="shadow-popover bg-bg rounded-[28px] p-3 select-none md:w-123">
        {#snippet children({ months, weekdays })}
          <DatePicker.Header class="flex items-center justify-between">
            <DatePicker.Heading>
              {#snippet children({ headingValue })}
                <span>{headingValue.split(' ')[0]}</span><DatePicker.YearSelect class="focus-visible:outline-0!" />
              {/snippet}
            </DatePicker.Heading>
            <div>
              <DatePicker.PrevButton
                class="hover:bg-primary/12 inline-flex size-10 items-center justify-center rounded-full transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
              >
                <Icon icon={mdiChevronLeft} size="24" />
              </DatePicker.PrevButton>
              <DatePicker.NextButton
                class="hover:bg-primary/12 inline-flex size-10 items-center justify-center rounded-full transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
              >
                <Icon icon={mdiChevronRight} size="24" />
              </DatePicker.NextButton>
            </div>
          </DatePicker.Header>
          <div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            {#each months as month (month.value)}
              <DatePicker.Grid class="w-full border-collapse space-y-1 select-none">
                <DatePicker.GridHead>
                  <DatePicker.GridRow class="flex w-full">
                    {#each weekdays as day, index (day + index)}
                      <DatePicker.HeadCell class="flex h-12 w-full items-center justify-center rounded-md font-normal!">
                        <div class="flex size-10 items-center justify-center">{day.slice(0, 2)}</div>
                      </DatePicker.HeadCell>
                    {/each}
                  </DatePicker.GridRow>
                </DatePicker.GridHead>
                <DatePicker.GridBody>
                  {#each month.weeks as weekDates (weekDates)}
                    <DatePicker.GridRow class="flex w-full">
                      {#each weekDates as date (date)}
                        <DatePicker.Cell
                          {date}
                          month={month.value}
                          class="relative flex h-12 w-full items-center justify-center p-0! text-center"
                        >
                          <DatePicker.Day
                            class="data-selected:border-primary hover:bg-primary/12 data-selected:text-primary data-unavailable:text-muted-foreground group relative inline-flex size-10  cursor-pointer items-center justify-center rounded-full bg-transparent p-0 font-normal whitespace-nowrap transition-all data-disabled:pointer-events-none data-disabled:opacity-50 data-outside-month:hidden data-selected:border data-unavailable:line-through"
                          >
                            <div
                              class="group-data-today:text-primary flex h-full w-full items-center justify-center rounded-full"
                            >
                              {date.day}
                            </div>
                          </DatePicker.Day>
                        </DatePicker.Cell>
                      {/each}
                    </DatePicker.GridRow>
                  {/each}
                </DatePicker.GridBody>
              </DatePicker.Grid>
            {/each}
          </div>
        {/snippet}
      </DatePicker.Calendar>
    </DatePicker.Content>
  </div>
</DatePicker.Root>

<style>
</style>

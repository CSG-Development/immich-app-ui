<script lang="ts">
  import { DatePicker } from 'bits-ui';
  import { mdiCalendarRangeOutline, mdiChevronLeft, mdiChevronRight } from '@mdi/js';
  import Icon from '../Icon/Icon.svelte';
  import type { InputProps } from '../../types.js';
  import { getLocalTimeZone, parseDate, today, type DateValue } from '@internationalized/date';
  import Button from '../../internal/Button.svelte';
  import { theme } from '../../services/theme.svelte.js';
  import { Theme } from '../../types.js';

  type Props = {
    label?: string;
  };

  let { label = 'Label', value = $bindable<string>() }: Props & InputProps = $props();

  let open = $state(false);

  function getOpen() {
    return open;
  }

  function setOpen(newOpen: boolean) {
    open = newOpen;
  }

  let selectedValue = $derived<DateValue | undefined>(value ? parseDate(value) : undefined);

  let prevValue = $state<DateValue | undefined>(value ? parseDate(value) : undefined);

  function getValue() {
    return selectedValue;
  }

  // update parent when picker changes
  function setValue(newValue: DateValue | undefined) {
    value = newValue ? newValue.toString() : undefined;
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

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
</script>

<DatePicker.Root
  bind:open={getOpen, setOpen}
  bind:value={getValue, setValue}
  closeOnDateSelect={false}
  maxValue={today(getLocalTimeZone())}
  locale="en-GB"
  weekStartsOn={0}
>
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
      <DatePicker.Calendar class="shadow-popover bg-bg min-w-78 rounded-[28px] select-none md:w-123">
        {#snippet children({ months, weekdays })}
          <div class="border-gray-border flex w-full flex-col gap-4 border-b px-6 pt-4 pb-3">
            <span class="font-bold">Select date</span>
            <span class="text-[34px]">
              {selectedValue
                ? `${monthNames[selectedValue.month - 1]} ${selectedValue.day.toLocaleString()}`
                : `${monthNames[today(getLocalTimeZone()).month - 1]} ${today(getLocalTimeZone()).day.toLocaleString()}`}
            </span>
          </div>
          <DatePicker.Header class="flex items-center justify-between py-1 pr-3 pl-6">
            <DatePicker.Heading>
              {#snippet children({ headingValue })}
                <span>{headingValue.split(' ')[0]}</span><DatePicker.YearSelect
                  class="pl-1 focus-visible:outline-0!"
                  style={`
                    appearance: none; 
                    -webkit-appearance: none; 
                    -moz-appearance: none;   
                    width: 65px;
                    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>menu-down</title><path ${theme.value === Theme.Dark ? 'fill="white"' : ''} d="M7,10L12,15L17,10H7Z" /></svg>');
                    background-repeat: no-repeat;
                    background-position: right;
                    background-size: 18px;
                    cursor: pointer;
                  `}
                >
                  {#snippet children({ selectedYearItem, yearItems })}
                    {#each yearItems as { value, label }, i (value)}
                      <option {value} selected={selectedYearItem?.value === value} class="bg-light text-dark">
                        {label}
                      </option>
                    {/each}
                  {/snippet}
                </DatePicker.YearSelect>
              {/snippet}
            </DatePicker.Heading>
            <div>
              <DatePicker.PrevButton
                class="hover:bg-primary/12 inline-flex size-12 items-center justify-center rounded-full transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
              >
                <Icon icon={mdiChevronLeft} size="24" />
              </DatePicker.PrevButton>
              <DatePicker.NextButton
                class="hover:bg-primary/12 inline-flex size-12 items-center justify-center rounded-full transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
              >
                <Icon icon={mdiChevronRight} size="24" />
              </DatePicker.NextButton>
            </div>
          </DatePicker.Header>
          <div class="flex flex-col space-y-4 px-3 py-0 sm:flex-row sm:space-y-0 sm:space-x-4">
            {#each months as month (month.value)}
              <DatePicker.Grid class="w-full border-collapse space-y-1 select-none">
                <DatePicker.GridHead>
                  <DatePicker.GridRow class="flex w-full">
                    {#each weekdays as day, index (day + index)}
                      <DatePicker.HeadCell class="flex h-12 w-full items-center justify-center rounded-md font-normal!">
                        <div class="flex size-10 items-center justify-center">
                          {day.slice(0, 2)}
                        </div>
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
                            class="data-selected:bg-primary hover:bg-primary/12 data-unavailable:text-muted-foreground group relative inline-flex size-10 cursor-pointer items-center justify-center rounded-full bg-transparent p-0 font-normal whitespace-nowrap transition-all data-disabled:pointer-events-none data-disabled:opacity-50 data-outside-month:hidden data-selected:text-white! data-unavailable:line-through dark:data-selected:text-black!"
                          >
                            <div
                              class="group-data-today:border-primary group-data-today:text-primary flex h-full w-full items-center justify-center rounded-full group-data-selected:text-white! group-data-today:border dark:group-data-selected:text-black!"
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
          <div class="flex justify-between px-3 pt-2 pb-3">
            <Button variant="ghost" shape="round" size="standard" onclick={handleClear}>Clear</Button>
            <div class="flex">
              <Button variant="ghost" shape="round" size="standard" onclick={handleCancel}>Cancel</Button>
              <Button variant="ghost" shape="round" size="standard" onclick={handleOk}>OK</Button>
            </div>
          </div>
        {/snippet}
      </DatePicker.Calendar>
    </DatePicker.Content>
  </div>
</DatePicker.Root>

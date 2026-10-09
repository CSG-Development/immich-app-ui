<script lang="ts">
  import Icon from '../components/Icon/Icon.svelte';
  import Button from './Button.svelte';
  import { themeManager } from '../services/theme-manager.svelte.js';
  import { Theme } from '../types.js';
  import { getLocalTimeZone, today, type DateValue } from '@internationalized/date';
  import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
  import { DatePicker } from 'bits-ui';

  type Props = {
    selectedValue?: DateValue;
    onClear?: () => void;
    onCancel?: () => void;
    onOk?: () => void;
    class?: string;
    style?: string;
    id?: string;
  };

  let {
    selectedValue,
    onClear,
    onCancel,
    onOk,
    class: className = '',
    style,
    id,
  }: Props = $props();

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  let gridElement = $state<HTMLElement | null>(null);

  $effect(() => {
    if (!gridElement) return;

    gridElement.scrollTop = 0;

    const preventScroll = () => {
      if (gridElement && gridElement.scrollTop !== 0) {
        gridElement.scrollTop = 0;
      }
    };

    gridElement.addEventListener('scroll', preventScroll);

    const timeoutId = setTimeout(() => {
      if (gridElement) {
        gridElement.scrollTop = 0;
      }
      gridElement?.removeEventListener('scroll', preventScroll);
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      gridElement?.removeEventListener('scroll', preventScroll);
    };
  });
</script>

<DatePicker.Calendar
  {id}
  class="immich-border bg-bg min-w-78 rounded-[28px] border shadow-lg select-none md:w-123 {className}"
  style={style ?? 'max-width: calc(100vw - 20px);'}
>
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
                    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>menu-down</title><path ${themeManager.value === Theme.Dark ? 'fill="white"' : ''} d="M7,10L12,15L17,10H7Z" /></svg>');
                    background-repeat: no-repeat;
                    background-position: right;
                    background-size: 18px;
                    cursor: pointer;
                  `}
          >
            {#snippet children({ selectedYearItem, yearItems })}
              {#each yearItems as { value, label }, i (value + i)}
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
    <div
      bind:this={gridElement}
      class="calendar-grid flex max-h-[40vh] flex-col space-y-4 overflow-y-auto px-3 py-0 sm:flex-row sm:space-y-0 sm:space-x-4"
    >
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
                        class="group-data-today:border-primary group-data-today:text-primary flex h-full w-full items-center justify-center rounded-full border border-transparent group-data-selected:text-white! dark:group-data-selected:text-black!"
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
      <Button variant="ghost" shape="round" size="standard" onclick={() => onClear?.()}>Clear</Button>
      <div class="flex">
        <Button variant="ghost" shape="round" size="standard" onclick={() => onCancel?.()}>Cancel</Button>
        <Button variant="ghost" shape="round" size="standard" onclick={() => onOk?.()}>OK</Button>
      </div>
    </div>
  {/snippet}
</DatePicker.Calendar>

<style>
  .calendar-grid {
    scroll-behavior: auto;
  }
</style>

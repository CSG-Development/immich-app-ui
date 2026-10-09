import { type DateValue } from '@internationalized/date';
type Props = {
    selectedValue?: DateValue;
    onClear?: () => void;
    onCancel?: () => void;
    onOk?: () => void;
    class?: string;
    style?: string;
    id?: string;
};
declare const DateCalendar: import("svelte").Component<Props, {}, "">;
type DateCalendar = ReturnType<typeof DateCalendar>;
export default DateCalendar;

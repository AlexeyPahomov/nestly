import * as React from 'react';
import { ru } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

import { formLabelClassName } from '@/shared/config/formUi';
import {
  monthInputToPeriodMonth,
  monthValueFromDate,
  parseMonthStringToDate,
} from '@/shared/lib/date';
import { formatMonthLabel } from '@/shared/lib/format';
import { cn } from '@/shared/lib/utils';

import { buttonVariants } from '../button/variants'
import { Calendar } from '../calendar/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../popover/Popover';

type MonthPickerProps = {
  id?: string;
  label?: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  containerClassName?: string;
};

export function MonthPicker({
  id: idProp,
  label,
  value,
  onChange,
  disabled,
  containerClassName,
}: MonthPickerProps) {
  const generatedId = React.useId();
  const inputId =
    idProp ?? (label != null && label !== '' ? generatedId : undefined);
  const [open, setOpen] = React.useState(false);

  const selected = parseMonthStringToDate(value);
  const display =
    value && selected
      ? formatMonthLabel(monthInputToPeriodMonth(value))
      : 'Выберите месяц';

  const control = (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          id={inputId}
          disabled={disabled}
          className={cn(
            buttonVariants({ variant: 'outline', size: 'default' }),
            'max-w-xs justify-start gap-2 text-left font-normal',
          )}
        >
          <CalendarIcon className="size-4 shrink-0 opacity-60" />
          <span className="truncate">{display}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          locale={ru}
          mode="single"
          captionLayout="dropdown"
          defaultMonth={selected ?? new Date()}
          selected={selected}
          onSelect={(date) => {
            if (date) {
              onChange(monthValueFromDate(date));
              setOpen(false);
            }
          }}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );

  if (label == null || label === '') {
    return control;
  }

  return (
    <div data-slot="month-picker-field" className={cn(containerClassName)}>
      <label htmlFor={inputId} className={formLabelClassName}>
        {label}
      </label>
      {control}
    </div>
  );
}

import * as React from 'react';

import { formLabelClassName } from '@/shared/config/formUi';
import { cn } from '@/shared/lib/utils';

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from '../select/SelectPrimitives';

import { buildPeriodMonthSelectOptions } from './lib/monthSelectOptions';
import { monthPickerTriggerClassName, monthPickerSelectMenuClassName } from './lib/monthPickerLayout';

type MonthPickerProps = {
  id?: string;
  label?: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  /** Без года в подписи выбранного месяца и пунктов списка. */
  omitYear?: boolean;
  containerClassName?: string;
  triggerClassName?: string;
  /** Иконка слева от значения (например, календарь в шапке страницы). */
  leadingIcon?: React.ReactNode;
};

export function MonthPicker({
  id: idProp,
  label,
  value,
  onChange,
  disabled,
  omitYear = false,
  containerClassName,
  triggerClassName,
  leadingIcon,
}: MonthPickerProps) {
  const generatedId = React.useId();
  const inputId =
    idProp ?? (label != null && label !== '' ? generatedId : undefined);

  const options = React.useMemo(
    () => buildPeriodMonthSelectOptions(value, 24, { omitYear }),
    [omitYear, value],
  );

  const [open, setOpen] = React.useState(false);

  const control = (
    <SelectRoot
      value={value}
      onValueChange={onChange}
      disabled={disabled}
      open={open}
      onOpenChange={setOpen}
    >
      <SelectTrigger
        id={inputId}
        showIcon={false}
        className={cn(
          'max-w-xs min-w-0',
          monthPickerTriggerClassName,
          leadingIcon && 'gap-1.5',
          triggerClassName,
        )}
      >
        {leadingIcon}
        <SelectValue placeholder="Выберите месяц" />
      </SelectTrigger>
      <SelectContent
        position="item-aligned"
        hideScrollButtons
        centerSelectedValue={open ? value : undefined}
        className={monthPickerSelectMenuClassName}
        viewportClassName={monthPickerSelectMenuClassName}
      >
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="min-h-9 py-0"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );

  if (label == null || label === '') {
    if (!containerClassName) {
      return control;
    }

    return (
      <div data-slot="month-picker" className={containerClassName}>
        {control}
      </div>
    );
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

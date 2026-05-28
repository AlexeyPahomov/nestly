import { Button, DateRangePicker, Input, MoneyInput } from '@/shared/ui'
import { bindMoneyAmountField } from '@/shared/lib/moneyInput'

import { createPlannedExpenseInputChangeHandler } from '../lib/plannedExpenseFormFieldHandlers'
import { PlannedExpenseIconPicker } from './PlannedExpenseIconPicker'
import type { CreatePlannedExpenseFormValues } from '../model/types'

export type CreatePlannedExpenseFieldsProps = {
  values: CreatePlannedExpenseFormValues
  onChange: (name: keyof CreatePlannedExpenseFormValues, value: string) => void
  patchValues: (patch: Partial<CreatePlannedExpenseFormValues>) => void
  onSubmit: () => void
  isPending: boolean
  isSubmitDisabled?: boolean
  submitLabel?: string
}

export function CreatePlannedExpenseFields({
  values,
  onChange,
  patchValues,
  onSubmit,
  isPending,
  isSubmitDisabled = false,
  submitLabel = 'Добавить план',
}: CreatePlannedExpenseFieldsProps) {
  const onFieldChange = createPlannedExpenseInputChangeHandler(onChange)

  return (
    <>
      <PlannedExpenseIconPicker
        iconName={values.icon_name}
        iconColor={values.icon_color}
        disabled={isPending}
        onIconChange={(icon_name) => onChange('icon_name', icon_name)}
        onColorChange={(icon_color) => onChange('icon_color', icon_color)}
      />
      <Input
        name="title"
        placeholder="Название (поездка, страховка…)"
        value={values.title}
        onChange={onFieldChange}
      />
      <textarea
        name="description"
        placeholder="Описание (необязательно)"
        className="min-h-14 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:min-h-8 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 resize-none"
        value={values.description}
        rows={2}
        disabled={isPending}
        onChange={onFieldChange}
      />
      <MoneyInput
        name="amount"
        placeholder="Сумма"
        {...bindMoneyAmountField(values.amount, (amount) =>
          onChange('amount', amount),
        )}
      />
      <DateRangePicker
        emptyLabel="Когда?"
        from={values.planned_date}
        to={values.planned_date_end}
        onChange={(from, to) =>
          patchValues({ planned_date: from, planned_date_end: to })
        }
        disabled={isPending}
      />
      <Button
        type="button"
        variant="default"
        size="lg"
        className="w-full"
        isLoading={isPending}
        disabled={isSubmitDisabled}
        onClick={() => void onSubmit()}
      >
        {submitLabel}
      </Button>
    </>
  )
}

import { Button, DatePicker, Input, MoneyInput } from '@/shared/ui'
import { bindMoneyAmountField } from '@/shared/lib/moneyInput'

import { createPlannedExpenseInputChangeHandler } from '../lib/plannedExpenseFormFieldHandlers'
import { PlannedExpenseIconPicker } from './PlannedExpenseIconPicker'
import type { CreatePlannedExpenseFormValues } from '../model/types'

export type CreatePlannedExpenseFieldsProps = {
  values: CreatePlannedExpenseFormValues
  onChange: (name: keyof CreatePlannedExpenseFormValues, value: string) => void
  onSubmit: () => void
  isPending: boolean
  submitLabel?: string
}

export function CreatePlannedExpenseFields({
  values,
  onChange,
  onSubmit,
  isPending,
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
      <Input
        name="description"
        placeholder="Описание (необязательно)"
        value={values.description}
        onChange={onFieldChange}
      />
      <MoneyInput
        name="amount"
        placeholder="Сумма"
        {...bindMoneyAmountField(values.amount, (amount) =>
          onChange('amount', amount),
        )}
      />
      <DatePicker
        label="Дата"
        value={values.planned_date}
        onChange={(value) => onChange('planned_date', value)}
      />
      <Button
        type="button"
        variant="default"
        size="lg"
        className="w-full"
        isLoading={isPending}
        disabled={isPending}
        onClick={() => void onSubmit()}
      >
        {submitLabel}
      </Button>
    </>
  )
}

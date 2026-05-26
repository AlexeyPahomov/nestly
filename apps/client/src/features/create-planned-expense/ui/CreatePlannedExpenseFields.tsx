import { Button, DatePicker, Input } from '@/shared/ui'

import { createPlannedExpenseInputChangeHandler } from '../lib/plannedExpenseFormFieldHandlers'
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
      <Input
        name="amount"
        type="number"
        min={0}
        step="0.01"
        placeholder="Сумма"
        value={values.amount}
        onChange={onFieldChange}
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

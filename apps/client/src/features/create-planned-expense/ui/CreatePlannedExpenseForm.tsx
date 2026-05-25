import type { ChangeEvent } from 'react'

import { Button, Card, CardContent, CardHeader, CardTitle, DatePicker, Input } from '@/shared/ui'

import { useCreatePlannedExpenseForm } from '../model/useCreatePlannedExpenseForm'

export type CreatePlannedExpenseFormProps = {
  anchorPeriodMonth: string
}

export function CreatePlannedExpenseForm({
  anchorPeriodMonth,
}: CreatePlannedExpenseFormProps) {
  const form = useCreatePlannedExpenseForm(anchorPeriodMonth)

  const onFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (!name) return
    form.handleChange(name as 'title' | 'description' | 'amount', value)
  }

  return (
    <Card className="border-zinc-200/80 shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Новый план</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Input
          name="title"
          placeholder="Название (поездка, страховка…)"
          value={form.values.title}
          onChange={onFieldChange}
        />
        <Input
          name="description"
          placeholder="Описание (необязательно)"
          value={form.values.description}
          onChange={onFieldChange}
        />
        <Input
          name="amount"
          type="number"
          min={0}
          step="0.01"
          placeholder="Сумма"
          value={form.values.amount}
          onChange={onFieldChange}
        />
        <DatePicker
          label="Дата"
          value={form.values.planned_date}
          onChange={(value) => form.handleChange('planned_date', value)}
        />
        <Button
          type="button"
          disabled={form.isPending}
          onClick={() => void form.submit()}
        >
          Добавить план
        </Button>
      </CardContent>
    </Card>
  )
}

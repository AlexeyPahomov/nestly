import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui'

import { useCreatePlannedExpenseForm } from '../model/useCreatePlannedExpenseForm'

import { CreatePlannedExpenseFields } from './CreatePlannedExpenseFields'

export type CreatePlannedExpenseFormProps = {
  anchorPeriodMonth: string
}

export function CreatePlannedExpenseForm({
  anchorPeriodMonth,
}: CreatePlannedExpenseFormProps) {
  const form = useCreatePlannedExpenseForm(anchorPeriodMonth)

  return (
    <Card className="border-zinc-200/80 shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Новый план</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <CreatePlannedExpenseFields
          values={form.values}
          onChange={form.handleChange}
          patchValues={form.patchValues}
          onSubmit={form.submit}
          isPending={form.isPending}
        />
      </CardContent>
    </Card>
  )
}

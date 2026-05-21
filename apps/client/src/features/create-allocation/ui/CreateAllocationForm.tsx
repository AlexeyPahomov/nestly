import type { Category } from '@/entities/category/model/types'
import { formatAmount } from '@/shared/lib/format'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Select,
} from '@/shared/ui'

import { useCreateAllocationForm } from '../model/useCreateAllocationForm'

type CreateAllocationFormProps = {
  incomeId: string | null
  categories: Category[]
  remainingBalance: number
}

export function CreateAllocationForm({
  incomeId,
  categories,
  remainingBalance,
}: CreateAllocationFormProps) {
  const form = useCreateAllocationForm({ incomeId, remainingBalance })

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  const noCategories = categories.length === 0
  const controlsDisabled = form.disabled || form.submitting

  return (
    <Card>
      <CardHeader>
        <CardTitle>Новое распределение</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            void form.submit()
          }}
        >
          <Select
            id="allocation-category"
            label="Категория"
            value={form.values.category_id}
            onValueChange={(category_id) => {
              form.patchValues({ category_id })
            }}
            options={categoryOptions}
            placeholder={
              noCategories
                ? 'Нет категорий расходов или накоплений'
                : 'Выберите категорию'
            }
            disabled={controlsDisabled || noCategories}
          />

          <Input
            id="allocation-amount"
            label="Сумма"
            name="amount"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder="0"
            value={form.values.amount}
            onChange={form.handleChange}
            disabled={controlsDisabled}
          />

          <p className="text-sm text-muted-foreground">
            Доступно: {formatAmount(remainingBalance)}
          </p>

          {form.validationError ? (
            <p className="text-sm text-red-600">{form.validationError}</p>
          ) : null}
          {form.serverError ? (
            <p className="text-sm text-red-600">{form.serverError}</p>
          ) : null}

          <Button
            type="submit"
            isLoading={form.submitting}
            size="lg"
            className="min-w-40"
            disabled={controlsDisabled || noCategories}
          >
            Распределить
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

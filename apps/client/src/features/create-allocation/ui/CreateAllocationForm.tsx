import type { Category } from '@/entities/category/model/types'
import { formLabelClassName } from '@/shared/config/formUi'
import { formatMoneyWithRub } from '@/shared/lib/format'
import { bindMoneyAmountField } from '@/shared/lib/moneyInput'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  MoneyInput,
} from '@/shared/ui'

import { useCreateAllocationForm } from '../model/useCreateAllocationForm'
import { AllocationCategorySelect } from './AllocationCategorySelect'

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
          <div className="space-y-2">
            <label htmlFor="allocation-category" className={formLabelClassName}>
              Категория
            </label>
            <AllocationCategorySelect
              id="allocation-category"
              value={form.values.category_id}
              onValueChange={(category_id) => {
                form.patchValues({ category_id })
              }}
              categories={categories}
              placeholder={
                noCategories
                  ? 'Нет категорий расходов или накоплений'
                  : 'Выберите категорию'
              }
              disabled={controlsDisabled || noCategories}
            />
          </div>

          <MoneyInput
            id="allocation-amount"
            label="Сумма"
            name="amount"
            placeholder="0"
            disabled={controlsDisabled}
            {...bindMoneyAmountField(form.values.amount, (amount) =>
              form.patchValues({ amount }),
            )}
          />

          <p className="text-sm text-muted-foreground">
            Доступно: {formatMoneyWithRub(remainingBalance)}
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

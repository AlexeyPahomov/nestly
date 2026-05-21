import type { ChangeEvent } from 'react'

import type { Allocation } from '@/entities/allocation/model/types'
import type { Category } from '@/entities/category/model/types'
import type { Income } from '@/entities/income/model/types'
import { cn } from '@/shared/lib/utils'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DatePicker,
  Input,
  Select,
} from '@/shared/ui'

import { buildSavingsTransferHint } from '../lib/savingsTransferHint'
import type { CategoryBudgetSnapshot } from '../model/budget'
import type { CreateExpenseFormValues } from '../model/types'
import { useCreateExpenseForm } from '../model/useCreateExpenseForm'
import { useSyncSelectedCategory } from '../model/useSyncSelectedCategory'

import { CreateExpenseFormActions } from './CreateExpenseFormActions'

type CreateExpenseFormProps = {
  categories: Category[]
  budgets: CategoryBudgetSnapshot[]
  incomes: Income[]
  allocations: Allocation[]
  selectedCategoryId?: string
  onStressCategoryChange?: (categoryId: string | null) => void
  className?: string
}

function fieldChangeHandler(
  handleChange: (name: keyof CreateExpenseFormValues, value: string) => void,
) {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (!name) return
    handleChange(name as keyof CreateExpenseFormValues, value)
  }
}

export function CreateExpenseForm({
  categories,
  budgets,
  incomes,
  allocations,
  selectedCategoryId,
  onStressCategoryChange,
  className,
}: CreateExpenseFormProps) {
  const form = useCreateExpenseForm({
    budgets,
    incomes,
    allocations,
    onStressCategoryChange,
  })

  useSyncSelectedCategory(
    selectedCategoryId,
    form.values.category_id,
    (categoryId) => form.handleChange('category_id', categoryId),
  )

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  const noCategories = categories.length === 0
  const onFieldChange = fieldChangeHandler(form.handleChange)
  const showOverBudgetWarning = form.budgetPreview?.isOverBudget === true
  const savingsTransfer = buildSavingsTransferHint(budgets, form.budgetPreview)

  return (
    <Card className={cn('h-fit w-full max-h-full', className)}>
      <CardHeader className="shrink-0">
        <CardTitle>Новый расход</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            void form.handleSubmit()
          }}
        >
          <Select
            id="expense-category"
            label="Категория"
            value={form.values.category_id}
            onValueChange={(category_id) => {
              form.handleChange('category_id', category_id)
            }}
            options={categoryOptions}
            placeholder={
              noCategories ? 'Нет категорий расходов' : 'Выберите категорию'
            }
            disabled={form.isBusy || noCategories}
          />

          <Input
            id="expense-amount"
            label="Сумма"
            name="amount"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            autoFocus
            placeholder="0"
            value={form.values.amount}
            onChange={onFieldChange}
            disabled={form.isBusy}
          />

          <Input
            id="expense-description"
            label="Описание (необязательно)"
            name="description"
            type="text"
            autoComplete="off"
            placeholder="Продукты, такси…"
            value={form.values.description}
            onChange={onFieldChange}
            disabled={form.isBusy}
          />

          <DatePicker
            id="expense-date"
            label="Дата"
            value={form.values.date}
            onChange={(date) => {
              form.handleChange('date', date)
            }}
            disabled={form.isBusy}
          />

          {form.validationError ? (
            <p className="text-sm text-red-600">{form.validationError}</p>
          ) : null}
          {form.serverError ? (
            <p className="text-sm text-red-600">{form.serverError}</p>
          ) : null}

          <CreateExpenseFormActions
            showOverBudgetWarning={showOverBudgetWarning}
            budgetPreview={form.budgetPreview}
            savingsTransfer={savingsTransfer}
            noCategories={noCategories}
            isBusy={form.isBusy}
            isRecording={form.isRecording}
            isTopUpPending={form.isTopUpPending}
            topUpError={form.topUpError}
            canTopUp={form.canQuickTopUp}
            onRecordExpense={() => void form.handleSubmit()}
            onQuickTopUp={(amount) => void form.handleQuickTopUp(amount)}
          />
        </form>
      </CardContent>
    </Card>
  )
}

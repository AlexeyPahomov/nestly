import { useEffect, type ChangeEvent } from 'react'

import type { Category } from '@/entities/category/model/types'
import { getErrorMessage } from '@/shared/lib/errors'
import { cn } from '@/shared/lib/utils'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DatePicker,
  Input,
  Select,
} from '@/shared/ui'

import type { CreateExpenseFormValues } from '../model/types'
import { useCreateExpenseForm } from '../model/useCreateExpenseForm'

type CreateExpenseFormProps = {
  categories: Category[]
  selectedCategoryId?: string
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
  selectedCategoryId,
  className,
}: CreateExpenseFormProps) {
  const form = useCreateExpenseForm()

  useEffect(() => {
    if (selectedCategoryId) {
      form.handleChange('category_id', selectedCategoryId)
    }
  }, [selectedCategoryId, form.handleChange])

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  const noCategories = categories.length === 0
  const onFieldChange = fieldChangeHandler(form.handleChange)

  const serverError = form.mutation.isError
    ? getErrorMessage(form.mutation.error, 'Не удалось сохранить расход')
    : null

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
            disabled={form.mutation.isPending || noCategories}
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
            disabled={form.mutation.isPending}
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
            disabled={form.mutation.isPending}
          />

          <DatePicker
            id="expense-date"
            label="Дата"
            value={form.values.date}
            onChange={(date) => {
              form.handleChange('date', date)
            }}
            disabled={form.mutation.isPending}
          />

          {form.validationError ? (
            <p className="text-sm text-red-600">{form.validationError}</p>
          ) : null}
          {serverError ? (
            <p className="text-sm text-red-600">{serverError}</p>
          ) : null}

          <Button
            type="submit"
            isLoading={form.mutation.isPending}
            size="lg"
            className="min-w-40"
            disabled={form.mutation.isPending || noCategories}
          >
            Добавить расход
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

import { CATEGORY_TYPES, type CategoryType } from '@nestly/shared'

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Select,
} from '@/shared/ui'

import { useCreateCategoryForm } from '../model/useCreateCategoryForm'

const TYPE_LABELS: Record<CategoryType, string> = {
  income: 'Доход',
  expense: 'Расход',
  savings: 'Накопления',
}

const typeOptions = CATEGORY_TYPES.map((value) => ({
  value,
  label: TYPE_LABELS[value],
}))

export function CreateCategoryForm() {
  const form = useCreateCategoryForm()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Новая категория</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            void form.submit()
          }}
        >
          <Input
            id="category-name"
            label="Название"
            name="name"
            type="text"
            autoComplete="off"
            placeholder="Например, Продукты"
            value={form.values.name}
            onChange={form.handleChange}
          />

          <Select
            id="category-type"
            label="Тип"
            value={form.values.type}
            onValueChange={(type) => {
              form.patchValues({ type })
            }}
            options={typeOptions}
            placeholder="Выберите тип"
            disabled={form.submitting}
          />

          {form.validationError ? (
            <p className="text-sm text-red-600">{form.validationError}</p>
          ) : null}
          {form.serverError ? (
            <p className="text-sm text-red-600">{form.serverError}</p>
          ) : null}

          <Button type="submit" isLoading={form.submitting} size="lg" className="min-w-40">
            Добавить категорию
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

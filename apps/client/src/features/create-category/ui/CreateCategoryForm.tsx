import { CATEGORY_TYPES, CATEGORY_TYPE_LABELS } from '@coffer/shared'

import type { Category } from '@/entities/category/model/types'
import { cn } from '@/shared/lib/utils'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Select,
} from '@/shared/ui'

import { categoryFormDialogTitle } from '../lib/categoryFormDialogCopy'
import {
  categoryFormActionsClassName,
  categoryFormCancelButtonClassName,
  categoryFormPrimaryButtonClassName,
} from '../lib/categoryFormDialogLayout'
import { useCategoryForm } from '../model/useCategoryForm'

import { CategoryIconPicker } from './CategoryIconPicker'

const typeOptions = CATEGORY_TYPES.map((value) => ({
  value,
  label: CATEGORY_TYPE_LABELS[value],
}))

export type CreateCategoryFormVariant = 'card' | 'plain'

export type CreateCategoryFormProps = {
  editingCategory?: Category | null
  onCancel?: () => void
  onComplete?: () => void
  variant?: CreateCategoryFormVariant
  /** Полноширинные кнопки в колонку — для bottom sheet на мобилках. */
  stackActions?: boolean
  className?: string
}

export function CreateCategoryForm({
  editingCategory = null,
  onCancel,
  onComplete,
  variant = 'card',
  stackActions = false,
  className,
}: CreateCategoryFormProps) {
  const form = useCategoryForm({ editingCategory, onComplete })

  const fields = (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault()
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
        onValueChange={(type) => form.patchValues({ type })}
        options={typeOptions}
        placeholder="Выберите тип"
        disabled={form.submitting}
      />

      <CategoryIconPicker
        icon={form.values.icon}
        iconColor={form.values.icon_color}
        onIconChange={(icon) => form.patchValues({ icon })}
        onColorChange={(icon_color) => form.patchValues({ icon_color })}
        disabled={form.submitting}
      />

      {form.validationError ? (
        <p className="text-sm text-red-600">{form.validationError}</p>
      ) : null}
      {form.serverError ? (
        <p className="text-sm text-red-600">{form.serverError}</p>
      ) : null}

      <div
        className={cn(
          'flex flex-wrap items-center gap-2',
          stackActions && categoryFormActionsClassName,
        )}
      >
        <Button
          type="submit"
          isLoading={form.submitting}
          size="lg"
          className={cn(
            'min-w-40',
            stackActions && categoryFormPrimaryButtonClassName,
          )}
        >
          {form.isEditing ? 'Сохранить' : 'Добавить категорию'}
        </Button>
        {onCancel ? (
          <Button
            type="button"
            variant="ghost"
            size="lg"
            disabled={form.submitting}
            className={stackActions ? categoryFormCancelButtonClassName : undefined}
            onClick={onCancel}
          >
            Отмена
          </Button>
        ) : null}
      </div>
    </form>
  )

  if (variant === 'plain') {
    return <div className={cn('w-full', className)}>{fields}</div>
  }

  return (
    <Card className={cn('h-fit w-full max-h-full', className)}>
      <CardHeader className="shrink-0">
        <CardTitle>{categoryFormDialogTitle(form.isEditing)}</CardTitle>
      </CardHeader>
      <CardContent>{fields}</CardContent>
    </Card>
  )
}

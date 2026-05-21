import { useEffect, useState } from 'react'

import type { Category } from '@/entities/category/model/types'
import { useCreateCategoryMutation } from '@/entities/category/api/useCreateCategoryMutation'
import { useUpdateCategoryMutation } from '@/entities/category/api/useUpdateCategoryMutation'
import { getErrorMessage } from '@/shared/lib/errors'
import { useForm } from '@/shared/lib/hooks/useForm'

import {
  emptyCategoryFormValues,
  resolveCategoryFormValues,
} from '../lib/categoryFormValues'

import type { CategoryFormValues } from './types'
import { validateCategoryForm } from './validation'

type UseCategoryFormParams = {
  editingCategory?: Category | null
  onComplete?: () => void
}

export function useCategoryForm({
  editingCategory = null,
  onComplete,
}: UseCategoryFormParams = {}) {
  const isEditing = editingCategory != null
  const editingCategoryId = editingCategory?.id ?? null

  const createMutation = useCreateCategoryMutation()
  const updateMutation = useUpdateCategoryMutation()

  const { values, handleChange, patchValues, setValues } =
    useForm<CategoryFormValues>(resolveCategoryFormValues(editingCategory))

  const [validationError, setValidationError] = useState<string | null>(null)

  useEffect(() => {
    setValues(resolveCategoryFormValues(editingCategory))
    setValidationError(null)
  }, [editingCategoryId, setValues])

  const submitting = createMutation.isPending || updateMutation.isPending
  const activeMutation = isEditing ? updateMutation : createMutation

  async function submit() {
    setValidationError(null)
    createMutation.reset()
    updateMutation.reset()

    const result = validateCategoryForm(values)
    if (!result.ok) {
      setValidationError(result.error)
      return
    }

    try {
      if (isEditing && editingCategory) {
        await updateMutation.mutateAsync({
          id: editingCategory.id,
          payload: result.payload,
        })
      } else {
        await createMutation.mutateAsync(result.payload)
        setValues(emptyCategoryFormValues())
      }
      onComplete?.()
    } catch {
      // ошибка уже в mutation.error
    }
  }

  const serverError = activeMutation.isError
    ? getErrorMessage(
        activeMutation.error,
        isEditing
          ? 'Не удалось обновить категорию'
          : 'Не удалось сохранить категорию',
      )
    : null

  return {
    values,
    handleChange,
    patchValues,
    validationError,
    serverError,
    submitting,
    submit,
    isEditing,
  }
}

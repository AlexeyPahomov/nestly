import { useState } from 'react'

import { useCreateCategoryMutation } from '@/entities/category/api/useCreateCategoryMutation'
import { getErrorMessage } from '@/shared/lib/errors'
import { useForm } from '@/shared/lib/hooks/useForm'

import type { CreateCategoryFormValues } from './types'
import { validateCreateCategoryForm } from './validation'

const emptyFormValues = (): CreateCategoryFormValues => ({
  name: '',
  type: 'expense',
})

export function useCreateCategoryForm() {
  const mutation = useCreateCategoryMutation()
  const { values, handleChange, patchValues, setValues } =
    useForm<CreateCategoryFormValues>(emptyFormValues())

  const [validationError, setValidationError] = useState<string | null>(null)

  const submitting = mutation.isPending

  async function submit() {
    setValidationError(null)
    mutation.reset()

    const result = validateCreateCategoryForm(values)
    if (result.ok === false) {
      setValidationError(result.error)
      return
    }

    try {
      await mutation.mutateAsync(result.payload)
      setValues(emptyFormValues())
    } catch {
      // ошибка уже в mutation.error
    }
  }

  const serverError = mutation.isError
    ? getErrorMessage(mutation.error, 'Не удалось сохранить категорию')
    : null

  return {
    values,
    handleChange,
    patchValues,
    validationError,
    serverError,
    submitting,
    submit,
  }
}

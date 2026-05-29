import { useEffect, useState } from 'react'

import type { Income } from '@/entities/income/model/types'
import { useCreateIncomeMutation } from '@/entities/income/api/useCreateIncomeMutation'
import { useUpdateIncomeMutation } from '@/entities/income/api/useUpdateIncomeMutation'
import { DEV_USER_ID } from '@/shared/lib/constants'
import { getErrorMessage } from '@/shared/lib/errors'
import { useForm } from '@/shared/lib/hooks/useForm'

import {
  emptyIncomeFormValues,
  resolveIncomeFormValues,
} from '../lib/incomeFormValues'

import type { IncomeFormValues } from './types'
import { validateIncomeForm } from './validation'

type UseIncomeFormParams = {
  editingIncome?: Income | null
  onComplete?: () => void
}

export function useIncomeForm({
  editingIncome = null,
  onComplete,
}: UseIncomeFormParams = {}) {
  const isEditing = editingIncome != null
  const editingIncomeId = editingIncome?.id ?? null

  const createMutation = useCreateIncomeMutation()
  const updateMutation = useUpdateIncomeMutation()

  const { values, handleChange, patchValues, setValues } =
    useForm<IncomeFormValues>(resolveIncomeFormValues(editingIncome))

  const [validationError, setValidationError] = useState<string | null>(null)

  useEffect(() => {
    setValues(resolveIncomeFormValues(editingIncome))
    setValidationError(null)
  }, [editingIncomeId, setValues])

  const submitting = createMutation.isPending || updateMutation.isPending
  const activeMutation = isEditing ? updateMutation : createMutation

  async function submit() {
    setValidationError(null)
    createMutation.reset()
    updateMutation.reset()

    const result = validateIncomeForm(values)
    if (result.ok === false) {
      setValidationError(result.error)
      return
    }

    try {
      if (isEditing && editingIncome) {
        await updateMutation.mutateAsync({
          id: editingIncome.id,
          payload: {
            user_id: DEV_USER_ID,
            ...result.payload,
          },
        })
      } else {
        await createMutation.mutateAsync({
          user_id: DEV_USER_ID,
          ...result.payload,
        })
        setValues(emptyIncomeFormValues())
      }
      onComplete?.()
    } catch {
      // ошибка уже в mutation.error
    }
  }

  const serverError = activeMutation.isError
    ? getErrorMessage(
        activeMutation.error,
        isEditing ? 'Не удалось обновить доход' : 'Не удалось сохранить доход',
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

export type IncomeFormController = ReturnType<typeof useIncomeForm>

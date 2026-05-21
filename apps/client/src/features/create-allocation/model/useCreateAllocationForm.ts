import { useState } from 'react'

import { useCreateAllocationMutation } from '@/entities/allocation/api/useCreateAllocationMutation'
import { getErrorMessage } from '@/shared/lib/errors'
import { useForm } from '@/shared/lib/hooks/useForm'

import type { CreateAllocationFormValues } from './types'
import { validateCreateAllocationForm } from './validation'

const emptyFormValues = (): CreateAllocationFormValues => ({
  category_id: '',
  amount: '',
})

type UseCreateAllocationFormParams = {
  incomeId: string | null
  remainingBalance: number
}

export function useCreateAllocationForm({
  incomeId,
  remainingBalance,
}: UseCreateAllocationFormParams) {
  const mutation = useCreateAllocationMutation()
  const { values, handleChange, patchValues, setValues } =
    useForm<CreateAllocationFormValues>(emptyFormValues())

  const [validationError, setValidationError] = useState<string | null>(null)

  const submitting = mutation.isPending
  const disabled = incomeId === null

  async function submit() {
    if (!incomeId) {
      return
    }

    setValidationError(null)
    mutation.reset()

    const result = validateCreateAllocationForm(values, remainingBalance)
    if (result.ok === false) {
      setValidationError(result.error)
      return
    }

    try {
      await mutation.mutateAsync({
        income_id: incomeId,
        ...result.payload,
      })
      setValues(emptyFormValues())
    } catch {
      // ошибка уже в mutation.error
    }
  }

  const serverError = mutation.isError
    ? getErrorMessage(mutation.error, 'Не удалось сохранить распределение')
    : null

  return {
    values,
    handleChange,
    patchValues,
    validationError,
    serverError,
    submitting,
    disabled,
    submit,
  }
}

import { useState } from 'react'

import { useCreateIncomeMutation } from '@/entities/income/api/useCreateIncomeMutation'
import { DEV_USER_ID } from '@/shared/lib/constants'
import { currentMonthInputValue } from '@/shared/lib/date'
import { getErrorMessage } from '@/shared/lib/errors'
import { useForm } from '@/shared/lib/useForm'

import type { CreateIncomeFormValues } from './types'
import { validateCreateIncomeForm } from './validation'

const emptyFormValues = (): CreateIncomeFormValues => ({
  amount: '',
  source: '',
  period_month: currentMonthInputValue(),
})

export function useCreateIncomeForm() {
  const mutation = useCreateIncomeMutation()
  const { values, handleChange, setValues } = useForm<CreateIncomeFormValues>(emptyFormValues())

  const [validationError, setValidationError] = useState<string | null>(null)

  const submitting = mutation.isPending

  async function submit() {
    setValidationError(null)
    mutation.reset()

    const result = validateCreateIncomeForm(values)
    if (result.ok === false) {
      setValidationError(result.error)
      return
    }

    try {
      await mutation.mutateAsync({
        user_id: DEV_USER_ID,
        ...result.payload,
      })
      setValues(emptyFormValues())
    } catch {
      // ошибка уже в mutation.error
    }
  }

  const serverError = mutation.isError
    ? getErrorMessage(mutation.error, 'Не удалось сохранить доход')
    : null

  return {
    values,
    handleChange,
    validationError,
    serverError,
    submitting,
    submit,
  }
}

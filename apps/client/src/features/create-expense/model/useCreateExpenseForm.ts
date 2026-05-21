import { useState } from 'react'

import { useCreateExpenseMutation } from '@/entities/expense/api/useCreateExpenseMutation'
import { DEV_USER_ID } from '@/shared/lib/constants'
import { todayDateInputValue } from '@/shared/lib/date'

import type { CreateExpenseFormValues } from './types'
import { validateCreateExpenseForm } from './validation'

const initialValues: CreateExpenseFormValues = {
  category_id: '',
  amount: '',
  description: '',
  date: todayDateInputValue(),
}

export function useCreateExpenseForm() {
  const [values, setValues] = useState<CreateExpenseFormValues>(initialValues)
  const [validationError, setValidationError] = useState<string | null>(null)

  const mutation = useCreateExpenseMutation()

  function handleChange(name: keyof CreateExpenseFormValues, value: string) {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleSubmit() {
    setValidationError(null)
    mutation.reset()

    const error = validateCreateExpenseForm(values)
    if (error) {
      setValidationError(error)
      return
    }

    const amount = Number.parseFloat(values.amount.replace(',', '.'))

    try {
      await mutation.mutateAsync({
        user_id: DEV_USER_ID,
        category_id: values.category_id,
        amount,
        description: values.description.trim() || undefined,
        date: values.date,
      })

      setValues({
        ...initialValues,
        date: todayDateInputValue(),
      })
    } catch {
      // mutation.error handles UI state
    }
  }

  return {
    values,
    validationError,
    mutation,
    handleChange,
    handleSubmit,
  }
}

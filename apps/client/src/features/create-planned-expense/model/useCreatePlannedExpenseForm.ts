import { useState } from 'react'

import { useCreatePlannedExpenseMutation } from '@/entities/planned-expense/api/useCreatePlannedExpenseMutation'
import { currentMonthInputValue, todayDateInputValue } from '@/shared/lib/date'

import type { CreatePlannedExpenseFormValues } from './types'

const initialValues = (): CreatePlannedExpenseFormValues => ({
  title: '',
  description: '',
  amount: '',
  planned_date: todayDateInputValue(),
})

export function useCreatePlannedExpenseForm(anchorPeriodMonth?: string) {
  const mutation = useCreatePlannedExpenseMutation()
  const [values, setValues] = useState(initialValues)

  const handleChange = (
    name: keyof CreatePlannedExpenseFormValues,
    value: string,
  ) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const reset = () => setValues(initialValues())

  const submit = async () => {
    const amount = Number(values.amount.replace(/\s/g, '').replace(',', '.'))
    if (!values.title.trim() || !Number.isFinite(amount) || amount <= 0) {
      return
    }

    const plannedDate = values.planned_date || `${anchorPeriodMonth ?? currentMonthInputValue()}-01`

    await mutation.mutateAsync({
      title: values.title.trim(),
      description: values.description.trim() || undefined,
      amount,
      planned_date: plannedDate,
    })

    reset()
  }

  return {
    values,
    handleChange,
    submit,
    isPending: mutation.isPending,
    error: mutation.error,
  }
}

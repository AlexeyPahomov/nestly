import { useEffect, useState } from 'react'

import { useCreatePlannedExpenseMutation } from '@/entities/planned-expense/api/useCreatePlannedExpenseMutation'
import { useUpdatePlannedExpenseMutation } from '@/entities/planned-expense/api/useUpdatePlannedExpenseMutation'
import type { PlannedExpense } from '@/entities/planned-expense/model/types'
import { currentMonthInputValue } from '@/shared/lib/date'

import type { UpdatePlannedExpensePayload } from '@/entities/planned-expense/model/types'

import {
  emptyPlannedExpenseFormValues,
  plannedExpenseToFormValues,
  resolvePlannedExpenseFormValues,
} from '../lib/plannedExpenseFormValues'

import type { CreatePlannedExpenseFormValues } from './types'

type UseCreatePlannedExpenseFormOptions = {
  editingPlannedExpense?: PlannedExpense | null
  onSuccess?: () => void
}

export function useCreatePlannedExpenseForm(
  anchorPeriodMonth?: string,
  options?: UseCreatePlannedExpenseFormOptions,
) {
  const editingPlannedExpense = options?.editingPlannedExpense ?? null
  const isEditing = editingPlannedExpense != null
  const editingId = editingPlannedExpense?.id ?? null

  const createMutation = useCreatePlannedExpenseMutation()
  const updateMutation = useUpdatePlannedExpenseMutation()
  const [values, setValues] = useState(() =>
    resolvePlannedExpenseFormValues(editingPlannedExpense),
  )

  useEffect(() => {
    setValues(resolvePlannedExpenseFormValues(editingPlannedExpense))
  }, [editingId, editingPlannedExpense])

  const handleChange = (
    name: keyof CreatePlannedExpenseFormValues,
    value: string,
  ) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const reset = () => setValues(emptyPlannedExpenseFormValues())

  const submit = async () => {
    const amount = Number(values.amount.replace(/\s/g, '').replace(',', '.'))
    if (!values.title.trim() || !Number.isFinite(amount) || amount <= 0) {
      return
    }

    const plannedDate =
      values.planned_date ||
      `${anchorPeriodMonth ?? currentMonthInputValue()}-01`

    if (isEditing && editingPlannedExpense) {
      const payload: UpdatePlannedExpensePayload = {
        title: values.title.trim(),
        description: values.description.trim() || undefined,
        icon_name: values.icon_name,
        icon_color: values.icon_color,
        amount,
      }
      const previousDate = plannedExpenseToFormValues(
        editingPlannedExpense,
      ).planned_date
      if (plannedDate !== previousDate) {
        payload.planned_date = plannedDate
      }

      await updateMutation.mutateAsync({
        id: editingPlannedExpense.id,
        payload,
      })
    } else {
      await createMutation.mutateAsync({
        title: values.title.trim(),
        description: values.description.trim() || undefined,
        icon_name: values.icon_name,
        icon_color: values.icon_color,
        amount,
        planned_date: plannedDate,
      })
      reset()
    }

    options?.onSuccess?.()
  }

  const activeMutation = isEditing ? updateMutation : createMutation

  return {
    values,
    handleChange,
    submit,
    isPending: activeMutation.isPending,
    error: activeMutation.error,
    isEditing,
  }
}

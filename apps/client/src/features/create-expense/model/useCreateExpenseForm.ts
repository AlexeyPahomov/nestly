import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { pickIncomeForTopUp } from '@/entities/allocation/lib/pickIncomeForTopUp'
import { useCreateAllocationMutation } from '@/entities/allocation/api/useCreateAllocationMutation'
import type { Allocation } from '@/entities/allocation/model/types'
import { useCreateExpenseMutation } from '@/entities/expense/api/useCreateExpenseMutation'
import type { Income } from '@/entities/income/model/types'
import { DEV_USER_ID } from '@/shared/lib/constants'
import { todayDateInputValue } from '@/shared/lib/date'
import { getErrorMessage } from '@/shared/lib/errors'

import { budgetPreviewStressKey } from '../lib/stressCategoryId'

import { QUICK_TOP_UP_CHECK_AMOUNT } from './constants'
import {
  type CategoryBudgetSnapshot,
  computeExpenseBudgetPreview,
} from './budget'
import type { CreateExpenseFormValues } from './types'
import { validateCreateExpenseForm } from './validation'

const initialValues: CreateExpenseFormValues = {
  category_id: '',
  amount: '',
  description: '',
  date: todayDateInputValue(),
}

type UseCreateExpenseFormParams = {
  budgets: CategoryBudgetSnapshot[]
  incomes: Income[]
  allocations: Allocation[]
  onStressCategoryChange?: (categoryId: string | null) => void
}

export function useCreateExpenseForm({
  budgets,
  incomes,
  allocations,
  onStressCategoryChange,
}: UseCreateExpenseFormParams) {
  const [values, setValues] = useState<CreateExpenseFormValues>(initialValues)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [topUpError, setTopUpError] = useState<string | null>(null)

  const expenseMutation = useCreateExpenseMutation()
  const allocationMutation = useCreateAllocationMutation()

  const budgetByCategoryId = useMemo(
    () => new Map(budgets.map((b) => [b.categoryId, b])),
    [budgets],
  )

  const budgetPreview = useMemo(() => {
    if (!values.category_id) {
      return null
    }
    const budget = budgetByCategoryId.get(values.category_id)
    if (!budget) {
      return null
    }
    return computeExpenseBudgetPreview(budget, values.amount)
  }, [values.category_id, values.amount, budgetByCategoryId])

  const onStressCategoryChangeRef = useRef(onStressCategoryChange)
  onStressCategoryChangeRef.current = onStressCategoryChange

  const previewStressKey = budgetPreviewStressKey(budgetPreview)

  const budgetPreviewRef = useRef(budgetPreview)
  budgetPreviewRef.current = budgetPreview

  useEffect(() => {
    const preview = budgetPreviewRef.current
    const stressId = preview?.isOverBudget ? preview.categoryId : null
    onStressCategoryChangeRef.current?.(stressId)
  }, [previewStressKey])

  const canQuickTopUp = useMemo(
    () =>
      pickIncomeForTopUp(incomes, allocations, QUICK_TOP_UP_CHECK_AMOUNT) !==
      null,
    [incomes, allocations],
  )

  const handleChange = useCallback(
    (name: keyof CreateExpenseFormValues, value: string) => {
      setTopUpError(null)
      setValues((prev) => {
        if (prev[name] === value) {
          return prev
        }
        return {
          ...prev,
          [name]: value,
        }
      })
    },
    [],
  )

  const handleSubmit = useCallback(async () => {
    setValidationError(null)
    setTopUpError(null)
    expenseMutation.reset()

    const error = validateCreateExpenseForm(values)
    if (error) {
      setValidationError(error)
      return
    }

    const amount = Number.parseFloat(values.amount.replace(',', '.'))

    try {
      await expenseMutation.mutateAsync({
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
  }, [expenseMutation, values])

  const handleQuickTopUp = useCallback(
    async (topUpAmount: number) => {
      setTopUpError(null)
      allocationMutation.reset()

      if (!values.category_id) {
        return
      }

      const income = pickIncomeForTopUp(incomes, allocations, topUpAmount)
      if (!income) {
        setTopUpError(
          'Недостаточно свободных средств в доходах. Добавьте доход или освободите лимит на странице «Распределение».',
        )
        return
      }

      try {
        await allocationMutation.mutateAsync({
          income_id: income.incomeId,
          category_id: values.category_id,
          amount: topUpAmount,
        })
      } catch (err) {
        setTopUpError(
          getErrorMessage(err, 'Не удалось увеличить лимит категории'),
        )
      }
    },
    [allocationMutation, allocations, incomes, values.category_id],
  )

  const serverError = expenseMutation.isError
    ? getErrorMessage(expenseMutation.error, 'Не удалось сохранить расход')
    : null

  const isBusy = expenseMutation.isPending || allocationMutation.isPending

  return {
    values,
    validationError,
    budgetPreview,
    topUpError,
    canQuickTopUp,
    serverError,
    isBusy,
    isRecording: expenseMutation.isPending,
    isTopUpPending: allocationMutation.isPending,
    handleChange,
    handleSubmit,
    handleQuickTopUp,
  }
}

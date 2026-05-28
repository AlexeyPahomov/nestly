import { useEffect, useState } from 'react'

import type { Allocation } from '@/entities/allocation/model/types'
import { useUpdateAllocationMutation } from '@/entities/allocation/api/useUpdateAllocationMutation'
import { toMoneyNumber } from '@/shared/lib/money'
import { getErrorMessage } from '@/shared/lib/errors'
import { useForm } from '@/shared/lib/hooks/useForm'

import { resolveAllocationFormValues } from '../lib/allocationFormValues'
import type { CreateAllocationFormValues } from './types'
import { validateAllocationForm } from './validation'

type UseEditAllocationFormParams = {
  allocation: Allocation | null
  remainingBalance: number
  onComplete?: () => void
}

export function useEditAllocationForm({
  allocation,
  remainingBalance,
  onComplete,
}: UseEditAllocationFormParams) {
  const {
    mutateAsync,
    reset,
    isPending: submitting,
    isError,
    error,
  } = useUpdateAllocationMutation()
  const { values, patchValues, setValues } =
    useForm<CreateAllocationFormValues>(resolveAllocationFormValues(allocation))

  const [validationError, setValidationError] = useState<string | null>(null)

  const allocationId = allocation?.id ?? null
  const currentAmount = allocation ? toMoneyNumber(allocation.amount) : 0
  const maxAllowedAmount = remainingBalance + currentAmount

  useEffect(() => {
    setValues(resolveAllocationFormValues(allocation))
    setValidationError(null)
  }, [allocationId, allocation, setValues])

  const disabled = allocation === null

  async function submit() {
    if (!allocation) {
      return
    }

    setValidationError(null)
    reset()

    const result = validateAllocationForm(values, maxAllowedAmount)
    if (result.ok === false) {
      setValidationError(result.error)
      return
    }

    try {
      await mutateAsync({
        id: allocation.id,
        payload: result.payload,
      })
      reset()
      onComplete?.()
    } catch {
      // ошибка уже в mutation.error
    }
  }

  const serverError = isError
    ? getErrorMessage(error, 'Не удалось сохранить распределение')
    : null

  return {
    values,
    patchValues,
    validationError,
    serverError,
    submitting,
    disabled,
    submit,
  }
}

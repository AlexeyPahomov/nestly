import type { Allocation } from '@/entities/allocation/model/types'
import { moneyAmountToFormValue } from '@/shared/lib/moneyInput'

import type { CreateAllocationFormValues } from '../model/types'

export function emptyAllocationFormValues(): CreateAllocationFormValues {
  return {
    category_id: '',
    amount: '',
  }
}

export function resolveAllocationFormValues(
  allocation: Allocation | null | undefined,
): CreateAllocationFormValues {
  if (!allocation) {
    return emptyAllocationFormValues()
  }

  return {
    category_id: allocation.category_id,
    amount: moneyAmountToFormValue(allocation.amount),
  }
}

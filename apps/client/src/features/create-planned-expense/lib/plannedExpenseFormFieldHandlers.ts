import type { ChangeEvent } from 'react'

import type { CreatePlannedExpenseFormValues } from '../model/types'

export function createPlannedExpenseInputChangeHandler(
  onChange: (name: keyof CreatePlannedExpenseFormValues, value: string) => void,
) {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (!name) {
      return
    }
    onChange(name as keyof CreatePlannedExpenseFormValues, value)
  }
}

import type { CategoryType } from '@nestly/shared'
import { parseMoneyInput } from '@nestly/shared'

export type CategoryBudgetSnapshot = {
  categoryId: string
  categoryName: string
  categoryType: CategoryType
  carriedFromPrevious: number
  allocated: number
  spent: number
  remaining: number
}

export type ExpenseBudgetPreview = {
  categoryId: string
  categoryName: string
  categoryType: CategoryType
  allocated: number
  spent: number
  remainingBefore: number
  amount: number
  remainingAfter: number
  isOverBudget: boolean
  /** На сколько превысит лимит (0, если нет превышения). */
  overAmount: number
}

export type ComputeExpenseBudgetPreviewOptions = {
  /** Сумма расхода, уже учтённая в `budget.remaining` (редактирование той же категории). */
  replacedExpenseAmount?: number
}

export function computeExpenseBudgetPreview(
  budget: CategoryBudgetSnapshot,
  amountRaw: string,
  options?: ComputeExpenseBudgetPreviewOptions,
): ExpenseBudgetPreview | null {
  const amount = parseMoneyInput(amountRaw)
  if (amount === null || amount <= 0) {
    return null
  }

  const replacedExpenseAmount = options?.replacedExpenseAmount ?? 0
  const remainingBefore = budget.remaining
  const remainingAfter =
    remainingBefore + replacedExpenseAmount - amount
  const isOverBudget = remainingAfter < 0

  return {
    categoryId: budget.categoryId,
    categoryName: budget.categoryName,
    categoryType: budget.categoryType,
    allocated: budget.allocated,
    spent: budget.spent,
    remainingBefore,
    amount,
    remainingAfter,
    isOverBudget,
    overAmount: isOverBudget ? Math.abs(remainingAfter) : 0,
  }
}

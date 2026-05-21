import type { CategoryType } from '@nestly/shared'

export function isSavingsCategory(type: CategoryType): boolean {
  return type === 'savings'
}

export function isBudgetEnvelopeCategory(type: CategoryType): boolean {
  return type === 'expense' || type === 'savings'
}

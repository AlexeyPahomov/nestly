import type { Expense } from '@/entities/expense/model/types'
import { useFormDialog } from '@/shared/lib/hooks/useFormDialog'

export function useExpenseFormDialog(
  editingExpense: Expense | null,
  onClearEditing?: () => void,
) {
  return useFormDialog(editingExpense != null, {
    onClearEditing,
  })
}

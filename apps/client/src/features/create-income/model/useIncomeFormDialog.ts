import type { Income } from '@/entities/income/model/types'
import { useFormDialog } from '@/shared/lib/hooks/useFormDialog'

export function useIncomeFormDialog(
  editingIncome: Income | null,
  onClearEditing?: () => void,
) {
  return useFormDialog(editingIncome != null, {
    onClearEditing,
    clearEditingOnOpenAdd: true,
  })
}

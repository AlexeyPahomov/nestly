import type { Category } from '@/entities/category/model/types'
import { useFormDialog } from '@/shared/lib/hooks/useFormDialog'

export function useCategoryFormDialog(
  editingCategory: Category | null,
  onClearEditing?: () => void,
) {
  return useFormDialog(editingCategory != null, {
    onClearEditing,
    clearEditingOnOpenAdd: true,
  })
}

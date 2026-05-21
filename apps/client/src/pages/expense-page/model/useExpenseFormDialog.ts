import { useCallback, useState } from 'react'

import type { Expense } from '@/entities/expense/model/types'

export function useExpenseFormDialog(
  editingExpense: Expense | null,
  onClearEditing?: () => void,
) {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const isEditing = editingExpense != null
  const isOpen = isAddOpen || isEditing

  const close = useCallback(() => {
    setIsAddOpen(false)
    onClearEditing?.()
  }, [onClearEditing])

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        close()
      }
    },
    [close],
  )

  const openForAdd = useCallback(() => {
    setIsAddOpen(true)
  }, [])

  return {
    isOpen,
    isEditing,
    close,
    onOpenChange,
    openForAdd,
  }
}

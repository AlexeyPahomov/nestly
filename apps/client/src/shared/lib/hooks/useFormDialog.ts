import { useCallback, useState } from 'react'

type UseFormDialogOptions = {
  onClearEditing?: () => void
  /** Сбросить редактирование перед открытием формы добавления */
  clearEditingOnOpenAdd?: boolean
}

export function useFormDialog(
  isEditing: boolean,
  options: UseFormDialogOptions = {},
) {
  const { onClearEditing, clearEditingOnOpenAdd = false } = options
  const [isAddOpen, setIsAddOpen] = useState(false)
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
    if (clearEditingOnOpenAdd) {
      onClearEditing?.()
    }
    setIsAddOpen(true)
  }, [clearEditingOnOpenAdd, onClearEditing])

  return {
    isOpen,
    isEditing,
    close,
    onOpenChange,
    openForAdd,
  }
}

import { useCallback, useEffect, useRef, useState } from 'react'

import { FORM_DIALOG_EXIT_MS } from '@/shared/config/formDialogTiming'

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
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const clearEditingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  )

  const cancelScheduledClearEditing = useCallback(() => {
    if (clearEditingTimerRef.current) {
      clearTimeout(clearEditingTimerRef.current)
      clearEditingTimerRef.current = null
    }
  }, [])

  const scheduleClearEditing = useCallback(() => {
    cancelScheduledClearEditing()
    clearEditingTimerRef.current = setTimeout(() => {
      clearEditingTimerRef.current = null
      onClearEditing?.()
    }, FORM_DIALOG_EXIT_MS)
  }, [cancelScheduledClearEditing, onClearEditing])

  useEffect(() => {
    if (isEditing || isAddOpen) {
      cancelScheduledClearEditing()
      setIsDialogOpen(true)
    }
  }, [cancelScheduledClearEditing, isAddOpen, isEditing])

  useEffect(
    () => () => cancelScheduledClearEditing(),
    [cancelScheduledClearEditing],
  )

  const close = useCallback(() => {
    setIsDialogOpen(false)
    setIsAddOpen(false)

    if (isEditing) {
      scheduleClearEditing()
      return
    }

    onClearEditing?.()
  }, [isEditing, onClearEditing, scheduleClearEditing])

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        close()
      }
    },
    [close],
  )

  const openForAdd = useCallback(() => {
    cancelScheduledClearEditing()

    if (clearEditingOnOpenAdd) {
      onClearEditing?.()
    }

    setIsAddOpen(true)
    setIsDialogOpen(true)
  }, [cancelScheduledClearEditing, clearEditingOnOpenAdd, onClearEditing])

  return {
    isOpen: isDialogOpen,
    isEditing,
    close,
    onOpenChange,
    openForAdd,
  }
}

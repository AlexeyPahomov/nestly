import { useState } from 'react'

import { useIncomesQuery } from '@/entities/income/api/useIncomesQuery'
import type { Income } from '@/entities/income/model/types'
import { useIsMobile } from '@/shared/hooks/use-mobile'
import { usePageListLayout } from '@/shared/hooks/use-page-list-layout'

import { INCOME_PAGE_ADD_LABEL } from '../lib/incomePageCopy'

import { useIncomeFormDialog } from './useIncomeFormDialog'

export function useIncomePage() {
  const [editingIncome, setEditingIncome] = useState<Income | null>(null)
  const incomesQuery = useIncomesQuery()
  const dialog = useIncomeFormDialog(editingIncome, () => setEditingIncome(null))
  const isMobile = useIsMobile()
  const listLayout = usePageListLayout()

  return {
    incomesQuery,
    listLayout,
    onEditIncome: setEditingIncome,
    onAddIncome: isMobile ? undefined : dialog.openForAdd,
    formDialog: {
      open: dialog.isOpen,
      onOpenChange: dialog.onOpenChange,
      isEditing: dialog.isEditing,
      onClose: dialog.close,
      editingIncome,
    },
    fab: {
      label: INCOME_PAGE_ADD_LABEL,
      onClick: dialog.openForAdd,
    },
  }
}

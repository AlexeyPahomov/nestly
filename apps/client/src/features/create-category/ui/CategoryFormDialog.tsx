import type { Category } from '@/entities/category/model/types'
import { useIsMobile } from '@/shared/hooks/use-mobile'
import { ResponsiveFormDialog } from '@/shared/ui/responsive-form-dialog'

import {
  categoryFormDialogDescription,
  categoryFormDialogTitle,
} from '../lib/categoryFormDialogCopy'

import { CreateCategoryForm } from './CreateCategoryForm'

export type CategoryFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  isEditing: boolean
  onClose: () => void
  editingCategory?: Category | null
}

export function CategoryFormDialog({
  open,
  onOpenChange,
  isEditing,
  onClose,
  editingCategory = null,
}: CategoryFormDialogProps) {
  const isMobile = useIsMobile()
  const formKey = editingCategory?.id ?? 'new'

  return (
    <ResponsiveFormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={categoryFormDialogTitle(isEditing)}
      description={categoryFormDialogDescription(isEditing)}
    >
      <CreateCategoryForm
        key={formKey}
        variant="plain"
        stackActions={isMobile}
        editingCategory={editingCategory}
        onCancel={onClose}
        onComplete={onClose}
      />
    </ResponsiveFormDialog>
  )
}

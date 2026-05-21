import type { Category } from '@/entities/category/model/types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui'

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
  const formKey = editingCategory?.id ?? 'new'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[min(90vh,40rem)] flex-col gap-4 overflow-hidden p-0 sm:max-w-md"
      >
        <DialogHeader className="shrink-0 px-4 pt-5 pb-0">
          <DialogTitle>{categoryFormDialogTitle(isEditing)}</DialogTitle>
          <DialogDescription className="sr-only">
            {categoryFormDialogDescription(isEditing)}
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-0 overflow-y-auto overscroll-contain px-4 pb-4">
          <CreateCategoryForm
            key={formKey}
            variant="plain"
            editingCategory={editingCategory}
            onCancel={onClose}
            onComplete={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

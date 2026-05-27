import type { Category } from '@/entities/category/model/types'
import { useIsMobile } from '@/shared/hooks/use-mobile'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui/sheet'

import {
  categoryFormDialogDescription,
  categoryFormDialogTitle,
} from '../lib/categoryFormDialogCopy'
import {
  categoryFormDialogHeaderClassName,
  categoryFormDialogScrollClassName,
  categoryFormSheetContentClassName,
  categoryFormSheetHandleClassName,
  categoryFormSheetHeaderClassName,
} from '../lib/categoryFormDialogLayout'

import { CreateCategoryForm } from './CreateCategoryForm'

export type CategoryFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  isEditing: boolean
  onClose: () => void
  editingCategory?: Category | null
}

type CategoryFormDialogBodyProps = {
  formKey: string
  editingCategory: Category | null
  stackActions: boolean
  onClose: () => void
}

function CategoryFormDialogBody({
  formKey,
  editingCategory,
  stackActions,
  onClose,
}: CategoryFormDialogBodyProps) {
  return (
    <div className={categoryFormDialogScrollClassName}>
      <CreateCategoryForm
        key={formKey}
        variant="plain"
        stackActions={stackActions}
        editingCategory={editingCategory}
        onCancel={onClose}
        onComplete={onClose}
      />
    </div>
  )
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
  const title = categoryFormDialogTitle(isEditing)
  const description = categoryFormDialogDescription(isEditing)

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          showCloseButton={false}
          className={categoryFormSheetContentClassName}
        >
          <div
            className={categoryFormSheetHandleClassName}
            aria-hidden
          />
          <SheetHeader className={categoryFormSheetHeaderClassName}>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription className="sr-only">
              {description}
            </SheetDescription>
          </SheetHeader>
          <CategoryFormDialogBody
            formKey={formKey}
            stackActions
            editingCategory={editingCategory}
            onClose={onClose}
          />
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex max-h-[min(90vh,40rem)] flex-col gap-4 overflow-hidden p-0 sm:max-w-md"
      >
        <DialogHeader className={categoryFormDialogHeaderClassName}>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="sr-only">
            {description}
          </DialogDescription>
        </DialogHeader>
        <CategoryFormDialogBody
          formKey={formKey}
          stackActions={false}
          editingCategory={editingCategory}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  )
}

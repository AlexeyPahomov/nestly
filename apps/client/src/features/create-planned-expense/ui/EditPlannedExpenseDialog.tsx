import type { PlannedExpense } from '@/entities/planned-expense/model/types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui'

import {
  editPlannedExpenseDialogDescription,
  editPlannedExpenseDialogTitle,
} from '../lib/plannedExpenseFormDialogCopy'
import { useCreatePlannedExpenseForm } from '../model/useCreatePlannedExpenseForm'

import { CreatePlannedExpenseFields } from './CreatePlannedExpenseFields'

export type EditPlannedExpenseDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: PlannedExpense | null
}

export function EditPlannedExpenseDialog({
  open,
  onOpenChange,
  item,
}: EditPlannedExpenseDialogProps) {
  const form = useCreatePlannedExpenseForm(item?.period_month, {
    editingPlannedExpense: item,
    onSuccess: () => onOpenChange(false),
  })

  const formKey = item?.id ?? 'closed'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editPlannedExpenseDialogTitle()}</DialogTitle>
          <DialogDescription className="sr-only">
            {editPlannedExpenseDialogDescription()}
          </DialogDescription>
        </DialogHeader>
        <div key={formKey} className="flex flex-col gap-3">
          <CreatePlannedExpenseFields
            values={form.values}
            onChange={form.handleChange}
            patchValues={form.patchValues}
            onSubmit={form.submit}
            isPending={form.isPending}
            submitLabel="Сохранить"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

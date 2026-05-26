import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui'

import { plannedExpenseFormDialogDescription } from '../lib/plannedExpenseFormDialogCopy'
import { useCreatePlannedExpenseForm } from '../model/useCreatePlannedExpenseForm'

import { CreatePlannedExpenseFields } from './CreatePlannedExpenseFields'

export type CreatePlannedExpenseDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  anchorPeriodMonth: string
}

export function CreatePlannedExpenseDialog({
  open,
  onOpenChange,
  anchorPeriodMonth,
}: CreatePlannedExpenseDialogProps) {
  const form = useCreatePlannedExpenseForm(anchorPeriodMonth, {
    onSuccess: () => onOpenChange(false),
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Новый план</DialogTitle>
          <DialogDescription className="sr-only">
            {plannedExpenseFormDialogDescription}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <CreatePlannedExpenseFields
            values={form.values}
            onChange={form.handleChange}
            onSubmit={form.submit}
            isPending={form.isPending}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

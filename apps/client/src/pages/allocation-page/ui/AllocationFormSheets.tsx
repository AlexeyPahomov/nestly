import type { Allocation } from '@/entities/allocation/model/types'
import { allocationFormDialogBodyClassName } from '@/features/create-allocation/lib/allocationFormDialog'
import type { AllocationFormController } from '@/features/create-allocation/model/types'
import { AllocationQuickForm } from '@/features/create-allocation/ui/AllocationQuickForm'
import { ResponsiveFormDialog } from '@/shared/ui'

type CategoryOption = { value: string; label: string }

type AllocationFormSheetsProps = {
  isMobile: boolean
  categoryOptions: CategoryOption[]
  noCategories: boolean
  createOpen: boolean
  onCreateOpenChange: (open: boolean) => void
  createForm: AllocationFormController
  onCreateSubmit: () => void | Promise<void>
  editingAllocation: Allocation | null
  onEditingAllocationChange: (allocation: Allocation | null) => void
  editForm: AllocationFormController
  onEditSubmit: () => void | Promise<void>
}

export function AllocationFormSheets({
  isMobile,
  categoryOptions,
  noCategories,
  createOpen,
  onCreateOpenChange,
  createForm,
  onCreateSubmit,
  editingAllocation,
  onEditingAllocationChange,
  editForm,
  onEditSubmit,
}: AllocationFormSheetsProps) {
  const createDisabled = createForm.disabled || createForm.submitting
  const editDisabled = editForm.disabled || editForm.submitting

  return (
    <>
      <ResponsiveFormDialog
        open={createOpen}
        onOpenChange={onCreateOpenChange}
        title="Быстрое распределение"
        description="Выберите категорию и сумму распределения"
        bodyClassName={allocationFormDialogBodyClassName}
        showCloseButton={!isMobile}
        hideHeader
      >
        <AllocationQuickForm
          categoryOptions={categoryOptions}
          noCategories={noCategories}
          controlsDisabled={createDisabled}
          form={createForm}
          onSubmit={onCreateSubmit}
        />
      </ResponsiveFormDialog>

      <ResponsiveFormDialog
        open={editingAllocation !== null}
        onOpenChange={(open) => {
          if (!open) {
            onEditingAllocationChange(null)
          }
        }}
        title="Редактирование распределения"
        description="Измените категорию или сумму"
        bodyClassName={allocationFormDialogBodyClassName}
        showCloseButton={false}
        hideHeader
      >
        <AllocationQuickForm
          categoryOptions={categoryOptions}
          noCategories={noCategories}
          controlsDisabled={editDisabled}
          form={editForm}
          onSubmit={onEditSubmit}
          submitLabel="Сохранить"
        />
      </ResponsiveFormDialog>
    </>
  )
}

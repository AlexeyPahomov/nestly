export type CreateAllocationFormValues = {
  category_id: string
  amount: string
}

export type ValidCreateAllocationFormPayload = {
  category_id: string
  amount: number
}

export type AllocationFormController = {
  values: CreateAllocationFormValues
  patchValues: (patch: Partial<CreateAllocationFormValues>) => void
  validationError: string | null
  serverError: string | null
  submitting: boolean
  disabled: boolean
  submit: () => Promise<void>
}

export type CreateIncomeFormValues = {
  amount: string
  source: string
  period_month: string
}

export type ValidCreateIncomeFormPayload = {
  amount: number
  source: string | undefined
  period_month: string
}

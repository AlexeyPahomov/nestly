export type IncomeFormValues = {
  amount: string
  source: string
  period_month: string
}

export type IncomeFormPayload = {
  amount: number
  source: string | undefined
  period_month: string
}

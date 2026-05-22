export type CategoryMonthSnapshotDto = {
  categoryId: string
  categoryName: string
  categoryType: string
  categoryIcon: string
  openingBalance: number
  allocated: number
  spent: number
  closingBalance: number
}

export type BudgetMonthView = {
  periodMonth: string
  year: number
  month: number
  status: 'OPEN' | 'CLOSED'
  snapshots: CategoryMonthSnapshotDto[]
}

export type CategorySnapshotDto = {
  categoryId: string;
  categoryName: string;
  categoryType: string;
  categoryIcon: string;
  openingBalance: number;
  allocated: number;
  spent: number;
  closingBalance: number;
};

export type BudgetMonthViewDto = {
  periodMonth: string;
  year: number;
  month: number;
  status: 'OPEN' | 'CLOSED';
  snapshots: CategorySnapshotDto[];
};

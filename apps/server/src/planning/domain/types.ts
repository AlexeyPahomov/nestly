/** Planning / forecasting domain (не @nestly/shared). */

export type PlannedExpenseCommitmentRow = {
  amount: number;
  reserved_amount: number;
  status: string;
};

export type PlannedExpenseCommitments = {
  planned: number;
  reserved: number;
};

export type MonthBudgetProjectionInput = {
  available: number;
  spentTotal: number;
  commitments: PlannedExpenseCommitments;
};

export type MonthBudgetProjection = {
  available: number;
  spentTotal: number;
  plannedTotal: number;
  reservedTotal: number;
  commitmentTotal: number;
  projectedFree: number;
};

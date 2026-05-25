import type { MonthBudgetProjection, PlannedExpenseCommitmentRow } from './types.js';
export type BuildMonthProjectionInput = {
    available: number;
    spentTotal: number;
    commitmentRows: readonly PlannedExpenseCommitmentRow[];
};
export declare function buildMonthProjection(input: BuildMonthProjectionInput): MonthBudgetProjection;

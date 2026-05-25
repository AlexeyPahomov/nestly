import type { PlannedExpenseCommitmentRow, PlannedExpenseCommitments } from './types.js';
/** Суммы по активным обязательствам (без COMPLETED / CANCELLED). */
export declare function sumPlannedExpenseCommitments(rows: readonly PlannedExpenseCommitmentRow[]): PlannedExpenseCommitments;

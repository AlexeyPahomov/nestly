import { projectMonthBudget } from './projectMonthBudget.js';
import { sumPlannedExpenseCommitments } from './sumPlannedExpenseCommitments.js';
export function buildMonthProjection(input) {
    const commitments = sumPlannedExpenseCommitments(input.commitmentRows);
    return projectMonthBudget({
        available: input.available,
        spentTotal: input.spentTotal,
        commitments,
    });
}

import { Injectable } from '@nestjs/common';

import {
  projectMonthBudget,
  sumPlannedExpenseCommitments,
  type MonthBudgetProjection,
  type MonthBudgetProjectionInput,
  type PlannedExpenseCommitmentRow,
} from '../domain';

@Injectable()
export class ProjectionService {
  sumPlannedExpenseCommitments(rows: readonly PlannedExpenseCommitmentRow[]) {
    return sumPlannedExpenseCommitments(rows);
  }

  projectMonthBudget(input: MonthBudgetProjectionInput): MonthBudgetProjection {
    return projectMonthBudget(input);
  }
}

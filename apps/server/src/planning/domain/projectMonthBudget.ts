import type {
  MonthBudgetProjection,
  MonthBudgetProjectionInput,
} from './types';

export function projectMonthBudget(
  input: MonthBudgetProjectionInput,
): MonthBudgetProjection {
  const { planned, reserved } = input.commitments;
  const commitmentTotal = planned + reserved;
  const projectedFree = input.available - commitmentTotal;

  return {
    available: input.available,
    spentTotal: input.spentTotal,
    plannedTotal: planned,
    reservedTotal: reserved,
    commitmentTotal,
    projectedFree,
  };
}

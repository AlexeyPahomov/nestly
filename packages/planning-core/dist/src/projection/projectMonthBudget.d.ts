import type { MonthBudgetProjection, MonthBudgetProjectionInput } from './types.js';
/**
 * Прогноз свободного остатка (planning policy).
 * Правила будут расти (recurring, carry-over, goals, close).
 */
export declare function projectMonthBudget(input: MonthBudgetProjectionInput): MonthBudgetProjection;

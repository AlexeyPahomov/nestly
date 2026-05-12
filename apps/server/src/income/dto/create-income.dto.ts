export class CreateIncomeDto {
  user_id!: string;
  amount!: number;
  source?: string;
  period_month!: string; // "2026-05-01"
}

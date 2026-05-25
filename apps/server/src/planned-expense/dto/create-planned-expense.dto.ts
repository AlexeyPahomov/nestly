export class CreatePlannedExpenseDto {
  title: string;
  description?: string;
  amount: number;
  planned_date: string;
  category_id?: string;
}

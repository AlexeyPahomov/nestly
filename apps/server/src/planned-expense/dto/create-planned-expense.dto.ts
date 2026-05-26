export class CreatePlannedExpenseDto {
  title: string;
  description?: string;
  icon_name?: string;
  icon_color?: string;
  amount: number;
  planned_date: string;
  category_id?: string;
}

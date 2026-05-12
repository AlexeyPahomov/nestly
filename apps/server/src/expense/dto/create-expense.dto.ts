export class CreateExpenseDto {
  category_id: string;
  amount: number;
  description?: string;
  date: string;
}

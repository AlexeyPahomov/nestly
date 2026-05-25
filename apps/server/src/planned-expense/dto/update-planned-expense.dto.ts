export class UpdatePlannedExpenseDto {
  title?: string;
  description?: string;
  amount?: number;
  planned_date?: string;
  status?: 'PLANNED' | 'RESERVED' | 'COMPLETED' | 'CANCELLED';
  category_id?: string | null;
}

export class UpdatePlannedExpenseDto {
  title?: string;
  description?: string;
  amount?: number;
  planned_date?: string;
  status?: 'PLANNED' | 'RESERVED' | 'COMPLETED' | 'CANCELLED';
  reserved_amount?: number;
  category_id?: string | null;
}

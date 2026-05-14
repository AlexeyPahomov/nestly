import type { CategoryType } from '@nestly/shared'

export class CreateCategoryDto {
  name: string;
  type: CategoryType;
}

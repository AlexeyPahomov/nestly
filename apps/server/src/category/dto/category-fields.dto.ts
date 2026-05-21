import type { CategoryIconKey, CategoryType } from '@nestly/shared';

export class CategoryFieldsDto {
  name: string;
  type: CategoryType;
  icon: CategoryIconKey;
}

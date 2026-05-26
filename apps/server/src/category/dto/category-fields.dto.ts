import type {
  CategoryIconKey,
  CategoryType,
  IconColorKey,
} from '@coffer/shared';

export class CategoryFieldsDto {
  name: string;
  type: CategoryType;
  icon: CategoryIconKey;
  icon_color: IconColorKey;
}

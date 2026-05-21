import type { Category, CategoryPayload } from '@/entities/category/model/types'
import { apiGet, apiPatch, apiPost } from '@/shared/api/client'

const CATEGORY_PATH = '/category'

export function getCategories(): Promise<Category[]> {
  return apiGet<Category[]>(CATEGORY_PATH)
}

export function createCategory(payload: CategoryPayload): Promise<Category> {
  return apiPost<Category>(CATEGORY_PATH, payload)
}

export function updateCategory(
  id: string,
  payload: CategoryPayload,
): Promise<Category> {
  return apiPatch<Category>(`${CATEGORY_PATH}/${id}`, payload)
}

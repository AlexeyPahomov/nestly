import type { Category, CreateCategoryPayload } from '@/entities/category/model/types'
import { apiGet, apiPost } from '@/shared/api/client'

const CATEGORY_PATH = '/category'

export function getCategories(): Promise<Category[]> {
  return apiGet<Category[]>(CATEGORY_PATH)
}

export function createCategory(payload: CreateCategoryPayload): Promise<Category> {
  return apiPost<Category>(CATEGORY_PATH, payload)
}

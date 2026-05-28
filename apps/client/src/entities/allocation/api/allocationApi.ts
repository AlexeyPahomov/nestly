import { apiGet, apiPatch, apiPost } from '@/shared/api/client'

import type {
  Allocation,
  CreateAllocationPayload,
  UpdateAllocationPayload,
} from '../model/types'

const ALLOCATION_PATH = '/allocation'

export function getAllocations(incomeId: string): Promise<Allocation[]> {
  if (!incomeId) {
    return Promise.reject(new Error('getAllocations: incomeId is required'))
  }
  const q = new URLSearchParams({ incomeId })
  return apiGet<Allocation[]>(`${ALLOCATION_PATH}?${q}`)
}

export function getAllAllocations(): Promise<Allocation[]> {
  return apiGet<Allocation[]>(ALLOCATION_PATH)
}

export function createAllocation(
  payload: CreateAllocationPayload,
): Promise<Allocation> {
  return apiPost<Allocation>(ALLOCATION_PATH, payload)
}

export function updateAllocation(
  id: string,
  payload: UpdateAllocationPayload,
): Promise<Allocation> {
  return apiPatch<Allocation>(`${ALLOCATION_PATH}/${id}`, payload)
}

export const ALLOCATION_TYPES = [
  'INCOME_ASSIGNMENT',
  'CATEGORY_TRANSFER',
  'MANUAL_ADJUSTMENT',
] as const

export type AllocationType = (typeof ALLOCATION_TYPES)[number]

export const DEFAULT_ALLOCATION_TYPE: AllocationType = 'INCOME_ASSIGNMENT'

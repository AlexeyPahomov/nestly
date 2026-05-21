export const allocationKeys = {
  all: ['allocation'] as const,
  lists: () => [...allocationKeys.all, 'list'] as const,
  list: (incomeId: string) => [...allocationKeys.lists(), incomeId] as const,
  allList: () => [...allocationKeys.all, 'all'] as const,
}

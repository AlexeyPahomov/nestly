import { useIncomesQuery } from '@/entities/income/api/useIncomesQuery'

export function useIncomePage() {
  const incomesQuery = useIncomesQuery()

  return {
    incomesQuery,
    isLoading: incomesQuery.isPending,
  }
}

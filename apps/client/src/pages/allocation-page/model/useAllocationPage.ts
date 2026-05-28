import { useMemo, useState } from 'react'
import { getMonthKeyFromIso } from '@coffer/shared'

import { useAllAllocationsQuery } from '@/entities/allocation/api/useAllAllocationsQuery'
import { useAllocationsQuery } from '@/entities/allocation/api/useAllocationsQuery'
import { sumAllocationAmounts } from '@/entities/allocation/model/calculations'
import { useCategoriesQuery } from '@/entities/category/api/useCategoriesQuery'
import type { Category } from '@/entities/category/model/types'
import { useIncomesQuery } from '@/entities/income/api/useIncomesQuery'
import type { Income } from '@/entities/income/model/types'
import { formatMonthLabel } from '@/shared/lib/format'
import { toMoneyNumber } from '@/shared/lib/money'

export type IncomeCardTone = 'empty' | 'partial' | 'full'

export type IncomeCardView = {
  id: string
  periodMonth: string
  periodLabel: string
  amount: number
  allocated: number
  percent: number
  tone: IncomeCardTone
}

function resolveSelectedIncomeId(
  incomes: Income[] | undefined,
  pickedIncomeId: string | null,
): string | null {
  if (incomes === undefined || incomes.length === 0) {
    return null
  }
  if (
    pickedIncomeId !== null &&
    incomes.some((income) => income.id === pickedIncomeId)
  ) {
    return pickedIncomeId
  }
  return incomes[0].id
}

function filterAllocationCategories(categories: Category[]): Category[] {
  return categories.filter((category) => category.type !== 'income')
}

function resolveIncomeTone(allocated: number, percent: number): IncomeCardTone {
  if (allocated <= 0) {
    return 'empty'
  }

  return percent >= 98 ? 'full' : 'partial'
}

export function useAllocationPage() {
  const [pickedIncomeId, setPickedIncomeId] = useState<string | null>(null)

  const incomesQuery = useIncomesQuery()
  const allAllocationsQuery = useAllAllocationsQuery()
  const categoriesQuery = useCategoriesQuery()

  const incomes = incomesQuery.data

  const selectedIncomeId = useMemo(
    () => resolveSelectedIncomeId(incomes, pickedIncomeId),
    [incomes, pickedIncomeId],
  )

  const allocationsQuery = useAllocationsQuery(selectedIncomeId)

  const allocationCategories = useMemo(
    () => filterAllocationCategories(categoriesQuery.data ?? []),
    [categoriesQuery.data],
  )

  const selectedIncome = useMemo(
    () => incomes?.find((income) => income.id === selectedIncomeId) ?? null,
    [incomes, selectedIncomeId],
  )

  const allocatedTotal = useMemo(
    () => sumAllocationAmounts(allocationsQuery.data ?? []),
    [allocationsQuery.data],
  )

  const incomeAmount = selectedIncome
    ? toMoneyNumber(selectedIncome.amount)
    : null
  const selectedIncomeMonthLabel = selectedIncome
    ? formatMonthLabel(selectedIncome.period_month)
    : 'Месяц'

  const remainingBalance = useMemo(() => {
    if (incomeAmount === null) {
      return 0
    }
    return incomeAmount - allocatedTotal
  }, [incomeAmount, allocatedTotal])

  const allocatedByIncomeId = useMemo(() => {
    const summary = new Map<string, number>()

    for (const allocation of allAllocationsQuery.data ?? []) {
      const prev = summary.get(allocation.income_id) ?? 0
      summary.set(allocation.income_id, prev + toMoneyNumber(allocation.amount))
    }

    return summary
  }, [allAllocationsQuery.data])

  const incomeCards = useMemo<IncomeCardView[]>(
    () =>
      (incomes ?? [])
        .slice()
        .sort((a, b) => b.period_month.localeCompare(a.period_month))
        .map((income) => {
          const amount = toMoneyNumber(income.amount)
          const allocated = allocatedByIncomeId.get(income.id) ?? 0
          const percent =
            amount > 0 ? Math.min(100, Math.round((allocated / amount) * 100)) : 0

          return {
            id: income.id,
            periodMonth:
              getMonthKeyFromIso(income.period_month) ?? income.period_month,
            periodLabel: formatMonthLabel(income.period_month),
            amount,
            allocated,
            percent,
            tone: resolveIncomeTone(allocated, percent),
          }
        }),
    [allocatedByIncomeId, incomes],
  )

  const hasIncome = incomeCards.length > 0

  return {
    selectedIncomeId,
    setPickedIncomeId,
    allocationCategories,
    incomeAmount,
    selectedIncomeMonthLabel,
    allocatedTotal,
    remainingBalance,
    incomeCards,
    hasIncome,
    incomesQuery,
    allocationsQuery,
  }
}

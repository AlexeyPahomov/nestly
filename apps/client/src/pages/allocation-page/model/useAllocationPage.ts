import { useMemo, useState } from 'react'

import { useAllocationsQuery } from '@/entities/allocation/api/useAllocationsQuery'
import { sumAllocationAmounts } from '@/entities/allocation/model/calculations'
import { useCategoriesQuery } from '@/entities/category/api/useCategoriesQuery'
import type { Category } from '@/entities/category/model/types'
import { useIncomesQuery } from '@/entities/income/api/useIncomesQuery'
import type { Income } from '@/entities/income/model/types'
import { formatAmount, formatMonthLabel } from '@/shared/lib/format'
import { toMoneyNumber } from '@/shared/lib/money'

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

function buildIncomeSelectOptions(
  incomes: Income[],
): { value: string; label: string }[] {
  return incomes.map((income) => {
    const label = income.source?.trim()
      ? `${income.source} — ${formatAmount(income.amount)}`
      : `${formatMonthLabel(income.period_month)} — ${formatAmount(income.amount)}`
    return { value: income.id, label }
  })
}

export function useAllocationPage() {
  const [pickedIncomeId, setPickedIncomeId] = useState<string | null>(null)

  const incomesQuery = useIncomesQuery()
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

  const remainingBalance = useMemo(() => {
    if (incomeAmount === null) {
      return 0
    }
    return incomeAmount - allocatedTotal
  }, [incomeAmount, allocatedTotal])

  const incomeOptions = useMemo(
    () => buildIncomeSelectOptions(incomes ?? []),
    [incomes],
  )

  const hasIncome = incomeOptions.length > 0

  return {
    selectedIncomeId,
    setPickedIncomeId,
    allocationCategories,
    incomeAmount,
    allocatedTotal,
    remainingBalance,
    incomeOptions,
    hasIncome,
    incomesQuery,
    allocationsQuery,
  }
}

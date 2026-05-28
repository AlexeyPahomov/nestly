import type { Category } from '@/entities/category/model/types'
import type { CategoryBudgetItem } from '@/entities/budget/model/types'

import type { BudgetMonthView } from '../model/types'

import { mapBudgetMonthToCategoryItems } from './mapBudgetMonthToItems'

function snapshotLooksStale(
  derived: CategoryBudgetItem,
  fromServer: CategoryBudgetItem,
): boolean {
  const serverEmpty =
    fromServer.allocated === 0 &&
    fromServer.spent === 0 &&
    fromServer.carriedFromPrevious === 0
  const derivedHasActivity =
    derived.allocated !== 0 ||
    derived.spent !== 0 ||
    derived.carriedFromPrevious !== 0

  return serverEmpty && derivedHasActivity
}

/**
 * Серверные snapshot'ы накладываются на derive, только если месяц материализован
 * для всех категорий. Иначе частичный snapshot (часто с нулями после сбоя projector)
 * перезаписывает корректные цифры — как у «Продукты».
 */
export function mergeBudgetMonthWithDerived(
  derived: readonly CategoryBudgetItem[],
  view: BudgetMonthView | undefined,
  categories: readonly Category[],
  periodMonth: string,
): CategoryBudgetItem[] {
  // Для открытого месяца источник истины — derive из событий.
  // Snapshot'ы безопасно показывать только в закрытом месяце.
  if (
    !view?.snapshots.length ||
    view.periodMonth !== periodMonth ||
    view.status !== 'CLOSED'
  ) {
    return [...derived]
  }

  const fromSnapshots = mapBudgetMonthToCategoryItems(view, categories)
  if (fromSnapshots.length === 0) {
    return [...derived]
  }

  // Неполный набор snapshot'ов — показываем только derive.
  if (fromSnapshots.length < derived.length) {
    return [...derived]
  }

  const snapshotByCategoryId = new Map(
    fromSnapshots.map((item) => [item.category.id, item]),
  )

  return derived.map((item) => {
    const fromServer = snapshotByCategoryId.get(item.category.id)
    if (!fromServer || snapshotLooksStale(item, fromServer)) {
      return item
    }
    return fromServer
  })
}

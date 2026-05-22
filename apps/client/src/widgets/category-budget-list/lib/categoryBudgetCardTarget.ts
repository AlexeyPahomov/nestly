export const categoryBudgetCardDataAttr = 'data-category-budget-card'

export const categoryBudgetCardSelector = `[${categoryBudgetCardDataAttr}]`

export function getCategoryBudgetCardDomProps() {
  return { [categoryBudgetCardDataAttr]: '' } as const
}

export function isCategoryBudgetCardPointerTarget(
  target: EventTarget | null,
): boolean {
  if (!(target instanceof Element)) {
    return false
  }

  return target.closest(categoryBudgetCardSelector) != null
}

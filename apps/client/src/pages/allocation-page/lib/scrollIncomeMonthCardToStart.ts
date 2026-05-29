/** Прокрутка горизонтальной ленты: карточка у левого края (без scrollIntoView — Safari). */
export function scrollIncomeMonthCardToStart(
  scrollContainer: HTMLElement,
  card: HTMLElement,
): void {
  const containerRect = scrollContainer.getBoundingClientRect()
  const cardRect = card.getBoundingClientRect()
  const nextLeft =
    scrollContainer.scrollLeft + (cardRect.left - containerRect.left)

  scrollContainer.scrollTo({ left: nextLeft, behavior: 'auto' })
}

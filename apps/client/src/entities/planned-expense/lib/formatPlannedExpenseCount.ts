/** Подпись количества планов для timeline. */
export function formatPlannedExpenseCount(count: number): string {
  if (count === 0) {
    return 'нет планов'
  }

  const mod10 = count % 10
  const mod100 = count % 100

  if (mod10 === 1 && mod100 !== 11) {
    return `${count} план`
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return `${count} плана`
  }

  return `${count} планов`
}

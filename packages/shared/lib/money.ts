/** Число, JSON-строка или Prisma Decimal (через `toString`). */
export type MoneyInput = number | string | { toString(): string }

/** Prisma Decimal и JSON-строки сумм → число для арифметики (пока без Decimal.js). */
export function toMoneyNumber(value: MoneyInput): number {
  return Number(value)
}

/** Парсинг суммы из поля ввода (`1 234,56` → `1234.56`). */
export function parseMoneyInput(raw: string): number | null {
  const parsed = Number.parseFloat(raw.trim().replace(',', '.'))
  if (Number.isNaN(parsed) || parsed <= 0) {
    return null
  }
  return parsed
}

export function sumMoneyAmounts(amounts: readonly MoneyInput[]): number {
  return amounts.reduce<number>(
    (sum, amount) => sum + toMoneyNumber(amount),
    0,
  )
}

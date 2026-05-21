/** Prisma Decimal (через `toString`) и числа → number для арифметики на сервере. */
export function toMoneyNumber(value: number | string): number {
  return Number(value);
}

type PrismaAmountRow = { amount: { toString(): string } };

export function sumPrismaMoneyAmounts(
  items: readonly PrismaAmountRow[],
): number {
  return items.reduce<number>(
    (sum, item) => sum + toMoneyNumber(item.amount.toString()),
    0,
  );
}

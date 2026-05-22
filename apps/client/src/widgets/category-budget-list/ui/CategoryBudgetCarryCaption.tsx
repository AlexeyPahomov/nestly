import { formatAmount } from '@/shared/lib/format'

type CategoryBudgetCarryCaptionProps = {
  amount: number
}

export function CategoryBudgetCarryCaption({
  amount,
}: CategoryBudgetCarryCaptionProps) {
  if (amount === 0) {
    return null
  }

  return (
    <p className="mt-0.5 text-xs text-zinc-500">
      Перенесено {formatAmount(amount)}
    </p>
  )
}

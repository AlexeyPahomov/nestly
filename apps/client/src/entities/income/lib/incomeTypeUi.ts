import { INCOME_TYPE_LABELS, type IncomeType } from '@coffer/shared'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowLeftRight,
  Banknote,
  Briefcase,
  CircleDollarSign,
  Laptop,
  Percent,
  Wallet,
} from 'lucide-react'

export type IncomeTypeUi = {
  label: string
  subtitle: string
  Icon: LucideIcon
  avatarClassName: string
  accentClassName: string
}

const INCOME_TYPE_UI: Record<IncomeType, Omit<IncomeTypeUi, 'label'>> = {
  salary: {
    subtitle: 'Регулярный доход',
    Icon: Briefcase,
    avatarClassName: 'bg-blue-subtle text-blue',
    accentClassName: 'text-blue',
  },
  freelance: {
    subtitle: 'Разовый или проектный доход',
    Icon: Laptop,
    avatarClassName: 'bg-violet-100 text-violet-700',
    accentClassName: 'text-violet-700',
  },
  interest: {
    subtitle: 'Пассивный доход',
    Icon: Percent,
    avatarClassName: 'bg-sky-100 text-sky-700',
    accentClassName: 'text-sky-700',
  },
  cashback: {
    subtitle: 'Возврат с покупок',
    Icon: Wallet,
    avatarClassName: 'bg-amber-100 text-amber-800',
    accentClassName: 'text-amber-800',
  },
  refund: {
    subtitle: 'Возмещение расходов',
    Icon: ArrowLeftRight,
    avatarClassName: 'bg-zinc-200 text-zinc-700',
    accentClassName: 'text-zinc-700',
  },
  investment: {
    subtitle: 'Доход от капитала',
    Icon: CircleDollarSign,
    avatarClassName: 'bg-emerald-100 text-emerald-800',
    accentClassName: 'text-emerald-800',
  },
  other: {
    subtitle: 'Прочий доход',
    Icon: Banknote,
    avatarClassName: 'bg-zinc-100 text-zinc-600',
    accentClassName: 'text-zinc-600',
  },
}

export function getIncomeTypeUi(type: IncomeType): IncomeTypeUi {
  return {
    label: INCOME_TYPE_LABELS[type],
    ...INCOME_TYPE_UI[type],
  }
}

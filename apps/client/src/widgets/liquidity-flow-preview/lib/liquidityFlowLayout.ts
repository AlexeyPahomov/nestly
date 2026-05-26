import type { LucideIcon } from 'lucide-react'
import {
  Calendar,
  Landmark,
  Lock,
  Plus,
  Wallet,
} from 'lucide-react'

import { cn } from '@/shared/lib/utils'

export type LiquidityFlowNodeKind =
  | 'income'
  | 'pool'
  | 'planned'
  | 'reserved'
  | 'forecast'

export type LiquidityFlowNodeConfig = {
  kind: LiquidityFlowNodeKind
  label: string
  icon: LucideIcon
  iconWrapClassName: string
  amountClassName: string
}

const nodeConfig: Record<LiquidityFlowNodeKind, Omit<LiquidityFlowNodeConfig, 'kind' | 'label'>> = {
  income: {
    icon: Plus,
    iconWrapClassName: 'bg-emerald-100 text-emerald-600',
    amountClassName: 'text-zinc-900',
  },
  pool: {
    icon: Wallet,
    iconWrapClassName: 'bg-zinc-100 text-zinc-600',
    amountClassName: 'text-zinc-900',
  },
  planned: {
    icon: Calendar,
    iconWrapClassName: 'bg-blue-subtle text-blue',
    amountClassName: 'text-blue',
  },
  reserved: {
    icon: Lock,
    iconWrapClassName: 'bg-orange-subtle text-orange',
    amountClassName: 'text-orange',
  },
  forecast: {
    icon: Landmark,
    iconWrapClassName: 'bg-green-subtle text-green',
    amountClassName: 'text-green',
  },
}

export function getLiquidityFlowNodeConfig(
  kind: LiquidityFlowNodeKind,
  label: string,
): LiquidityFlowNodeConfig {
  return { kind, label, ...nodeConfig[kind] }
}

export const liquidityFlowCardClassName =
  'rounded-xl border border-zinc-200/80 bg-white p-4 shadow-sm'

/** Как на макете: лёгкий фон, тонкая рамка, компактный chevron. */
export const liquidityFlowDetailsButtonClassName =
  'group h-7 gap-1 border-zinc-200 bg-zinc-50 px-2.5 font-normal text-zinc-600 shadow-none hover:bg-zinc-100 hover:text-zinc-700 aria-expanded:bg-zinc-100 aria-expanded:text-zinc-700'

export const liquidityFlowDetailsChevronClassName =
  'size-3.5 text-zinc-500 transition-transform duration-200 group-data-[state=open]:rotate-180 group-aria-expanded:rotate-180'

export const liquidityFlowTrackClassName =
  'flex w-full min-w-0 flex-nowrap items-center gap-2 overflow-x-auto pb-1 sm:gap-3 lg:justify-between lg:gap-4'

export const liquidityFlowNodeClassName =
  'flex shrink-0 items-center gap-2.5'

export const liquidityFlowIconWrapClassName =
  'flex size-9 shrink-0 items-center justify-center rounded-full'

export const liquidityFlowAmountBaseClassName =
  'text-base font-bold leading-tight tabular-nums'

export const liquidityFlowLabelClassName = 'text-xs leading-tight text-zinc-500'

export const liquidityFlowArrowWrapClassName =
  'flex shrink-0 items-center justify-center self-center px-0.5 sm:px-1'

export const liquidityFlowArrowClassName = 'size-4 text-zinc-400'

export function liquidityFlowAmountClassName(
  kind: LiquidityFlowNodeKind,
  amount: number,
): string {
  const base = nodeConfig[kind].amountClassName

  if (amount < 0 && (kind === 'pool' || kind === 'forecast')) {
    return cn(base, 'text-destructive')
  }

  return base
}

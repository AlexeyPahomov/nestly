import { formatAmount } from '@/shared/lib/format'

export type EnvelopeBalanceTone = 'healthy' | 'low' | 'over'

const LOW_REMAINING_RATIO = 0.2

export function getEnvelopeBalanceTone(
  allocated: number,
  remaining: number,
  stressOverBudget = false,
): EnvelopeBalanceTone {
  if (remaining < 0 || stressOverBudget) {
    return 'over'
  }

  if (allocated <= 0) {
    return 'healthy'
  }

  if (remaining / allocated < LOW_REMAINING_RATIO) {
    return 'low'
  }

  return 'healthy'
}

export function getEnvelopeBalanceLabel(isSavings: boolean): string {
  return isSavings ? 'В резерве' : 'Остаток'
}

export function formatEnvelopeBalance(remaining: number): string {
  return formatAmount(remaining)
}

const cardToneClassName: Record<EnvelopeBalanceTone, string> = {
  healthy: 'bg-white ring-zinc-200/80',
  low: 'bg-white ring-zinc-200/80',
  over: 'bg-white ring-zinc-200/80',
}

const balanceToneClassName: Record<EnvelopeBalanceTone, string> = {
  healthy: 'text-blue-700',
  low: 'text-orange-700',
  over: 'text-red-600',
}

const hoverToneClassName: Record<EnvelopeBalanceTone, string> = {
  healthy: 'hover:bg-zinc-50/80',
  low: 'hover:bg-zinc-50/80',
  over: 'hover:bg-zinc-50/80',
}

const progressIndicatorToneClassName: Record<EnvelopeBalanceTone, string> = {
  healthy: 'bg-blue-600',
  low: 'bg-orange-500',
  over: 'bg-red-600',
}

export function envelopeCardToneClassName(tone: EnvelopeBalanceTone): string {
  return cardToneClassName[tone]
}

export function envelopeBalanceToneClassName(tone: EnvelopeBalanceTone): string {
  return balanceToneClassName[tone]
}

export function envelopeHoverToneClassName(tone: EnvelopeBalanceTone): string {
  return hoverToneClassName[tone]
}

export function envelopeProgressIndicatorClassName(
  tone: EnvelopeBalanceTone,
): string {
  return progressIndicatorToneClassName[tone]
}

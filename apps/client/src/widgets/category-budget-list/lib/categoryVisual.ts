import type { EnvelopeBalanceTone } from '@/entities/budget/lib/envelopeBalanceTone'

const toneAccentClassName: Record<EnvelopeBalanceTone, string> = {
  healthy: 'bg-blue-50 text-blue-600',
  low: 'bg-orange-50 text-orange-600',
  over: 'bg-red-50 text-red-600',
}

const toneTextClassName: Record<EnvelopeBalanceTone, string> = {
  healthy: 'text-blue-700',
  low: 'text-orange-700',
  over: 'text-red-600',
}

export function categoryIconWrapClassName(tone: EnvelopeBalanceTone): string {
  return toneAccentClassName[tone]
}

export function categoryAccentTextClassName(tone: EnvelopeBalanceTone): string {
  return toneTextClassName[tone]
}

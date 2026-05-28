import type { IncomeCardTone } from '@/pages/allocation-page/lib/allocationIncomeCard'

export function getToneGradientClassName(tone: IncomeCardTone): string {
  if (tone === 'full') {
    return 'from-green-subtle to-green-muted/80'
  }
  if (tone === 'partial') {
    return 'from-blue-subtle to-teal-subtle'
  }

  return 'from-orange-subtle to-orange-muted/80'
}

export function getToneAccentClassName(tone: IncomeCardTone): string {
  if (tone === 'full') {
    return 'bg-green'
  }
  if (tone === 'partial') {
    return 'bg-blue'
  }

  return 'bg-orange'
}

export function getToneTextClassName(tone: IncomeCardTone): string {
  if (tone === 'full') {
    return 'text-green'
  }
  if (tone === 'partial') {
    return 'text-blue'
  }

  return 'text-orange'
}

export function getToneSurfaceClassName(tone: IncomeCardTone): string {
  if (tone === 'full') {
    return 'bg-linear-to-br from-green-subtle via-green-subtle to-white/95'
  }
  if (tone === 'partial') {
    return 'bg-linear-to-br from-blue-subtle via-teal-subtle to-white/95'
  }

  return 'bg-linear-to-br from-orange-subtle via-orange-subtle to-white/95'
}

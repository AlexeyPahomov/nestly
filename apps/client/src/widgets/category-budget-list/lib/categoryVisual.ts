import {
  Building2,
  Car,
  Home,
  Landmark,
  LandPlot,
  ShoppingCart,
  Trees,
  Utensils,
  Wallet,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react'
import { createElement } from 'react'

import type { EnvelopeBalanceTone } from './envelopeBalanceTone'

const EXPENSE_ICONS: LucideIcon[] = [
  Home,
  LandPlot,
  Trees,
  Building2,
  ShoppingCart,
  Wallet,
  Car,
  Utensils,
]

function hashCategoryId(id: string): number {
  let hash = 0
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

export function getCategoryIcon(
  categoryId: string,
  isSavings: boolean,
): LucideIcon {
  if (isSavings) {
    return Landmark
  }
  return EXPENSE_ICONS[hashCategoryId(categoryId) % EXPENSE_ICONS.length]
}

type CategoryBudgetIconProps = LucideProps & {
  categoryId: string
  isSavings: boolean
}

export function CategoryBudgetIcon({
  categoryId,
  isSavings,
  ...props
}: CategoryBudgetIconProps) {
  return createElement(getCategoryIcon(categoryId, isSavings), props)
}

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

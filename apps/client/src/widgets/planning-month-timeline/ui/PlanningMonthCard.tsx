import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

import { planningMonthCardClassName } from '../lib/planningMonthSwitcherLayout'

import { PlanningMonthCardMeta } from './PlanningMonthCardMeta'

export type PlanningMonthCardProps = {
  label: string
  planCount: number
  swatches: string[]
  active: boolean
  onSelect: () => void
  /** Подпись с планами и цветными метками (страница «Планирование»). */
  showMeta?: boolean
}

export function PlanningMonthCard({
  label,
  planCount,
  swatches,
  active,
  onSelect,
  showMeta = true,
}: PlanningMonthCardProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      className={cn(
        'h-auto w-full font-normal',
        active
          ? 'hover:bg-zinc-900 hover:text-white'
          : 'hover:bg-transparent',
        planningMonthCardClassName(active),
      )}
      onClick={onSelect}
    >
      <span
        className={cn(
          'text-sm font-semibold leading-none',
          active ? 'text-white' : 'text-zinc-900',
        )}
      >
        {label}
      </span>
      {showMeta ? (
        <PlanningMonthCardMeta
          planCount={planCount}
          swatches={swatches}
          active={active}
        />
      ) : null}
    </Button>
  )
}

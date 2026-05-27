import { ChevronDown, InfoIcon } from 'lucide-react'

import type { MonthBudgetProjection } from '@/processes/forecasting'
import { cn } from '@/shared/lib/utils'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui'

import {
  liquidityFlowDetailsButtonClassName,
  liquidityFlowDetailsChevronClassName,
  liquidityFlowDetailsIconButtonClassName,
  liquidityFlowDetailsInfoIconClassName,
  liquidityFlowDetailsPopoverContentClassName,
} from '../lib/liquidityFlowLayout'

import { LiquidityFlowDetails } from './LiquidityFlowDetails'

export type LiquidityFlowDetailsPopoverProps = {
  projection: MonthBudgetProjection
  incomeTotal: number
  variant: 'icon' | 'text'
  className?: string
}

export function LiquidityFlowDetailsPopover({
  projection,
  incomeTotal,
  variant,
  className,
}: LiquidityFlowDetailsPopoverProps) {
  const isIcon = variant === 'icon'

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={isIcon ? 'ghost' : 'outline'}
          size="sm"
          className={cn(
            isIcon
              ? liquidityFlowDetailsIconButtonClassName
              : liquidityFlowDetailsButtonClassName,
            className,
          )}
          aria-label="Подробнее"
        >
          {isIcon ? (
            <InfoIcon
              className={liquidityFlowDetailsInfoIconClassName}
              strokeWidth={2}
              aria-hidden
            />
          ) : (
            <>
              Подробнее
              <ChevronDown
                className={liquidityFlowDetailsChevronClassName}
                strokeWidth={1.75}
                aria-hidden
              />
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className={liquidityFlowDetailsPopoverContentClassName}
      >
        <LiquidityFlowDetails
          projection={projection}
          incomeTotal={incomeTotal}
        />
      </PopoverContent>
    </Popover>
  )
}

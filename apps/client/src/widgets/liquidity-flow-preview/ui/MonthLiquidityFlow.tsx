import { Fragment } from 'react'
import { ChevronDown } from 'lucide-react'

import type { MonthBudgetProjection } from '@/processes/forecasting'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui'

import { buildLiquidityFlowNodes } from '../lib/buildLiquidityFlowNodes'
import {
  liquidityFlowCardClassName,
  liquidityFlowDetailsButtonClassName,
  liquidityFlowDetailsChevronClassName,
  liquidityFlowTrackClassName,
} from '../lib/liquidityFlowLayout'

import { LiquidityFlowArrow } from './LiquidityFlowArrow'
import { LiquidityFlowDetails } from './LiquidityFlowDetails'
import { LiquidityFlowNode } from './LiquidityFlowNode'

export type MonthLiquidityFlowProps = {
  periodLabel: string
  projection: MonthBudgetProjection
  /** Доход за месяц (первая ступень потока). */
  incomeTotal?: number
}

export function MonthLiquidityFlow({
  periodLabel,
  projection,
  incomeTotal = 0,
}: MonthLiquidityFlowProps) {
  const nodes = buildLiquidityFlowNodes(projection, incomeTotal)

  return (
    <section className={liquidityFlowCardClassName}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-medium text-zinc-900">
          Поток ликвидности — {periodLabel}
        </h2>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={liquidityFlowDetailsButtonClassName}
            >
              Подробнее
              <ChevronDown
                className={liquidityFlowDetailsChevronClassName}
                strokeWidth={1.75}
                aria-hidden
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80">
            <LiquidityFlowDetails
              projection={projection}
              incomeTotal={incomeTotal}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className={liquidityFlowTrackClassName}>
        {nodes.map((node, index) => (
          <Fragment key={node.kind}>
            <LiquidityFlowNode node={node} />
            {index < nodes.length - 1 ? <LiquidityFlowArrow /> : null}
          </Fragment>
        ))}
      </div>
    </section>
  )
}

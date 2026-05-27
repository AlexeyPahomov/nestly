import { Fragment } from 'react'

import type { MonthBudgetProjection } from '@/processes/forecasting'
import { cn } from '@/shared/lib/utils'
import { InfoHint } from '@/shared/ui'
import { infoHintTitleTextClassName } from '@/shared/ui/info-hint/infoHintLayout'

import { buildLiquidityFlowNodes } from '../lib/buildLiquidityFlowNodes'
import {
  liquidityFlowCardClassName,
  liquidityFlowHeaderClassName,
  liquidityFlowTitleClassName,
  liquidityFlowTrackClassName,
  liquidityFlowTrackScrollClassName,
} from '../lib/liquidityFlowLayout'

import { LiquidityFlowArrow } from './LiquidityFlowArrow'
import { LiquidityFlowDetails } from './LiquidityFlowDetails'
import { LiquidityFlowNode } from './LiquidityFlowNode'

export type MonthLiquidityFlowProps = {
  projection: MonthBudgetProjection
  /** Доход за месяц (первая ступень потока). */
  incomeTotal?: number
}

export function MonthLiquidityFlow({
  projection,
  incomeTotal = 0,
}: MonthLiquidityFlowProps) {
  const nodes = buildLiquidityFlowNodes(projection, incomeTotal)

  return (
    <section className={liquidityFlowCardClassName}>
      <div className={liquidityFlowHeaderClassName}>
        <h2 className={cn(liquidityFlowTitleClassName, infoHintTitleTextClassName)}>
          Поток ликвидности
        </h2>
        <InfoHint label="Поток ликвидности" align="end" className="shrink-0">
          <LiquidityFlowDetails
            projection={projection}
            incomeTotal={incomeTotal}
          />
        </InfoHint>
      </div>

      <div className={liquidityFlowTrackScrollClassName}>
        <div className={liquidityFlowTrackClassName}>
          {nodes.map((node, index) => (
            <Fragment key={node.kind}>
              <LiquidityFlowNode node={node} />
              {index < nodes.length - 1 ? <LiquidityFlowArrow /> : null}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

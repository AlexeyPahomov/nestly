import { Fragment } from 'react'

import type { MonthBudgetProjection } from '@/processes/forecasting'

import { buildLiquidityFlowNodes } from '../lib/buildLiquidityFlowNodes'
import {
  liquidityFlowCardClassName,
  liquidityFlowDetailsRowClassName,
  liquidityFlowHeaderClassName,
  liquidityFlowScrollInnerClassName,
  liquidityFlowTitleClassName,
  liquidityFlowTrackClassName,
  liquidityFlowTrackScrollClassName,
} from '../lib/liquidityFlowLayout'

import { LiquidityFlowArrow } from './LiquidityFlowArrow'
import { LiquidityFlowDetailsPopover } from './LiquidityFlowDetailsPopover'
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
  const detailsProps = { projection, incomeTotal }

  return (
    <section className={liquidityFlowCardClassName}>
      <div className={liquidityFlowHeaderClassName}>
        <h2 className={liquidityFlowTitleClassName}>Поток ликвидности</h2>
        <LiquidityFlowDetailsPopover
          {...detailsProps}
          variant="icon"
          className="shrink-0 sm:hidden"
        />
      </div>

      <div className={liquidityFlowTrackScrollClassName}>
        <div className={liquidityFlowScrollInnerClassName}>
          <div className={liquidityFlowDetailsRowClassName}>
            <LiquidityFlowDetailsPopover {...detailsProps} variant="text" />
          </div>

          <div className={liquidityFlowTrackClassName}>
            {nodes.map((node, index) => (
              <Fragment key={node.kind}>
                <LiquidityFlowNode node={node} />
                {index < nodes.length - 1 ? <LiquidityFlowArrow /> : null}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

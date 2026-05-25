import { formatAmount } from '@/shared/lib/format'
import { cn } from '@/shared/lib/utils'

import type { LiquidityFlowNodeData } from '../lib/buildLiquidityFlowNodes'
import {
  liquidityFlowAmountBaseClassName,
  liquidityFlowAmountClassName,
  liquidityFlowIconWrapClassName,
  liquidityFlowLabelClassName,
  liquidityFlowNodeClassName,
} from '../lib/liquidityFlowLayout'

export type LiquidityFlowNodeProps = {
  node: LiquidityFlowNodeData
}

export function LiquidityFlowNode({ node }: LiquidityFlowNodeProps) {
  const Icon = node.icon

  return (
    <div className={liquidityFlowNodeClassName}>
      <span
        className={cn(
          liquidityFlowIconWrapClassName,
          node.iconWrapClassName,
        )}
      >
        <Icon className="size-4" strokeWidth={2} aria-hidden />
      </span>
      <div className="flex min-w-0 flex-col justify-center gap-0.5">
        <p
          className={cn(
            liquidityFlowAmountBaseClassName,
            liquidityFlowAmountClassName(node.kind, node.amount),
          )}
        >
          {formatAmount(node.amount)}
        </p>
        <p className={liquidityFlowLabelClassName}>{node.label}</p>
      </div>
    </div>
  )
}

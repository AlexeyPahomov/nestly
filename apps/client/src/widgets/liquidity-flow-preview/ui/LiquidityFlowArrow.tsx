import { ArrowRight } from 'lucide-react'

import {
  liquidityFlowArrowClassName,
  liquidityFlowArrowWrapClassName,
} from '../lib/liquidityFlowLayout'

export function LiquidityFlowArrow() {
  return (
    <span className={liquidityFlowArrowWrapClassName} aria-hidden>
      <ArrowRight className={liquidityFlowArrowClassName} strokeWidth={1.75} />
    </span>
  )
}

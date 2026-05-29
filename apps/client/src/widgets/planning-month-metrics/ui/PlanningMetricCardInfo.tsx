import { InfoHint } from '@/shared/ui'

import {
  planningMetricCardInfoLayout,
  type PlanningMetricCardInfoPlacement,
} from '../lib/planningMetricCardInfoLayout'

export type PlanningMetricCardInfoProps = {
  label: string
  infoText: string
  placement: PlanningMetricCardInfoPlacement
}

export function PlanningMetricCardInfo({
  label,
  infoText,
  placement,
}: PlanningMetricCardInfoProps) {
  return (
    <InfoHint label={label} className={planningMetricCardInfoLayout[placement]}>
      {infoText}
    </InfoHint>
  )
}

import { planningMetricCardMobileCompactLayout } from './planningMetricCardMobileCompactLayout'

export const planningMetricCardInfoLayout = {
  inline: 'shrink-0',
  narrowBottom: 'absolute bottom-2.5 right-2.5',
  mobileCompactTop: planningMetricCardMobileCompactLayout.infoTop,
  mobileCompactDesktopInline:
    planningMetricCardMobileCompactLayout.infoDesktopInline,
} as const

export type PlanningMetricCardInfoPlacement = keyof typeof planningMetricCardInfoLayout

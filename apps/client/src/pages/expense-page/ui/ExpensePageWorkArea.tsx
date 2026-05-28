import { usePageListLayout } from '@/shared/hooks/use-page-list-layout'

import { expensePageWorkAreaClassName, expensePageWorkAreaDesktopClassName } from '../lib/expensePageLayout'

import type { ExpensePageWorkAreaPanelsProps } from './expensePageWorkAreaPanels'
import {
  ExpensePageCategoriesPanel,
  ExpensePageHistoryPanel,
} from './expensePageWorkAreaPanels'
import { ExpensePageWorkAreaMobileCarousel } from './ExpensePageWorkAreaMobileCarousel'

export type ExpensePageWorkAreaProps = ExpensePageWorkAreaPanelsProps

export function ExpensePageWorkArea(props: ExpensePageWorkAreaProps) {
  const listLayout = usePageListLayout()

  return (
    <div className={expensePageWorkAreaClassName}>
      <div className={expensePageWorkAreaDesktopClassName}>
        <ExpensePageCategoriesPanel listLayout={listLayout} {...props} />
        <ExpensePageHistoryPanel listLayout={listLayout} {...props} />
      </div>

      <ExpensePageWorkAreaMobileCarousel listLayout={listLayout} {...props} />
    </div>
  )
}

import { useCollapsePresence } from '@/shared/hooks/useCollapsePresence'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

import type { SavingsTransferHint } from '../lib/savingsTransferHint'
import type { ExpenseBudgetPreview } from '../model/budget'

import { ExpenseBudgetPreviewInline } from './ExpenseBudgetPreviewInline'
import { ExpenseOverBudgetActions } from './ExpenseOverBudgetActions'

type CreateExpenseFormActionsProps = {
  budgetPreview: ExpenseBudgetPreview | null
  showOverBudgetActions: boolean
  savingsTransfer: SavingsTransferHint | null
  noCategories: boolean
  isBusy: boolean
  isRecording: boolean
  isTopUpPending: boolean
  topUpError: string | null
  canTopUp: boolean
  onQuickTopUp: (amount: number) => void
}

export function CreateExpenseFormActions({
  budgetPreview,
  showOverBudgetActions,
  savingsTransfer,
  noCategories,
  isBusy,
  isRecording,
  isTopUpPending,
  topUpError,
  canTopUp,
  onQuickTopUp,
}: CreateExpenseFormActionsProps) {
  const previewPresence = useCollapsePresence(
    budgetPreview !== null,
    budgetPreview,
  )

  return (
    <div className="space-y-3">
      {previewPresence.isMounted && previewPresence.displayValue ? (
        <div
          className={cn(
            'nestly-collapse grid',
            previewPresence.isOpen
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0',
          )}
          aria-hidden={!previewPresence.isOpen}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              className={cn(
                previewPresence.isOpen && 'nestly-budget-preview-enter',
              )}
            >
              <ExpenseBudgetPreviewInline
                preview={previewPresence.displayValue}
              />
            </div>
          </div>
        </div>
      ) : null}

      {showOverBudgetActions ? (
        <ExpenseOverBudgetActions
          savingsTransfer={savingsTransfer}
          onQuickTopUp={onQuickTopUp}
          isRecording={isRecording}
          isTopUpPending={isTopUpPending}
          topUpError={topUpError}
          canTopUp={canTopUp}
        />
      ) : null}

      <Button
        type="submit"
        isLoading={isRecording}
        size="lg"
        className="min-w-40"
        disabled={isBusy || noCategories}
      >
        Добавить расход
      </Button>
    </div>
  )
}

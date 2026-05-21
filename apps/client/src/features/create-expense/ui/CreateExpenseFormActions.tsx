import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

import type { SavingsTransferHint } from '../lib/savingsTransferHint'
import type { ExpenseBudgetPreview } from '../model/budget'

import { ExpenseBudgetWarning } from './ExpenseBudgetWarning'

type CreateExpenseFormActionsProps = {
  showOverBudgetWarning: boolean
  budgetPreview: ExpenseBudgetPreview | null
  savingsTransfer: SavingsTransferHint | null
  noCategories: boolean
  isBusy: boolean
  isRecording: boolean
  isTopUpPending: boolean
  topUpError: string | null
  canTopUp: boolean
  onRecordExpense: () => void
  onQuickTopUp: (amount: number) => void
}

export function CreateExpenseFormActions({
  showOverBudgetWarning,
  budgetPreview,
  savingsTransfer,
  noCategories,
  isBusy,
  isRecording,
  isTopUpPending,
  topUpError,
  canTopUp,
  onRecordExpense,
  onQuickTopUp,
}: CreateExpenseFormActionsProps) {
  return (
    <div className="space-y-0">
      <div
        className={cn(
          'nestly-collapse grid',
          showOverBudgetWarning && budgetPreview
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0',
        )}
        aria-hidden={!showOverBudgetWarning}
      >
        <div className="min-h-0 overflow-hidden">
          {showOverBudgetWarning && budgetPreview ? (
            <div className="nestly-budget-warning-enter">
              <ExpenseBudgetWarning
                preview={budgetPreview}
                savingsTransfer={savingsTransfer}
                onRecordExpense={onRecordExpense}
                onQuickTopUp={onQuickTopUp}
                isRecording={isRecording}
                isTopUpPending={isTopUpPending}
                topUpError={topUpError}
                canTopUp={canTopUp}
              />
            </div>
          ) : null}
        </div>
      </div>

      <div
        className={cn(
          'nestly-list-fade overflow-hidden',
          showOverBudgetWarning
            ? 'pointer-events-none max-h-0 opacity-0'
            : 'max-h-24 opacity-100',
        )}
        aria-hidden={showOverBudgetWarning}
      >
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
    </div>
  )
}

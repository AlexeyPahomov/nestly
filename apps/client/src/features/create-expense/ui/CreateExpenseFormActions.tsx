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
  return (
    <div className="space-y-3">
      {budgetPreview ? (
        <ExpenseBudgetPreviewInline preview={budgetPreview} />
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

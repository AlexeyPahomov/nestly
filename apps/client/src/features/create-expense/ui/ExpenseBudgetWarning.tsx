import { Link } from 'react-router-dom';

import { appRouteHref } from '@/app/config/routes';
import { formatAmount } from '@/shared/lib/format';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui';

import { QUICK_TOP_UP_AMOUNTS } from '../model/constants';
import type { SavingsTransferHint } from '../lib/savingsTransferHint';
import type { ExpenseBudgetPreview } from '../model/budget';

type ExpenseBudgetWarningProps = {
  preview: ExpenseBudgetPreview;
  savingsTransfer?: SavingsTransferHint | null;
  onRecordExpense: () => void;
  onQuickTopUp: (amount: number) => void;
  isRecording: boolean;
  isTopUpPending: boolean;
  topUpError: string | null;
  canTopUp: boolean;
};

export function ExpenseBudgetWarning({
  preview,
  savingsTransfer,
  onRecordExpense,
  onQuickTopUp,
  isRecording,
  isTopUpPending,
  topUpError,
  canTopUp,
}: ExpenseBudgetWarningProps) {
  return (
    <div
      role="status"
      className={cn(
        'space-y-3 rounded-lg border border-amber-200 bg-amber-50/80 p-4',
      )}
    >
      <div className="space-y-1">
        <p className="text-sm font-medium text-amber-950">
          Бюджет категории «{preview.categoryName}» будет превышен на{' '}
          {formatAmount(preview.overAmount)}
        </p>
        <p className="text-sm text-amber-900/80">
          После операции останется{' '}
          <span className="font-medium tabular-nums text-red-700">
            −{formatAmount(preview.overAmount)}
          </span>
        </p>
        {savingsTransfer ? (
          <>
            {/* <p className="text-sm text-emerald-900/90">
            // TODO подумать над текстом
            В «{savingsTransfer.savingsName}» зарезервировано{' '}
            {formatAmount(savingsTransfer.available)} — можно перераспределить
            на странице «Распределение».
          </p> */}
          </>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="default"
          isLoading={isRecording}
          disabled={isRecording || isTopUpPending}
          onClick={onRecordExpense}
        >
          Записать расход
        </Button>
        {QUICK_TOP_UP_AMOUNTS.map((amount) => (
          <Button
            key={amount}
            type="button"
            variant="outline"
            size="default"
            disabled={!canTopUp || isRecording || isTopUpPending}
            onClick={() => onQuickTopUp(amount)}
          >
            +{formatAmount(amount)}
          </Button>
        ))}
        <Button
          type="button"
          variant="outline"
          size="default"
          disabled={isRecording || isTopUpPending}
          asChild
        >
          <Link to={appRouteHref('allocation')}>Изменить лимит</Link>
        </Button>
      </div>

      {topUpError ? (
        <p className="text-sm text-red-600">{topUpError}</p>
      ) : !canTopUp ? (
        <p className="text-sm text-amber-900/80">
          Нет свободных средств в доходах для быстрого пополнения — измените
          лимит на странице распределения.
        </p>
      ) : null}
    </div>
  );
}

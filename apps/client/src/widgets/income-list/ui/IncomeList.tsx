import { useDeleteIncomeMutation } from '@/entities/income/api/useDeleteIncomeMutation';
import { useIncomesQuery } from '@/entities/income/api/useIncomesQuery';
import { IncomeCard } from '@/entities/income/ui/IncomeCard';
import { getErrorMessage } from '@/shared/lib/errors';
import { Spinner } from '@/shared/ui';

import { ListEmpty } from './ListEmpty';
import { ListError } from './ListError';
import { ListLoader } from './ListLoader';

export function IncomeList() {
  const { data, isPending, isError, error, isFetching } = useIncomesQuery();
  const deleteMutation = useDeleteIncomeMutation();

  if (isPending) {
    return <ListLoader />;
  }

  if (isError && data === undefined) {
    return <ListError error={error} />;
  }

  const items = data ?? [];
  if (items.length === 0) {
    return <ListEmpty />;
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div className="flex shrink-0 flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-zinc-900">
            Список доходов
          </h2>
          {isFetching ? (
            <Spinner
              className="size-4 shrink-0 text-zinc-500"
              aria-label="Обновление списка"
            />
          ) : null}
        </div>
        {deleteMutation.isError ? (
          <p className="text-sm text-destructive">
            {getErrorMessage(deleteMutation.error, 'Не удалось удалить доход')}
          </p>
        ) : null}
      </div>
      <ul className="min-h-0 flex-1 list-none space-y-3 overflow-y-auto overscroll-contain pr-1">
        {items.map((income) => (
          <li key={income.id}>
            <IncomeCard
              income={income}
              isDeleting={
                deleteMutation.isPending &&
                deleteMutation.variables === income.id
              }
              onDelete={() => {
                deleteMutation.reset();
                deleteMutation.mutate(income.id);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

import type { ReactNode, UIEventHandler } from 'react';

import { cn } from '@/shared/lib/utils';

import { ListEmpty } from './ListEmpty';
import { ListError } from './ListError';
import { ListLoader } from './ListLoader';
import { ItemsListHeader } from './ItemsListHeader';

export type ItemsListLayout = 'fill' | 'fit';

export type ItemsListProps<T> = {
  isPending: boolean;
  isError: boolean;
  error: unknown;
  data: T[] | undefined;
  isFetching: boolean;
  title?: string;
  emptyMessage?: string;
  errorFallback?: string;
  /** Элемент справа в строке заголовка (например, кнопка действия). */
  headerEnd?: ReactNode;
  headerAddon?: ReactNode;
  className?: string;
  /** Доп. классы для `<ul>` (например, grid-колонки). */
  listClassName?: string;
  /** Скролл прокручиваемого `<ul>` (layout `fill`). */
  onListScroll?: UIEventHandler<HTMLUListElement>;
  /** `fill` — на всю высоту контейнера со скроллом; `fit` — по высоте элементов */
  layout?: ItemsListLayout;
  /** Содержимое `<ul>`: обычно набор `<li>…</li>` */
  children: (items: T[]) => ReactNode;
  /** Блок под списком (например, «Показать ещё»). */
  listFooter?: ReactNode;
};

const listUlFillClassName =
  'nestly-scroll-list min-h-0 flex-1 list-none space-y-3 overflow-y-auto overscroll-contain p-1.5';

const listUlFitClassName = 'list-none space-y-3';

export function ItemsList<T>({
  isPending,
  isError,
  error,
  data,
  isFetching,
  title,
  emptyMessage,
  errorFallback,
  headerEnd,
  headerAddon,
  className,
  listClassName,
  onListScroll,
  layout = 'fill',
  children,
  listFooter,
}: ItemsListProps<T>) {
  const rootClassName = cn(
    'flex flex-col',
    layout === 'fill' ? 'min-h-0 flex-1' : 'h-fit w-full max-h-full',
    className,
  );
  const listUlClassName =
    layout === 'fill' ? listUlFillClassName : listUlFitClassName;

  const items = data ?? [];
  const showLoader = isPending;
  const showError = !isPending && isError && data === undefined;
  const showEmpty = !isPending && !showError && items.length === 0;
  const showList = !isPending && !showError && items.length > 0;

  return (
    <div className={cn(rootClassName, 'gap-3')} aria-busy={isPending}>
      <ItemsListHeader
        title={title}
        headerEnd={headerEnd}
        headerAddon={headerAddon}
        isFetching={isFetching}
        isPending={isPending}
      />

      <div className="relative flex min-h-0 flex-1 flex-col">
        <div
          aria-hidden={!showLoader}
          className={cn(
            'flex min-h-0 flex-1 flex-col',
            'nestly-list-fade',
            showLoader
              ? 'opacity-100'
              : 'pointer-events-none absolute inset-0 z-10 opacity-0',
          )}
        >
          <ListLoader />
        </div>

        <div
          className={cn(
            'nestly-list-fade flex min-h-0 flex-col gap-3',
            showLoader
              ? 'pointer-events-none absolute inset-0 opacity-0'
              : 'min-h-0 flex-1 opacity-100',
          )}
        >
          {showError ? (
            <ListError error={error} fallbackMessage={errorFallback} />
          ) : null}
          {showEmpty ? <ListEmpty message={emptyMessage} /> : null}
          {showList ? (
            <>
              <ul
                className={cn(
                  listUlClassName,
                  'nestly-list-enter motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-300',
                  listClassName,
                )}
                onScroll={onListScroll}
              >
                {children(items)}
              </ul>
              {listFooter}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

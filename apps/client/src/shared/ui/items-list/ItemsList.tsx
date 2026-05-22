import type { ReactNode, UIEventHandler } from 'react'

import { cn } from '@/shared/lib/utils'

import { ItemsListInteractive, ItemsListInteractiveList } from './ItemsListInteractive'
import { ItemsListHeader } from './ItemsListHeader'
import { ListEmpty } from './ListEmpty'
import { ListError } from './ListError'
import { ListLoader } from './ListLoader'
import { itemsListShellClassName } from './itemsListLayout'

export type ItemsListLayout = 'fill' | 'fit'

export type ItemsListProps<T> = {
  isPending: boolean
  isError: boolean
  error: unknown
  data: T[] | undefined
  isFetching: boolean
  title?: string
  emptyMessage?: string
  errorFallback?: string
  /** Элемент справа в строке заголовка (например, кнопка действия). */
  headerEnd?: ReactNode
  headerAddon?: ReactNode
  className?: string
  /** Доп. классы для `<ul>` (например, grid-колонки). */
  listClassName?: string
  /** Скролл прокручиваемого `<ul>` (layout `fill`). */
  onListScroll?: UIEventHandler<HTMLUListElement>
  /** `fill` — на всю высоту контейнера со скроллом; `fit` — по высоте элементов */
  layout?: ItemsListLayout
  /** Содержимое `<ul>`: обычно набор `<li>…</li>` */
  children: (items: T[]) => ReactNode
  /** Блок под списком (например, «Показать ещё»). */
  listFooter?: ReactNode
  /** Клик по заголовку списка (`title`). */
  onTitleClick?: () => void
  /** Только шапка: тело списка (скролл, пустое, ошибка) скрыто. */
  bodyCollapsed?: boolean
}

const listUlFillClassName =
  'nestly-scroll-list min-h-0 flex-1 list-none space-y-3 overflow-y-auto overscroll-y-contain [overflow-anchor:none] p-1.5'

const listUlFitClassName = 'list-none space-y-3'

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
  onTitleClick,
  bodyCollapsed = false,
}: ItemsListProps<T>) {
  const rootClassName = cn(
    'flex flex-col',
    bodyCollapsed
      ? 'h-fit w-full shrink-0'
      : layout === 'fill'
        ? 'min-h-0 flex-1'
        : 'h-fit w-full max-h-full',
    className,
  )
  const listUlClassName =
    layout === 'fill' ? listUlFillClassName : listUlFitClassName

  const items = data ?? []
  const showLoader = isPending
  const showError = !isPending && isError && data === undefined
  const showEmpty = !isPending && !showError && items.length === 0
  const showList = !isPending && !showError && items.length > 0

  return (
    <div
      data-slot="items-list"
      className={cn(
        rootClassName,
        bodyCollapsed ? 'gap-0' : 'gap-3',
        itemsListShellClassName,
      )}
      aria-busy={isPending}
    >
      <ItemsListHeader
        title={title}
        headerEnd={bodyCollapsed ? undefined : headerEnd}
        headerAddon={bodyCollapsed ? undefined : headerAddon}
        isFetching={bodyCollapsed ? false : isFetching}
        isPending={isPending}
        onTitleClick={onTitleClick}
      />

      {bodyCollapsed ? null : (
      <div
        className={cn(
          'relative flex min-h-0 flex-1 flex-col',
          itemsListShellClassName,
        )}
      >
        <div
          aria-hidden={!showLoader}
          className={cn(
            'nestly-list-fade flex min-h-0 flex-1 flex-col',
            showLoader
              ? 'opacity-100'
              : 'pointer-events-none absolute inset-0 z-10 opacity-0',
          )}
        >
          {showLoader ? (
            <ItemsListInteractive className="flex min-h-0 flex-1 flex-col">
              <ListLoader />
            </ItemsListInteractive>
          ) : null}
        </div>

        <div
          className={cn(
            'nestly-list-fade flex min-h-0 flex-col gap-3',
            showLoader
              ? cn(
                  itemsListShellClassName,
                  'pointer-events-none absolute inset-0 opacity-0',
                )
              : 'min-h-0 flex-1 opacity-100',
          )}
        >
          {showError ? (
            <ItemsListInteractive className="flex min-h-0 flex-1 flex-col">
              <ListError error={error} fallbackMessage={errorFallback} />
            </ItemsListInteractive>
          ) : null}
          {showEmpty ? (
            <ItemsListInteractive className="flex min-h-0 flex-1 flex-col">
              <ListEmpty message={emptyMessage} />
            </ItemsListInteractive>
          ) : null}
          {showList ? (
            <>
              <ItemsListInteractiveList
                className={cn(
                  listUlClassName,
                  'nestly-list-enter motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-300',
                  listClassName,
                )}
                onScroll={onListScroll}
              >
                {children(items)}
              </ItemsListInteractiveList>
              {listFooter ? (
                <ItemsListInteractive>{listFooter}</ItemsListInteractive>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
      )}
    </div>
  )
}

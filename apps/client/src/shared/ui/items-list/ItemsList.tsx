import type { ReactNode } from 'react'

import { Spinner } from '../spinner/Spinner'

import { ListEmpty } from './ListEmpty'
import { ListError } from './ListError'
import { ListLoader } from './ListLoader'

export type ItemsListProps<T> = {
  isPending: boolean
  isError: boolean
  error: unknown
  data: T[] | undefined
  isFetching: boolean
  title: string
  emptyMessage?: string
  errorFallback?: string
  headerAddon?: ReactNode
  /** Содержимое `<ul>`: обычно набор `<li>…</li>` */
  children: (items: T[]) => ReactNode
}

const listUlClassName =
  'min-h-0 flex-1 list-none space-y-3 overflow-y-auto overscroll-contain pr-1'

export function ItemsList<T>({
  isPending,
  isError,
  error,
  data,
  isFetching,
  title,
  emptyMessage,
  errorFallback,
  headerAddon,
  children,
}: ItemsListProps<T>) {
  if (isPending) {
    return <ListLoader />
  }

  if (isError && data === undefined) {
    return <ListError error={error} fallbackMessage={errorFallback} />
  }

  const items = data ?? []
  if (items.length === 0) {
    return <ListEmpty message={emptyMessage} />
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div className="flex shrink-0 flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
          {isFetching ? (
            <Spinner
              className="size-4 shrink-0 text-zinc-500"
              aria-label="Обновление списка"
            />
          ) : null}
        </div>
        {headerAddon}
      </div>
      <ul className={listUlClassName}>{children(items)}</ul>
    </div>
  )
}

import type { ReactNode } from 'react'

import { cn } from '@/shared/lib/utils'

import { Spinner } from '../spinner/Spinner'

type ItemsListHeaderProps = {
  title?: string
  headerEnd?: ReactNode
  headerAddon?: ReactNode
  isFetching: boolean
  isPending: boolean
}

export function ItemsListHeader({
  title,
  headerEnd,
  headerAddon,
  isFetching,
  isPending,
}: ItemsListHeaderProps) {
  const showHeaderRow =
    Boolean(title) || headerEnd != null || (isFetching && !isPending)

  if (!showHeaderRow && headerAddon == null) {
    return null
  }

  return (
    <div className="flex shrink-0 flex-col gap-1">
      {showHeaderRow ? (
        <div
          className={cn(
            'flex items-center gap-2 px-2',
            title ? 'justify-between' : 'justify-end',
          )}
        >
          {title ? (
            <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
          ) : null}
          {headerEnd || (isFetching && !isPending) ? (
            <div className="flex shrink-0 items-center gap-2">
              {headerEnd}
              {isFetching && !isPending ? (
                <Spinner
                  className="size-4 shrink-0 text-zinc-500"
                  aria-label="Обновление списка"
                />
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
      {headerAddon}
    </div>
  )
}

import { cn } from '@/shared/lib/utils'

import { getItemsListInteractiveProps } from './itemsListLayout'

type ItemsListTitleProps = {
  children: string
  onClick?: () => void
}

export function ItemsListTitle({ children, onClick }: ItemsListTitleProps) {
  if (!onClick) {
    return (
      <h2 className="text-lg font-semibold text-zinc-900">{children}</h2>
    )
  }

  const interactive = getItemsListInteractiveProps()

  return (
    <button
      type="button"
      {...interactive}
      className={cn(
        interactive.className,
        'rounded-md text-left text-lg font-semibold text-zinc-900',
        'transition-colors hover:text-zinc-700',
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

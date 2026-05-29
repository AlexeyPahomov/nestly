import { cn } from '@/shared/lib/utils'

import { Spinner } from '../spinner/Spinner'

type PageContentLoaderProps = {
  className?: string
}

/** Лоадер на всю область контента страницы (под заголовком). */
export function PageContentLoader({ className }: PageContentLoaderProps) {
  return (
    <div
      className={cn(
        'flex min-h-0 flex-1 flex-col items-center justify-center',
        className,
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Spinner className="size-8 text-zinc-500" aria-label="Загрузка" />
    </div>
  )
}

/** Заголовок страницы (h1). */
export const pageTitleClassName =
  'text-lg font-bold leading-none tracking-tight text-zinc-900'

/** Секция страницы: заголовок ↔ контент. */
export const pageSectionClassName =
  'flex min-h-0 flex-1 flex-col gap-4'

/** Стек шапки: строка заголовка ↔ доп. toolbar. */
export const pageSectionHeaderStackClassName =
  'flex shrink-0 flex-col gap-4'

/** Шапка страницы. */
export const pageSectionHeaderClassName =
  'flex w-full shrink-0 items-center gap-3'

export const pageSectionHeaderMainClassName = 'min-w-0 flex-1'

/** Строка заголовка — та же высота, что у однострочного тулбара. */
export const pageSectionTitleRowClassName =
  'flex min-h-9 min-w-0 items-center gap-2'

/** Однострочный тулбар вместо `title` (напр. «Расходы» + month picker). */
export const pageSectionToolbarClassName =
  'flex w-full min-h-9 shrink-0 items-center justify-between gap-3'

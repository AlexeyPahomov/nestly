export const plannedExpenseCardClassName = 'gap-0 border-zinc-200/80 py-4 shadow-none'

export const plannedExpenseCardBodyClassName =
  'grid grid-cols-[1fr_auto] items-start gap-x-3 gap-y-1.5 px-4'

export const plannedExpenseCardTitleClassName =
  'col-start-1 row-start-1 min-w-0 text-base font-medium leading-tight'

export const plannedExpenseCardStatusBadgeClassName =
  'col-start-2 row-start-1 justify-self-end'

export const plannedExpenseCardContextClassName =
  'col-start-1 row-start-2 flex min-w-0 flex-col gap-1 text-sm text-zinc-600'

export const plannedExpenseAmountClassName =
  'col-start-2 row-start-2 justify-self-end self-end text-xl font-bold tabular-nums leading-none text-zinc-900'

/** Пункт «Зарезервировать» в дропдауне карточки. */
export const plannedExpenseReserveMenuItemClassName =
  'w-full justify-start gap-2 text-orange hover:bg-orange-muted hover:text-orange-hover'

/** Пункт «Снять резерв» в дропдауне карточки. */
export const plannedExpenseUnreserveMenuItemClassName =
  'w-full justify-start gap-2 text-blue hover:bg-blue-muted hover:text-blue-hover'

/** Кликабельный тег статуса «План». */
export const plannedExpensePlannedBadgeClassName =
  'rounded-md bg-blue-subtle text-blue hover:bg-blue-muted disabled:pointer-events-none disabled:opacity-50'

/** Неактивный тег «План». */
export const plannedExpensePlannedBadgeStaticClassName =
  'rounded-md bg-blue-subtle text-blue'

/** Кликабельный тег статуса «Резерв». */
export const plannedExpenseReservedBadgeClassName =
  'rounded-md bg-orange-subtle text-orange hover:bg-orange-muted disabled:pointer-events-none disabled:opacity-50'

/** Неактивный тег «Резерв». */
export const plannedExpenseReservedBadgeStaticClassName =
  'rounded-md bg-orange-subtle text-orange'

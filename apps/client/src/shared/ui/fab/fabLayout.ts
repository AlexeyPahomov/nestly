/** Вертикальный резерв под FAB в прокручиваемой области страницы (мобилка). */
export const mobileFabScrollReserveClassName =
  'max-md:pb-[calc(4rem+env(safe-area-inset-bottom))]'

export const fabWrapClassName =
  'fixed end-0 bottom-0 z-40 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pe-[max(0.75rem,env(safe-area-inset-right))] md:hidden'

export const fabButtonClassName = 'size-12 shrink-0 rounded-full shadow-md'

/** Кнопка с текстом в шапке — только на md+, на мобилке FAB. */
export const fabDesktopAddButtonClassName = 'hidden shrink-0 md:inline-flex'

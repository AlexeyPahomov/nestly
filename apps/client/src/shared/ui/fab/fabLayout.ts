/** Вертикальный резерв под FAB в прокручиваемой области страницы (мобилка). */
export const mobileFabScrollReserveClassName =
  'max-md:pb-[calc(6.625rem+env(safe-area-inset-bottom))]';

export const fabWrapClassName =
  'pointer-events-none fixed end-0 bottom-0 z-40 p-3 pb-[calc(4.75rem+env(safe-area-inset-bottom))] pe-[max(0.5rem,env(safe-area-inset-right))] md:hidden';

export const fabButtonClassName = 'size-12 shrink-0 rounded-full shadow-md';

/** Кнопка с текстом в шапке — только на md+, на мобилке FAB. */
export const fabDesktopAddButtonClassName = 'hidden shrink-0 md:inline-flex';

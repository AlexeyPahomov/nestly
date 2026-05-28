import { cn } from '@/shared/lib/utils';

/** Вертикальный резерв под FAB в прокручиваемой области страницы (мобилка). */
export const mobileFabScrollReserveClassName =
  'max-md:pb-[calc(5.875rem+env(safe-area-inset-bottom))]';

/** Нижний отступ ряда FAB / вспомогательных кнопок: h-16 tab bar + небольшой зазор. */
export const mobileFabRowBottomClassName =
  'pb-[calc(4rem+0.5rem+env(safe-area-inset-bottom))]';

export const fabWrapClassName = cn(
  'pointer-events-none fixed end-0 bottom-0 z-40 p-3 pe-[max(0.5rem,env(safe-area-inset-right))] md:hidden',
  mobileFabRowBottomClassName,
);

/** Левый нижний угол — на одной линии с FAB (мобилка). */
export const mobileFabRowStartWrapClassName = cn(
  'pointer-events-none fixed start-0 bottom-0 z-40 p-3 ps-[max(0.5rem,env(safe-area-inset-left))] md:hidden',
  mobileFabRowBottomClassName,
);

export const fabButtonClassName = 'size-12 shrink-0 rounded-full shadow-md';

/** Кнопка с текстом в шапке — только на md+, на мобилке FAB. */
export const fabDesktopAddButtonClassName = 'hidden shrink-0 md:inline-flex';

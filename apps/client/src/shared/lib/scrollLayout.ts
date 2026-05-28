/** Вертикальный скролл с передачей жеста родителю после конца списка. */
export const scrollAreaClassName =
  'coffer-scroll-list overflow-y-auto overscroll-y-auto [overflow-anchor:none]';

/** pt/ps/pe — ring карточек не обрезается у краёв scrollport. */
export const pageScrollRingInsetClassName =
  'pt-px ps-px pe-px md:pt-0.5 md:ps-px md:pe-0';

/** Отступы прокручиваемой области страницы на мобилке (скроллбар + ring карточек). */
export const mobilePageScrollPaddingClassName = [
  pageScrollRingInsetClassName,
  'pb-8 pe-2 md:pb-0 md:pe-0',
].join(' ');

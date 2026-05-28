/** Маршруты приложения (app shell): сегменты как `path` дочерних роутов layout и подписи для навигации. */
export const APP_ROUTES = [
  { id: 'income', label: 'Доходы', segment: 'income' },
  { id: 'allocation', label: 'Бюджет', segment: 'allocation' },
  { id: 'expenses', label: 'Расходы', segment: 'expenses' },
  { id: 'planning', label: 'Планирование', mobileLabel: 'План', segment: 'planning' },
  { id: 'categories', label: 'Категории', segment: 'categories' },
] as const

export type AppRouteId = (typeof APP_ROUTES)[number]['id']

export type AppRouteSegment = (typeof APP_ROUTES)[number]['segment']

/** Сегмент главного экрана — цель редиректа с `/`. */
export const APP_DEFAULT_SEGMENT = 'planning' satisfies AppRouteSegment

export function appRouteLabel(id: AppRouteId): string {
  const route = APP_ROUTES.find((item) => item.id === id)
  if (!route) {
    throw new Error(`Unknown route id: ${id}`)
  }
  return route.label
}

/** Короткая подпись пункта меню для мобильной навигации. */
export function appRouteMobileNavLabel(
  route: (typeof APP_ROUTES)[number],
): string {
  return 'mobileLabel' in route && route.mobileLabel
    ? route.mobileLabel
    : route.label
}

/** Полный путь: `/income`, `/allocation`, … */
export function appRouteHref(segment: AppRouteSegment): string {
  return `/${segment}`
}

/** Пункты меню — производные от `APP_ROUTES`. */
export const APP_NAVIGATION = APP_ROUTES.map((route) => ({
  label: route.label,
  to: appRouteHref(route.segment),
}))

export type AppNavigationItem = (typeof APP_NAVIGATION)[number]

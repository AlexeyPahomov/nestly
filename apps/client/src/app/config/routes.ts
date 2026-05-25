/** Маршруты приложения (app shell): сегменты как `path` дочерних роутов layout и подписи для навигации. */
export const APP_ROUTES = [
  { id: 'income', label: 'Income', segment: 'income' },
  { id: 'allocation', label: 'Allocation', segment: 'allocation' },
  { id: 'expenses', label: 'Expenses', segment: 'expenses' },
  { id: 'planning', label: 'Planning', segment: 'planning' },
  { id: 'categories', label: 'Categories', segment: 'categories' },
] as const

export type AppRouteId = (typeof APP_ROUTES)[number]['id']

export type AppRouteSegment = (typeof APP_ROUTES)[number]['segment']

/** Сегмент первого маршрута — цель редиректа с `/`. */
export const APP_DEFAULT_SEGMENT = APP_ROUTES[0].segment

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

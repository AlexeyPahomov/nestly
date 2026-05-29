/** Фоновое обновление: данные уже есть, идёт refetch. */
export function isQueryRefetching(
  isPending: boolean,
  isFetching: boolean,
): boolean {
  return !isPending && isFetching
}

/** @deprecated Используйте `isPending` для первичной загрузки и `isQueryRefetching` для фона. */
export function isQueryLoading(
  isPending: boolean,
  isFetching: boolean,
): boolean {
  return isPending || isFetching
}

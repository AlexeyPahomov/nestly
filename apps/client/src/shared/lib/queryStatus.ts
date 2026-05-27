/** Индикатор загрузки в шапке страницы (первичная загрузка или refetch). */
export function isQueryLoading(
  isPending: boolean,
  isFetching: boolean,
): boolean {
  return isPending || isFetching
}

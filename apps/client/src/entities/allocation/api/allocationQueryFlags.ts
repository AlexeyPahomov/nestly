type AllocationQueryFlags = {
  isFetching: boolean
  isPlaceholderData: boolean
}

/** Фоновая подгрузка без placeholder — показываем индикатор в UI. */
export function isAllocationListBackgroundFetch({
  isFetching,
  isPlaceholderData,
}: AllocationQueryFlags): boolean {
  return isFetching && !isPlaceholderData
}

export const liquidityFlowRailClassName = 'min-w-0 pe-6'

export const liquidityFlowRailGridClassName =
  'grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] gap-x-0.5 gap-y-0.5'

export const liquidityFlowRailCellClassName = 'flex min-w-0 justify-center'

export const liquidityFlowRailAmountClassName =
  'text-xs font-bold tabular-nums leading-none sm:text-sm'

export const liquidityFlowRailLabelClassName =
  'max-w-full truncate text-[10px] leading-tight text-zinc-500'

export const liquidityFlowRailArrowClassName =
  'size-3 shrink-0 self-center text-zinc-300'

/** Колонка суммы/стрелки: 1, 3, 5, 7; стрелки — чётные колонки второй строки. */
export function liquidityFlowRailGridColumn(index: number): number {
  return index * 2 + 1
}

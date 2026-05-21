/** Оболочка ItemsList: не перехватывает клики по пустому месту вокруг контента. */
export const itemsListShellClassName = 'pointer-events-none'

/** Заголовок, список, состояния загрузки — интерактивная область ItemsList. */
export const itemsListInteractiveClassName = 'pointer-events-auto'

export const itemsListInteractiveDataAttr = 'data-items-list-interactive'

const uiOverlayPointerTargetSelector = [
  '[data-slot="dialog-content"]',
  '[data-slot="dialog-overlay"]',
  '[data-slot="popover-content"]',
  '[data-slot="select-content"]',
].join(', ')

const itemsListPointerTargetSelector = `[${itemsListInteractiveDataAttr}], ${uiOverlayPointerTargetSelector}`

export function getItemsListInteractiveProps() {
  return {
    [itemsListInteractiveDataAttr]: '',
    className: itemsListInteractiveClassName,
  } as const
}

/** Клик по интерактивной области ItemsList или порталу UI. */
export function isItemsListPointerTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) {
    return false
  }

  return target.closest(itemsListPointerTargetSelector) != null
}

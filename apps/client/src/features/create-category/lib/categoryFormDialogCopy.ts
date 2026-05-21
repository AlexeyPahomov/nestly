export function categoryFormDialogTitle(isEditing: boolean): string {
  return isEditing ? 'Редактировать категорию' : 'Новая категория'
}

export function categoryFormDialogDescription(isEditing: boolean): string {
  return isEditing
    ? 'Измените название, тип или иконку категории.'
    : 'Укажите название, тип и иконку новой категории.'
}

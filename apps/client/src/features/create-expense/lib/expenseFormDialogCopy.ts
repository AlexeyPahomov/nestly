export function expenseFormDialogTitle(isEditing: boolean): string {
  return isEditing ? 'Редактировать расход' : 'Новый расход'
}

export function expenseFormDialogDescription(isEditing: boolean): string {
  return isEditing
    ? 'Измените категорию, сумму, описание или дату расхода.'
    : 'Укажите категорию, сумму и дату нового расхода.'
}

export function incomeFormDialogTitle(isEditing: boolean): string {
  return isEditing ? 'Редактировать доход' : 'Новый доход'
}

export function incomeFormDialogDescription(isEditing: boolean): string {
  return isEditing
    ? 'Измените сумму, источник или месяц дохода.'
    : 'Укажите сумму, источник и месяц дохода.'
}

export function incomeFormSubmitLabel(isEditing: boolean): string {
  return isEditing ? 'Сохранить' : 'Добавить доход'
}

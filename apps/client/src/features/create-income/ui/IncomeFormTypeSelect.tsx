import {
  INCOME_TYPES,
  INCOME_TYPE_LABELS,
  isIncomeType,
  type IncomeType,
} from '@coffer/shared'

import { incomeFormFieldClassName } from '../lib/incomeFormLayout'

import { Select } from '@/shared/ui'

type IncomeFormTypeSelectProps = {
  id?: string
  value: string
  onChange: (incomeType: IncomeType) => void
  disabled?: boolean
}

export function IncomeFormTypeSelect({
  id = 'income-type',
  value,
  onChange,
  disabled,
}: IncomeFormTypeSelectProps) {
  return (
    <Select
      id={id}
      value={value}
      onValueChange={(value) => {
        if (isIncomeType(value)) {
          onChange(value)
        }
      }}
      disabled={disabled}
      placeholder="Тип дохода"
      containerClassName={incomeFormFieldClassName}
      contentPosition="popper"
      options={INCOME_TYPES.map((type) => ({
        value: type,
        label: INCOME_TYPE_LABELS[type],
      }))}
    />
  )
}

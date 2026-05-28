import {
  bindMoneyAmountField,
  moneyAmountToFormValue,
} from '@/shared/lib/moneyInput'
import { Button, MoneyInput, Select } from '@/shared/ui'

import type { AllocationFormController } from '../model/types'

const QUICK_AMOUNT_STEPS = [1000, 5000] as const

export type AllocationQuickFormProps = {
  categoryOptions: { value: string; label: string }[]
  noCategories: boolean
  controlsDisabled: boolean
  form: AllocationFormController
  onSubmit: () => void | Promise<void>
  submitLabel?: string
}

export function AllocationQuickForm({
  categoryOptions,
  noCategories,
  controlsDisabled,
  form,
  onSubmit,
  submitLabel = 'Распределить',
}: AllocationQuickFormProps) {
  return (
    <form
      className="space-y-4 pt-2"
      onSubmit={(event) => {
        event.preventDefault()
        void onSubmit()
      }}
    >
      <Select
        id="allocation-category"
        value={form.values.category_id}
        onValueChange={(category_id) => {
          form.patchValues({ category_id })
        }}
        options={categoryOptions}
        placeholder={
          noCategories
            ? 'Нет категорий расходов или накоплений'
            : 'Куда распределить?'
        }
        disabled={controlsDisabled || noCategories}
      />

      <div className="space-y-2">
        <MoneyInput
          id="allocation-amount"
          name="amount"
          placeholder="Сколько?"
          disabled={controlsDisabled}
          className="h-9 text-sm font-bold tabular-nums md:text-lg"
          {...bindMoneyAmountField(form.values.amount, (amount) =>
            form.patchValues({ amount }),
          )}
        />
        <div className="flex gap-2">
          {QUICK_AMOUNT_STEPS.map((step) => (
            <Button
              key={step}
              type="button"
              variant="outline"
              size="sm"
              className="border-teal/30 bg-teal-subtle text-teal-hover hover:bg-teal-muted"
              disabled={controlsDisabled}
              onClick={() => {
                const current =
                  Number(form.values.amount.replace(/[^\d]/g, '')) || 0
                form.patchValues({
                  amount: moneyAmountToFormValue(current + step),
                })
              }}
            >
              +{moneyAmountToFormValue(step)}
            </Button>
          ))}
          <Button
            type="submit"
            isLoading={form.submitting}
            size="sm"
            className="ml-auto min-w-28"
            disabled={controlsDisabled || noCategories}
          >
            {submitLabel}
          </Button>
        </div>
      </div>

      {form.validationError ? (
        <p className="text-sm text-red-600">{form.validationError}</p>
      ) : null}
      {form.serverError ? (
        <p className="text-sm text-red-600">{form.serverError}</p>
      ) : null}
    </form>
  )
}

import { Button, Card, CardContent, CardHeader, CardTitle, Input, MonthPicker } from '@/shared/ui'

import { useCreateIncomeForm } from '../model/useCreateIncomeForm'

export function CreateIncomeForm() {
  const form = useCreateIncomeForm()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Новый доход</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            void form.submit()
          }}
        >
          <Input
            id="income-amount"
            label="Сумма"
            name="amount"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder="0"
            value={form.values.amount}
            onChange={form.handleChange}
          />

          <Input
            id="income-source"
            label="Источник (необязательно)"
            name="source"
            type="text"
            autoComplete="off"
            placeholder="Зарплата, фриланс…"
            value={form.values.source}
            onChange={form.handleChange}
          />

          <MonthPicker
            id="income-period"
            label="Месяц"
            value={form.values.period_month}
            onChange={(period_month) => form.patchValues({ period_month })}
            disabled={form.submitting}
          />

          {form.validationError ? (
            <p className="text-sm text-red-600">{form.validationError}</p>
          ) : null}
          {form.serverError ? <p className="text-sm text-red-600">{form.serverError}</p> : null}

          <Button type="submit" disabled={form.submitting} size="lg" className="min-w-40">
            {form.submitting ? 'Сохранение…' : 'Добавить доход'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

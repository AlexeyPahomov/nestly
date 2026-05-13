import { type FormEvent, useState } from 'react'

import { useCreateIncomeMutation } from '../../../entities/income/api/useCreateIncomeMutation'
import { DEV_USER_ID } from '../../../shared/lib/constants'
import { getErrorMessage } from '../../../shared/lib/errors'

function monthInputToPeriodMonth(value: string): string {
  if (!value) {
    return ''
  }
  return `${value}-01`
}

export function CreateIncomeForm() {
  const mutation = useCreateIncomeMutation()
  const [amount, setAmount] = useState('')
  const [source, setSource] = useState('')
  const [periodMonth, setPeriodMonth] = useState(() => {
    const d = new Date()
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    return `${y}-${m}`
  })
  const [validationError, setValidationError] = useState<string | null>(null)

  const submitting = mutation.isPending

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setValidationError(null)
    mutation.reset()

    const parsed = Number.parseFloat(amount.replace(',', '.'))
    if (Number.isNaN(parsed) || parsed <= 0) {
      setValidationError('Укажите сумму больше нуля')
      return
    }

    const period_month = monthInputToPeriodMonth(periodMonth)
    if (!period_month) {
      setValidationError('Выберите месяц')
      return
    }

    try {
      await mutation.mutateAsync({
        user_id: DEV_USER_ID,
        amount: parsed,
        source: source.trim() || undefined,
        period_month,
      })
      setAmount('')
      setSource('')
    } catch {
      // ошибка уже в mutation.error
    }
  }

  const serverError = mutation.isError
    ? getErrorMessage(mutation.error, 'Не удалось сохранить доход')
    : null

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-zinc-900">Новый доход</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700" htmlFor="income-amount">
            Сумма
          </label>
          <input
            id="income-amount"
            name="amount"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder="0"
            value={amount}
            onChange={(ev) => setAmount(ev.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-zinc-900 outline-none ring-zinc-900 focus:ring-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700" htmlFor="income-source">
            Источник (необязательно)
          </label>
          <input
            id="income-source"
            name="source"
            type="text"
            autoComplete="off"
            placeholder="Зарплата, фриланс…"
            value={source}
            onChange={(ev) => setSource(ev.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-zinc-900 outline-none ring-zinc-900 focus:ring-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700" htmlFor="income-period">
            Месяц
          </label>
          <input
            id="income-period"
            name="period_month"
            type="month"
            value={periodMonth}
            onChange={(ev) => setPeriodMonth(ev.target.value)}
            className="w-full max-w-xs rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-zinc-900 outline-none ring-zinc-900 focus:ring-2"
          />
        </div>

        {validationError ? <p className="text-sm text-red-600">{validationError}</p> : null}
        {serverError ? <p className="text-sm text-red-600">{serverError}</p> : null}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Сохранение…' : 'Добавить доход'}
        </button>
      </form>
    </div>
  )
}

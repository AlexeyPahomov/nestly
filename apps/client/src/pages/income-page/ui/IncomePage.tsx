import { CreateIncomeForm } from '../../../features/create-income/ui/CreateIncomeForm'
import { IncomeList } from '../../../widgets/income-list/ui/IncomeList'

export function IncomePage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Доходы</h1>

      <CreateIncomeForm />
      <IncomeList />
    </section>
  )
}

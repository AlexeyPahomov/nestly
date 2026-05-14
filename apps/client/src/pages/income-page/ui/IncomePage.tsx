import { CreateIncomeForm } from '@/features/create-income/ui/CreateIncomeForm'
import { PageSection } from '@/shared/ui'
import { IncomeList } from '@/widgets/income-list/ui/IncomeList'

export function IncomePage() {
  return (
    <PageSection title="Доходы">
      <div className="flex min-h-0 flex-1 flex-col gap-6">
        <div className="shrink-0">
          <CreateIncomeForm />
        </div>
        <div className="flex min-h-0 flex-1 flex-col">
          <IncomeList />
        </div>
      </div>
    </PageSection>
  )
}

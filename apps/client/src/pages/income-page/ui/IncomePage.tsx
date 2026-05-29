import { CreateIncomeForm } from '@/features/create-income/ui/CreateIncomeForm'
import { PageContentLoader, PageSection } from '@/shared/ui'
import { IncomeList } from '@/widgets/income-list'

import {
  incomePageBodyClassName,
  incomePageShellClassName,
} from '../lib/incomePageLayout'
import { useIncomePage } from '../model/useIncomePage'

export function IncomePage() {
  const page = useIncomePage()
  const { data, isPending, isError, error, isFetching } = page.incomesQuery

  return (
    <PageSection title="Доходы">
      <div className={incomePageShellClassName}>
        {page.isLoading ? (
          <PageContentLoader />
        ) : (
          <div className={incomePageBodyClassName}>
            <div className="shrink-0 ps-px pt-px md:ps-0.5 md:pt-0.5">
              <CreateIncomeForm />
            </div>
            <div className="flex min-h-0 flex-1 flex-col">
              <IncomeList
                data={data}
                isPending={isPending}
                isError={isError}
                error={error}
                isFetching={isFetching}
              />
            </div>
          </div>
        )}
      </div>
    </PageSection>
  )
}

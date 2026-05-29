import { getAppRoute, appRouteNavLabel } from '@/app/config/routes'
import { CreateIncomeFormDialog } from '@/features/create-income/ui/CreateIncomeFormDialog'
import { useDesktopPageSectionTitle } from '@/shared/hooks/use-desktop-page-section-title'
import { AddButton, Fab, PageSection, fabDesktopAddButtonClassName } from '@/shared/ui'
import { IncomeList } from '@/widgets/income-list'

import { INCOME_PAGE_ADD_LABEL } from '../lib/incomePageCopy'
import {
  incomePageListClassName,
  incomePageListShellClassName,
  incomePageSectionClassName,
  incomePageShellClassName,
} from '../lib/incomePageLayout'
import { useIncomePage } from '../model/useIncomePage'

const incomeRoute = getAppRoute('income')

export function IncomePage() {
  const pageTitle = useDesktopPageSectionTitle(appRouteNavLabel(incomeRoute))
  const page = useIncomePage()
  const { data, isPending, isError, error, isFetching } = page.incomesQuery

  const headerAction = page.onAddIncome ? (
    <AddButton
      className={fabDesktopAddButtonClassName}
      onClick={page.onAddIncome}
    >
      {INCOME_PAGE_ADD_LABEL}
    </AddButton>
  ) : undefined

  return (
    <PageSection
      title={pageTitle}
      headerAction={headerAction}
      className={incomePageSectionClassName}
    >
      <div className={incomePageShellClassName}>
        <div className={incomePageListShellClassName}>
          <IncomeList
            className={incomePageListClassName}
            data={data}
            isPending={isPending}
            isError={isError}
            error={error}
            isFetching={isFetching}
            layout={page.listLayout}
            onEdit={page.onEditIncome}
          />
        </div>
      </div>

      <Fab label={page.fab.label} onClick={page.fab.onClick} />

      <CreateIncomeFormDialog {...page.formDialog} />
    </PageSection>
  )
}

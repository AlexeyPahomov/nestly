import { useMemo, useRef, useState } from 'react'

import { appRouteLabel } from '@/app/config/routes'
import { isAllocationListBackgroundFetch } from '@/entities/allocation/api/allocationQueryFlags'
import { allocationIncomePercentOrZero } from '@/entities/allocation/model/calculations'
import type { Allocation } from '@/entities/allocation/model/types'
import type { Category } from '@/entities/category/model/types'
import { useCreateAllocationForm } from '@/features/create-allocation/model/useCreateAllocationForm'
import { useEditAllocationForm } from '@/features/create-allocation/model/useEditAllocationForm'
import {
  allocationPageListClassName,
  allocationPageMainClassName,
} from '@/pages/allocation-page/lib/allocationPageLayout'
import { useActiveIncomeScroll } from '@/pages/allocation-page/model/useActiveIncomeScroll'
import { useAllocationPage } from '@/pages/allocation-page/model/useAllocationPage'
import { AllocationFormSheets } from '@/pages/allocation-page/ui/AllocationFormSheets'
import { AllocationIncomeSection } from '@/pages/allocation-page/ui/AllocationIncomeSection'
import { QuickAllocateCta } from '@/pages/allocation-page/ui/QuickAllocateCta'
import { RemainingBalanceCard } from '@/pages/allocation-page/ui/RemainingBalanceCard'
import { useDesktopPageSectionTitle } from '@/shared/hooks/use-desktop-page-section-title'
import { useIsMobile } from '@/shared/hooks/use-mobile'
import { ContentTransition } from '@/shared/ui/content-transition'
import { Fab, PageSection, type CarouselApi } from '@/shared/ui'
import { AllocationList } from '@/widgets/allocation-list'

function toCategoryOptions(categories: Category[]) {
  return categories.map((category) => ({
    value: category.id,
    label: category.name,
  }))
}

export function AllocationPage() {
  const isMobile = useIsMobile()
  const pageTitle = useDesktopPageSectionTitle(appRouteLabel('allocation'))
  const [allocateSheetOpen, setAllocateSheetOpen] = useState(false)
  const [editingAllocation, setEditingAllocation] = useState<Allocation | null>(
    null,
  )
  const [incomeCarouselApi, setIncomeCarouselApi] = useState<CarouselApi>()
  const desktopIncomeScrollRef = useRef<HTMLDivElement | null>(null)

  const {
    selectedIncomeId,
    setPickedIncomeId,
    allocationCategories,
    incomeAmount,
    allocatedTotal,
    remainingBalance,
    incomeCards,
    hasIncome,
    allocationsQuery,
  } = useAllocationPage()

  const form = useCreateAllocationForm({
    incomeId: selectedIncomeId,
    remainingBalance,
  })

  const editForm = useEditAllocationForm({
    allocation: editingAllocation,
    remainingBalance,
    onComplete: () => {
      setEditingAllocation(null)
    },
  })

  const categoryOptions = useMemo(
    () => toCategoryOptions(allocationCategories),
    [allocationCategories],
  )

  const noCategories = allocationCategories.length === 0
  const createDisabled = form.disabled || form.submitting
  const allocatedPercent = allocationIncomePercentOrZero(
    allocatedTotal,
    incomeAmount,
  )

  const selectedIncomeTone =
    incomeCards.find((card) => card.id === selectedIncomeId)?.tone ?? 'empty'

  useActiveIncomeScroll(
    selectedIncomeId,
    incomeCards,
    incomeCarouselApi,
    desktopIncomeScrollRef,
  )

  async function submitAllocation() {
    await form.submit()
    if (!form.serverError && !form.validationError) {
      setAllocateSheetOpen(false)
    }
  }

  return (
    <PageSection title={pageTitle}>
      <div className={allocationPageMainClassName}>
        <div className="shrink-0 space-y-4">
          <AllocationIncomeSection
            hasIncome={hasIncome}
            incomeCards={incomeCards}
            selectedIncomeId={selectedIncomeId}
            onSelectIncome={setPickedIncomeId}
            desktopIncomeScrollRef={desktopIncomeScrollRef}
            onCarouselApiChange={setIncomeCarouselApi}
          />

          <div className="space-y-4 md:flex md:items-stretch md:gap-4 md:space-y-0">
            <RemainingBalanceCard
              tone={selectedIncomeTone}
              remainingBalance={remainingBalance}
              incomeAmount={incomeAmount}
              allocatedPercent={allocatedPercent}
            />
            <QuickAllocateCta
              disabled={createDisabled || noCategories}
              onClick={() => setAllocateSheetOpen(true)}
            />
          </div>
        </div>

        <ContentTransition
          contentKey={selectedIncomeId ?? 'none'}
          className={allocationPageListClassName}
        >
          <AllocationList
            isPending={allocationsQuery.isPending}
            isError={allocationsQuery.isError}
            error={allocationsQuery.error}
            allocations={allocationsQuery.data}
            isFetching={isAllocationListBackgroundFetch(allocationsQuery)}
            hasSelectedIncome={selectedIncomeId !== null}
            incomeAmount={incomeAmount}
            layout={isMobile ? 'fit' : 'fill'}
            onEditAllocation={setEditingAllocation}
          />
        </ContentTransition>
      </div>

      {isMobile ? (
        <Fab
          label="Распределить"
          onClick={() => setAllocateSheetOpen(true)}
          disabled={createDisabled || noCategories}
        />
      ) : null}

      <AllocationFormSheets
        isMobile={isMobile}
        categoryOptions={categoryOptions}
        noCategories={noCategories}
        createOpen={allocateSheetOpen}
        onCreateOpenChange={setAllocateSheetOpen}
        createForm={form}
        onCreateSubmit={submitAllocation}
        editingAllocation={editingAllocation}
        onEditingAllocationChange={setEditingAllocation}
        editForm={editForm}
        onEditSubmit={() => editForm.submit()}
      />
    </PageSection>
  )
}

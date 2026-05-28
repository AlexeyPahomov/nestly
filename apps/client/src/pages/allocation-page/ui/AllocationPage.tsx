import { useEffect, useRef, useState } from 'react';

import { useCreateAllocationForm } from '@/features/create-allocation/model/useCreateAllocationForm';
import {
  type IncomeCardTone,
  type IncomeCardView,
  useAllocationPage,
} from '@/pages/allocation-page/model/useAllocationPage';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { cn } from '@/shared/lib/utils';
import { formatAmount } from '@/shared/lib/format';
import {
  bindMoneyAmountField,
  moneyAmountToFormValue,
} from '@/shared/lib/moneyInput';
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  Card,
  CardContent,
  CardTitle,
  Fab,
  MoneyInput,
  PageSection,
  Progress,
  ResponsiveFormDialog,
  Select,
  type CarouselApi,
} from '@/shared/ui';
import { AllocationList } from '@/widgets/allocation-list';

function getToneGradientClassName(tone: IncomeCardTone): string {
  if (tone === 'full') {
    return 'from-green-subtle to-green-muted/80'
  }
  if (tone === 'partial') {
    return 'from-blue-subtle to-teal-subtle'
  }

  return 'from-orange-subtle to-orange-muted/80'
}

function getToneAccentClassName(tone: IncomeCardTone): string {
  if (tone === 'full') {
    return 'bg-green'
  }
  if (tone === 'partial') {
    return 'bg-blue'
  }

  return 'bg-orange'
}

function getToneTextClassName(tone: IncomeCardTone): string {
  if (tone === 'full') {
    return 'text-green'
  }
  if (tone === 'partial') {
    return 'text-blue'
  }

  return 'text-orange'
}

function getToneSurfaceClassName(tone: IncomeCardTone): string {
  if (tone === 'full') {
    return 'bg-linear-to-br from-green-subtle via-green-subtle to-white/95'
  }
  if (tone === 'partial') {
    return 'bg-linear-to-br from-blue-subtle via-teal-subtle to-white/95'
  }

  return 'bg-linear-to-br from-orange-subtle via-orange-subtle to-white/95'
}

export function AllocationPage() {
  const isMobile = useIsMobile();
  const [allocateSheetOpen, setAllocateSheetOpen] = useState(false);
  const [incomeCarouselApi, setIncomeCarouselApi] = useState<CarouselApi>();
  const desktopIncomeScrollRef = useRef<HTMLDivElement | null>(null);
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
  } = useAllocationPage();

  const form = useCreateAllocationForm({
    incomeId: selectedIncomeId,
    remainingBalance,
  });

  const noCategories = allocationCategories.length === 0;
  const controlsDisabled = form.disabled || form.submitting;
  const categoryOptions = allocationCategories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const progressValue =
    incomeAmount && incomeAmount > 0
      ? Math.min(
          100,
          Math.max(0, Math.round((allocatedTotal / incomeAmount) * 100)),
        )
      : 0;

  async function submitAllocation() {
    await form.submit();
    if (!form.serverError && !form.validationError) {
      setAllocateSheetOpen(false);
    }
  }

  const selectedIncomeTone =
    incomeCards.find((card) => card.id === selectedIncomeId)?.tone ?? 'empty';
  const selectedToneTextClassName = getToneTextClassName(selectedIncomeTone)
  const selectedToneSurfaceClassName = getToneSurfaceClassName(selectedIncomeTone)

  useEffect(() => {
    if (!selectedIncomeId) {
      return;
    }

    const activeIndex = incomeCards.findIndex((card) => card.id === selectedIncomeId);
    if (activeIndex < 0) {
      return;
    }

    incomeCarouselApi?.scrollTo(activeIndex);

    const activeDesktopCard = desktopIncomeScrollRef.current?.querySelector<HTMLElement>(
      `[data-income-card-id="${selectedIncomeId}"]`,
    );
    activeDesktopCard?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, [incomeCards, incomeCarouselApi, selectedIncomeId]);

  return (
    <PageSection title={isMobile ? undefined : 'Распределение'}>
      <div
        className={cn(
          'flex min-h-0 flex-1 flex-col gap-6',
          isMobile && 'gap-4 overflow-y-auto pb-2',
        )}
      >
        <div className="shrink-0 space-y-4">
          <section className="space-y-1.5 md:space-y-2">
            <p className="text-xs font-medium text-slate-hover md:text-sm">
              Доходы по месяцам
            </p>
            {hasIncome ? (
              <>
                <div
                  ref={desktopIncomeScrollRef}
                  className="no-scrollbar hidden overflow-x-auto px-1 py-1 md:block"
                >
                  <div className="flex min-w-max gap-1.5 px-0.5 py-0.5">
                    {incomeCards.map((incomeCard) => (
                      <IncomeMonthCard
                        key={incomeCard.id}
                        cardId={incomeCard.id}
                        incomeCard={incomeCard}
                        isActive={incomeCard.id === selectedIncomeId}
                        onSelect={setPickedIncomeId}
                      />
                    ))}
                  </div>
                </div>

                <Carousel
                  setApi={setIncomeCarouselApi}
                  opts={{ align: 'start', dragFree: true }}
                  className="px-1 py-1 md:hidden"
                >
                  <CarouselContent className="ml-0 py-0">
                    {incomeCards.map((incomeCard) => (
                      <CarouselItem
                        key={incomeCard.id}
                        className="basis-[24%] pl-2"
                      >
                        <IncomeMonthCard
                          cardId={incomeCard.id}
                          incomeCard={incomeCard}
                          isActive={incomeCard.id === selectedIncomeId}
                          onSelect={setPickedIncomeId}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </>
            ) : (
              <Card size="sm">
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Пока нет доходов для распределения.
                  </p>
                </CardContent>
              </Card>
            )}
          </section>

          <div className="space-y-4 md:flex md:items-stretch md:gap-4 md:space-y-0">
          <Card
            className={cn(
              'relative isolate min-w-0 overflow-hidden text-main-black shadow-[0_10px_28px_-16px_rgba(20,24,36,0.32)] ring-1 ring-white/40 supports-backdrop-filter:backdrop-blur-[2px] md:flex-[1.25]',
              selectedToneSurfaceClassName,
            )}
          >
            <span
              className="pointer-events-none absolute inset-x-0 top-0 z-0 h-10 bg-linear-to-b from-white/50 to-transparent"
              aria-hidden
            />
            <CardContent className="relative z-10 space-y-4">
              <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                <div className="space-y-1.5">
                  <p className="text-sm font-medium text-slate-hover">
                    Осталось
                  </p>
                  <CardTitle
                    className={cn(
                      'flex items-baseline gap-1 text-3xl font-extrabold tracking-tight tabular-nums sm:text-4xl',
                      selectedToneTextClassName,
                    )}
                  >
                    {incomeAmount !== null ? (
                      <>
                        {formatAmount(remainingBalance)}
                        <span
                          className="text-lg font-semibold text-current/45 sm:text-xl"
                          aria-hidden
                        >
                          ₽
                        </span>
                      </>
                    ) : (
                      '—'
                    )}
                  </CardTitle>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'relative flex size-16 items-center justify-center rounded-full bg-white/75 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]',
                      selectedToneTextClassName,
                    )}
                    style={{
                      background: `conic-gradient(currentColor ${progressValue}%, rgba(255,255,255,0.7) 0)`,
                    }}
                    aria-label={`Распределено ${progressValue}%`}
                  >
                    <span className="absolute inset-1.5 rounded-full bg-white/95" />
                    <span className="relative text-sm font-bold text-main-black">
                      {progressValue}%
                    </span>
                  </div>
                  <div className="space-y-0.5 text-right">
                    <p className="text-xs font-medium text-slate">
                      Распределено
                    </p>
                    <p className="text-sm font-semibold text-slate-hover">
                      от дохода
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <button
            type="button"
            className="group hidden min-w-0 flex-1 rounded-xl bg-linear-to-br from-teal-subtle to-blue-subtle px-4 py-4 text-left shadow-[0_10px_22px_-18px_rgba(20,24,36,0.5)] ring-1 ring-teal/10 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-16px_rgba(20,24,36,0.45)] hover:ring-teal/25 disabled:pointer-events-none disabled:opacity-50 md:flex md:flex-col md:justify-center"
            onClick={() => setAllocateSheetOpen(true)}
            disabled={controlsDisabled || noCategories}
          >
            <p className="inline-flex items-center gap-2 text-base font-bold text-main-black">
              <span className="inline-flex size-6 items-center justify-center rounded-full bg-white/90 text-teal shadow-sm">
                +
              </span>
              Быстро распределить
              <span className="text-sm text-teal transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </p>
            <p className="mt-1 text-sm font-medium text-slate-hover">
              Категория, сумма и сохранение в один шаг
            </p>
          </button>
          </div>
        </div>

        <div
          className={cn(
            'flex min-h-0 flex-1 flex-col',
            isMobile &&
              'flex-none max-md:pb-[calc(4.75rem+env(safe-area-inset-bottom))]',
          )}
        >
          <AllocationList
            isPending={allocationsQuery.isPending}
            isError={allocationsQuery.isError}
            error={allocationsQuery.error}
            allocations={allocationsQuery.data}
            isFetching={allocationsQuery.isFetching}
            hasSelectedIncome={selectedIncomeId !== null}
            incomeAmount={incomeAmount}
            layout={isMobile ? 'fit' : 'fill'}
          />
        </div>
      </div>

      {isMobile ? (
        <Fab
          label="Распределить"
          onClick={() => setAllocateSheetOpen(true)}
          disabled={controlsDisabled || noCategories}
        />
      ) : null}

      <ResponsiveFormDialog
        open={allocateSheetOpen}
        onOpenChange={setAllocateSheetOpen}
        title="Быстрое распределение"
        description="Выберите категорию и сумму распределения"
        bodyClassName="pt-2 sm:w-full sm:max-w-sm sm:self-center"
        showCloseButton={!isMobile}
        hideHeader
      >
        <AllocationQuickForm
          categoryOptions={categoryOptions}
          noCategories={noCategories}
          controlsDisabled={controlsDisabled}
          form={form}
          onSubmit={submitAllocation}
        />
      </ResponsiveFormDialog>
    </PageSection>
  );
}

type AllocationQuickFormProps = {
  categoryOptions: { value: string; label: string }[];
  noCategories: boolean;
  controlsDisabled: boolean;
  form: ReturnType<typeof useCreateAllocationForm>;
  onSubmit: () => void | Promise<void>;
};

function IncomeMonthCard({
  cardId,
  incomeCard,
  isActive,
  onSelect,
}: {
  cardId: string;
  incomeCard: IncomeCardView;
  isActive: boolean;
  onSelect: (incomeId: string | null) => void;
}) {
  const cardToneClassName = getToneGradientClassName(incomeCard.tone)
  const activeIndicatorClassName = getToneAccentClassName(incomeCard.tone)

  return (
    <button
      type="button"
      data-income-card-id={cardId}
      className={cn(
        'w-full min-w-20 rounded-xl border border-transparent text-left transition-all duration-200 md:w-24 md:border-2',
        isActive
          ? 'border-main-black/20 md:scale-[1.02] md:border-main-black/20'
          : 'hover:-translate-y-0.5',
      )}
      onClick={() => onSelect(incomeCard.id)}
    >
      <Card
        size="sm"
        className={cn(
          'relative gap-0.5! overflow-hidden py-0.5! bg-linear-to-br transition-all duration-200 active:scale-[0.99] md:gap-1! md:py-1!',
          cardToneClassName,
          isActive && 'md:shadow-sm',
        )}
      >
        <span
          className={cn(
            'absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-200',
            activeIndicatorClassName,
            isActive && 'opacity-100',
          )}
          aria-hidden
        />
        <CardContent className="space-y-0.5 px-1 py-1 md:space-y-0.5 md:px-1 md:py-2">
          <p className="text-[7px] font-medium uppercase tracking-wide text-slate-hover md:text-[8px]">
            {incomeCard.periodLabel}
          </p>
          <p className="text-[10px] font-extrabold tabular-nums text-main-black md:text-[11px]">
            {formatAmount(incomeCard.amount)}
          </p>
          <Progress
            value={incomeCard.percent}
            className="h-px bg-white/35 md:h-0.5"
            indicatorClassName={cn(
              incomeCard.tone === 'full' && 'bg-green',
              incomeCard.tone === 'partial' && 'bg-blue',
              incomeCard.tone === 'empty' && 'bg-orange',
            )}
          />
          <p className="text-[7px] leading-none font-medium text-slate md:text-[8px]">
            {incomeCard.percent}%
          </p>
        </CardContent>
      </Card>
    </button>
  );
}

function AllocationQuickForm({
  categoryOptions,
  noCategories,
  controlsDisabled,
  form,
  onSubmit,
}: AllocationQuickFormProps) {
  const quickAmountSteps = [1000, 5000];

  return (
    <form
      className="space-y-4 pt-2"
      onSubmit={(e) => {
        e.preventDefault();
        void onSubmit();
      }}
    >
      <Select
        id="allocation-category"
        value={form.values.category_id}
        onValueChange={(category_id) => {
          form.patchValues({ category_id });
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
          {quickAmountSteps.map((step) => (
            <Button
              key={step}
              type="button"
              variant="outline"
              size="sm"
              className="border-teal/30 bg-teal-subtle text-teal-hover hover:bg-teal-muted"
              disabled={controlsDisabled}
              onClick={() => {
                const current =
                  Number(form.values.amount.replace(/[^\d]/g, '')) || 0;
                form.patchValues({
                  amount: moneyAmountToFormValue(current + step),
                });
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
            Распределить
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
  );
}

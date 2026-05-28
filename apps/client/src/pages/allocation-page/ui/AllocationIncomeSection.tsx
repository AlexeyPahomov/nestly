import type { RefObject } from 'react';

import type { IncomeCardView } from '@/pages/allocation-page/model/useAllocationPage';
import { IncomeMonthCard } from '@/pages/allocation-page/ui/IncomeMonthCard';
import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/shared/ui';

type AllocationIncomeSectionProps = {
  hasIncome: boolean;
  incomeCards: IncomeCardView[];
  selectedIncomeId: string | null;
  onSelectIncome: (incomeId: string | null) => void;
  desktopIncomeScrollRef: RefObject<HTMLDivElement | null>;
  onCarouselApiChange: (api: CarouselApi) => void;
};

export function AllocationIncomeSection({
  hasIncome,
  incomeCards,
  selectedIncomeId,
  onSelectIncome,
  desktopIncomeScrollRef,
  onCarouselApiChange,
}: AllocationIncomeSectionProps) {
  return (
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
                  onSelect={onSelectIncome}
                />
              ))}
            </div>
          </div>

          <Carousel
            setApi={onCarouselApiChange}
            opts={{ align: 'start', dragFree: true }}
            className="px-1 py-1 md:hidden"
          >
            <CarouselContent className="ml-0 py-0 gap-1">
              {incomeCards.map((incomeCard) => (
                <CarouselItem key={incomeCard.id} className="basis-[24%]">
                  <IncomeMonthCard
                    cardId={incomeCard.id}
                    incomeCard={incomeCard}
                    isActive={incomeCard.id === selectedIncomeId}
                    onSelect={onSelectIncome}
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
  );
}

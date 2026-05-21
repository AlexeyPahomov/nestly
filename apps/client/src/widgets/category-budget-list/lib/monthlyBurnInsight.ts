import {
  differenceInCalendarDays,
  endOfMonth,
  getDate,
  getDaysInMonth,
} from 'date-fns';

import { getEnvelopeUsage } from './envelopeUsage';

export type MonthlyBurnPaceDirection = 'above' | 'below' | 'on_track';

export type MonthlyBurnInsight = {
  spentPercent: number;
  daysRemaining: number;
  daysRemainingLabel: string;
  paceDelta: number;
  paceDirection: MonthlyBurnPaceDirection;
  paceMessage: string | null;
};

const PACE_MESSAGE_THRESHOLD_PERCENT = 3;

/** Склонение «N дней» для подписи «До конца месяца». */
export function formatRuDaysCount(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) {
    return `${count} день`;
  }
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return `${count} дня`;
  }
  return `${count} дней`;
}

export function getDaysRemainingInMonth(referenceDate: Date): number {
  const end = endOfMonth(referenceDate);
  return Math.max(0, differenceInCalendarDays(end, referenceDate));
}

export function getMonthlyBurnPace(
  spentPercent: number,
  referenceDate: Date,
): { paceDelta: number; paceDirection: MonthlyBurnPaceDirection } {
  const dayOfMonth = getDate(referenceDate);
  const daysInMonth = getDaysInMonth(referenceDate);
  const expectedPercent = (dayOfMonth / daysInMonth) * 100;
  const paceDelta = Math.round(spentPercent - expectedPercent);

  if (paceDelta > PACE_MESSAGE_THRESHOLD_PERCENT) {
    return { paceDelta, paceDirection: 'above' };
  }
  if (paceDelta < -PACE_MESSAGE_THRESHOLD_PERCENT) {
    return { paceDelta, paceDirection: 'below' };
  }
  return { paceDelta, paceDirection: 'on_track' };
}

export function formatMonthlyBurnPaceMessage(
  paceDelta: number,
  direction: MonthlyBurnPaceDirection,
): string | null {
  if (direction === 'on_track') {
    return null;
  }

  const magnitude = Math.abs(paceDelta);
  if (direction === 'above') {
    return `Темп выше нормы на ${magnitude}%`;
  }
  return `Темп ниже нормы на ${magnitude}%`;
}

export function monthlyBurnPaceClassName(
  direction: MonthlyBurnPaceDirection,
): string {
  switch (direction) {
    case 'above':
      return 'font-medium text-amber-800';
    case 'below':
      return 'font-medium text-emerald-800';
    default:
      return 'text-muted-foreground';
  }
}

/** Фиксированная высота блока инсайта (2 строки) — одинаковые карточки в сетке. */
export const monthlyBurnInsightSlotClassName =
  'min-h-2 shrink-0 space-y-1 border-t border-zinc-100/90 text-xs leading-relaxed';

/** Инсайт «сжигания» бюджета за календарный месяц (линейный темп vs факт). */
export function getMonthlyBurnInsight(
  allocated: number,
  spent: number,
  referenceDate: Date = new Date(),
): MonthlyBurnInsight {
  const { displayPercent } = getEnvelopeUsage(allocated, spent);
  const daysRemaining = getDaysRemainingInMonth(referenceDate);
  const { paceDelta, paceDirection } = getMonthlyBurnPace(
    displayPercent,
    referenceDate,
  );

  return {
    spentPercent: displayPercent,
    daysRemaining,
    daysRemainingLabel: formatRuDaysCount(daysRemaining),
    paceDelta,
    paceDirection,
    paceMessage: formatMonthlyBurnPaceMessage(paceDelta, paceDirection),
  };
}

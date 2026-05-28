import type { CarouselOptions } from '@/shared/ui/carousel/carousel-context';

import { cn } from '@/shared/lib/utils';

export const expensePageWorkCarouselOptions: CarouselOptions = {
  align: 'start',
  containScroll: 'trimSnaps',
  skipSnaps: false,
};

/** Табы + карусель: вторая строка забирает оставшуюся высоту. */
export const expensePageWorkCarouselRootClassName =
  'grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] md:hidden';

export const expensePageWorkCarouselViewportClassName = cn(
  'min-h-0 h-full overflow-hidden',
  'md:flex md:min-h-0 md:flex-1 md:flex-col',
  '[&_[data-slot=carousel-content]]:h-full [&_[data-slot=carousel-content]]:min-h-0',
  '[&_[data-slot=carousel-content]>div]:h-full [&_[data-slot=carousel-content]>div]:min-h-0',
);

export const expensePageWorkCarouselContentClassName =
  'ml-0 flex h-full min-h-0 items-stretch';

export const expensePageWorkCarouselItemClassName =
  'h-full min-h-0 min-w-0 shrink-0 grow-0 basis-full self-stretch pl-0 md:flex md:flex-col';

/** Шапка табов — вне скролла списка. */
export const expensePageWorkSwitcherBarClassName =
  'z-10 shrink-0 bg-white max-md:border-b-0 md:border-b md:border-zinc-200/80';

export const expensePageWorkSwitcherClassName = 'flex w-full gap-1';

export const expensePageWorkSwitcherButtonClassName =
  'flex-1 rounded-none border-b-2 border-transparent bg-transparent px-2 pb-2 pt-1 text-sm font-medium text-zinc-500 transition-colors';

export const expensePageWorkSwitcherButtonActiveClassName =
  'border-zinc-900 font-semibold text-zinc-900';

import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';
import { PageSectionMobileHeader } from './PageSectionMobileHeader';
import { PageSectionTitleRow } from './PageSectionTitleRow';

type PageSectionProps = {
  title?: string;
  /** Спиннер рядом с заголовком (`title`). */
  titleLoading?: boolean;
  children: ReactNode;
  className?: string;
  /**
   * Доп. блок шапки под строкой заголовка (таймлайн, метрики).
   * Кнопка сайдбара — только у `title`, не у всего `header`.
   */
  header?: ReactNode;
  headerAction?: ReactNode;
};

function PageSection({
  title,
  titleLoading = false,
  children,
  className,
  header,
  headerAction,
}: PageSectionProps) {
  const hasTitleRow = title != null || headerAction != null;
  const hasHeaderBelow = header != null;
  const hasHeader = hasTitleRow || hasHeaderBelow;

  return (
    <section
      data-slot="page-section"
      className={cn('flex min-h-0 flex-1 flex-col gap-4', className)}
    >
      {hasHeader ? (
        <div className="flex shrink-0 flex-col gap-3 md:gap-4">
          {hasTitleRow ? (
            <PageSectionMobileHeader>
              <div className="flex min-w-0 items-center justify-between gap-4">
                {title ? (
                  <PageSectionTitleRow isLoading={titleLoading}>
                    {title}
                  </PageSectionTitleRow>
                ) : null}
                {headerAction ? (
                  <div className="hidden shrink-0 sm:block">{headerAction}</div>
                ) : null}
              </div>
            </PageSectionMobileHeader>
          ) : (
            <PageSectionMobileHeader>{header}</PageSectionMobileHeader>
          )}
          {hasTitleRow && hasHeaderBelow ? (
            <div className="shrink-0">{header}</div>
          ) : null}
        </div>
      ) : null}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
    </section>
  );
}

export { PageSection };
export { PageSectionTitleRow } from './PageSectionTitleRow';
export { PageSectionMobileHeader } from './PageSectionMobileHeader';

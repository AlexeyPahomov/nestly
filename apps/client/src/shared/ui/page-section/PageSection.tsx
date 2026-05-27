import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';
import { PageSectionTitleRow } from './PageSectionTitleRow';

type PageSectionProps = {
  title?: string;
  children: ReactNode;
  className?: string;
  /** Полная замена строки заголовка (заголовок + toolbar). */
  header?: ReactNode;
  headerAction?: ReactNode;
};

function PageSection({
  title,
  children,
  className,
  header,
  headerAction,
}: PageSectionProps) {
  return (
    <section
      data-slot="page-section"
      className={cn('flex min-h-0 flex-1 flex-col gap-4', className)}
    >
      {header != null ? (
        <div className="shrink-0">{header}</div>
      ) : title != null || headerAction != null ? (
        <div className="flex shrink-0 items-start justify-between gap-4">
          {title ? <PageSectionTitleRow>{title}</PageSectionTitleRow> : null}
          {headerAction ? (
            <div className="hidden shrink-0 pt-1 sm:block">{headerAction}</div>
          ) : null}
        </div>
      ) : null}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
    </section>
  );
}

export { PageSection };
export { PageSectionTitleRow } from './PageSectionTitleRow';

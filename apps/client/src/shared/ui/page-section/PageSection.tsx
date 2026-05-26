import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

import { PageTitle } from './PageTitle';

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
      {header ?? (
        <div className="flex shrink-0 items-start justify-between gap-4">
          {title ? <PageTitle>{title}</PageTitle> : null}
          {headerAction ? (
            <div className="shrink-0 pt-1">{headerAction}</div>
          ) : null}
        </div>
      )}
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </section>
  );
}

export { PageSection };

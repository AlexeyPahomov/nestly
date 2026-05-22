import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

type PageSectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
};

function PageSection({
  title,
  children,
  className,
  headerAction,
}: PageSectionProps) {
  return (
    <section
      data-slot="page-section"
      className={cn('flex min-h-0 flex-1 flex-col gap-4', className)}
    >
      <div className="flex shrink-0 items-start justify-between gap-4">
        <h1 className="text-3xl font-bold leading-none">{title}</h1>
        {headerAction ? (
          <div className="shrink-0 pt-2">{headerAction}</div>
        ) : null}
      </div>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </section>
  );
}

export { PageSection };

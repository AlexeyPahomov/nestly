import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/shared/lib/utils';
import { Spinner } from '../spinner/Spinner';

import { buttonVariants } from './variants';

const buttonSpinnerClassName: Record<
  NonNullable<VariantProps<typeof buttonVariants>['size']>,
  string
> = {
  default: 'size-4',
  xs: 'size-3',
  sm: 'size-3.5',
  lg: 'size-4',
  icon: 'size-4',
  'icon-xs': 'size-3',
  'icon-sm': 'size-3.5',
  'icon-lg': 'size-4',
};

function Button({
  className,
  variant = 'default',
  size = 'lg',
  asChild = false,
  isLoading = false,
  disabled,
  children,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';
  const showLoading = Boolean(isLoading) && !asChild;

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(
        buttonVariants({ variant, size, className }),
        showLoading && 'relative',
      )}
      disabled={Boolean(disabled) || showLoading}
      aria-busy={showLoading || undefined}
      {...props}
    >
      {showLoading ? (
        <>
          <span className="contents invisible">{children}</span>
          <span className="pointer-events-none absolute inset-0 inline-flex items-center justify-center">
            <Spinner
              className={buttonSpinnerClassName[size ?? 'lg']}
            />
          </span>
        </>
      ) : (
        children
      )}
    </Comp>
  );
}

export { Button };

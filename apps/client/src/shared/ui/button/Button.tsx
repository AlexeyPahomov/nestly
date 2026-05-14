import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/shared/lib/utils';
import { Spinner } from '../spinner/Spinner';

import { buttonVariants } from './variants';

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

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={Boolean(disabled) || (Boolean(isLoading) && !asChild)}
      {...props}
    >
      {isLoading && !asChild ? <Spinner className="size-5" /> : children}
    </Comp>
  );
}

export { Button };

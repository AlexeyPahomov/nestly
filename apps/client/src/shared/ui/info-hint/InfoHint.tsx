import { InfoIcon } from 'lucide-react'
import * as React from 'react'
import type { ReactNode } from 'react'

import { usePrefersClickHint } from '@/shared/hooks/use-prefers-click-hint'
import { cn } from '@/shared/lib/utils'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../popover/Popover'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../tooltip/Tooltip'

import {
  infoHintButtonClassName,
  infoHintIconClassName,
  infoHintPopoverContentClassName,
  infoHintTextClassName,
  infoHintTooltipContentClassName,
} from './infoHintLayout'

export type InfoHintProps = {
  label: string
  children: ReactNode
  className?: string
  contentClassName?: string
  align?: 'start' | 'center' | 'end'
}

function InfoHintBody({ children }: { children: ReactNode }) {
  if (typeof children === 'string') {
    return <p className={infoHintTextClassName}>{children}</p>
  }

  return children
}

const InfoHintTrigger = React.forwardRef<
  HTMLButtonElement,
  Pick<InfoHintProps, 'label' | 'className'> &
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(function InfoHintTrigger({ label, className, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(infoHintButtonClassName, className)}
      aria-label={label}
      {...props}
    >
      <InfoIcon className={infoHintIconClassName} strokeWidth={2} aria-hidden />
    </button>
  )
})

export function InfoHint({
  label,
  children,
  className,
  contentClassName,
  align = 'start',
}: InfoHintProps) {
  const prefersClickHint = usePrefersClickHint()
  const body = <InfoHintBody>{children}</InfoHintBody>

  if (prefersClickHint) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <InfoHintTrigger label={label} className={className} />
        </PopoverTrigger>
        <PopoverContent
          align={align}
          className={cn(infoHintPopoverContentClassName, contentClassName)}
        >
          {body}
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <InfoHintTrigger label={label} className={className} />
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        sideOffset={4}
        hideArrow
        className={cn(infoHintTooltipContentClassName, contentClassName)}
      >
        {body}
      </TooltipContent>
    </Tooltip>
  )
}

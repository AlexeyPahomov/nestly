import { Plus } from 'lucide-react'
import type { ComponentProps } from 'react'

import { cn } from '@/shared/lib/utils'

import { Button, primaryActionButtonClassName } from '../button'

import { fabButtonClassName, fabWrapClassName } from './fabLayout'
import { PortalFabToBody } from './portalFabToBody'

export type FabProps = Omit<ComponentProps<typeof Button>, 'children' | 'size'> & {
  /** Подпись для `aria-label` и `title`. */
  label: string
}

export function Fab({ label, className, type = 'button', ...props }: FabProps) {
  return (
    <PortalFabToBody>
      <div className={fabWrapClassName}>
        <Button
          type={type}
          size="icon-lg"
          className={cn(
            primaryActionButtonClassName,
            fabButtonClassName,
            'pointer-events-auto',
            className,
          )}
          aria-label={label}
          title={label}
          {...props}
        >
          <Plus className="size-5" aria-hidden />
        </Button>
      </div>
    </PortalFabToBody>
  )
}

import type { ReactNode } from 'react'

import { useIsMobile } from '@/shared/hooks/use-mobile'
import { cn } from '@/shared/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog/Dialog'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui/sheet/Sheet'

import {
  responsiveFormDialogBodyClassName,
  responsiveFormDialogDesktopContentClassName,
  responsiveFormDialogDesktopHeaderClassName,
  responsiveFormSheetContentClassName,
  responsiveFormSheetHandleClassName,
  responsiveFormSheetHeaderClassName,
} from './responsiveFormDialogLayout'

export type ResponsiveFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  children: ReactNode
  bodyClassName?: string
  showCloseButton?: boolean
}

export function ResponsiveFormDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  bodyClassName,
  showCloseButton = false,
}: ResponsiveFormDialogProps) {
  const isMobile = useIsMobile()

  const body = (
    <div className={cn(responsiveFormDialogBodyClassName, bodyClassName)}>
      {children}
    </div>
  )

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="bottom"
          showCloseButton={showCloseButton}
          className={responsiveFormSheetContentClassName}
        >
          <div className={responsiveFormSheetHandleClassName} aria-hidden />
          <SheetHeader className={responsiveFormSheetHeaderClassName}>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription className="sr-only">
              {description}
            </SheetDescription>
          </SheetHeader>
          {body}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={showCloseButton}
        className={responsiveFormDialogDesktopContentClassName}
      >
        <DialogHeader className={responsiveFormDialogDesktopHeaderClassName}>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="sr-only">{description}</DialogDescription>
        </DialogHeader>
        {body}
      </DialogContent>
    </Dialog>
  )
}

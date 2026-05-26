import type { ComponentProps } from 'react'

import { APP_NAME } from '@/shared/config/app'
import { cn } from '@/shared/lib/utils'

import { LOGO_SRC, logoClassName } from './logoLayout'

function Logo({ className, alt = APP_NAME, ...props }: ComponentProps<'img'>) {
  return (
    <img
      data-slot="logo"
      src={LOGO_SRC}
      alt={alt}
      className={cn(logoClassName, className)}
      {...props}
    />
  )
}

export { Logo }

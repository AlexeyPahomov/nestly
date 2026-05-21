import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/shared/lib/utils'

import { getItemsListInteractiveProps } from './itemsListLayout'

type ItemsListInteractiveProps = ComponentPropsWithoutRef<'div'>

export function ItemsListInteractive({
  className,
  ...props
}: ItemsListInteractiveProps) {
  const interactive = getItemsListInteractiveProps()

  return (
    <div
      {...interactive}
      {...props}
      className={cn(interactive.className, className)}
    />
  )
}

type ItemsListInteractiveListProps = ComponentPropsWithoutRef<'ul'>

export function ItemsListInteractiveList({
  className,
  ...props
}: ItemsListInteractiveListProps) {
  const interactive = getItemsListInteractiveProps()

  return (
    <ul
      {...interactive}
      {...props}
      className={cn(interactive.className, className)}
    />
  )
}

import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'
import { useSyncExternalStore } from 'react'

function subscribe() {
  return () => {}
}

function getClientSnapshot() {
  return true
}

function getServerSnapshot() {
  return false
}

function useIsClient() {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
}

/** Портал в body: `position: fixed` не попадает под transform анимации смены страницы. */
export function PortalFabToBody({ children }: { children: ReactNode }) {
  const isClient = useIsClient()

  if (!isClient) {
    return null
  }

  return createPortal(children, document.body)
}

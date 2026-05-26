import { APP_NAVIGATION } from '@/app/config/routes'
import { Logo } from '@/shared/ui'

import { sidebarLogoClassName } from '../lib/sidebarLayout'
import { SidebarItem } from './SidebarItem'

export function Sidebar() {
  return (
    <aside className="w-64 shrink-0 border-r border-zinc-200 bg-white p-6">
      <Logo className={sidebarLogoClassName} />

      <nav className="flex flex-col gap-2">
        {APP_NAVIGATION.map(({ to, label }) => (
          <SidebarItem key={to} to={to} label={label} />
        ))}
      </nav>
    </aside>
  )
}

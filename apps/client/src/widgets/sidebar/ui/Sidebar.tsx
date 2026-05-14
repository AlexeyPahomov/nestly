import { APP_NAME } from '@/shared/config/app'
import { APP_NAVIGATION } from '@/app/config/routes'

import { SidebarItem } from './SidebarItem'

export function Sidebar() {
  return (
    <aside className="w-64 shrink-0 border-r border-zinc-200 bg-white p-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">{APP_NAME}</h1>
      </div>

      <nav className="flex flex-col gap-2">
        {APP_NAVIGATION.map(({ to, label }) => (
          <SidebarItem key={to} to={to} label={label} />
        ))}
      </nav>
    </aside>
  )
}

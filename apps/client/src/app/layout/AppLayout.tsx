import { Outlet } from 'react-router-dom'

import { Sidebar } from '../../widgets/sidebar/ui/Sidebar'

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-zinc-100 text-zinc-900">
      <Sidebar />

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}

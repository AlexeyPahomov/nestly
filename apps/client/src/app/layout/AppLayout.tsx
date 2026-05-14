import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Spinner } from '@/shared/ui'
import { Sidebar } from '@/widgets/sidebar';

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center">
      <Spinner className="size-8 text-zinc-500" />
    </div>
  );
}

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-zinc-100 text-zinc-900">
      <Sidebar />

      <main className="flex-1 p-8">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Spinner } from '@/shared/ui';
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
    <div className="flex h-screen min-h-0 overflow-hidden bg-zinc-100 text-zinc-900">
      <Sidebar />

      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden px-8 py-5">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <Suspense fallback={<RouteFallback />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

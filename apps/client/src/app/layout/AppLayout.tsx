import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Spinner, TooltipProvider } from '@/shared/ui';
import { SidebarInset, SidebarProvider } from '@/shared/ui/sidebar';
import { Sidebar } from '@/widgets/sidebar';

import { appInsetClassName, appMainClassName } from './appLayoutLayout';

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center">
      <Spinner className="size-8 text-zinc-500" />
    </div>
  );
}

export function AppLayout() {
  return (
    <TooltipProvider delayDuration={500}>
      <SidebarProvider
        defaultOpen={false}
        className="h-screen min-h-0 overflow-hidden bg-zinc-100 text-zinc-900"
      >
        <Sidebar />

        <SidebarInset className={appInsetClassName}>
          <div className={appMainClassName}>
            <Suspense
              fallback={
                <div className={appMainClassName}>
                  <RouteFallback />
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}

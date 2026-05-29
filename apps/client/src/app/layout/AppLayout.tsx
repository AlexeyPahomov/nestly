import { Suspense } from 'react';

import { TooltipProvider } from '@/shared/ui';
import { SidebarInset, SidebarProvider } from '@/shared/ui/sidebar';
import { MobileBottomNav } from '@/widgets/mobile-bottom-nav';
import { Sidebar } from '@/widgets/sidebar';

import { appInsetClassName, appMainClassName } from './appLayoutLayout';
import { PageTransitionOutlet } from './PageTransitionOutlet';

/** Пустой fallback: лоадеры списков на странице, без второго спиннера подряд. */
function RouteFallback() {
  return <div className="min-h-0 min-w-0 flex-1" aria-hidden />;
}

export function AppLayout() {
  return (
    <TooltipProvider delayDuration={500}>
      <SidebarProvider
        defaultOpen={false}
        className="h-screen h-dvh max-h-dvh min-h-0 overflow-hidden bg-zinc-100 text-zinc-900"
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
              <PageTransitionOutlet />
            </Suspense>
          </div>
        </SidebarInset>
        <MobileBottomNav />
      </SidebarProvider>
    </TooltipProvider>
  );
}

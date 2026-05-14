import { Card, CardContent, Spinner } from '@/shared/ui';

export function ListLoader() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-3 py-10">
          <Spinner className="size-8 text-zinc-500" />
          <p className="text-sm text-muted-foreground">Загрузка…</p>
        </CardContent>
      </Card>
    </div>
  );
}

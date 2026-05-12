export function resolveDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      'Задайте DATABASE_URL в .env (корень репозитория или apps/server).',
    );
  }
  return url;
}

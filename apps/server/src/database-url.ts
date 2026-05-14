export function resolveDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('Задайте DATABASE_URL в apps/server/.env.');
  }
  return url;
}

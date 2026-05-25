/** Supabase pooler (:6543) + Prisma: `pgbouncer=true` в строке подключения. */
function normalizePoolerUrl(raw: string): string {
  try {
    const url = new URL(raw);
    const isPooler =
      url.port === '6543' || url.hostname.includes('pooler.');

    if (isPooler && !url.searchParams.has('pgbouncer')) {
      url.searchParams.set('pgbouncer', 'true');
    }

    return url.toString();
  } catch {
    return raw;
  }
}

export function resolveDatabaseUrl(): string {
  const url = process.env.DATABASE_URL_DIRECT ?? process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      'Задайте DATABASE_URL или DATABASE_URL_DIRECT в apps/server/.env.',
    );
  }
  return normalizePoolerUrl(url);
}

export function describeDatabaseTarget(connectionString: string): string {
  try {
    const url = new URL(connectionString);
    return `${url.hostname}:${url.port || '5432'}`;
  } catch {
    return 'unknown';
  }
}

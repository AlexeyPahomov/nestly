/** Базовый URL API: в dev через Vite proxy — `/api`, в проде — `VITE_API_URL`. */
export function getApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_URL
  if (typeof raw === 'string' && raw.length > 0) {
    return raw.replace(/\/$/, '')
  }
  return '/api'
}

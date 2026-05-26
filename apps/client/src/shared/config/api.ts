const raw = import.meta.env.VITE_API_URL

/**
 * Базовый URL API без завершающего слэша.
 * Production: `VITE_API_URL` (например `https://api.example.com`).
 * Локально без переменной: `/api` (прокси Vite → Nest).
 */
export const API_URL =
  typeof raw === 'string' && raw.length > 0 ? raw.replace(/\/$/, '') : '/api'

/** @deprecated Используйте `API_URL` */
export function getApiBaseUrl(): string {
  return API_URL
}

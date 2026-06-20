/**
 * Typed config constants read from Vite environment variables.
 * All VITE_* variables are defined in .env.local (not committed) or
 * Vercel environment settings. See .env.example for the full list.
 */

/** WhatsApp number in international format without + or spaces, e.g. "911234567890" */
export const WHATSAPP_NUMBER: string =
  import.meta.env.VITE_WHATSAPP_NUMBER ?? '';

/** Google Maps embed URL (iframe src) for the Location section */
export const MAPS_EMBED_URL: string =
  import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL ?? '';

/** Google Apps Script endpoint URL for newsletter POSTs */
export const SHEET_SCRIPT_URL: string =
  import.meta.env.VITE_GOOGLE_SHEET_SCRIPT_URL ?? '';

/** Cafe phone number in E.164-compatible format for tel: links, e.g. "+911234567890" */
export const CAFE_PHONE: string =
  import.meta.env.VITE_CAFE_PHONE_NUMBER ?? '';

/** Number of tables in the cafe — used on the /admin/qr page */
export const TABLE_COUNT: number =
  Number(import.meta.env.VITE_TABLE_COUNT ?? 10);

/** Canonical origin for the site, e.g. "https://brewandbloom.cafe" */
export const SITE_ORIGIN: string =
  import.meta.env.VITE_SITE_ORIGIN ?? (typeof window !== 'undefined' ? window.location.origin : '');

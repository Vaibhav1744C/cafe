import type { DayHours } from '@/data/hours'

export interface OpenStatus {
  isOpen: boolean;
  label: string;
}

/**
 * Pure function — computes whether the cafe is currently open.
 *
 * @param hours  Array of DayHours (one entry per day; days not present are treated as closed)
 * @param now    The current date/time to evaluate against
 * @returns      { isOpen, label } — label is "Open Now" or "Closed"
 *
 * Time comparison uses the local wall-clock time of `now` (getHours / getMinutes),
 * which matches what customers see in their browser.
 */
export function computeOpenStatus(hours: DayHours[], now: Date): OpenStatus {
  const dayOfWeek = now.getDay(); // 0 = Sunday … 6 = Saturday
  const todayHours = hours.find((h) => h.day === dayOfWeek);

  if (!todayHours) {
    return { isOpen: false, label: 'Closed' };
  }

  const [openH, openM] = todayHours.open.split(':').map(Number);
  const [closeH, closeM] = todayHours.close.split(':').map(Number);

  // Convert to minutes-since-midnight for easy comparison
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  return {
    isOpen,
    label: isOpen ? 'Open Now' : 'Closed',
  };
}

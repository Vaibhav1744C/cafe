export interface DayHours {
  /** 0 = Sunday, 1 = Monday, …, 6 = Saturday (matches Date.prototype.getDay()) */
  day: number;
  open: string;   // 24-hour "HH:MM"
  close: string;  // 24-hour "HH:MM"
}

/**
 * Operating hours for Brew & Bloom Cafe.
 * Monday–Friday: 08:00–22:00
 * Saturday–Sunday: 09:00–23:00
 */
export const cafeHours: DayHours[] = [
  { day: 0, open: '09:00', close: '23:00' }, // Sunday
  { day: 1, open: '08:00', close: '22:00' }, // Monday
  { day: 2, open: '08:00', close: '22:00' }, // Tuesday
  { day: 3, open: '08:00', close: '22:00' }, // Wednesday
  { day: 4, open: '08:00', close: '22:00' }, // Thursday
  { day: 5, open: '08:00', close: '22:00' }, // Friday
  { day: 6, open: '09:00', close: '23:00' }, // Saturday
];

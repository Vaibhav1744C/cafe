import { describe, it, expect } from 'vitest'
import { computeOpenStatus } from './openStatus'
import type { DayHours } from '@/data/hours'

// Helper: create a Date for a specific day + time in local time
function makeDate(day: number, hours: number, minutes: number): Date {
  // Find the next occurrence of the target day-of-week from a known Monday base
  const base = new Date(2025, 0, 6) // Monday 6 Jan 2025
  const diff = (day - base.getDay() + 7) % 7
  const d = new Date(base)
  d.setDate(base.getDate() + diff)
  d.setHours(hours, minutes, 0, 0)
  return d
}

const typicalHours: DayHours[] = [
  { day: 0, open: '09:00', close: '23:00' }, // Sunday
  { day: 1, open: '08:00', close: '22:00' }, // Monday
  { day: 2, open: '08:00', close: '22:00' }, // Tuesday
  { day: 3, open: '08:00', close: '22:00' }, // Wednesday
  { day: 4, open: '08:00', close: '22:00' }, // Thursday
  { day: 5, open: '08:00', close: '22:00' }, // Friday
  { day: 6, open: '09:00', close: '23:00' }, // Saturday
]

describe('computeOpenStatus', () => {
  it('returns Open Now during business hours on a weekday', () => {
    const now = makeDate(1, 10, 0) // Monday 10:00
    const result = computeOpenStatus(typicalHours, now)
    expect(result.isOpen).toBe(true)
    expect(result.label).toBe('Open Now')
  })

  it('returns Closed before opening time', () => {
    const now = makeDate(1, 7, 59) // Monday 07:59
    const result = computeOpenStatus(typicalHours, now)
    expect(result.isOpen).toBe(false)
    expect(result.label).toBe('Closed')
  })

  it('returns Closed at exactly closing time', () => {
    const now = makeDate(1, 22, 0) // Monday 22:00 — equal to close, should be closed
    const result = computeOpenStatus(typicalHours, now)
    expect(result.isOpen).toBe(false)
    expect(result.label).toBe('Closed')
  })

  it('returns Open Now at exactly opening time', () => {
    const now = makeDate(1, 8, 0) // Monday 08:00 — equal to open
    const result = computeOpenStatus(typicalHours, now)
    expect(result.isOpen).toBe(true)
    expect(result.label).toBe('Open Now')
  })

  it('returns Closed after closing time', () => {
    const now = makeDate(1, 22, 30) // Monday 22:30
    const result = computeOpenStatus(typicalHours, now)
    expect(result.isOpen).toBe(false)
    expect(result.label).toBe('Closed')
  })

  it('returns Closed when no hours entry exists for the day', () => {
    const now = makeDate(3, 12, 0) // Wednesday 12:00
    const result = computeOpenStatus([], now) // empty hours = always closed
    expect(result.isOpen).toBe(false)
    expect(result.label).toBe('Closed')
  })

  it('handles weekend hours correctly', () => {
    const now = makeDate(6, 21, 30) // Saturday 21:30 — within 09:00–23:00
    const result = computeOpenStatus(typicalHours, now)
    expect(result.isOpen).toBe(true)
  })

  it('is deterministic — same inputs always produce same result', () => {
    const now = makeDate(4, 14, 0) // Thursday 14:00
    const r1 = computeOpenStatus(typicalHours, now)
    const r2 = computeOpenStatus(typicalHours, now)
    expect(r1).toEqual(r2)
  })
})

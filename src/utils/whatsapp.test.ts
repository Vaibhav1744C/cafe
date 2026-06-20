import { describe, it, expect, vi, afterEach } from 'vitest'
import {
  buildOrderMessage,
  buildReservationMessage,
  openWhatsApp,
  type CartItem,
} from './whatsapp'

describe('buildOrderMessage', () => {
  it('includes the table ID when provided', () => {
    const items: CartItem[] = [
      { id: 'coffee-01', name: 'Espresso', price: 120, qty: 2 },
    ]
    const msg = buildOrderMessage(items, '4')
    expect(msg).toContain('Table 4')
    expect(msg).toContain('Espresso')
  })

  it('omits table reference when tableId is null', () => {
    const items: CartItem[] = [
      { id: 'coffee-01', name: 'Espresso', price: 120, qty: 1 },
    ]
    const msg = buildOrderMessage(items, null)
    expect(msg).not.toContain('Table')
    expect(msg).toContain('New Order')
  })

  it('shows each item with correct quantity and line total', () => {
    const items: CartItem[] = [
      { id: 'coffee-01', name: 'Espresso', price: 120, qty: 2 },
      { id: 'food-02', name: 'Croissant', price: 140, qty: 1 },
    ]
    const msg = buildOrderMessage(items, null)
    expect(msg).toContain('Espresso x2 – ₹240')
    expect(msg).toContain('Croissant x1 – ₹140')
  })

  it('computes correct order total', () => {
    const items: CartItem[] = [
      { id: 'coffee-01', name: 'Espresso', price: 120, qty: 2 },
      { id: 'food-02', name: 'Croissant', price: 140, qty: 1 },
    ]
    const msg = buildOrderMessage(items, null)
    expect(msg).toContain('Total: ₹380')
  })

  it('handles a single item cart', () => {
    const items: CartItem[] = [
      { id: 'bev-01', name: 'Lemonade', price: 150, qty: 1 },
    ]
    const msg = buildOrderMessage(items, null)
    expect(msg).toContain('Lemonade x1 – ₹150')
    expect(msg).toContain('Total: ₹150')
  })
})

describe('buildReservationMessage', () => {
  it('contains all required fields', () => {
    const msg = buildReservationMessage('Priya S.', 4, '2025-08-15 19:30', '')
    expect(msg).toContain('Reservation Request')
    expect(msg).toContain('Name: Priya S.')
    expect(msg).toContain('Party: 4')
    expect(msg).toContain('Time: 2025-08-15 19:30')
  })

  it('includes notes when provided', () => {
    const msg = buildReservationMessage('Arjun', 2, '2025-09-01 18:00', 'Window seat')
    expect(msg).toContain('Notes: Window seat')
  })

  it('omits Notes line when notes are empty', () => {
    const msg = buildReservationMessage('Rohan', 3, '2025-09-10 20:00', '')
    expect(msg).not.toContain('Notes:')
  })

  it('omits Notes line when notes are only whitespace', () => {
    const msg = buildReservationMessage('Meera', 1, '2025-09-10 20:00', '   ')
    expect(msg).not.toContain('Notes:')
  })
})

describe('openWhatsApp', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('opens a wa.me URL with the phone number and encoded message', () => {
    const spy = vi.spyOn(window, 'open').mockImplementation(() => null)
    openWhatsApp('911234567890', 'Hello World')
    expect(spy).toHaveBeenCalledOnce()
    const url = spy.mock.calls[0][0] as string
    expect(url).toMatch(/^https:\/\/wa\.me\/911234567890/)
    expect(url).toContain(encodeURIComponent('Hello World'))
  })

  it('opens in a new tab', () => {
    const spy = vi.spyOn(window, 'open').mockImplementation(() => null)
    openWhatsApp('911234567890', 'test')
    expect(spy.mock.calls[0][1]).toBe('_blank')
  })
})

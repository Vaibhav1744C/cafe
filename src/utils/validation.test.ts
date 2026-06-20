import { describe, it, expect } from 'vitest'
import { isValidEmail, isValidPhone, isNonEmpty } from './validation'

describe('isValidEmail', () => {
  it('accepts a standard email address', () => {
    expect(isValidEmail('user@example.com')).toBe(true)
  })

  it('accepts email with subdomain', () => {
    expect(isValidEmail('user@mail.example.co.in')).toBe(true)
  })

  it('rejects string without @', () => {
    expect(isValidEmail('notanemail')).toBe(false)
  })

  it('rejects string with @ but no dot after it', () => {
    expect(isValidEmail('user@nodot')).toBe(false)
  })

  it('rejects empty string', () => {
    expect(isValidEmail('')).toBe(false)
  })

  it('rejects whitespace-only string', () => {
    expect(isValidEmail('   ')).toBe(false)
  })

  it('rejects string with @ but missing local part', () => {
    expect(isValidEmail('@example.com')).toBe(false)
  })

  it('rejects string with spaces in the address', () => {
    expect(isValidEmail('user @example.com')).toBe(false)
  })
})

describe('isValidPhone', () => {
  it('accepts a 10-digit number', () => {
    expect(isValidPhone('9876543210')).toBe(true)
  })

  it('accepts number with country code and spaces', () => {
    expect(isValidPhone('+91 98765 43210')).toBe(true)
  })

  it('accepts number with dashes', () => {
    expect(isValidPhone('98765-43210')).toBe(true)
  })

  it('rejects string with fewer than 7 digits', () => {
    expect(isValidPhone('12345')).toBe(false)
  })

  it('rejects empty string', () => {
    expect(isValidPhone('')).toBe(false)
  })

  it('accepts 7-digit minimum', () => {
    expect(isValidPhone('1234567')).toBe(true)
  })

  it('rejects string with more than 15 digits', () => {
    expect(isValidPhone('1234567890123456')).toBe(false)
  })
})

describe('isNonEmpty', () => {
  it('returns true for non-empty string', () => {
    expect(isNonEmpty('hello')).toBe(true)
  })

  it('returns false for empty string', () => {
    expect(isNonEmpty('')).toBe(false)
  })

  it('returns false for whitespace-only string', () => {
    expect(isNonEmpty('   ')).toBe(false)
  })

  it('returns false for tab and newline characters', () => {
    expect(isNonEmpty('\t\n')).toBe(false)
  })

  it('returns true for string with surrounding whitespace', () => {
    expect(isNonEmpty('  hello  ')).toBe(true)
  })
})

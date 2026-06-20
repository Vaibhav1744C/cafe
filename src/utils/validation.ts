/**
 * Returns true if `value` contains a plausible email address.
 * Uses a pragmatic regex: requires local part, @, domain with at least one dot.
 */
export function isValidEmail(value: string): boolean {
  // Require: non-empty local part, @, domain label(s), dot, TLD (2+ chars)
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/**
 * Returns true if `value` looks like a phone number.
 * Accepts: optional leading +, 7–15 digits, allowing spaces, dashes, and parens.
 * Validates against the E.164 digit range (7–15 digits, ignoring formatting).
 */
export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

/**
 * Returns true if `value` is not empty after trimming whitespace.
 */
export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

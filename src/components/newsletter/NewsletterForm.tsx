import { useState } from 'react'
import { isValidEmail, isValidPhone } from '../../utils/validation'
import { SHEET_SCRIPT_URL } from '../../data/config'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function NewsletterForm() {
  const [email, setEmail]   = useState('')
  const [phone, setPhone]   = useState('')
  const [validationError, setValidationError] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const isDisabled = status === 'loading' || status === 'success'

  function validate(): boolean {
    const emailOk = email.trim() !== '' && isValidEmail(email)
    const phoneOk = phone.trim() !== '' && isValidPhone(phone)
    if (!emailOk && !phoneOk) {
      setValidationError('Please enter a valid email or phone number.')
      return false
    }
    setValidationError('')
    return true
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setStatus('loading')
    try {
      const res = await fetch(SHEET_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email:     email.trim() || undefined,
          phone:     phone.trim() || undefined,
          timestamp: new Date().toISOString(),
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  function handleRetry() {
    setStatus('idle')
    setValidationError('')
  }

  return (
    <section className="bg-espresso py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-display text-3xl font-bold text-cream mb-3">
          Stay in the Loop
        </h2>
        <p className="text-offwhite text-sm mb-8">
          Get updates on specials, events, and new menu items — straight to your inbox or phone.
        </p>

        {/* Success state */}
        {status === 'success' ? (
          <div
            role="status"
            aria-live="polite"
            className="rounded-xl bg-matcha/20 border border-matcha/40 text-cream px-6 py-5 text-sm font-medium"
          >
            🎉 You're in! We'll keep you posted.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
            aria-label="Newsletter signup form"
          >
            {/* Email field */}
            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="nl-email" className="text-xs font-semibold text-offwhite uppercase tracking-widest">
                Email address
              </label>
              <input
                id="nl-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                  if (validationError) setValidationError('')
                }}
                disabled={isDisabled}
                className="rounded-lg border border-white/20 bg-white/10 text-cream placeholder:text-cream/40 px-4 py-2.5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-amber transition disabled:opacity-50"
                placeholder="you@example.com"
              />
            </div>

            {/* Phone field */}
            <div className="flex flex-col gap-1.5 text-left">
              <label htmlFor="nl-phone" className="text-xs font-semibold text-offwhite uppercase tracking-widest">
                Phone number
              </label>
              <input
                id="nl-phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={e => {
                  setPhone(e.target.value)
                  if (validationError) setValidationError('')
                }}
                disabled={isDisabled}
                className="rounded-lg border border-white/20 bg-white/10 text-cream placeholder:text-cream/40 px-4 py-2.5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-amber transition disabled:opacity-50"
                placeholder="+91 98765 43210"
              />
            </div>

            {/* Inline validation error */}
            {validationError && (
              <p role="alert" aria-live="assertive" className="text-xs text-red-400 text-left -mt-1">
                {validationError}
              </p>
            )}

            {/* Network error banner */}
            {status === 'error' && (
              <div
                role="alert"
                aria-live="assertive"
                className="rounded-lg bg-red-900/40 border border-red-400/30 text-red-200 px-4 py-3 text-sm flex items-center justify-between gap-3"
              >
                <span>Something went wrong. Please try again.</span>
                <button
                  type="button"
                  onClick={handleRetry}
                  className="shrink-0 underline underline-offset-2 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isDisabled}
              className="mt-1 rounded-lg bg-amber text-cream font-semibold text-sm py-3 px-6 hover:bg-amber/90 active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
            >
              {status === 'loading' ? 'Sending…' : 'Notify Me'}
            </button>

            <p className="text-xs text-offwhite/50 mt-1">
              At least one of email or phone is required. No spam, ever.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}

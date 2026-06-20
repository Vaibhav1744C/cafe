import { useRef, useState } from 'react'
import { buildReservationMessage, openWhatsApp } from '../utils/whatsapp'
import { isNonEmpty } from '../utils/validation'
import { WHATSAPP_NUMBER } from '../data/config'

interface FormFields {
  name: string
  partySize: string
  datetime: string
  notes: string
}

interface FormErrors {
  name?: string
  partySize?: string
  datetime?: string
}

const EMPTY: FormFields = { name: '', partySize: '', datetime: '', notes: '' }

export default function ReservationForm() {
  const [fields, setFields] = useState<FormFields>(EMPTY)
  const [errors, setErrors] = useState<FormErrors>({})

  // Refs to each input for focusing the first invalid field
  const nameRef     = useRef<HTMLInputElement>(null)
  const partySizeRef = useRef<HTMLInputElement>(null)
  const datetimeRef = useRef<HTMLInputElement>(null)

  function validate(): FormErrors {
    const e: FormErrors = {}
    if (!isNonEmpty(fields.name))       e.name = 'Name is required.'
    const ps = Number(fields.partySize)
    if (!fields.partySize || ps < 1 || ps > 20)
      e.partySize = 'Party size must be between 1 and 20.'
    if (!isNonEmpty(fields.datetime))   e.datetime = 'Date & time is required.'
    return e
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    // Clear individual field error on edit
    if (name in errors) {
      setErrors(prev => { const next = { ...prev }; delete next[name as keyof FormErrors]; return next })
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Focus first invalid field
      if (errs.name)       nameRef.current?.focus()
      else if (errs.partySize) partySizeRef.current?.focus()
      else if (errs.datetime)  datetimeRef.current?.focus()
      return
    }

    const message = buildReservationMessage(
      fields.name.trim(),
      Number(fields.partySize),
      fields.datetime,
      fields.notes,
    )
    openWhatsApp(WHATSAPP_NUMBER, message)
    setFields(EMPTY)
    setErrors({})
  }

  return (
    <section id="reservation" className="bg-offwhite py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-espresso mb-8 text-center">
          Make a Reservation
        </h2>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-2xl shadow-md p-6 sm:p-8 flex flex-col gap-6"
          aria-label="Reservation form"
        >
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="res-name" className="text-sm font-semibold text-espresso">
              Name <span aria-hidden="true" className="text-amber">*</span>
            </label>
            <input
              ref={nameRef}
              id="res-name"
              name="name"
              type="text"
              autoComplete="name"
              value={fields.name}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'res-name-error' : undefined}
              className={`rounded-lg border px-4 py-2.5 text-sm text-espresso bg-offwhite focus:outline-none focus-visible:ring-2 focus-visible:ring-amber transition ${
                errors.name ? 'border-red-500' : 'border-espresso/20 hover:border-espresso/40'
              }`}
              placeholder="Your name"
            />
            {errors.name && (
              <p id="res-name-error" role="alert" className="text-xs text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          {/* Party Size */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="res-party-size" className="text-sm font-semibold text-espresso">
              Party Size <span aria-hidden="true" className="text-amber">*</span>
            </label>
            <input
              ref={partySizeRef}
              id="res-party-size"
              name="partySize"
              type="number"
              min={1}
              max={20}
              value={fields.partySize}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.partySize}
              aria-describedby={errors.partySize ? 'res-party-size-error' : undefined}
              className={`rounded-lg border px-4 py-2.5 text-sm text-espresso bg-offwhite focus:outline-none focus-visible:ring-2 focus-visible:ring-amber transition ${
                errors.partySize ? 'border-red-500' : 'border-espresso/20 hover:border-espresso/40'
              }`}
              placeholder="1–20 guests"
            />
            {errors.partySize && (
              <p id="res-party-size-error" role="alert" className="text-xs text-red-600">
                {errors.partySize}
              </p>
            )}
          </div>

          {/* Date & Time */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="res-datetime" className="text-sm font-semibold text-espresso">
              Date &amp; Time <span aria-hidden="true" className="text-amber">*</span>
            </label>
            <input
              ref={datetimeRef}
              id="res-datetime"
              name="datetime"
              type="datetime-local"
              value={fields.datetime}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.datetime}
              aria-describedby={errors.datetime ? 'res-datetime-error' : undefined}
              className={`rounded-lg border px-4 py-2.5 text-sm text-espresso bg-offwhite focus:outline-none focus-visible:ring-2 focus-visible:ring-amber transition ${
                errors.datetime ? 'border-red-500' : 'border-espresso/20 hover:border-espresso/40'
              }`}
            />
            {errors.datetime && (
              <p id="res-datetime-error" role="alert" className="text-xs text-red-600">
                {errors.datetime}
              </p>
            )}
          </div>

          {/* Notes (optional) */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="res-notes" className="text-sm font-semibold text-espresso">
              Notes
              <span className="ml-1 font-normal text-espresso/50">(optional)</span>
            </label>
            <textarea
              id="res-notes"
              name="notes"
              rows={3}
              value={fields.notes}
              onChange={handleChange}
              className="rounded-lg border border-espresso/20 hover:border-espresso/40 px-4 py-2.5 text-sm text-espresso bg-offwhite focus:outline-none focus-visible:ring-2 focus-visible:ring-amber transition resize-none"
              placeholder="Any special requests or dietary requirements?"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-amber text-cream font-semibold text-sm py-3 px-6 hover:bg-amber/90 active:scale-95 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2"
          >
            Reserve via WhatsApp
          </button>
        </form>
      </div>
    </section>
  )
}

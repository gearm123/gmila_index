import { useId, useRef, useState, type FormEvent } from 'react'
import InquiryNotice from './InquiryNotice.tsx'
import { useLanguage } from '../context/LanguageContext.tsx'
import { trackConversion } from '../lib/conversions.ts'
import { saveInquiry, type ContactMethod } from '../lib/inquiries.ts'
import type { Center } from '../types/center.ts'

type InquiryFormProps = {
  center?: Center
}

export default function InquiryForm({ center }: InquiryFormProps) {
  const { lang, t } = useLanguage()
  const formId = useId()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [method, setMethod] = useState<ContactMethod>('phone')
  const [honey, setHoney] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const errorId = `${formId}-error`

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (honey) {
      setDone(true)
      return
    }
    if (name.trim().length < 2) {
      setError(t.form.nameError)
      nameRef.current?.focus()
      return
    }
    if (phone.replace(/\D/g, '').length < 9) {
      setError(t.form.phoneError)
      phoneRef.current?.focus()
      return
    }
    if ((email.trim() || method === 'email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(t.form.emailError)
      emailRef.current?.focus()
      return
    }

    try {
      saveInquiry({
        centerId: center?.id ?? null,
        centerName: center ? center.name[lang] : null,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        contactMethod: method,
        message: message.trim(),
        purpose: 'callback',
        tourDate: null,
        tourTime: null,
      })
      setError('')
      setDone(true)
      if (center) trackConversion('contact', { id: center.id, type: 'center', name: center.name[lang] }, 'submit')
    } catch {
      setError(t.form.storageError)
    }
  }

  if (done) {
    return (
      <p className="form-success" id="inquiry" role="status">
        {t.form.success}
      </p>
    )
  }

  return (
    <form className="inquiry" id="inquiry" onSubmit={onSubmit} noValidate>
      <h2>{center ? t.form.centerTitle : t.form.generalTitle}</h2>
      {center?.sample ? <p className="inquiry__note">{t.form.sampleWarning}</p> : null}
      <div className="hp" aria-hidden="true">
        <label htmlFor={`${formId}-company`}>
          Company
          <input
            id={`${formId}-company`}
            value={honey}
            onChange={(event) => setHoney(event.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>
      <label className="field" htmlFor={`${formId}-name`}>
        <span>{t.form.name}</span>
        <input
          ref={nameRef}
          id={`${formId}-name`}
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          required
          aria-required="true"
          aria-invalid={error === t.form.nameError}
          aria-describedby={error === t.form.nameError ? errorId : undefined}
        />
      </label>
      <label className="field" htmlFor={`${formId}-phone`}>
        <span>{t.form.phone}</span>
        <input
          ref={phoneRef}
          id={`${formId}-phone`}
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          autoComplete="tel"
          inputMode="tel"
          required
          aria-required="true"
          aria-invalid={error === t.form.phoneError}
          aria-describedby={error === t.form.phoneError ? errorId : undefined}
        />
      </label>
      <label className="field" htmlFor={`${formId}-email`}>
        <span>{t.form.email}</span>
        <input
          ref={emailRef}
          id={`${formId}-email`}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          inputMode="email"
          aria-required={method === 'email'}
          aria-invalid={error === t.form.emailError}
          aria-describedby={error === t.form.emailError ? errorId : undefined}
        />
      </label>
      <fieldset className="field">
        <legend>{t.form.method}</legend>
        <div className="method-row">
          {(
            [
              ['phone', t.form.methodPhone],
              ['whatsapp', t.form.methodWhatsapp],
              ['email', t.form.methodEmail],
            ] as const
          ).map(([value, label]) => (
            <label key={value}>
              <input
                type="radio"
                name={`${formId}-method`}
                checked={method === value}
                onChange={() => setMethod(value)}
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="field" htmlFor={`${formId}-message`}>
        <span>{t.form.message}</span>
        <textarea id={`${formId}-message`} rows={4} value={message} onChange={(event) => setMessage(event.target.value)} />
      </label>
      {error ? (
        <p className="form-error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
      <InquiryNotice />
      <button className="site-cta site-cta--solid" type="submit">
        {t.form.submit}
      </button>
    </form>
  )
}

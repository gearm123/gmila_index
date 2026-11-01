import { useId, useState, type FormEvent } from 'react'
import { useLanguage } from '../context/LanguageContext.tsx'
import { saveInquiry, type ContactMethod, type TourTime } from '../lib/inquiries.ts'
import type { Center } from '../types/center.ts'

function todayStamp() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

export default function TourForm({ center }: { center: Center }) {
  const { lang, t } = useLanguage()
  const formId = useId()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState<TourTime>('morning')
  const [message, setMessage] = useState('')
  const [method, setMethod] = useState<ContactMethod>('phone')
  const [honey, setHoney] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (honey) {
      setDone(true)
      return
    }
    if (name.trim().length < 2) {
      setError(t.form.nameError)
      return
    }
    if (phone.replace(/\D/g, '').length < 9) {
      setError(t.form.phoneError)
      return
    }
    if ((email.trim() || method === 'email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(t.form.emailError)
      return
    }
    if (!date || date < todayStamp()) {
      setError(t.form.dateError)
      return
    }

    try {
      saveInquiry({
        centerId: center.id,
        centerName: center.name[lang],
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        contactMethod: method,
        message: message.trim(),
        purpose: 'tour',
        tourDate: date,
        tourTime: time,
      })
      setError('')
      setDone(true)
    } catch {
      setError(t.form.storageError)
    }
  }

  if (done) {
    return (
      <p className="form-success" id="tour" role="status">
        {t.form.tourSuccess}
      </p>
    )
  }

  return (
    <form className="inquiry" id="tour" onSubmit={onSubmit} noValidate>
      <h2>{t.form.tourTitle}</h2>
      <p className="inquiry__note">{t.form.tourNote}</p>
      {center.sample ? <p className="inquiry__note">{t.form.sampleWarning}</p> : null}
      <label className="hp" htmlFor={`${formId}-company`}>
        Company
        <input
          id={`${formId}-company`}
          value={honey}
          onChange={(event) => setHoney(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </label>
      <label className="field" htmlFor={`${formId}-date`}>
        <span>{t.form.tourDate}</span>
        <input
          id={`${formId}-date`}
          type="date"
          min={todayStamp()}
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />
      </label>
      <fieldset className="field">
        <legend>{t.form.tourTime}</legend>
        <div className="method-row">
          {(
            [
              ['morning', t.form.morning],
              ['afternoon', t.form.afternoon],
              ['evening', t.form.evening],
            ] as const
          ).map(([value, label]) => (
            <label key={value}>
              <input
                type="radio"
                name={`${formId}-time`}
                checked={time === value}
                onChange={() => setTime(value)}
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="field" htmlFor={`${formId}-name`}>
        <span>{t.form.name}</span>
        <input id={`${formId}-name`} value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
      </label>
      <label className="field" htmlFor={`${formId}-phone`}>
        <span>{t.form.phone}</span>
        <input
          id={`${formId}-phone`}
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          autoComplete="tel"
          inputMode="tel"
        />
      </label>
      <label className="field" htmlFor={`${formId}-email`}>
        <span>{t.form.email}</span>
        <input
          id={`${formId}-email`}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          inputMode="email"
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
        <textarea id={`${formId}-message`} rows={3} value={message} onChange={(event) => setMessage(event.target.value)} />
      </label>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      <button className="site-cta site-cta--solid" type="submit">
        {t.form.tourSubmit}
      </button>
    </form>
  )
}

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const EJS_SERVICE  = 'service_34snelx';
const EJS_TEMPLATE = 'template_q7fo4az';
const EJS_KEY      = '8bz74HkElr_OvWMyt';

const ENQUIRY_TYPES = [
  'New Project Enquiry', 'Project Consultation', 'Request for Information',
  'Complaint / Feedback', 'Partnership Opportunity', 'Career Enquiry', 'Other',
];

const SERVICES = [
  'Construction Services', 'Civil Engineering', 'Renovation & Maintenance',
  'Electrical Installation', 'Plumbing Services', 'Project Management', 'Not Applicable',
];

const EMPTY = {
  enquiry_type: '', from_name: '', company: '', phone: '',
  from_email: '', service: '', location: '', message: '',
  contact_method: 'Email', urgency: 'Normal', source: '',
};

/* Field wrapper — defined outside to prevent focus loss */
const Field = ({ label, required, children }) => (
  <div className="cf-field">
    <label className="cf-label">
      {label}{required && <span className="cf-req">*</span>}
    </label>
    {children}
  </div>
);

const Contact = () => {
  const [form,     setForm]     = useState(EMPTY);
  const [sending,  setSending]  = useState(false);
  const [sent,     setSent]     = useState(false);
  const [error,    setError]    = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.from_name || !form.phone || !form.from_email || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }

    setSending(true);
    setError('');

    try {
      await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, {
        enquiry_type:   form.enquiry_type   || 'Not specified',
        from_name:      form.from_name,
        company:        form.company        || 'N/A',
        phone:          form.phone,
        from_email:     form.from_email,
        service:        form.service        || 'N/A',
        location:       form.location       || 'N/A',
        message:        form.message,
        contact_method: form.contact_method,
        urgency:        form.urgency,
        source:         form.source         || 'N/A',
      }, { publicKey: EJS_KEY });

      setSent(true);
      setForm(EMPTY);
    } catch (err) {
      console.error('EmailJS error:', err);
      setError(`Failed to send: ${err?.text || err?.message || 'Unknown error'}. Please call 08038159214.`);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="contact" id="contact">

      {/* ── Left: info panel ── */}
      <div className="contact__left">
        <div className="contact__tag">
          <span className="contact__tag-line"/>
          <span className="contact__tag-text">SEND AN ENQUIRY</span>
        </div>
        <h2 className="contact__heading">
          Submit Your <em>Enquiry.</em>
        </h2>
        <p className="contact__sub">
          Use the form to send us a structured enquiry. We review every
          submission and respond within 24 hours on working days.
        </p>

        <div className="contact__items">
          {[
            {
              label: 'OFFICE ADDRESS',
              value: '9, Agade Street, Sabo, Yaba, Lagos',
              icon: <><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
            },
            {
              label: 'PHONE',
              value: '08038159214',
              href:  'tel:08038159214',
              icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81A16 16 0 0 0 16 16.9l.86-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>,
            },
            {
              label: 'EMAIL',
              value: 'masterpatternng@gmail.com',
              href:  'mailto:masterpatternng@gmail.com',
              icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
            },
          ].map(({ label, value, href, icon }) => (
            <div className="contact__item" key={label}>
              <div className="contact__icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
              </div>
              <div>
                <span className="contact__item-label">{label}</span>
                {href
                  ? <a href={href} className="contact__item-value contact__item-value--link">{value}</a>
                  : <span className="contact__item-value">{value}</span>
                }
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: report form ── */}
      <div className="contact__right">
        <div className="contact__form-header">
          <h3 className="contact__form-title">Enquiry Report Form</h3>
          <span className="contact__form-ref">
            REF: MP-ENQ-{new Date().getFullYear()}
          </span>
        </div>

        {/* Success */}
        {sent && (
          <div className="cf-success" role="alert">
            ✓ Enquiry submitted successfully. We will respond within 24 hours.
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="cf-error" role="alert">{error}</div>
        )}

        <form className="cf-form" onSubmit={handleSubmit} noValidate>

          {/* Section A */}
          <div className="cf-section">
            <div className="cf-section-label">A — ENQUIRY CLASSIFICATION</div>
            <div className="cf-row">
              <Field label="Type of Enquiry">
                <select className="cf-input" value={form.enquiry_type}
                  onChange={e => set('enquiry_type', e.target.value)}>
                  <option value="">Select type...</option>
                  {ENQUIRY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Service Related">
                <select className="cf-input" value={form.service}
                  onChange={e => set('service', e.target.value)}>
                  <option value="">Select service...</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
            </div>
            <div className="cf-row">
              <Field label="Urgency Level">
                <select className="cf-input" value={form.urgency}
                  onChange={e => set('urgency', e.target.value)}>
                  <option value="Normal">Normal</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Very Urgent">Very Urgent</option>
                </select>
              </Field>
              <Field label="Project Location">
                <input className="cf-input" value={form.location}
                  placeholder="Area / LGA (if applicable)"
                  onChange={e => set('location', e.target.value)}/>
              </Field>
            </div>
          </div>

          {/* Section B */}
          <div className="cf-section">
            <div className="cf-section-label">B — SUBMITTER DETAILS</div>
            <div className="cf-row">
              <Field label="Full Name" required>
                <input className="cf-input" value={form.from_name}
                  placeholder="Your full name"
                  onChange={e => set('from_name', e.target.value)}/>
              </Field>
              <Field label="Company / Organisation">
                <input className="cf-input" value={form.company}
                  placeholder="Optional"
                  onChange={e => set('company', e.target.value)}/>
              </Field>
            </div>
            <div className="cf-row">
              <Field label="Phone Number" required>
                <input className="cf-input" value={form.phone}
                  placeholder="08XXXXXXXXX"
                  onChange={e => set('phone', e.target.value)}/>
              </Field>
              <Field label="Email Address" required>
                <input className="cf-input" type="email" value={form.from_email}
                  placeholder="your@email.com"
                  onChange={e => set('from_email', e.target.value)}/>
              </Field>
            </div>
            <Field label="Preferred Response Method">
              <div className="cf-radio-group">
                {['Email', 'Phone', 'Either'].map(opt => (
                  <label key={opt} className="cf-radio">
                    <input type="radio" name="contact_method" value={opt}
                      checked={form.contact_method === opt}
                      onChange={() => set('contact_method', opt)}/>
                    <span className="cf-radio__dot"/>
                    {opt}
                  </label>
                ))}
              </div>
            </Field>
          </div>

          {/* Section C */}
          <div className="cf-section">
            <div className="cf-section-label">C — ENQUIRY DETAILS</div>
            <Field label="Full Message / Report" required>
              <textarea className="cf-input cf-textarea" value={form.message}
                placeholder="Describe your enquiry in detail — the more information you provide, the better we can assist you."
                onChange={e => set('message', e.target.value)}/>
            </Field>
          </div>

          <button
            className={`cf-submit${sending ? ' cf-submit--loading' : ''}`}
            type="submit"
            disabled={sending}
          >
            {sending ? 'SUBMITTING…' : 'SUBMIT ENQUIRY →'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

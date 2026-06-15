import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './ContactPage.css';

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

const SOURCES = [
  'Google / Search Engine', 'Referral from a friend',
  'Social Media', 'Drove past our office', 'Previous client', 'Other',
];

const EMPTY = {
  enquiry_type: '', from_name: '', company: '', phone: '',
  from_email: '', service: '', location: '', message: '',
  contact_method: 'Email', urgency: 'Normal', source: '',
};

/* Defined outside component to prevent focus-loss on re-render */
const Field = ({ label, required, hint, children }) => (
  <div className="ctp-field">
    <label className="ctp-field__label">
      {label}{required && <span className="ctp-field__req">*</span>}
    </label>
    {hint && <span className="ctp-field__hint">{hint}</span>}
    {children}
  </div>
);

const FAQS = [
  {
    q: 'How quickly will you respond?',
    a: 'We aim to respond to all enquiries within 24 hours on working days. Urgent matters are prioritised.',
  },
  {
    q: 'How do I get a project quote?',
    a: 'Fill in the enquiry form, select "New Project Enquiry", and describe your project. We will arrange a site visit and provide a written quote within 5 working days.',
  },
  {
    q: 'Do you work outside Lagos?',
    a: 'Yes. While our office is in Lagos, we have completed projects across several states. Contact us to discuss your location.',
  },
  {
    q: 'Are you registered and insured?',
    a: 'Yes. Masterpattern Nig. Ltd is fully registered with comprehensive public liability and workers compensation insurance on all projects.',
  },
];

/* ════════════════════════════════════════════════════════════════
   CONTACT PAGE
════════════════════════════════════════════════════════════════ */
const ContactPage = () => {
  const [form,    setForm]    = useState(EMPTY);
  const [sending, setSending] = useState(false);
  const [sent,    setSent]    = useState(false);
  const [error,   setError]   = useState('');
  const [openFaq, setOpenFaq] = useState(null);

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setError(`Failed to send: ${err?.text || err?.message || 'Unknown error'}. Please call 08038159214.`);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="ctp-page">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="ctp-hero">
        <div className="ctp-hero__bg" aria-hidden="true">
          <svg width="100%" height="100%" viewBox="0 0 1200 360"
            preserveAspectRatio="xMidYMid slice">
            <rect width="1200" height="360" fill="#060D1A"/>
            <g stroke="#E8781A" strokeWidth="0.4" opacity="0.09">
              {Array.from({length:20},(_,i)=>(
                <line key={i} x1={i*64} y1="0" x2={i*64} y2="360"/>
              ))}
              {Array.from({length:7},(_,i)=>(
                <line key={i} x1="0" y1={i*54} x2="1200" y2={i*54}/>
              ))}
            </g>
            <rect x="0" y="355" width="1200" height="5" fill="#C0272D" opacity="0.6"/>
          </svg>
        </div>
        <div className="ctp-hero__content">
          <nav className="ctp-hero__crumb">
            <Link to="/" className="ctp-hero__crumb-link">Home</Link>
            <span>→</span><span>Contact</span>
          </nav>
          <div className="ctp-hero__tag">
            <span className="ctp-hero__tag-line"/>
            <span className="ctp-hero__tag-text">GET IN TOUCH</span>
          </div>
          <h1 className="ctp-hero__heading">
            Submit an <em>Enquiry.</em>
          </h1>
          <p className="ctp-hero__sub">
            Use our structured enquiry form below. Every submission is reviewed
            and responded to within 24 hours on working days.
          </p>
        </div>
      </section>

      {/* ── MAIN: INFO + FORM ─────────────────────────────────── */}
      <section className="ctp-main">

        {/* Left: contact info */}
        <div className="ctp-info">
          <h2 className="ctp-info__heading">Contact Information</h2>
          <p className="ctp-info__sub">
            Reach us through any of the channels below, or complete the form.
          </p>

          <div className="ctp-info__items">
            {[
              {
                label: 'OFFICE ADDRESS',
                value: '9, Agade Street, Sabo Yaba, Lagos',
                note:  'Mon–Fri 8AM–5PM, Sat 9AM–2PM',
                icon:  <><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
              },
              {
                label: 'PHONE NUMBER',
                value: '08038159214',
                href:  'tel:08038159214',
                note:  'Available during working hours',
                icon:  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81A16 16 0 0 0 16 16.9l.86-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>,
              },
              {
                label: 'EMAIL ADDRESS',
                value: 'masterpatternltd@gmail.com',
                href:  'mailto:masterpatternltd@gmail.com',
                note:  'We reply within 24 hours',
                icon:  <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
              },
              {
                label: 'WORKING HOURS',
                value: 'Mon–Fri: 8:00AM – 5:00PM',
                note:  'Saturday: 9:00AM – 2:00PM',
                icon:  <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
              },
            ].map(({ label, value, note, href, icon }) => (
              <div className="ctp-info__item" key={label}>
                <div className="ctp-info__icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                </div>
                <div>
                  <span className="ctp-info__label">{label}</span>
                  {href
                    ? <a href={href} className="ctp-info__value ctp-info__value--link">{value}</a>
                    : <span className="ctp-info__value">{value}</span>
                  }
                  {note && <span className="ctp-info__note">{note}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="ctp-map">
            <svg viewBox="0 0 440 200" fill="none" className="ctp-map__svg">
              <rect width="440" height="200" fill="#0B1F3B"/>
              <g stroke="#E8781A" strokeWidth="0.4" opacity="0.15">
                {Array.from({length:8},(_,i)=><line key={`v${i}`} x1={i*64} y1="0" x2={i*64} y2="200"/>)}
                {Array.from({length:4},(_,i)=><line key={`h${i}`} x1="0" y1={i*54} x2="440" y2={i*54}/>)}
              </g>
              <line x1="0"   y1="100" x2="440" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="6"/>
              <line x1="220" y1="0"   x2="220" y2="200" stroke="rgba(255,255,255,0.08)" strokeWidth="6"/>
              <line x1="0"   y1="50"  x2="440" y2="50"  stroke="rgba(255,255,255,0.04)" strokeWidth="3"/>
              <line x1="0"   y1="150" x2="440" y2="150" stroke="rgba(255,255,255,0.04)" strokeWidth="3"/>
              <line x1="110" y1="0"   x2="110" y2="200" stroke="rgba(255,255,255,0.04)" strokeWidth="3"/>
              <line x1="330" y1="0"   x2="330" y2="200" stroke="rgba(255,255,255,0.04)" strokeWidth="3"/>
              {[[30,18,70,26],[145,18,70,26],[270,18,50,26],[335,18,80,26],
                [30,66,50,26],[90,66,110,26],[230,66,80,26],[325,66,100,26],
                [30,118,80,26],[125,118,85,26],[230,118,55,26],[300,118,130,26]].map(([x,y,w,h],i)=>(
                <rect key={i} x={x} y={y} width={w} height={h} rx="1"
                  fill={`rgba(11,31,59,${i%3===0?.9:.7})`} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
              ))}
              <path d="M200 82 C200 70 210 61 220 61 C230 61 240 70 240 82 C240 98 220 110 220 110 C220 110 200 98 200 82Z"
                fill="#C0272D" opacity="0.9"/>
              <circle cx="220" cy="82" r="7" fill="rgba(255,255,255,0.9)"/>
              <circle cx="220" cy="82" r="3" fill="#C0272D"/>
              <rect x="145" y="118" width="150" height="20" rx="2" fill="rgba(11,31,59,0.9)"/>
              <text x="220" y="132" textAnchor="middle" fill="#E8781A" fontSize="8"
                fontFamily="monospace" letterSpacing="1">SABO YABA, LAGOS</text>
            </svg>
            <div className="ctp-map__label">
              <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
                <path d="M8 1a5 5 0 0 0-5 5c0 3.5 5 9 5 9s5-5.5 5-9a5 5 0 0 0-5-5z"
                  stroke="#C0272D" strokeWidth="1.2"/>
                <circle cx="8" cy="6" r="2" stroke="#C0272D" strokeWidth="1.2"/>
              </svg>
              9, Agade Street, Sabo Yaba, Lagos
            </div>
          </div>
        </div>

        {/* Right: report form */}
        <div className="ctp-form-wrap">

          {/* Success */}
          {sent && (
            <div className="ctp-success" role="alert">
              <div className="ctp-success__icon">
                <svg viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="18" stroke="#C0272D" strokeWidth="1.5"/>
                  <path d="M12 20l5.5 5.5L28 14" stroke="#C0272D" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="ctp-success__title">Enquiry Submitted Successfully</p>
                <p className="ctp-success__body">We will respond within 24 hours on working days.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="ctp-send-error" role="alert">{error}</div>
          )}

          <div className="ctp-form-header">
            <h3 className="ctp-form-title">Enquiry Report Form</h3>
            <span className="ctp-form-ref">REF: MP-ENQ-{new Date().getFullYear()}</span>
          </div>

          <form className="ctp-form" onSubmit={handleSubmit} noValidate>

            {/* Section A */}
            <div className="ctp-section">
              <div className="ctp-section__label">A — ENQUIRY CLASSIFICATION</div>
              <div className="ctp-form__row">
                <Field label="Type of Enquiry">
                  <select className="ctp-form__input" value={form.enquiry_type}
                    onChange={e => set('enquiry_type', e.target.value)}>
                    <option value="">Select type...</option>
                    {ENQUIRY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Service Related">
                  <select className="ctp-form__input" value={form.service}
                    onChange={e => set('service', e.target.value)}>
                    <option value="">Select service...</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
              </div>
              <div className="ctp-form__row">
                <Field label="Urgency Level">
                  <select className="ctp-form__input" value={form.urgency}
                    onChange={e => set('urgency', e.target.value)}>
                    <option value="Normal">Normal</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Very Urgent">Very Urgent</option>
                  </select>
                </Field>
                <Field label="Project Location">
                  <input className="ctp-form__input" value={form.location}
                    placeholder="Area / LGA (if applicable)"
                    onChange={e => set('location', e.target.value)}/>
                </Field>
              </div>
            </div>

            {/* Section B */}
            <div className="ctp-section">
              <div className="ctp-section__label">B — YOUR DETAILS</div>
              <div className="ctp-form__row">
                <Field label="Full Name" required>
                  <input className="ctp-form__input" value={form.from_name}
                    placeholder="Your full name"
                    onChange={e => set('from_name', e.target.value)}/>
                </Field>
                <Field label="Company / Organisation">
                  <input className="ctp-form__input" value={form.company}
                    placeholder="Optional"
                    onChange={e => set('company', e.target.value)}/>
                </Field>
              </div>
              <div className="ctp-form__row">
                <Field label="Phone Number" required>
                  <input className="ctp-form__input" value={form.phone}
                    placeholder="08XXXXXXXXX"
                    onChange={e => set('phone', e.target.value)}/>
                </Field>
                <Field label="Email Address" required>
                  <input className="ctp-form__input" type="email" value={form.from_email}
                    placeholder="your@email.com"
                    onChange={e => set('from_email', e.target.value)}/>
                </Field>
              </div>
              <div className="ctp-form__row">
                <Field label="How Did You Hear About Us?">
                  <select className="ctp-form__input" value={form.source}
                    onChange={e => set('source', e.target.value)}>
                    <option value="">Select...</option>
                    {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Preferred Response Method">
                  <div className="ctp-radio-group">
                    {['Email', 'Phone', 'Either'].map(opt => (
                      <label key={opt} className="ctp-radio">
                        <input type="radio" name="ctp_contact_method" value={opt}
                          checked={form.contact_method === opt}
                          onChange={() => set('contact_method', opt)}/>
                        <span className="ctp-radio__dot"/>
                        {opt}
                      </label>
                    ))}
                  </div>
                </Field>
              </div>
            </div>

            {/* Section C */}
            <div className="ctp-section">
              <div className="ctp-section__label">C — MESSAGE / REPORT DETAILS</div>
              <Field label="Full Message" required
                hint="Please be as detailed as possible — include project scope, timeline, and any specific requirements.">
                <textarea className="ctp-form__input ctp-form__textarea" value={form.message}
                  placeholder="Describe your enquiry in full detail..."
                  onChange={e => set('message', e.target.value)}/>
              </Field>
            </div>

            <button
              className={`ctp-submit${sending ? ' ctp-submit--loading' : ''}`}
              type="submit"
              disabled={sending}
            >
              {sending ? 'SUBMITTING ENQUIRY…' : 'SUBMIT ENQUIRY REPORT →'}
            </button>

            <p className="ctp-form__note">
              All fields marked * are required. We respond within 24 hours on working days.
            </p>
          </form>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="ctp-faq">
        <div className="ctp-faq__left">
          <div className="ctp-faq__tag">
            <span className="ctp-faq__tag-line"/>
            <span className="ctp-faq__tag-text">FAQ</span>
          </div>
          <h2 className="ctp-faq__heading">
            Common<br/><span>Questions</span>
          </h2>
          <p className="ctp-faq__sub">
            Need a faster answer? Call us directly.
          </p>
          <a href="tel:08038159214" className="ctp-faq__call">
            <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
              <path d="M18 14.9v2.5a1.67 1.67 0 0 1-1.82 1.67A16.49 16.49 0 0 1 9 16.5a16.25 16.25 0 0 1-5-5A16.49 16.49 0 0 1 1.44 4.3a1.67 1.67 0 0 1 1.66-1.67h2.5a1.67 1.67 0 0 1 1.67 1.43c.1.8.3 1.59.58 2.34a1.67 1.67 0 0 1-.38 1.76L6.42 9.1A13.33 13.33 0 0 0 11.42 14l1.07-.72a1.67 1.67 0 0 1 1.76-.38c.75.28 1.54.475 2.34.58A1.67 1.67 0 0 1 18 14.9z"
                stroke="#C0272D" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            08038159214
          </a>
        </div>

        <div className="ctp-faq__list">
          {FAQS.map(({ q, a }, i) => (
            <div key={i} className={`ctp-faq__item${openFaq === i ? ' ctp-faq__item--open' : ''}`}>
              <button className="ctp-faq__q" type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}>
                {q}
                <svg className="ctp-faq__chevron" viewBox="0 0 16 10" fill="none">
                  <path d="M1 1l7 7 7-7" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="ctp-faq__a">
                <p>{a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

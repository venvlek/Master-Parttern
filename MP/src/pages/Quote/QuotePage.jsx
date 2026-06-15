import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './QuotePage.css';

const EJS_SERVICE  = 'service_34snelx';
const EJS_TEMPLATE = 'template_5mret8a';
const EJS_KEY      = '8bz74HkElr_OvWMyt';

/* ── Options ─────────────────────────────────────────────────── */
const SERVICES  = ['Construction Services','Civil Engineering','Renovation & Maintenance','Electrical Installation','Plumbing Services','Project Management','Multiple Services'];
const SCOPES    = ['Small (single room / minor works)','Medium (full floor / single building)','Large (multi-storey / multiple buildings)','Major (infrastructure / estate)'];
const BUDGETS   = ['Under ₦1,000,000','₦1,000,000 – ₦5,000,000','₦5,000,000 – ₦20,000,000','₦20,000,000 – ₦50,000,000','₦50,000,000 – ₦100,000,000','Over ₦100,000,000','Not sure yet'];
const TIMELINES = ['As soon as possible','Within 1 – 3 months','Within 3 – 6 months','Within 6 – 12 months','More than 12 months away','Not yet decided'];
const SOURCES   = ['Google / Search Engine','Referral from a friend or colleague','Social Media','Drove past our office','Previous client','Other'];
const STEPS     = [{num:1,label:'About You'},{num:2,label:'Your Project'},{num:3,label:'Budget & Time'},{num:4,label:'Review'}];
const PROCESS   = [
  {num:'01',title:'We receive your request', desc:'Your quote request lands with our team immediately.'},
  {num:'02',title:'We review the details',   desc:'A senior team member reviews your requirements within 24 hours.'},
  {num:'03',title:'We schedule a site visit',desc:'We contact you to arrange a free on-site assessment if needed.'},
  {num:'04',title:'You receive your quote',  desc:'A detailed written quote is delivered within 5 working days.'},
];

/* ══════════════════════════════════════════════════════════════
   HELPER COMPONENTS — defined OUTSIDE QuotePage so they are
   never re-created on re-render, which would cause focus loss.
══════════════════════════════════════════════════════════════ */
const Field = ({ label, required, error, children }) => (
  <div className={`qp-field${error ? ' qp-field--error' : ''}`}>
    <label className="qp-label">
      {label}{required && <span className="qp-required">*</span>}
    </label>
    {children}
    {error && <span className="qp-error-msg">{error}</span>}
  </div>
);

const ReviewRow = ({ label, value }) =>
  value ? (
    <div className="qp-review-row">
      <span className="qp-review-label">{label}</span>
      <span className="qp-review-value">{value}</span>
    </div>
  ) : null;

/* ════════════════════════════════════════════════════════════════
   QUOTE PAGE
════════════════════════════════════════════════════════════════ */
const QuotePage = () => {
  const navigate     = useNavigate();
  const location     = useLocation();
  const formRef      = useRef(null); /* ← ref to scroll to on step change */

  const [step,      setStep]      = useState(1);
  const [direction, setDirection] = useState('forward');
  const [errors,    setErrors]    = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending,   setSending]   = useState(false);
  const [sendError, setSendError] = useState('');

  const [form, setForm] = useState({
    name: '', company: '', phone: '', email: '',
    /* pre-populate service if navigated from ServicesPage */
    service: location.state?.service || '',
    location: '', description: '', scope: '',
    budget: '', timeline: '', source: '', notes: '',
    agreed: false,
  });

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  /* Scroll to top of the form container (not the whole page) */
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const validate = (s) => {
    const e = {};
    if (s === 1) {
      if (!form.name.trim())        e.name        = 'Please enter your full name';
      if (!form.phone.trim())       e.phone       = 'Please enter a phone number';
      if (!form.email.trim())       e.email       = 'Please enter your email address';
    }
    if (s === 2) {
      if (!form.service)            e.service     = 'Please select a service';
      if (!form.description.trim()) e.description = 'Please describe your project';
    }
    if (s === 4) {
      if (!form.agreed)             e.agreed      = 'Please confirm you agree to be contacted';
    }
    return e;
  };

  const handleNext = () => {
    const e = validate(step);
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setDirection('forward');
    setStep(s => s + 1);
    scrollToForm(); /* ← scroll to form top, not page top */
  };

  const handleBack = () => {
    setErrors({});
    setDirection('back');
    setStep(s => s - 1);
    scrollToForm();
  };

  const jumpTo = (n) => {
    setErrors({});
    setDirection('back');
    setStep(n);
    scrollToForm();
  };

  const handleSubmit = async () => {
    const e = validate(4);
    if (Object.keys(e).length) { setErrors(e); return; }

    setSending(true);
    setSendError('');

    try {
      await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, {
        from_name:   form.name,
        from_email:  form.email,
        phone:       form.phone,
        company:     form.company     || 'N/A',
        service:     form.service,
        scope:       form.scope       || 'N/A',
        location:    form.location    || 'N/A',
        description: form.description,
        budget:      form.budget      || 'N/A',
        timeline:    form.timeline    || 'N/A',
        source:      form.source      || 'N/A',
        notes:       form.notes       || 'N/A',
      }, { publicKey: EJS_KEY });

      setSubmitted(true);
      scrollToForm();
    } catch (err) {
      console.error('EmailJS error:', err);
      setSendError(`Failed to send: ${err?.text || err?.message || 'Unknown error'}. Please call 08038159214.`);
    } finally {
      setSending(false);
    }
  };

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="qp-page">

      {/* HERO */}
      <section className="qp-hero">
        <div className="qp-hero__bg" aria-hidden="true">
          <svg width="100%" height="100%" viewBox="0 0 1200 320" preserveAspectRatio="xMidYMid slice">
            <rect width="1200" height="320" fill="#0B1F3B"/>
            <g stroke="#E8781A" strokeWidth="0.4" opacity="0.08">
              {Array.from({length:20},(_,i)=><line key={i} x1={i*64} y1="0" x2={i*64} y2="320"/>)}
              {Array.from({length:6}, (_,i)=><line key={i} x1="0" y1={i*58} x2="1200" y2={i*58}/>)}
            </g>
            <rect x="0" y="315" width="1200" height="5" fill="#C0272D" opacity="0.7"/>
          </svg>
        </div>
        <div className="qp-hero__content">
          <nav className="qp-hero__crumb">
            <Link to="/" className="qp-hero__crumb-link">Home</Link>
            <span>→</span><span>Get a Quote</span>
          </nav>
          <div className="qp-hero__tag">
            <span className="qp-hero__tag-line"/>
            <span className="qp-hero__tag-text">FREE QUOTE</span>
          </div>
          <h1 className="qp-hero__heading">Tell Us About Your <em>Project.</em></h1>
          <p className="qp-hero__sub">
            Fill in the form below and our team will get back to you
            with a detailed, no-obligation quote within 5 working days.
          </p>
        </div>
      </section>

      {/* LAYOUT */}
      <div className="qp-layout">

        {/* Sidebar */}
        <aside className="qp-sidebar">
          <h3 className="qp-sidebar__heading">What Happens Next?</h3>
          <div className="qp-sidebar__steps">
            {PROCESS.map(({ num, title, desc }) => (
              <div className="qp-sidebar__step" key={num}>
                <div className="qp-sidebar__step-num">{num}</div>
                <div>
                  <h4 className="qp-sidebar__step-title">{title}</h4>
                  <p className="qp-sidebar__step-desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="qp-sidebar__divider"/>
          <h3 className="qp-sidebar__heading">Prefer to Call?</h3>
          <a href="tel:08038159214" className="qp-sidebar__phone">
            <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
              <path d="M18 14.9v2.5a1.67 1.67 0 0 1-1.82 1.67A16.49 16.49 0 0 1 9 16.5a16.25 16.25 0 0 1-5-5A16.49 16.49 0 0 1 1.44 4.3a1.67 1.67 0 0 1 1.66-1.67h2.5a1.67 1.67 0 0 1 1.67 1.43c.1.8.3 1.59.58 2.34a1.67 1.67 0 0 1-.38 1.76L6.42 9.1A13.33 13.33 0 0 0 11.42 14l1.07-.72a1.67 1.67 0 0 1 1.76-.38c.75.28 1.54.475 2.34.58A1.67 1.67 0 0 1 18 14.9z"
                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            08038159214
          </a>
          <p className="qp-sidebar__phone-note">Mon–Fri 8AM–5PM · Sat 9AM–2PM</p>
          <div className="qp-sidebar__divider"/>
          <h3 className="qp-sidebar__heading">Response Time</h3>
          <div className="qp-sidebar__badges">
            <div className="qp-sidebar__badge">
              <span className="qp-sidebar__badge-val">24h</span>
              <span className="qp-sidebar__badge-label">Initial response</span>
            </div>
            <div className="qp-sidebar__badge">
              <span className="qp-sidebar__badge-val">5 days</span>
              <span className="qp-sidebar__badge-label">Full written quote</span>
            </div>
          </div>
        </aside>

        {/* Form container — ref attached here for scrolling */}
        <div className="qp-form-container" ref={formRef}>

          {submitted ? (
            <div className="qp-success">
              <div className="qp-success__icon">
                <svg viewBox="0 0 56 56" fill="none">
                  <circle cx="28" cy="28" r="26" stroke="#C0272D" strokeWidth="2"/>
                  <path d="M16 28l8 8 16-16" stroke="#C0272D" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="qp-success__heading">Quote Request Sent!</h2>
              <p className="qp-success__body">
                Thank you, <strong>{form.name}</strong>. We have received your request
                and will be in touch within 24 hours.
              </p>
              <p className="qp-success__email">
                A confirmation will be sent to <strong>{form.email}</strong>
              </p>
              <div className="qp-success__actions">
                <button className="qp-success__btn qp-success__btn--primary"
                  onClick={() => navigate('/')} type="button">BACK TO HOME</button>
                <button className="qp-success__btn qp-success__btn--outline"
                  onClick={() => navigate('/projects')} type="button">VIEW OUR PROJECTS</button>
              </div>
            </div>

          ) : (
            <>
              {/* Progress bar */}
              <div className="qp-progress">
                <div className="qp-progress__bar">
                  <div className="qp-progress__fill" style={{ width: `${progress}%` }}/>
                </div>
                <div className="qp-progress__steps">
                  {STEPS.map(s => (
                    <div key={s.num} className={[
                      'qp-progress__step',
                      step === s.num ? 'qp-progress__step--active' : '',
                      step  > s.num ? 'qp-progress__step--done'   : '',
                    ].join(' ')}>
                      <div className="qp-progress__step-circle">
                        {step > s.num
                          ? <svg viewBox="0 0 12 10" fill="none" width="12" height="10">
                              <polyline points="1,5 4.5,9 11,1" stroke="#fff" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          : s.num}
                      </div>
                      <span className="qp-progress__step-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step content — key={step} triggers re-animation on change */}
              <div className={`qp-step qp-step--${direction}`} key={step}>

                {/* ── STEP 1 ── */}
                {step === 1 && (
                  <div className="qp-step__inner">
                    <div className="qp-step__header">
                      <span className="qp-step__num">STEP 1 OF 4</span>
                      <h2 className="qp-step__title">About You</h2>
                      <p className="qp-step__desc">Tell us who you are so we can tailor our quote.</p>
                    </div>
                    <div className="qp-fields">
                      <div className="qp-row">
                        <Field label="Full Name" required error={errors.name}>
                          <input className="qp-input" value={form.name}
                            placeholder="Your full name"
                            onChange={e => set('name', e.target.value)}/>
                        </Field>
                        <Field label="Company Name" error={errors.company}>
                          <input className="qp-input" value={form.company}
                            placeholder="Optional"
                            onChange={e => set('company', e.target.value)}/>
                        </Field>
                      </div>
                      <div className="qp-row">
                        <Field label="Phone Number" required error={errors.phone}>
                          <input className="qp-input" value={form.phone}
                            placeholder="08XXXXXXXXX"
                            onChange={e => set('phone', e.target.value)}/>
                        </Field>
                        <Field label="Email Address" required error={errors.email}>
                          <input className="qp-input" type="email" value={form.email}
                            placeholder="your@email.com"
                            onChange={e => set('email', e.target.value)}/>
                        </Field>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 2 ── */}
                {step === 2 && (
                  <div className="qp-step__inner">
                    <div className="qp-step__header">
                      <span className="qp-step__num">STEP 2 OF 4</span>
                      <h2 className="qp-step__title">Your Project</h2>
                      <p className="qp-step__desc">Give us the key details about what you need done.</p>
                    </div>
                    <div className="qp-fields">
                      <div className="qp-row">
                        <Field label="Service Required" required error={errors.service}>
                          <select className="qp-input" value={form.service}
                            onChange={e => set('service', e.target.value)}>
                            <option value="">Select a service...</option>
                            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </Field>
                        <Field label="Project Scope" error={errors.scope}>
                          <select className="qp-input" value={form.scope}
                            onChange={e => set('scope', e.target.value)}>
                            <option value="">Select project scale...</option>
                            {SCOPES.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </Field>
                      </div>
                      <Field label="Project Location" error={errors.location}>
                        <input className="qp-input" value={form.location}
                          placeholder="Street, area or LGA"
                          onChange={e => set('location', e.target.value)}/>
                      </Field>
                      <Field label="Project Description" required error={errors.description}>
                        <textarea className="qp-input qp-textarea" value={form.description}
                          placeholder="Describe what you need — type of work, size, current condition, special requirements..."
                          onChange={e => set('description', e.target.value)}/>
                      </Field>
                    </div>
                  </div>
                )}

                {/* ── STEP 3 ── */}
                {step === 3 && (
                  <div className="qp-step__inner">
                    <div className="qp-step__header">
                      <span className="qp-step__num">STEP 3 OF 4</span>
                      <h2 className="qp-step__title">Budget &amp; Timeline</h2>
                      <p className="qp-step__desc">Approximate figures help us tailor the right solution.</p>
                    </div>
                    <div className="qp-fields">
                      <div className="qp-row">
                        <Field label="Approximate Budget" error={errors.budget}>
                          <select className="qp-input" value={form.budget}
                            onChange={e => set('budget', e.target.value)}>
                            <option value="">Select a budget range...</option>
                            {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                          </select>
                        </Field>
                        <Field label="Preferred Start Date" error={errors.timeline}>
                          <select className="qp-input" value={form.timeline}
                            onChange={e => set('timeline', e.target.value)}>
                            <option value="">Select preferred start...</option>
                            {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </Field>
                      </div>
                      <Field label="How Did You Hear About Us?" error={errors.source}>
                        <select className="qp-input" value={form.source}
                          onChange={e => set('source', e.target.value)}>
                          <option value="">Select an option...</option>
                          {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </Field>
                      <Field label="Additional Notes" error={errors.notes}>
                        <textarea className="qp-input qp-textarea" value={form.notes}
                          placeholder="Anything else we should know? (optional)"
                          onChange={e => set('notes', e.target.value)}/>
                      </Field>
                    </div>
                  </div>
                )}

                {/* ── STEP 4 ── */}
                {step === 4 && (
                  <div className="qp-step__inner">
                    <div className="qp-step__header">
                      <span className="qp-step__num">STEP 4 OF 4</span>
                      <h2 className="qp-step__title">Review &amp; Submit</h2>
                      <p className="qp-step__desc">Check your details before submitting.</p>
                    </div>

                    <div className="qp-review">
                      <div className="qp-review__section">
                        <h4 className="qp-review__section-title">
                          <span>Contact Details</span>
                          <button className="qp-review__edit" onClick={() => jumpTo(1)} type="button">Edit</button>
                        </h4>
                        <ReviewRow label="Name"    value={form.name}/>
                        <ReviewRow label="Company" value={form.company}/>
                        <ReviewRow label="Phone"   value={form.phone}/>
                        <ReviewRow label="Email"   value={form.email}/>
                      </div>
                      <div className="qp-review__section">
                        <h4 className="qp-review__section-title">
                          <span>Project Details</span>
                          <button className="qp-review__edit" onClick={() => jumpTo(2)} type="button">Edit</button>
                        </h4>
                        <ReviewRow label="Service"     value={form.service}/>
                        <ReviewRow label="Scope"       value={form.scope}/>
                        <ReviewRow label="Location"    value={form.location}/>
                        <ReviewRow label="Description" value={form.description}/>
                      </div>
                      <div className="qp-review__section">
                        <h4 className="qp-review__section-title">
                          <span>Budget &amp; Timeline</span>
                          <button className="qp-review__edit" onClick={() => jumpTo(3)} type="button">Edit</button>
                        </h4>
                        <ReviewRow label="Budget"   value={form.budget}/>
                        <ReviewRow label="Timeline" value={form.timeline}/>
                        <ReviewRow label="Source"   value={form.source}/>
                        <ReviewRow label="Notes"    value={form.notes}/>
                      </div>
                    </div>

                    <label className={`qp-agree${errors.agreed ? ' qp-agree--error' : ''}`}>
                      <input type="checkbox" className="qp-agree__checkbox"
                        checked={form.agreed}
                        onChange={e => set('agreed', e.target.checked)}/>
                      <span className="qp-agree__custom" aria-hidden="true"/>
                      <span className="qp-agree__text">
                        I agree to be contacted by Masterpattern Nig. Ltd regarding
                        this quote request. My details will not be shared with third parties.
                      </span>
                    </label>
                    {errors.agreed && <span className="qp-error-msg">{errors.agreed}</span>}

                    {sendError && (
                      <div className="qp-send-error" role="alert">{sendError}</div>
                    )}
                  </div>
                )}
              </div>

              {/* Nav buttons */}
              <div className="qp-nav">
                {step > 1 && (
                  <button className="qp-nav__back" onClick={handleBack}
                    type="button" disabled={sending}>← BACK</button>
                )}
                <div className="qp-nav__right">
                  <span className="qp-nav__hint">Step {step} of {STEPS.length}</span>
                  {step < 4
                    ? <button className="qp-nav__next" onClick={handleNext} type="button">
                        NEXT →
                      </button>
                    : <button
                        className={`qp-nav__submit${sending ? ' qp-nav__submit--loading' : ''}`}
                        onClick={handleSubmit} type="button" disabled={sending}>
                        {sending ? 'SENDING…' : 'SUBMIT QUOTE REQUEST →'}
                      </button>
                  }
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuotePage;

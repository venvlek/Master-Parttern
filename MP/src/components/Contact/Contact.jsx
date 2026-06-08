import React, { useState } from 'react';
import './Contact.css';

const INFO = [
  {
    label: 'OFFICE ADDRESS',
    value: '9, Agade Street, Sabo, Yaba, Lagos, Nigeria',
    icon: <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>,
    sub: <circle cx="12" cy="10" r="3"/>,
  },
  {
    label: 'PHONE NUMBER',
    value: '08038159214',
    icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.81A16 16 0 0 0 16 16.9l.86-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>,
  },
  {
    label: 'EMAIL ADDRESS',
    value: 'masterpatternltd@gmail.com',
    icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
  },
  {
    label: 'WORKING HOURS',
    value: 'Mon–Fri: 8:00AM – 5:00PM  ·  Sat: 9:00AM – 2:00PM',
    icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
  },
];

const SERVICES = ['Construction Services','Civil Engineering','Renovation & Maintenance','Electrical Installation','Plumbing Services','Project Management'];

const Contact = () => {
  const [form, setForm] = useState({ name:'', phone:'', email:'', service:'', message:'' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: wire to EmailJS / Formspree
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name:'', phone:'', email:'', service:'', message:'' });
  };

  return (
    <section className="contact" id="contact">

      {/* ── Left: info ── */}
      <div className="contact__left">
        <div className="contact__tag">
          <span className="contact__tag-line"/>
          <span className="contact__tag-text">GET IN TOUCH</span>
        </div>

        <h2 className="contact__heading">
          Let's Build <em>Something</em><br/>Great Together.
        </h2>

        <p className="contact__sub">
          Reach out today for a free consultation and project quote.
          Our team is ready to bring your vision to life.
        </p>

        <div className="contact__items">
          {INFO.map(({ label, value, icon, sub }) => (
            <div className="contact__item" key={label}>
              <div className="contact__icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {icon}{sub}
                </svg>
              </div>
              <div>
                <span className="contact__item-label">{label}</span>
                <span className="contact__item-value">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: form ── */}
      <div className="contact__right">
        <h3 className="contact__form-title">Request a Free Quote</h3>

        {sent && <div className="contact__success">✓ Message sent! We'll be in touch shortly.</div>}

        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          <div className="contact__row">
            <div className="contact__field">
              <label className="contact__label">FULL NAME</label>
              <input className="contact__input" name="name" value={form.name}
                onChange={handleChange} placeholder="Your full name" required/>
            </div>
            <div className="contact__field">
              <label className="contact__label">PHONE NUMBER</label>
              <input className="contact__input" name="phone" value={form.phone}
                onChange={handleChange} placeholder="08XXXXXXXXX"/>
            </div>
          </div>

          <div className="contact__field">
            <label className="contact__label">EMAIL ADDRESS</label>
            <input className="contact__input" name="email" type="email" value={form.email}
              onChange={handleChange} placeholder="your@email.com" required/>
          </div>

          <div className="contact__field">
            <label className="contact__label">SERVICE REQUIRED</label>
            <select className="contact__input" name="service" value={form.service} onChange={handleChange}>
              <option value="">Select a service...</option>
              {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="contact__field">
            <label className="contact__label">PROJECT DETAILS</label>
            <textarea className="contact__input contact__textarea" name="message"
              value={form.message} onChange={handleChange}
              placeholder="Describe your project, location, and timeline..." required/>
          </div>

          <button className="contact__submit" type="submit">SEND MESSAGE →</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

import React, { useState } from 'react';
import { personal } from '../data/resume';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare the payload for Web3Forms API
    const formData = {
      access_key: "9b24ef36-deb0-42fa-b0ad-751d877a5e1e", // 👈 PASTE YOUR ACCESS KEY HERE
      name: form.name,
      email: form.email,
      subject: `[Portfolio] ${form.subject}`,
      message: form.message
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        setSent(true);
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSent(false), 3500);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="glow-orb contact__orb--1" />
      <div className="glow-orb contact__orb--2" />
      <div className="container contact__inner">

        {/* Left: info */}
        <div className="contact__info">
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title contact__title">
            Let's Work<br />
            <span className="contact__title-accent">Together</span>
          </h2>
          <p className="contact__desc">
            Whether you need IT support, design work, or an eager team member — I'm ready to contribute and grow. Let's connect!
          </p>

          <div className="contact__details">
            <a href={`mailto:${personal.email}`} className="contact__detail-item">
              <div className="contact__detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <span className="contact__detail-label">Email</span>
                <span className="contact__detail-value">{personal.email}</span>
              </div>
            </a>

            <div className="contact__detail-item">
              <div className="contact__detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              </div>
              <div>
                <span className="contact__detail-label">Phone</span>
                <span className="contact__detail-value">{personal.phone}</span>
              </div>
            </div>

            <div className="contact__detail-item">
              <div className="contact__detail-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <span className="contact__detail-label">Location</span>
                <span className="contact__detail-value">{personal.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="contact__form-wrapper">
          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__form-row">
              <div className="contact__field">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name" name="name" type="text" placeholder="Angel Benitez"
                  value={form.name} onChange={handleChange} required
                />
              </div>
              <div className="contact__field">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email" name="email" type="type" placeholder="hello@example.com"
                  value={form.email} onChange={handleChange} required
                />
              </div>
            </div>
            <div className="contact__field">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject" name="subject" type="text" placeholder="What's this about?"
                value={form.subject} onChange={handleChange} required
              />
            </div>
            <div className="contact__field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message" name="message" rows="5" placeholder="Tell me about the opportunity..."
                value={form.message} onChange={handleChange} required
              />
            </div>
            <button type="submit" disabled={isSubmitting} className={`btn-primary contact__submit ${sent ? 'contact__submit--sent' : ''}`}>
              <span>{isSubmitting ? 'Sending...' : sent ? '✓ Message Sent!' : 'Send Message'}</span>
              {!sent && !isSubmitting && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
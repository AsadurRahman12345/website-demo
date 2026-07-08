import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  RefreshCw, 
  ShieldCheck, 
  Coins, 
  Send, 
  CheckCircle 
} from 'lucide-react';
import styles from './About.module.css';

export default function About() {
  // Contact Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Form Animation States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    // Simulate backend email integration
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset success state after animation
      setTimeout(() => {
        setIsSuccess(false);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      }, 2500);

    }, 1500);
  };

  return (
    <div className={styles.aboutContainer}>
      {/* Page Title */}
      <div className={`${styles.titleSection} scroll-animate fade-down`}>
        <h1 className={styles.title}>Our Vision</h1>
        <p className={styles.subtitle}>Redefining fashion by buying, selling, and circulating pre-loved garments.</p>
      </div>

      {/* Story storytelling Section */}
      <section className={styles.storySection}>
        <div className={`${styles.storyContent} scroll-animate fade-left`}>
          <h2 className={styles.storyHeading}>Curating a Circular Aesthetic</h2>
          <p className={styles.storyText}>
            Every year, millions of tons of garments are dumped into landfills. At CLOTH.DEMO, we believe style should not cost the planet. Our tagline, <strong>“buy or sell your clothes”</strong>, is a call to fashion curators, boutique shopkeepers, and everyday collectors to keep clothes moving.
          </p>
          <p className={styles.storyText}>
            We provide a transparent peer-to-peer ecosystem combining the visual fidelity of premium editorial brands with state-of-the-art security features. Whether you are offloading vintage denim or listing custom hand-dyed drops, our curator audits ensure quality is never compromised.
          </p>
        </div>
        <div className={`${styles.storyImageCol} scroll-animate fade-right`}>
          <img 
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop" 
            alt="Clothing Rack Showroom" 
            className={styles.storyImage}
          />
        </div>
      </section>

      {/* Core Values Section */}
      <section className={styles.valuesSection}>
        <h2 className={styles.sectionHeading}>Marketplace Principles</h2>
        <div className={styles.valuesGrid}>
          <div className={`${styles.valueCard} glass-panel scroll-animate fade-left`}>
            <div className={styles.valueIcon}>
              <RefreshCw size={24} />
            </div>
            <h3>Circular Curation</h3>
            <p>We extend the lifespan of designer fabrics. Each item recirculated offsets global manufacturing footprints and reduces landfill volume.</p>
          </div>

          <div className={`${styles.valueCard} glass-panel scroll-animate zoom-in delay-100`}>
            <div className={styles.valueIcon}>
              <ShieldCheck size={24} />
            </div>
            <h3>Quality Audits</h3>
            <p>Our dedicated curation curators review stitching configurations, tag alignments, and fabric integrity for every single listed catalog garment.</p>
          </div>

          <div className={`${styles.valueCard} glass-panel scroll-animate fade-right delay-200`}>
            <div className={styles.valueIcon}>
              <Coins size={24} />
            </div>
            <h3>Transparent Payouts</h3>
            <p>Shopkeepers list products for free. We only charge a small 5% fee on successful orders, facilitating secure transactions and tracking.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.contactGrid}>
        {/* Left Information column */}
        <div className={`${styles.contactInfoCol} scroll-animate fade-left`}>
          <h2 className={styles.storyHeading}>Get In Touch</h2>
          <p className={styles.contactDesc}>
            Have questions about listed garments, seller payout terms, or quality curation standards? Drop us a note, or visit our Soho flagship showroom.
          </p>

          <div className={styles.infoCards}>
            <div className={`${styles.infoCard} glass-panel`}>
              <div className={styles.infoIcon}>
                <Mail size={18} />
              </div>
              <div>
                <span className={styles.infoLabel}>Curator Support</span>
                <div className={styles.infoVal}>support@clothdemo.com</div>
              </div>
            </div>

            <div className={`${styles.infoCard} glass-panel`}>
              <div className={styles.infoIcon}>
                <Phone size={18} />
              </div>
              <div>
                <span className={styles.infoLabel}>Direct Hotline</span>
                <div className={styles.infoVal}>+1 (555) 019-2834</div>
              </div>
            </div>

            <div className={`${styles.infoCard} glass-panel`}>
              <div className={styles.infoIcon}>
                <MapPin size={18} />
              </div>
              <div>
                <span className={styles.infoLabel}>Studio Headquarters</span>
                <div className={styles.infoVal}>452 Broadway, New York, NY 10013</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Contact Form Card */}
        <div className={`${styles.formCard} glass-panel scroll-animate fade-right`}>
          {isSubmitting ? (
            <div className={styles.loaderOverlay}>
              <div className={styles.spinner} />
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>Transmitting Message...</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Establishing connection to curator staff.</p>
            </div>
          ) : isSuccess ? (
            <div className={styles.loaderOverlay}>
              <CheckCircle size={40} className={styles.successIcon} />
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)' }}>Transmission Sent!</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Thank you for reaching out. We will respond within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '20px' }}>Send Direct Message</h3>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Your Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Marcus Vance" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="e.g. marcus@gmail.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Subject</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Curation Question / Listing Inquiry" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Message Details</label>
                <textarea 
                  className={styles.textarea}
                  placeholder="Write your inquiries, feedback, or verification queries here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Transmit Message <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

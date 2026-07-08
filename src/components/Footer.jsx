import React, { useState } from 'react';
import { 
  Globe, 
  Send,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';
import styles from './Footer.module.css';

// Custom inline SVG icons for brands (removed in recent Lucide versions)
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);


export default function Footer({ setCurrentRoute }) {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    alert(`Thank you for subscribing! We've sent a confirmation to: ${email}. Welcome to the CLOTH.DEMO inner circle.`);
    setEmail('');
  };

  return (
    <footer className={styles.footer}>
      {/* Newsletter signup row */}
      <div className={styles.newsletterSection}>
        <div className={styles.newsInfo}>
          <h3 className={styles.newsTitle}>Subscribe to Premium Drops</h3>
          <p className={styles.newsDesc}>Join our exclusive list for early access to vintage items and custom brand listings.</p>
        </div>
        <form className={styles.form} onSubmit={handleSubscribe}>
          <input 
            type="email" 
            className={styles.input} 
            placeholder="Enter your email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <button type="submit" className={styles.submitBtn}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              JOIN <Send size={14} />
            </span>
          </button>
        </form>
      </div>

      {/* Main footer grid */}
      <div className={styles.grid}>
        {/* Brand column */}
        <div className={styles.brandCol}>
          <span style={{ fontSize: '1.8rem', fontWeight: 700, fontFamily: 'var(--font-serif)' }}>CLOTH.DEMO</span>
          <p className={styles.tagline}>"Buy or sell your clothes"</p>
          <p className={styles.desc}>
            A premium peer-to-peer e-commerce ecosystem designed for fashion enthusiasts, sustainable curators, and independent clothing brands.
          </p>
          <div className={styles.socials}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
              <InstagramIcon size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Twitter">
              <TwitterIcon size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
              <FacebookIcon size={18} />
            </a>
            <a href="https://google.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Website">
              <Globe size={18} />
            </a>
          </div>
        </div>

        {/* Directory links */}
        <div className={styles.linkCol}>
          <h4 className={styles.heading}>Directory</h4>
          <ul className={styles.links}>
            <li><a onClick={() => setCurrentRoute('home')}>Home Marketplace</a></li>
            <li><a onClick={() => setCurrentRoute('shop')}>Browse Clothes</a></li>
            <li><a onClick={() => setCurrentRoute('sell')}>List Your Item</a></li>
            <li><a onClick={() => setCurrentRoute('about')}>Company Vision</a></li>
          </ul>
        </div>

        {/* Support details */}
        <div className={styles.linkCol}>
          <h4 className={styles.heading}>Contact</h4>
          <ul className={styles.links} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <Mail size={14} className="text-gradient" /> support@clothdemo.com
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <Phone size={14} className="text-gradient" /> +1 (555) 019-2834
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <MapPin size={18} className="text-gradient" style={{ marginTop: '3px' }} /> 
              <span>452 Broadway, Soho<br />New York, NY 10013</span>
            </li>
          </ul>
        </div>

        {/* Interactive Google Map widget */}
        <div className={styles.mapCol}>
          <h4 className={styles.heading}>Flagship Studio</h4>
          <div className={styles.mapContainer}>
            <iframe 
              title="Cloth Demo Showroom"
              src="https://maps.google.com/maps?q=452%20broadway%20new%20york&t=&z=14&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Bottom copyrights section */}
      <div className={styles.bottom}>
        <span className={styles.bottomText}>
          &copy; {new Date().getFullYear()} CLOTH.DEMO Inc. Created with pure glassmorphism logic. All rights reserved.
        </span>
        <div className={styles.bottomText} style={{ display: 'flex', gap: '20px' }}>
          <a href="#privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#terms" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

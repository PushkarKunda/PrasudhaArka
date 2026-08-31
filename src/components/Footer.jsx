import React from 'react';
import { Headphones, MapPin, Mail, ExternalLink } from 'lucide-react';
import { DEALERS } from '../data/dealers';
import { scrollToSection } from '../utils/navigation';

export const Footer = ({ lang, t }) => {
  return (
    <footer className="site-footer" id="footer">
      <div className="container footer-inner">

        {/* Section 1: Main 4-Column Grid */}
        <div className="footer-top-grid">
          {/* Col 1: Brand */}
          <div className="footer-col brand-col">
            <div className="footer-logo-badge">
              <img 
                src={lang === 'te' ? '/assets/logo_te.jpg' : '/assets/logo_en.jpg'} 
                alt="Prasudharka Solar" 
                className="footer-logo-img"
              />
            </div>
            <h3 className="footer-brand-heading">PRASUDHAARKA SOLAR</h3>
            <p className="footer-brand-desc">
              Authorized Solar & Green Energy Partner providing PM Surya Ghar Muft Bijli Yojana rooftop solutions, RO water plants, and lithium batteries across AP, Telangana, Bangalore, & Chennai.
            </p>
            <div className="footer-gstin-badge">
              <span>GSTIN : 36ABHPU5118F1ZS</span>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#home" onClick={(e) => scrollToSection('home', e)}>Home</a></li>
              <li><a href="#pricing" onClick={(e) => scrollToSection('pricing', e)}>System Pricing</a></li>
              <li><a href="#calculator" onClick={(e) => scrollToSection('calculator', e)}>Calculator</a></li>
              <li><a href="#services" onClick={(e) => scrollToSection('services', e)}>Services</a></li>
              <li><a href="#contact" onClick={(e) => scrollToSection('contact', e)}>Contact Us</a></li>
            </ul>
          </div>

          {/* Col 3: Our Offerings */}
          <div className="footer-col">
            <h4 className="footer-col-title">Our Offerings</h4>
            <ul className="footer-links-list">
              <li><a href="#about" onClick={(e) => scrollToSection('about', e)}>Panasonic Rooftop Solar</a></li>
              <li><a href="#about" onClick={(e) => scrollToSection('about', e)}>Havells Solar Systems</a></li>
              <li><a href="#about" onClick={(e) => scrollToSection('about', e)}>Polycab Panels & Inverters</a></li>
              <li><a href="#services" onClick={(e) => scrollToSection('services', e)}>Lithium-Ion Battery Storage</a></li>
              <li><a href="#services" onClick={(e) => scrollToSection('services', e)}>Commercial RO Plants</a></li>
              <li><a href="#services" onClick={(e) => scrollToSection('services', e)}>CRI Agricultural Pumps</a></li>
            </ul>
          </div>

          {/* Col 4: Office & Contacts */}
          <div className="footer-col contacts-col">
            <h4 className="footer-col-title">Office & Contacts</h4>
            
            <div className="footer-contact-item">
              <p className="contact-person">
                <strong>K. Sudhakar:</strong> <a href={`tel:${DEALERS.sudhakar.phone}`}>{DEALERS.sudhakar.phoneDisplay}</a>
              </p>
              <p className="contact-addr">Tukkuguda, RangaReddy Dist., Hyderabad, Telangana.</p>
            </div>

            <div className="footer-contact-item">
              <p className="contact-person">
                <strong>K. Bhaskar:</strong> <a href={`tel:${DEALERS.bhaskar.phone}`}>{DEALERS.bhaskar.phoneDisplay}</a>
              </p>
              <p className="contact-addr">Nagulakatta, Jammalamadugu (JMD), YSR Kadapa Dist., Andhra Pradesh</p>
            </div>

            <div className="footer-hours-note">
              <span>సేవలు: ఉదయం 8:00 నుండి రాత్రి 9:00 వరకు</span>
            </div>
          </div>
        </div>

        {/* Section 2: Customer Care Box */}
        <div className="footer-care-box">
          <div className="care-header">
            <Headphones size={22} className="text-gold" />
            <div className="care-title-wrap">
              <span className="care-title">Customer Care</span>
              <span className="care-timing">(10:00 AM to 6:00 PM)</span>
            </div>
          </div>

          <div className="care-grid">
            <div className="care-region-card">
              <span className="region-name">ANDHRA PRADESH & TELANGANA</span>
              <div className="region-numbers">
                <a href="tel:9848140099">98481 40099</a>
                <span className="slash">/</span>
                <a href="tel:9848150099">98481 50099</a>
                <span className="slash">/</span>
                <a href="tel:9848170099">98481 70099</a>
              </div>
            </div>

            <div className="care-region-card highlight-card">
              <span className="region-name">KARNATAKA & TAMILNADU</span>
              <div className="region-numbers">
                <a href="tel:8884212121">88842 12121</a>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: For more information Look Into */}
        <div className="footer-ext-banner">
          <span className="ext-label">For more information, Look into</span>
          <a 
            href="https://www.aquapzone.in" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="ext-link-pill"
          >
            <span>https://www.aquapzone.in</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Section 4: AquaPzone Enterprises Secondary Brand Container */}
        <div className="footer-aquapzone-card">
          <div className="aqua-brand-col">
            <div className="aqua-logo-box">
              <img 
                src="/assets/aquapzone_logo.jpg" 
                alt="aquaPzone enterprises" 
                className="aqua-logo-img" 
              />
            </div>
            <div className="aqua-text-group">
              <h4 className="aqua-title">aquaPzone enterprises</h4>
              <span className="aqua-sub">SOLAR & RENEWABLES</span>
              <p className="aqua-desc">
                Two specialized brands under one trusted name — delivering water and renewable energy infrastructure across India.
              </p>
            </div>
          </div>

          <div className="aqua-locations-col">
            <h5 className="aqua-col-heading">LOCATIONS</h5>
            <div className="loc-detail">
              <div className="loc-head">
                <MapPin size={15} className="loc-pin-icon" />
                <strong>Secunderabad</strong>
              </div>
              <p className="loc-address">
                #5-2-422 First floor, Opp Hero Honda Showroom, Hyderbasti, Ranigunj R.P. Road, Secunderabad - 500003
              </p>
            </div>
          </div>

          <div className="aqua-touch-col">
            <h5 className="aqua-col-heading">GET IN TOUCH</h5>
            <a href="mailto:aquapzonehyd@gmail.com" className="aqua-email-pill">
              <Mail size={15} />
              <span>aquapzonehyd@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Section 5: Bottom Copyright & publication bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © 2026 Prasudharka Solar (Aqua Pzone Enterprises). All rights reserved.
          </p>
          <p className="growth-text">
            Built for Publication & Customer Growth
          </p>
        </div>

      </div>
    </footer>
  );
};

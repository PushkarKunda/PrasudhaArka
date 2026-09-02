import React from 'react';
import { Headphones, MapPin, Mail, ExternalLink } from 'lucide-react';
import { DEALERS } from '../data/dealers';
import { scrollToSection } from '../utils/navigation';

export const Footer = ({ lang, t }) => {
  const isTe = lang === 'te';

  return (
    <footer className="site-footer" id="footer">
      <div className="container footer-inner">

        {/* Section 1: Main 4-Column Grid */}
        <div className="footer-top-grid">
          {/* Col 1: Brand */}
          <div className="footer-col brand-col">
            <div className="footer-logo-badge">
              <img 
                src={isTe ? '/assets/logo_te.jpg' : '/assets/logo_en.jpg'} 
                alt={isTe ? "ప్రసుధార్క సోలార్" : "Prasudharka Solar"} 
                className="footer-logo-img"
              />
            </div>
            <h3 className="footer-brand-heading">
              {isTe ? 'ప్రసుధార్క సోలార్' : 'PRASUDHAARKA SOLAR'}
            </h3>
            <p className="footer-brand-desc">
              {isTe 
                ? 'PM సూర్య ఘర్ ముఫ్త్ బిజిలీ యోజన కింద అధికారిక సోలార్ & గ్రీన్ ఎనర్జీ భాగస్వామి. AP, తెలంగాణ, బెంగళూరు & చెన్నై అంతటా రూఫ్‌టాప్ సోలార్, RO వాటర్ ప్లాంట్లు మరియు లిథియం బ్యాటరీల విశ్వసనీయ సేవలు.' 
                : 'Authorized Solar & Green Energy Partner providing PM Surya Ghar Muft Bijli Yojana rooftop solutions, RO water plants, and lithium batteries across AP, Telangana, Bangalore, & Chennai.'}
            </p>
            <div className="footer-gstin-badge">
              <span>GSTIN : 36ABHPU5118F1ZS</span>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              {isTe ? 'త్వరిత నావిగేషన్' : 'Quick Navigation'}
            </h4>
            <ul className="footer-links-list">
              <li>
                <a href="#home" onClick={(e) => scrollToSection('home', e)}>
                  {t?.navHome || (isTe ? 'హోమ్' : 'Home')}
                </a>
              </li>
              <li>
                <a href="#pricing" onClick={(e) => scrollToSection('pricing', e)}>
                  {isTe ? 'సిస్టమ్ ధరలు & సబ్సిడీ' : 'System Pricing'}
                </a>
              </li>
              <li>
                <a href="#calculator" onClick={(e) => scrollToSection('calculator', e)}>
                  {t?.navCalc || (isTe ? 'సోలార్ కాలిక్యులేటర్' : 'Calculator')}
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => scrollToSection('services', e)}>
                  {t?.navServices || (isTe ? 'సేవలు' : 'Services')}
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => scrollToSection('contact', e)}>
                  {t?.navContact || (isTe ? 'సంప్రదించండి' : 'Contact Us')}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Our Offerings */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              {isTe ? 'మా సేవలు & ఉత్పత్తులు' : 'Our Offerings'}
            </h4>
            <ul className="footer-links-list">
              <li>
                <a href="#about" onClick={(e) => scrollToSection('about', e)}>
                  {isTe ? 'ప్యానసోనిక్ రూఫ్‌టాప్ సోలార్' : 'Panasonic Rooftop Solar'}
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => scrollToSection('about', e)}>
                  {isTe ? 'హావెల్స్ సోలార్ సిస్టమ్స్' : 'Havells Solar Systems'}
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => scrollToSection('about', e)}>
                  {isTe ? 'పాలీక్యాబ్ ప్యానెల్స్ & ఇన్వర్టర్స్' : 'Polycab Panels & Inverters'}
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => scrollToSection('services', e)}>
                  {isTe ? 'లిథియం-అయాన్ బ్యాటరీ స్టోరేజ్' : 'Lithium-Ion Battery Storage'}
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => scrollToSection('services', e)}>
                  {isTe ? 'కమర్షియల్ RO వాటర్ ప్లాంట్లు' : 'Commercial RO Plants'}
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => scrollToSection('services', e)}>
                  {isTe ? 'CRI వ్యవసాయ సోలార్ పంపులు' : 'CRI Agricultural Pumps'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Office & Contacts */}
          <div className="footer-col contacts-col">
            <h4 className="footer-col-title">
              {isTe ? 'కార్యాలయాలు & సంప్రదింపులు' : 'Office & Contacts'}
            </h4>
            
            <div className="footer-contact-item">
              <p className="contact-person">
                <strong>{isTe ? 'కె. సుధాకర్:' : 'K. Sudhakar:'}</strong>{' '}
                <a href={`tel:${DEALERS.sudhakar.phone}`}>{DEALERS.sudhakar.phoneDisplay}</a>
              </p>
              <p className="contact-addr">
                {isTe ? DEALERS.sudhakar.locationTe : DEALERS.sudhakar.locationEn}
              </p>
            </div>

            <div className="footer-contact-item">
              <p className="contact-person">
                <strong>{isTe ? 'కె. భాస్కర్:' : 'K. Bhaskar:'}</strong>{' '}
                <a href={`tel:${DEALERS.bhaskar.phone}`}>{DEALERS.bhaskar.phoneDisplay}</a>
              </p>
              <p className="contact-addr">
                {isTe ? DEALERS.bhaskar.locationTe : DEALERS.bhaskar.locationEn}
              </p>
            </div>

            <div className="footer-hours-note">
              <span>
                {isTe ? 'సేవలు: ఉదయం 8:00 నుండి రాత్రి 9:00 వరకు' : 'Service Hours: 8:00 AM to 9:00 PM'}
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Customer Care Box */}
        <div className="footer-care-box">
          <div className="care-header">
            <Headphones size={22} className="text-gold" />
            <div className="care-title-wrap">
              <span className="care-title">{isTe ? 'కస్టమర్ కేర్' : 'Customer Care'}</span>
              <span className="care-timing">
                {isTe ? '(ఉదయం 10:00 నుండి సాయంత్రం 6:00 వరకు)' : '(10:00 AM to 6:00 PM)'}
              </span>
            </div>
          </div>

          <div className="care-grid">
            <div className="care-region-card">
              <span className="region-name">
                {isTe ? 'ఆంధ్రప్రదేశ్ & తెలంగాణ' : 'ANDHRA PRADESH & TELANGANA'}
              </span>
              <div className="region-numbers">
                <a href="tel:9848140099">98481 40099</a>
                <span className="slash">/</span>
                <a href="tel:9848150099">98481 50099</a>
                <span className="slash">/</span>
                <a href="tel:9848170099">98481 70099</a>
              </div>
            </div>

            <div className="care-region-card highlight-card">
              <span className="region-name">
                {isTe ? 'కర్ణాటక & తమిళనాడు' : 'KARNATAKA & TAMILNADU'}
              </span>
              <div className="region-numbers">
                <a href="tel:8884212121">88842 12121</a>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: For more information Look Into */}
        <div className="footer-ext-banner">
          <span className="ext-label">
            {isTe ? 'మరిన్ని వివరాల కోసం సందర్శించండి:' : 'For more information, Look into:'}
          </span>
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
              <span className="aqua-sub">
                {isTe ? 'సోలార్ & పునరుత్పాదక శక్తి' : 'SOLAR & RENEWABLES'}
              </span>
              <p className="aqua-desc">
                {isTe 
                  ? 'ఒకే విశ్వసనీయ బ్రాండ్ క్రింద రెండు విశిష్ట విభాగాలు — భారతదేశ వ్యాప్తంగా స్వచ్ఛమైన నీరు మరియు సోలార్ పునరుత్పాదక శక్తి మౌలిక సదుపాయాలు.'
                  : 'Two specialized brands under one trusted name — delivering water and renewable energy infrastructure across India.'}
              </p>
            </div>
          </div>

          <div className="aqua-locations-col">
            <h5 className="aqua-col-heading">{isTe ? 'చిరునామా' : 'LOCATIONS'}</h5>
            <div className="loc-detail">
              <div className="loc-head">
                <MapPin size={15} className="loc-pin-icon" />
                <strong>{isTe ? 'సికింద్రాబాద్' : 'Secunderabad'}</strong>
              </div>
              <p className="loc-address">
                {isTe 
                  ? '#5-2-422 1వ అంతస్తు, హీరో హోండా షోరూమ్ ఎదురుగా, హైదర్‌బస్తీ, రాణిగంజ్ R.P. రోడ్, సికింద్రాబాద్ - 500003'
                  : '#5-2-422 First floor, Opp Hero Honda Showroom, Hyderbasti, Ranigunj R.P. Road, Secunderabad - 500003'}
              </p>
            </div>
          </div>

          <div className="aqua-touch-col">
            <h5 className="aqua-col-heading">{isTe ? 'సంప్రదించండి' : 'GET IN TOUCH'}</h5>
            <a href="mailto:aquapzonehyd@gmail.com" className="aqua-email-pill">
              <Mail size={15} />
              <span>aquapzonehyd@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Section 5: Bottom Copyright & publication bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            {isTe 
              ? '© 2026 ప్రసుధార్క సోలార్ (ఆక్వా పిజోన్ ఎంటర్‌ప్రైజెస్). సర్వ హక్కులూ ప్రత్యేకించబడినవి.' 
              : '© 2026 Prasudharka Solar (Aqua Pzone Enterprises). All rights reserved.'}
          </p>
          <p className="growth-text">
            {isTe ? 'అధికారిక వెబ్‌సైట్ • నమ్మకమైన కస్టమర్ సేవలు' : 'Built for Publication & Customer Growth'}
          </p>
        </div>

      </div>
    </footer>
  );
};

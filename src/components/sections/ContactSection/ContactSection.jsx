import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PhoneCall, 
  MapPin, 
  Mail, 
  Clock, 
  Send, 
  ShieldCheck, 
  UserCheck, 
  Building2, 
  Sparkles,
  Zap
} from 'lucide-react';
import { WhatsAppIcon } from '../../common/WhatsAppIcon';
import { DEALERS, getWhatsAppUrl } from '../../../data/dealers';
import './ContactSection.css';

export const ContactSection = ({ lang, t }) => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    town: '',
    capacity: '3kW',
    dealer: 'sudhakar',
    notes: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  React.useEffect(() => {
    const handlePrefill = (event) => {
      if (event.detail) {
        setFormState(prev => ({
          ...prev,
          ...(event.detail.town ? { town: event.detail.town } : {}),
          ...(event.detail.capacity ? { capacity: event.detail.capacity } : {}),
          ...(event.detail.dealer ? { dealer: event.detail.dealer } : {})
        }));
      }
    };
    window.addEventListener('prefillInquiryForm', handlePrefill);
    return () => window.removeEventListener('prefillInquiryForm', handlePrefill);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dealerInfo = DEALERS[formState.dealer];
    const isTe = lang === 'te';
    const dealerTitle = isTe
      ? (formState.dealer === 'sudhakar' ? 'సుధాకర్ గారు' : 'భాస్కర్ గారు')
      : dealerInfo.name;

    const msg = isTe
      ? `*వెబ్‌సైట్ ద్వారా సోలార్ ఎంక్వైరీ*\n` +
        `------------------------------------\n` +
        `• *కస్టమర్ పేరు:* ${formState.name}\n` +
        `• *ఫోన్ నంబర్:* ${formState.phone}\n` +
        `• *ఊరు / ప్రాంతం:* ${formState.town}\n` +
        `• *కావలసిన కెపాసిటీ:* ${formState.capacity}\n` +
        `• *అదనపు వివరాలు:* ${formState.notes || 'ఏమీ లేవు'}\n` +
        `------------------------------------\n` +
        `నమస్కారం ${dealerTitle}, మా ప్రాపర్టీకి రూఫ్‌టాప్ సోలార్ ప్లాంట్ కొటేషన్ మరియు ఉచిత సైట్ సర్వే వివరాలు కావాలి.`
      : `*New Solar Inquiry via Website Form*\n` +
        `------------------------------------\n` +
        `• *Customer Name:* ${formState.name}\n` +
        `• *Mobile:* ${formState.phone}\n` +
        `• *Town / Village:* ${formState.town}\n` +
        `• *Required Capacity:* ${formState.capacity}\n` +
        `• *Additional Notes:* ${formState.notes || 'None'}\n` +
        `------------------------------------\n` +
        `Hello ${dealerInfo.name}, please contact me regarding this rooftop solar installation.`;

    window.open(getWhatsAppUrl(formState.dealer, msg), '_blank');
    setFormSubmitted(true);
  };

  return (
    <section className="contact-section section-padding" id="contact">
      <div className="container">
        {/* Section Header */}
        <div className="section-title-wrap text-center">
          <div className="section-tag">
            <UserCheck size={15} />
            <span>{t.dealersTag}</span>
          </div>
          <h2 className="section-title">{t.dealersTitle}</h2>
          <p className="section-subtitle">{t.dealersDesc}</p>
        </div>

        {/* Dealers Highlight Cards */}
        <div className="dealers-cards-grid">
          {/* Dealer 1: Sudhakar */}
          <div className="dealer-profile-card glassmorphism-card-glow">
            <div className="dealer-badge-header">
              <span className="dealer-role-pill">
                {lang === 'te' ? 'హైదరాబాద్ & తెలంగాణ ఇన్‌ఛార్జ్' : 'Hyderabad & Telangana Lead'}
              </span>
            </div>

            <div className="dealer-meta">
              <div className="dealer-avatar">KS</div>
              <div>
                <h3 className="dealer-name">
                  {lang === 'te' ? 'కె. సుధాకర్' : DEALERS.sudhakar.name}
                </h3>
                <p className="dealer-sub-title">
                  {lang === 'te' ? DEALERS.sudhakar.titleTe : DEALERS.sudhakar.titleEn}
                </p>
                <div className="dealer-loc">
                  <MapPin size={14} className="text-gold" />
                  <span>{lang === 'te' ? DEALERS.sudhakar.locationTe : DEALERS.sudhakar.locationEn}</span>
                </div>
              </div>
            </div>

            <div className="dealer-actions-grid">
              <a href={`tel:${DEALERS.sudhakar.phone}`} className="btn btn-outline btn-block">
                <PhoneCall size={16} />
                <span>{DEALERS.sudhakar.phoneDisplay}</span>
              </a>
              <a 
                href={getWhatsAppUrl('sudhakar', lang === 'te' ? 'నమస్కారం సుధాకర్ గారు, నా ఇంటికి సోలార్ కొటేషన్ మరియు సైట్ సర్వే వివరాలు కావాలి.' : 'Hello Sudhakar garu, I need solar quotation and site survey details for my property.')} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-whatsapp btn-block"
              >
                <WhatsAppIcon size={16} />
                <span>{t.btnChatWhatsApp}</span>
              </a>
            </div>
          </div>

          {/* Dealer 2: Bhaskar */}
          <div className="dealer-profile-card glassmorphism-card-glow">
            <div className="dealer-badge-header">
              <span className="dealer-role-pill">
                {lang === 'te' ? 'రాయలసీమ & ఏపీ ఇన్‌ఛార్జ్' : 'Rayalaseema & AP Lead'}
              </span>
            </div>

            <div className="dealer-meta">
              <div className="dealer-avatar">KB</div>
              <div>
                <h3 className="dealer-name">
                  {lang === 'te' ? 'కె. భాస్కర్' : DEALERS.bhaskar.name}
                </h3>
                <p className="dealer-sub-title">
                  {lang === 'te' ? DEALERS.bhaskar.titleTe : DEALERS.bhaskar.titleEn}
                </p>
                <div className="dealer-loc">
                  <MapPin size={14} className="text-gold" />
                  <span>{lang === 'te' ? DEALERS.bhaskar.locationTe : DEALERS.bhaskar.locationEn}</span>
                </div>
              </div>
            </div>

            <div className="dealer-actions-grid">
              <a href={`tel:${DEALERS.bhaskar.phone}`} className="btn btn-outline btn-block">
                <PhoneCall size={16} />
                <span>{DEALERS.bhaskar.phoneDisplay}</span>
              </a>
              <a 
                href={getWhatsAppUrl('bhaskar', lang === 'te' ? 'నమస్కారం భాస్కర్ గారు, నా ఇంటికి సోలార్ కొటేషన్ మరియు సైట్ సర్వే వివరాలు కావాలి.' : 'Hello Bhaskar garu, I need solar quotation and site survey details for my property.')} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-whatsapp btn-block"
              >
                <WhatsAppIcon size={16} />
                <span>{t.btnChatWhatsApp}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Visual Divider between Dealers & Form */}
        <div className="dealer-inquiry-divider">
          <span className="divider-line"></span>
          <span className="divider-badge">
            <Sparkles size={14} className="text-gold" />
            <span>{lang === 'te' ? 'లేదా ఆన్‌లైన్‌లో ఉచిత సైట్ సర్వే బుక్ చేసుకోండి' : 'Or Book a Free Site Survey Online'}</span>
          </span>
          <span className="divider-line"></span>
        </div>

        {/* Quick Contact Form Grid */}
        <div className="contact-form-grid">
          {/* Quick Inquiry Form */}
          <div className="inquiry-form-card glassmorphism-card" id="inquiry-form">
            <h3 className="form-card-title">
              <Sparkles size={20} className="text-gold" />
              <span>{lang === 'te' ? 'ఉచిత సైట్ సర్వే & కొటేషన్ ఫారం' : 'Book Free Site Survey & Quote'}</span>
            </h3>

            <form onSubmit={handleSubmit} className="site-inquiry-form">
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">{lang === 'te' ? 'మీ పేరు:' : 'Full Name:'}</label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'te' ? 'ఉదా: వెంకట్ రావు' : 'e.g. Venkat Rao'}
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="custom-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{lang === 'te' ? 'ఫోన్ నంబర్:' : 'Phone Number:'}</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="custom-input"
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">{lang === 'te' ? 'మీ ఊరు / గ్రామం:' : 'Town / Village / City:'}</label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'te' ? 'ఉదా: జమ్మలమడుగు / హైదరాబాద్' : 'e.g. Jammalamadugu / Hyderabad'}
                    value={formState.town}
                    onChange={(e) => setFormState({ ...formState, town: e.target.value })}
                    className="custom-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{lang === 'te' ? 'ఆసక్తి గల కెపాసిటీ:' : 'Interested Capacity:'}</label>
                  <select
                    value={formState.capacity}
                    onChange={(e) => setFormState({ ...formState, capacity: e.target.value })}
                    className="custom-input"
                  >
                    <option value="1kW">
                      {lang === 'te' ? '1 kW సిస్టమ్ (చిన్న గృహం)' : '1 kW System (Small Home)'}
                    </option>
                    <option value="2kW">
                      {lang === 'te' ? '2 kW సిస్టమ్ (మధ్యతరగతి గృహం)' : '2 kW System (Medium Home)'}
                    </option>
                    <option value="3kW">
                      {lang === 'te' ? '3 kW సిస్టమ్ (గరిష్ట సబ్సిడీ ₹78,000)' : '3 kW System (Max Subsidy ₹78,000)'}
                    </option>
                    <option value="5kW">
                      {lang === 'te' ? '5 kW సిస్టమ్ (పెద్ద ఇల్లు / విల్లా)' : '5 kW System (Large Villa)'}
                    </option>
                    <option value="10kW+">
                      {lang === 'te' ? '10 kW+ వాణిజ్య ప్లాంట్' : '10 kW+ Commercial Plant'}
                    </option>
                    <option value="RO Plant">
                      {lang === 'te' ? 'కమర్షియల్ RO వాటర్ ప్లాంట్' : 'Commercial RO Water Plant'}
                    </option>
                    <option value="Agri Pump">
                      {lang === 'te' ? 'సోలార్ అగ్రికల్చర్ పంప్' : 'Solar Agriculture Pump'}
                    </option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  {lang === 'te' ? 'సంప్రదించాల్సిన డీలర్:' : 'Send Inquiry To:'}
                </label>
                <div className="dealer-radio-group">
                  <label className={`dealer-chip ${formState.dealer === 'sudhakar' ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="contactDealer" 
                      checked={formState.dealer === 'sudhakar'} 
                      onChange={() => setFormState({ ...formState, dealer: 'sudhakar' })}
                    />
                    <span>
                      {lang === 'te' ? 'కె. సుధాకర్ (హైదరాబాద్ & తెలంగాణ)' : 'K. Sudhakar (Hyderabad & Telangana)'}
                    </span>
                  </label>
                  <label className={`dealer-chip ${formState.dealer === 'bhaskar' ? 'active' : ''}`}>
                    <input 
                      type="radio" 
                      name="contactDealer" 
                      checked={formState.dealer === 'bhaskar'} 
                      onChange={() => setFormState({ ...formState, dealer: 'bhaskar' })}
                    />
                    <span>
                      {lang === 'te' ? 'కె. భాస్కర్ (జమ్మలమడుగు & ఆంధ్రప్రదేశ్)' : 'K. Bhaskar (Jammalamadugu & AP)'}
                    </span>
                  </label>
                </div>
              </div>

              <button type="submit" className="btn btn-whatsapp btn-block btn-lg">
                <Send size={18} />
                <span>{lang === 'te' ? 'వాట్సాప్‌లో కొటేషన్ అభ్యర్థించండి' : 'Submit & Connect on WhatsApp'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

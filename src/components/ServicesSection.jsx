import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Home, 
  Building2, 
  BatteryCharging, 
  Droplets, 
  Sun, 
  FileCheck2, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { SERVICES } from '../data/services';
import { DEALERS, getWhatsAppUrl } from '../data/dealers';

export const ServicesSection = ({ lang, t }) => {
  const [selectedDealer, setSelectedDealer] = useState('sudhakar');

  const iconMap = {
    Home,
    Building2,
    BatteryCharging,
    Droplets,
    Sun,
    FileCheck2
  };

  const handleInquireService = (service) => {
    const title = lang === 'te' ? service.titleTe : service.titleEn;
    const msg = `*Service Inquiry: ${title}*\n` +
      `------------------------------------\n` +
      `Hello ${DEALERS[selectedDealer].name}, I would like more information and a formal quotation regarding ${title}.`;

    window.open(getWhatsAppUrl(selectedDealer, msg), '_blank');
  };

  return (
    <section className="services-section section-padding" id="services">
      <div className="container">
        {/* Section Header */}
        <div className="section-title-wrap text-center">
          <div className="section-tag">
            <Briefcase size={15} />
            <span>{t.servicesTag}</span>
          </div>
          <h2 className="section-title">{t.servicesTitle}</h2>
          <p className="section-subtitle">{t.servicesDesc}</p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {SERVICES.map((service, idx) => {
            const IconComp = iconMap[service.icon] || Sun;
            return (
              <div
                key={service.id}
                className="service-card glassmorphism-card"
              >
                <div className="service-header">
                  <div className="service-icon-wrap">
                    <IconComp size={24} className="text-gold" />
                  </div>
                  <span className="service-badge">
                    {lang === 'te' ? service.badgeTe : service.badgeEn}
                  </span>
                </div>

                <h3 className="service-card-title">
                  {lang === 'te' ? service.titleTe : service.titleEn}
                </h3>

                <p className="service-card-desc">
                  {lang === 'te' ? service.descTe : service.descEn}
                </p>

                {/* Features List */}
                <ul className="service-features-list">
                  {(lang === 'te' ? service.featuresTe : service.featuresEn).map((feat, fIdx) => (
                    <li key={fIdx}>
                      <CheckCircle2 size={14} className="text-emerald-400" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Card Action */}
                <div className="service-action">
                  <button
                    onClick={() => handleInquireService(service)}
                    className="btn btn-outline btn-sm btn-block"
                  >
                    <WhatsAppIcon size={15} />
                    <span>{lang === 'te' ? 'వివరాలు & కొటేషన్' : 'Inquire on WhatsApp'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

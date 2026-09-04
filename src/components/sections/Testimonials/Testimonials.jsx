import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Quote, MapPin, Zap, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../../../data/services';
import './Testimonials.css';

export const Testimonials = ({ lang, t }) => {
  return (
    <section className="testimonials-section section-padding" id="testimonials">
      <div className="container">
        {/* Section Header */}
        <div className="section-title-wrap text-center">
          <div className="section-tag">
            <MessageSquare size={15} />
            <span>{lang === 'te' ? 'కస్టమర్ల అనుభవాలు' : 'Client Testimonials'}</span>
          </div>
          <h2 className="section-title">
            {lang === 'te' ? 'మా సంతృప్తి చెందిన కస్టమర్ల మాటల్లో...' : 'What Our Customers Say Across AP & Telangana'}
          </h2>
          <p className="section-subtitle">
            {lang === 'te' 
              ? 'PM సూర్య ఘర్ పథకం ద్వారా లక్షల రూపాయల విద్యుత్ బిల్లులు ఆదా చేసుకుంటున్న కుటుంబాలు.' 
              : 'Real homeowners experiencing massive bill cuts and direct DBT subsidy credits.'}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="testimonial-card glassmorphism-card"
            >
              <Quote size={28} className="quote-icon text-gold" />
              
              <div className="star-rating">
                {[...Array(item.rating)].map((_, sIdx) => (
                  <Star key={sIdx} size={16} className="star-filled" />
                ))}
              </div>

              <p className="testimonial-text">
                "{lang === 'te' ? item.commentTe : item.commentEn}"
              </p>

              <div className="testimonial-author-meta">
                <div className="author-avatar-badge">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="author-name">{item.name}</h4>
                  <div className="author-sub">
                    <span className="author-loc">
                      <MapPin size={12} /> {item.location}
                    </span>
                    <span className="author-cap-badge">
                      <Zap size={12} /> {item.capacity}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

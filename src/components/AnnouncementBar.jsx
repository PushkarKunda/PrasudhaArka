import React from 'react';
import { ShieldCheck, Sun, PhoneCall, Building } from 'lucide-react';
import { DEALERS } from '../data/dealers';

export const AnnouncementBar = ({ lang, t }) => {
  return (
    <div className="top-announcement-bar">
      <div className="container top-bar-inner">
        <div className="top-badge-group">
          <span className="top-badge gov">
            <ShieldCheck size={14} className="icon-pulse" />
            {t.topGovBadge}
          </span>
          <span className="top-badge subsidy">
            <Sun size={14} className="icon-spin-slow" />
            {t.topSubsidyBadge}
          </span>
          <span className="gst-badge">
            <Building size={13} />
            {t.topGstin}
          </span>
        </div>

        <div className="top-contacts">
          <a href={`tel:${DEALERS.sudhakar.phone}`} className="top-contact-link">
            <PhoneCall size={13} />
            <span><strong>{DEALERS.sudhakar.name}:</strong> {DEALERS.sudhakar.phoneDisplay}</span>
          </a>
          <span className="divider">|</span>
          <a href={`tel:${DEALERS.bhaskar.phone}`} className="top-contact-link">
            <PhoneCall size={13} />
            <span><strong>{DEALERS.bhaskar.name}:</strong> {DEALERS.bhaskar.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

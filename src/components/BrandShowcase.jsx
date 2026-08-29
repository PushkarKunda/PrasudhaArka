import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Zap, Cpu, Wrench, CheckCircle2, Layers } from 'lucide-react';

export const BrandShowcase = ({ lang, t }) => {
  const hardwareItems = [
    {
      brand: 'Panasonic',
      titleEn: 'Solar Panels: Panasonic Mono PERC',
      titleTe: 'సోలార్ ప్యానెల్స్: ప్యానసోనిక్ మోనో పెర్క్',
      specEn: '35mm frame thickness, High PID-resistant cells, 30-year operational life.',
      specTe: '35mm ఫ్రేమ్ మందం, అత్యధిక నాణ్యతా ప్రమాణాలు, 30 సంవత్సరాల జీవితకాలం.',
      warrantyEn: '25 Years Linear Performance Warranty',
      warrantyTe: '25 సంవత్సరాల పనితీరు వారంటీ',
      icon: SunIcon
    },
    {
      brand: 'Panasonic',
      titleEn: 'Smart Inverters: Panasonic RF Series',
      titleTe: 'స్మార్ట్ ఇన్వర్టర్: ప్యానసోనిక్ RF టెక్నాలజీ',
      specEn: 'High conversion efficiency (>98.4%), Dual MPPT tracking, IP65 waterproof.',
      specTe: '98.4% కంటే ఎక్కువ సామర్థ్యం, డ్యూయల్ MPPT ట్రాకింగ్, IP65 వాటర్‌ప్రూఫ్.',
      warrantyEn: '10 Years Replacement Warranty',
      warrantyTe: '10 సంవత్సరాల వారంటీ',
      icon: Cpu
    },
    {
      brand: 'Havells',
      titleEn: 'ACDB & DCDB Boxes: Havells',
      titleTe: 'ACDB & DCDB బాక్సులు: హావెల్స్',
      specEn: 'Equipped with heavy-duty DC MCBs, Type-II SPDs (Surge Protection Devices).',
      specTe: 'భారీ DC MCBలు మరియు పిడుగుపాటు నుండి రక్షించే టైప్-II SPD రక్షణ.',
      warrantyEn: 'Heavy Duty Surge & Short-Circuit Protection',
      warrantyTe: 'పూర్తి షార్ట్-సర్క్యూట్ & సర్జ్ రక్షణ',
      icon: ShieldCheck
    },
    {
      brand: 'Polycab',
      titleEn: 'Solar DC Cables: Polycab',
      titleTe: 'సోలార్ కేబుల్స్: పాలీక్యాబ్',
      specEn: '4 sq mm multi-strand tin-plated copper cables with UV and flame retardant sheath.',
      specTe: '4 sq mm కాపర్ కేబుల్స్, ఎండ మరియు వర్షాలకు తట్టుకునే అత్యాధునిక ఇన్సులేషన్.',
      warrantyEn: 'UV & Flame Retardant Heavy-Duty Cables',
      warrantyTe: 'UV & ఫ్లేమ్ రెసిస్టెంట్ కేబుల్స్',
      icon: Zap
    },
    {
      brand: 'JSW Steel',
      titleEn: 'Mounting Structure: JSW Hot-Dipped GI',
      titleTe: 'మౌంటింగ్ స్ట్రక్చర్: JSW గాల్వనైజ్డ్ స్టీల్',
      specEn: 'Hot-dipped galvanized 80-micron coating, rated to withstand 160 km/h wind speeds.',
      specTe: '80 మైక్రాన్ల హాట్ డిప్డ్ గాల్వనైజ్డ్ కోటింగ్, 160 km/h గాలులను సైతం తట్టుకుంటుంది.',
      warrantyEn: '35-Year Rust-Free Structural Lifespan',
      warrantyTe: '35 ఏళ్ల పాటు తుప్పు పట్టని లైఫ్‌స్పాన్',
      icon: Layers
    }
  ];

  function SunIcon(props) {
    return <Zap {...props} />;
  }

  return (
    <section className="brands-section section-padding" id="about">
      <div className="container">
        {/* Section Title */}
        <div className="section-title-wrap text-center">
          <div className="section-tag">
            <Award size={15} />
            <span>{t.brandsTag}</span>
          </div>
          <h2 className="section-title">{t.brandsTitle}</h2>
          <p className="section-subtitle">{t.brandsDesc}</p>
        </div>

        {/* Brand Hardware Cards Grid */}
        <div className="brands-grid">
          {hardwareItems.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="brand-hardware-card glassmorphism-card"
              >
                <div className="brand-header">
                  <div className="brand-icon-box">
                    <IconComp size={22} className="text-gold" />
                  </div>
                  <div className="brand-badge-label">{item.brand}</div>
                </div>

                <h4 className="hardware-title">
                  {lang === 'te' ? item.titleTe : item.titleEn}
                </h4>

                <p className="hardware-spec">
                  {lang === 'te' ? item.specTe : item.specEn}
                </p>

                <div className="hardware-warranty-pill">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>{lang === 'te' ? item.warrantyTe : item.warrantyEn}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Corporate Trust Banner */}
        <div className="corporate-trust-strip glassmorphism-card">
          <div className="trust-strip-item">
            <Award size={22} className="text-amber-400" />
            <div>
              <strong>ISO 9001:2015 Certified</strong>
              <span>International Quality Standards</span>
            </div>
          </div>
          <div className="trust-strip-item">
            <ShieldCheck size={22} className="text-emerald-400" />
            <div>
              <strong>Approved PM Surya Ghar Vendor</strong>
              <span>National MNRE Portal Listed</span>
            </div>
          </div>
          <div className="trust-strip-item">
            <Zap size={22} className="text-cyan-400" />
            <div>
              <strong>21+ Years Engineering Legacy</strong>
              <span>Serving AP, TS, BLR & Chennai</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const DEALERS = {
  sudhakar: {
    id: 'sudhakar',
    name: 'K. Sudhakar',
    titleEn: 'Authorised Dealer • Hyderabad & R.R. Dist',
    titleTe: 'అధికారిక డీలర్ • హైదరాబాద్ & ఆర్.ఆర్. జిల్లా',
    locationEn: 'Tukkuguda, Hyderabad, Telangana',
    locationTe: 'తుక్కుగూడ, హైదరాబాద్, తెలంగాణ',
    phone: '+919966631599',
    phoneDisplay: '+91 99666 31599',
    whatsappNumber: '919966631599',
    badge: 'Senior Technical Lead'
  },
  bhaskar: {
    id: 'bhaskar',
    name: 'K. Bhaskar',
    titleEn: 'Authorised Dealer • Rayalaseema & AP',
    titleTe: 'అధికారిక డీలర్ • రాయలసీమ & ఆంధ్రప్రదేశ్',
    locationEn: 'Nagulakatta, Jammalamadugu, AP',
    locationTe: 'నాగులకట్ట, జమ్మలమడుగు, వైఎస్సార్ కడప జిల్లా',
    phone: '+918328272376',
    phoneDisplay: '+91 83282 72376',
    whatsappNumber: '918328272376',
    badge: 'AP Regional Lead'
  }
};

export const getWhatsAppUrl = (dealerId = 'sudhakar', message = '') => {
  const dealer = DEALERS[dealerId] || DEALERS.sudhakar;
  const defaultMsg = `Hello ${dealer.name}, I am interested in PM Surya Ghar Solar Rooftop Installation. Please provide quotation and details.`;
  const text = encodeURIComponent(message || defaultMsg);
  return `https://wa.me/${dealer.whatsappNumber}?text=${text}`;
};

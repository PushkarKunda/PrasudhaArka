/**
 * PRASUDHARKA SOLAR & GREEN ENERGY (Aqua Pzone Enterprises)
 * Core Application Logic & Multilingual Engine
 */

// Global State
const appState = {
  currentLang: 'te', // Default to Telugu as per local customer base, can toggle to 'en'
  billAmount: 3000,
  propType: 'residential',
  selectedDealer: 'sudhakar' // 'sudhakar' or 'bhaskar'
};

// Dealers Data
const DEALERS = {
  sudhakar: {
    name: 'K. Sudhakar',
    title: 'Authorised Dealer (Tukkuguda, HYD)',
    phone: '+919966631599',
    phoneDisplay: '+91 99666 31599'
  },
  bhaskar: {
    name: 'K. Bhaskar',
    title: 'Authorised Dealer (Nagulakatta, JMD)',
    phone: '+918328272376',
    phoneDisplay: '+91 83282 72376'
  }
};

// Bilingual Translations Dictionary
const I18N = {
  en: {
    navHome: "Home",
    navSubsidy: "System Pricing",
    navCalc: "Calculator",
    navServices: "Services",
    navProcess: "Process",
    navContact: "Contact Us",
    langBtnText: "తెలుగు",
    brandsTitle: "Our Authorized Quality Brands",
    dealersTitle: "Authorised Dealers & Office",
    dealersSubtitle: "Contact us directly for instant answers:",
    dealer1Desc: "Authorised Dealer • Tukkuguda, HYD",
    dealer2Desc: "Authorised Dealer • Nagulakatta, JMD",
    whatsappBtn: "WhatsApp",
    footerTagline: "Built for Publication & Customer Growth",
    note: "Note:",
    calcNote: "Your investment pays back in 3-5 years. After that, 20+ years of free electricity!",
    billAmount: "Bill Amount",
    badgePM: "PM Surya Ghar",
    badgeComm: "Commercial & Industry",
    badgeStorage: "Smart Energy Storage",
    badgeRO: "Aqua Pzone RO",
    badgeAgri: "Agri Solutions",
    badgePaper: "Complete Paperwork",
    pillSubsidy: "₹78,000 Subsidy",
    pillNetMeter: "Net Metering",
    pillWarranty: "25 Yr Warranty",
    pillSavings: "Big Bill Savings",
    pillZeroMaint: "Zero Maintenance",
    pillFastCharge: "Fast Charging",
    pillHighFlow: "High Pressure Flow",
    pillFarmer: "Farmer Friendly",
    pillTransparent: "100% Transparent",
    tierPopular: "Most Popular (అత్యంత ప్రజాదరణ)",
    tier1kWSubDesc: "Ideal for small families",
    tier2kWSubDesc: "Best for middle-class homes",
    tier3kWSubDesc: "Max Subsidy & Zero Bill",
    tierPanelWarr: "25-Year Panel Warranty",
    tierNetMeter: "DISCOM Net Meter Connection",
    tierLoan: "Easy Bank Loan Available",
    tierSellPower: "Sell extra power back to grid",
    tierZeroDown: "Zero Down-Payment Solar Loan",
    btnGetQuote: "Get Quotation on WhatsApp",

    topGovBadge: "PM Surya Ghar Muft Bijli Yojana",
    topSubsidyBadge: "Govt. Subsidy Up to ₹78,000*",
    callSudhakar: "Call Sudhakar",
    callBhaskar: "Call Bhaskar",

    firmTitle: "AquaPzone Enterprises",
    firmSubtitle: "Solar & Renewables",
    heroBadge: "🏅 An ISO 9001:2015 Certified Company",
    heroTitle: "Power Your Home With Free Solar Energy & Get Up to <span class='highlight-gold'>₹78,000</span> <span class='highlight-green'>Govt Subsidy</span>",
    heroLead: "Say goodbye to hefty electricity bills forever. Complete turnkey rooftop solar installation for Homes, Businesses, and Agricultural setups in Jammalamadugu and Rayalaseema.",
    subsidyCardTitle: "PM Surya Ghar Yojana Subsidy",
    subsidyCardDesc: "Direct bank transfer subsidy from Central Government up to ₹78,000. 0-Downpayment bank loans available at 6% interest.",
    btnCalcSubsidy: "Calculate My Subsidy",
    btnWhatsAppNow: "WhatsApp Us Now",
    statMetric1: "25 Years",
    statLabel1: "Panel Warranty",
    statMetric2: "₹78,000",
    statLabel2: "Max Govt Subsidy",
    statMetric3: "100%",
    statLabel3: "Hassle-Free Net Metering",

    quickCardTitle: "Quick Solar Proposal",
    quickCardSub: "Get customized estimate in 30 seconds",
    lblMonthlyBill: "Your Monthly Power Bill (₹)",
    lblLocation: "Your Town / Village",
    lblPropType: "Property Type",
    optRes: "Residential (Home / Flat)",
    optComm: "Commercial (Shop / Office)",
    btnGetQuickQuote: "Get Instant Quote on WhatsApp",

    aboutSecTag: "APPROVED PM SURYA GHAR VENDOR",
    aboutSecTitle: "About aquaPzone enterprises",
    aboutSecDesc: "Listed as an approved vendor in the PM Surya Ghar Portal, we have over 21 years of experience across AP, Telangana, Bangalore, & Chennai. We ensure high-quality materials, zero defects, and professional installation. Our service team handles everything from registration and documentation to net metering and PPA agreements.",
    pillar1: "Zero Advance Payment",
    pillar2: "Best Pricing",
    pillar3: "Widespread Dealers",
    pillar4: "Complete Documentation",
    premiumBrandsTitle: "Premium Brands & Warranty",
    premiumBrandsDesc: "Built with industry-leading Tier-1 solar engineering components guaranteed to last for decades.",
    comp1Title: "Solar Panels: Panasonic",
    comp1Desc: "35mm thick, 30-year lifespan. 25 Years Warranty.",
    comp1Warr: "25 Years Warranty",
    comp2Title: "Inverter: Panasonic",
    comp2Desc: "Advanced RF technology. 10 Years Warranty.",
    comp2Warr: "10 Years Warranty",
    comp3Title: "ACDB & DCDB: Havells",
    comp3Desc: "Equipped with reliable MCBs.",
    comp3Warr: "Reliable MCB Protection",
    comp4Title: "Cables: Polycab",
    comp4Desc: "4 sq mm high-quality cables.",
    comp4Warr: "4 sq mm Heavy-Duty",
    comp5Title: "Structure: JSW",
    comp5Desc: "GI Hot Dipped, 160 km/h wind resistance. 35-year lifespan.",
    comp5Warr: "35-Year Lifespan",

    configSecTag: "System Configurations",
    configSecTitle: "System Configurations",
    configSecDesc: "Comprehensive pricing, subsidies, and power generation details by capacity.",
    cfg1kwTitle: "1 kW System",
    cfg2kwTitle: "2 kW System",
    cfg3kwTitle: "3 kW System",
    cfg5kwTitle: "5 kW System",
    cfgGovtSubsidy: "Govt Subsidy",
    cfgUnitCost: "Unit Cost (DCR)",
    cfgMaxLoan: "Max Loan",
    cfgEstEmi: "Est. EMI",
    cfgPowerGen: "Power Gen.",
    cfgSpaceReq: "Space Req.",
    cfgDayUnits5: "5 units/day",
    cfgDayUnits10: "10 units/day",
    cfgDayUnits15: "15 units/day",
    cfgDayUnits25: "25 units/day",
    cfgSpace1kW: "8 x 10 Feet (Approx)",
    cfgSpace2kW: "8 x 16 Feet",
    cfgSpace3kW: "12 x 16 Feet",
    cfgSpace5kW: "20 x 16 Feet",
    cfgMostPopular: "⭐ Most Popular (Max Subsidy)",
    cfgNoteTitle: "Bank Loan & ROI Details:",
    cfgNoteDesc: "Note: Loan facility is available in all government banks with a tenure of 10 years. Interest rates are approx 6.7% for below 3kW and 8.9% for 5kW. ROI is typically 3 to 4 years.",
    btnGetQuote1kW: "Get 1 kW Quote",
    btnGetQuote2kW: "Get 2 kW Quote",
    btnGetQuote3kW: "Get 3 kW Quote",
    btnGetQuote5kW: "Get 5 kW Quote",

    calcSecTag: "Interactive ROI Tool",
    calcSecTitle: "Solar Savings & Official Tariff Calculator",
    calcSecDesc: "Calculate your exact DISCOM electricity bill, solar sizing, subsidy, and 25-year financial savings based on official AP & Telangana tariff slabs.",
    calcStateLabel: "Select State:",
    calcPropLabel: "Select Category:",
    btnPropHome: "Home (Residential)",
    btnPropShop: "Commercial (Shop/Office)",
    btnPropFarm: "Farm / Industry",
    modeUnits: "Units (kWh)",
    modeMeter: "Meter Reading",
    modeBill: "Bill Amount (₹)",
    lblMonthlyUnits: "Monthly Consumption (Units)",
    lblCurrReading: "Current Reading",
    lblPrevReading: "Previous Reading",
    lblConsumedUnits: "Calculated Monthly Units:",
    lblEnergyCharges: "Energy Charges (Telescopic Slabs):",
    lblOtherCharges: "Fixed + Meter + Duty + FAC:",
    lblCurrentBill: "Current Monthly Electricity Bill:",
    calcResultTitle: "Your Solar Estimate & Returns",
    metricRecSize: "Recommended Solar Size",
    metricSubsidyVal: "Central Govt Subsidy",
    metricRoofArea: "Required Roof Space",
    metricMonthlySave: "Monthly Power Savings",
    lifetimeSaveLabel: "Estimated 25-Year Lifetime Electricity Savings:",
    roiTimelineLabel: "ROI Timeline: 3 to 4 Years • Zero Electricity Bill Thereafter",
    btnSendCalcWhatsApp: "Send This Plan to WhatsApp for Quotation",

    servicesSecTag: "Our Offerings",
    servicesSecTitle: "Comprehensive Solar & Green Energy Solutions (Our Offerings)",
    servicesSecDesc: "As an approved PM Surya Ghar vendor with 21+ years of experience across AP, Telangana, Bangalore, & Chennai, we engineer complete turnkey clean energy solutions using Tier-1 Panasonic, Havells, Polycab, and JSW components.",
    serv1Title: "Residential Rooftop Solar (PM Surya Ghar)",
    serv1Desc: "High-yield home solar setups with Panasonic 35mm panels (25Y warranty) & RF inverters (10Y warranty). Slash electricity bills up to 90%, claim ₹78,000 direct govt subsidy, and enjoy Zero Advance Payment.",
    serv2Title: "Commercial & Industrial Solar Plants",
    serv2Desc: "Engineered for schools, hospitals, factories, commercial complexes, and petrol pumps with 160 km/h wind-rated JSW GI structures, Havells MCB DCDBs, and 40% tax depreciation.",
    serv3Title: "Smart Energy Storage & Hybrid Inverters",
    serv3Desc: "Advanced Panasonic RF inverters and wall-mounted high-density Lithium-ion energy storage systems for 24/7 uninterrupted power backup.",
    serv4Title: "Aqua Pzone Commercial & Domestic RO Plants",
    serv4Desc: "High-grade SS-304/316 stainless steel industrial RO water treatment plants (250 - 5000 LPH) and domestic alkaline purifiers backed by 21+ years of water engineering expertise.",
    serv5Title: "Agricultural Solar Pumps & Irrigation",
    serv5Desc: "Reliable C.R.I. solar submersible pumps and farm motors for farmers across AP and Telangana, eliminating erratic power outages and high diesel costs.",
    serv6Title: "Complete Documentation & Net Metering",
    serv6Desc: "Full liaison for DISCOM (APCPDCL / TSSPDCL) net metering, DCR certification, 6.7% bank loan sanctions, feasibility reports, and guaranteed direct subsidy credit.",

    procSecTag: "Hassle-Free Execution",
    procSecTitle: "Our 6-Step Turnkey Process",
    procSecDesc: "We handle everything from government documentation and loan sanctions to installation and subsidy disbursement.",
    step1Title: "1. Free Site Assessment",
    step1Desc: "Our engineers visit your rooftop to measure shadow-free area and analyze your electricity consumption.",
    step2Title: "2. Bank Loan Assistance",
    step2Desc: "Collateral-free low-interest solar loans approved through leading nationalized banks (SBI, Canara, UBI).",
    step3Title: "3. Portal Registration",
    step3Desc: "We submit your application and engineering documentation on the National MNRE Solar portal.",
    step4Title: "4. Premium Installation",
    step4Desc: "Installation of Tier-1 solar panels (Panasonic, Havells, Polycab) with heavy-duty JSW galvanized structures.",
    step5Title: "5. Net Meter Connection",
    step5Desc: "DISCOM inspection and bi-directional net meter installation so you earn credits for excess electricity sent back.",
    step6Title: "6. Subsidy Direct Credit",
    step6Desc: "Government subsidy credited directly (DBT) to your bank account within 30 days of commissioning.",

    docSecTag: "Required Documents",
    docSecTitle: "Required Documents",
    docSecDesc: "Please prepare the following documents for a smooth onboarding process.",
    docCat1Title: "Basic Details",
    docCat1Sub: "Proof of identity and basic details",
    docCat1Item1: "Aadhar Card",
    docCat1Item2: "PAN Card",
    docCat1Item3: "Bank Passbook / Cancelled Cheque",
    docCat1Item4: "Electricity Bill",

    docCat2Title: "Approvals & Agreements",
    docCat2Sub: "Required agreements and official approvals",
    docCat2Item1: "Feasibility Report",
    docCat2Item2: "Netmetering Agreement",
    docCat2Item3: "Digital Approval Letter",
    docCat2Item4: "Vendor & Consumer Agreement",
    docCat2Item5: "DISCOM Agreement",
    docCat2Item6: "DCR Declaration",

    docCat3Title: "Commercial & Financial",
    docCat3Sub: "Financial documents and quotations",
    docCat3Item1: "Subsidy / E-Token",
    docCat3Item2: "Quotation",
    docCat3Item3: "Invoice / Bill",
    docCat3Item4: "DCR Certificate",
    docCat3Item5: "Netmeter Payment Receipt",

    docCat4Title: "Project & Completion",
    docCat4Sub: "Final installation and completion documents",
    docCat4Item1: "Project Completion Report",
    docCat4Item2: "Netmeter Application",
    docCat4Item3: "Acknowledgement",
    docCat4Item4: "Extra Load / Additional Load (If Needed)",
    docCat4Item5: "GPS Photo of Site",

    docNoteTitle: "Please Note:",
    docNoteDesc: "You don't need all documents immediately. Our team will guide you through exactly what's needed for your specific requirement when we contact you.",

    contactSecTag: "Get In Touch",
    contactSecTitle: "Start Saving With Solar Today",
    contactSecDesc: "Connect directly with our authorized dealers in Jammalamadugu for a free quote and personalized rooftop assessment.",
    formTitle: "Request Free Site Inspection & Quote",
    formName: "Full Name",
    formPhone: "Mobile Number",
    formTown: "Town / Village (e.g. JMD, Proddatur)",
    formBill: "Monthly Electricity Bill (₹)",
    formSelectDealer: "Send WhatsApp Inquiry To:",
    btnSubmitQuote: "Submit & Chat on WhatsApp",

    footerDesc: "Authorized Solar & Green Energy Partner providing PM Surya Ghar Muft Bijli Yojana rooftop solutions, RO water plants, and lithium batteries in Rayalaseema.",
    quickLinksTitle: "Quick Navigation",
    contactInfoTitle: "Office & Contacts",
    sudhakarAddress: "Tukkuguda, RangaReddy Dist., Hyderabad, Telangana.",
    addressText: "Nagulakatta, Jammalamadugu (JMD), YSR Kadapa Dist., Andhra Pradesh",
    gstinLabel: "GSTIN: 36ABHPU5110F1ZS",
    copyrightText: "© 2026 Prasudharka Solar (Aqua Pzone Enterprises). All rights reserved."
  },

  te: {
    navHome: "హోమ్",
    navSubsidy: "ధరలు & సబ్సిడీ",
    navCalc: "కాలిక్యులేటర్",
    navServices: "సేవలు",
    navProcess: "ప్రక్రియ",
    navContact: "సంప్రదించండి",
    langBtnText: "English",
    brandsTitle: "మా అధికృత బ్రాండ్లు",
    dealersTitle: "అధికారిక డీలర్లు మరియు కార్యాలయం",
    dealersSubtitle: "మీ సందేహాలకు తక్షణ సమాధానం కోసం సంప్రదించండి:",
    dealer1Desc: "అధికారిక డీలర్ • తుక్కుగూడ, హైదరాబాద్ (Tukkuguda, HYD)",
    dealer2Desc: "అధికారిక డీలర్ • నాగులకట్ట, జమ్మలమడుగు",
    whatsappBtn: "వాట్సాప్",
    footerTagline: "ప్రకాశనం & వ్యాపార వృద్ధి కోసం నిర్మించబడింది",
    note: "గమనిక:",
    calcNote: "3-5 సంవత్సరాలలో మీ పెట్టుబడి పూర్తిగా తిరిగి వస్తుంది. ఆ తర్వాత 20+ సంవత్సరాల పాటు ఉచిత విద్యుత్ లభిస్తుంది.",
    billAmount: "బిల్లు మొత్తం",
    badgePM: "PM సూర్య ఘర్",
    badgeComm: "వాణిజ్యం & పరిశ్రమ",
    badgeStorage: "స్మార్ట్ ఎనర్జీ స్టోరేజ్",
    badgeRO: "ఆక్వా పిజోన్ RO",
    badgeAgri: "వ్యవసాయ సొల్యూషన్స్",
    badgePaper: "పూర్తి డాక్యుమెంటేషన్",
    pillSubsidy: "₹78,000 సబ్సిడీ",
    pillNetMeter: "నెట్ మీటరింగ్",
    pillWarranty: "25 ఏళ్ల వారంటీ",
    pillSavings: "భారీ కరెంట్ బిల్లు ఆదా",
    pillZeroMaint: "జీరో మెయింటెనెన్స్",
    pillFastCharge: "ఫాస్ట్ ఛార్జింగ్",
    pillHighFlow: "హై ప్రెషర్ ఫ్లో",
    pillFarmer: "రైతులకు రక్ష",
    pillTransparent: "100% పారదర్శకత",
    tierPopular: "అత్యంత ప్రజాదరణ పొందినది (Most Popular)",
    tier1kWSubDesc: "చిన్న కుటుంబాలకు అనుకూలం",
    tier2kWSubDesc: "మధ్యతరగతి కుటుంబాలకు ఉత్తమం",
    tier3kWSubDesc: "గరిష్ట సబ్సిడీ & సున్నా కరెంట్ బిల్లు",
    tierPanelWarr: "25 సంవత్సరాల ప్యానెల్ వారంటీ",
    tierNetMeter: "డిస్కం నెట్ మీటర్ కనెక్షన్",
    tierLoan: "సులభమైన బ్యాంక్ లోన్ సౌకర్యం",
    tierSellPower: "మిగిలిన విద్యుత్‌ను ప్రభుత్వానికి అమ్మవచ్చు",
    tierZeroDown: "జీరో డౌన్‌పేమెంట్ సోలార్ లోన్",
    btnGetQuote: "WhatsAppలో కొటేషన్ అడగండి",

    topGovBadge: "పి.ఎం సూర్య ఘర్ ఉచిత విద్యుత్ యోజన",
    topSubsidyBadge: "రూ. 78,000* వరకు ప్రభుత్వ సబ్సిడీ",
    callSudhakar: "సుధాకర్ గారికి కాల్",
    callBhaskar: "భాస్కర్ గారికి కాల్",

    firmTitle: "ఆక్వా పిజోన్ ఎంటర్‌ప్రైజెస్ (AquaPzone Enterprises)",
    firmSubtitle: "సోలార్ & రెన్యూవబుల్స్ (Solar & Renewables)",
    heroBadge: "🏅 ISO 9001:2015 సర్టిఫైడ్ కంపెనీ",
    heroTitle: "మీ ఇంటికి సూర్య శక్తితో ఉచిత విద్యుత్ పొందండి, <span class='highlight-gold'>రూ. 78,000*</span> <span class='highlight-green'>ప్రభుత్వ సబ్సిడీ</span>",
    heroLead: "కరెంట్ బిల్లుల భారాన్ని పూర్తిగా తగ్గించుకోండి. నివాస గృహాలు, వాణిజ్య సంస్థలు, పరిశ్రమలకు నాణ్యమైన సోలార్ రూఫ్‌టాప్ ఇన్‌స్టాలేషన్ మరియు బ్యాంక్ లోన్ సదుపాయం.",
    subsidyCardTitle: "పి.ఎం సూర్య ఘర్ ముఫ్త్ బిజిలీ యోజన",
    subsidyCardDesc: "కేంద్ర ప్రభుత్వం నుండి నేరుగా మీ బ్యాంక్ ఖాతాకు రూ. 78,000 వరకు సబ్సిడీ. తక్కువ వడ్డీతో జాతీయ బ్యాంకుల నుండి సోలార్ లోన్ సదుపాయం.",
    btnCalcSubsidy: "సబ్సిడీ లెక్కించండి",
    btnWhatsAppNow: "వాట్సాప్‌లో మాట్లాడండి",
    statMetric1: "25 సంవత్సరాలు",
    statLabel1: "ప్యానెల్ వారంటీ",
    statMetric2: "రూ. 78,000",
    statLabel2: "గరిష్ట సబ్సిడీ",
    statMetric3: "100%",
    statLabel3: "నెట్ మీటరింగ్ బాధ్యత",

    quickCardTitle: "ఉచిత సోలార్ అంచనా",
    quickCardSub: "30 సెకన్లలో మీ అంచనా వివరాలు పొందండి",
    lblMonthlyBill: "నెలకు మీ కరెంట్ బిల్లు (రూ.)",
    lblLocation: "మీ ఊరు / ప్రాంతం",
    lblPropType: "భవనం రకం",
    optRes: "నివాస గృహం (ఇల్లు / ఫ్లాట్)",
    optComm: "వాణిజ్య భవనం (షాపు / ఆఫీస్)",
    btnGetQuickQuote: "వాట్సాప్‌లో కొటేషన్ పొందండి",

    aboutSecTag: "అధికారిక PM సూర్య ఘర్ వెండర్",
    aboutSecTitle: "ఆక్వా పిజోన్ ఎంటర్‌ప్రైజెస్ (aquaPzone enterprises)",
    aboutSecDesc: "పీఎం సూర్య ఘర్ పోర్టల్‌లో ఆమోదించబడిన అధికారిక వెండర్‌గా, ఆంధ్రప్రదేశ్, తెలంగాణ, బెంగళూరు మరియు చెన్నై వ్యాప్తంగా మాకు 21 సంవత్సరాలకు పైగా అనుభవం కలదు. అత్యుత్తమ నాణ్యమైన పరికరాలు, లోపాలు లేని డిజైన్ మరియు నిపుణుల ద్వారా పటిష్టమైన ఇన్‌స్టాలేషన్ అందిస్తాము. రిజిస్ట్రేషన్ మరియు డాక్యుమెంటేషన్ నుండి నెట్ మీటరింగ్ మరియు PPA ఒప్పందాల వరకు మా సర్వీస్ బృందమే పూర్తి బాధ్యత వహిస్తుంది.",
    pillar1: "జీరో అడ్వాన్స్ పేమెంట్",
    pillar2: "అత్యుత్తమ ధరలు",
    pillar3: "విస్తృతమైన డీలర్ల నెట్‌వర్క్",
    pillar4: "పూర్తి డాక్యుమెంటేషన్ బాధ్యత",
    premiumBrandsTitle: "ప్రీమియం బ్రాండ్లు & వారంటీ (Premium Brands & Warranty)",
    premiumBrandsDesc: "దశాబ్దాల పాటు నిలిచే అంతర్జాతీయ స్థాయి Tier-1 సోలార్ ఇంజనీరింగ్ పరికరాలు.",
    comp1Title: "సోలార్ ప్యానెల్స్: Panasonic",
    comp1Desc: "35mm మందం, 30 ఏళ్ల లైఫ్‌స్పాన్. 25 సంవత్సరాల వారంటీ.",
    comp1Warr: "25 సంవత్సరాల వారంటీ",
    comp2Title: "ఇన్వర్టర్: Panasonic",
    comp2Desc: "అధునాతన RF టెక్నాలజీ. 10 సంవత్సరాల వారంటీ.",
    comp2Warr: "10 సంవత్సరాల వారంటీ",
    comp3Title: "ACDB & DCDB: Havells",
    comp3Desc: "నాణ్యమైన MCB రక్షణతో కూడిన బాక్సులు.",
    comp3Warr: "సురక్షిత MCB ప్రొటెక్షన్",
    comp4Title: "కేబుల్స్: Polycab",
    comp4Desc: "4 sq mm అత్యుత్తమ నాణ్యమైన సోలార్ వైరింగ్.",
    comp4Warr: "4 sq mm హెవీ డ్యూటీ",
    comp5Title: "స్ట్రక్చర్: JSW",
    comp5Desc: "GI హాట్ డిప్డ్, 160 km/h గాలి వేగాన్ని తట్టుకునే సామర్థ్యం. 35 ఏళ్ల లైఫ్‌స్పాన్.",
    comp5Warr: "35 ఏళ్ల జీవితకాలం",

    configSecTag: "సిస్టమ్ కాన్ఫిగరేషన్లు",
    configSecTitle: "సిస్టమ్ కాన్ఫిగరేషన్లు & పూర్తి వివరాలు (System Configurations)",
    configSecDesc: "సామర్థ్యం ప్రకారం పూర్తి ధరలు, ప్రభుత్వ సబ్సిడీ, విద్యుత్ ఉత్పత్తి మరియు లోన్ వివరాలు.",
    cfg1kwTitle: "1 kW సిస్టమ్",
    cfg2kwTitle: "2 kW సిస్టమ్",
    cfg3kwTitle: "3 kW సిస్టమ్",
    cfg5kwTitle: "5 kW సిస్టమ్",
    cfgGovtSubsidy: "ప్రభుత్వ సబ్సిడీ",
    cfgUnitCost: "యూనిట్ ధర (DCR)",
    cfgMaxLoan: "గరిష్ట లోన్",
    cfgEstEmi: "నెలవారీ EMI",
    cfgPowerGen: "రోజువారీ విద్యుత్",
    cfgSpaceReq: "రూఫ్ స్థలం",
    cfgDayUnits5: "5 యూనిట్లు / రోజుకు",
    cfgDayUnits10: "10 యూనిట్లు / రోజుకు",
    cfgDayUnits15: "15 యూనిట్లు / రోజుకు",
    cfgDayUnits25: "25 యూనిట్లు / రోజుకు",
    cfgSpace1kW: "8 x 10 అడుగులు (సుమారు)",
    cfgSpace2kW: "8 x 16 అడుగులు",
    cfgSpace3kW: "12 x 16 అడుగులు",
    cfgSpace5kW: "20 x 16 అడుగులు",
    cfgMostPopular: "⭐ అత్యంత ప్రజాదరణ (గరిష్ట సబ్సిడీ)",
    cfgNoteTitle: "బ్యాంక్ లోన్ & ROI ముఖ్య వివరాలు:",
    cfgNoteDesc: "గమనిక: అన్ని ప్రభుత్వ బ్యాంకులలో 10 సంవత్సరాల కాలపరిమితితో లోన్ సదుపాయం కలదు. వడ్డీ రేట్లు 3kW లోపు సుమారు 6.7% మరియు 5kW కి 8.9%. మీ పెట్టుబడి 3 నుండి 4 సంవత్సరాలలో పూర్తిగా తిరిగి వస్తుంది.",
    btnGetQuote1kW: "1 kW కొటేషన్ అడగండి",
    btnGetQuote2kW: "2 kW కొటేషన్ అడగండి",
    btnGetQuote3kW: "3 kW కొటేషన్ అడగండి",
    btnGetQuote5kW: "5 kW కొటేషన్ అడగండి",

    calcSecTag: "ఖర్చు & ఆదా లెక్కించండి",
    calcSecTitle: "సోలార్ & విద్యుత్ బిల్లు కాలిక్యులేటర్",
    calcSecDesc: "ఆంధ్రప్రదేశ్ & తెలంగాణ రాష్ట్రాల అధికారిక టారిఫ్ స్లాబుల ప్రకారం మీ యూనిట్లు లేదా బిల్లు ఆధారంగా కరెంట్ ఖర్చు, సోలార్ పరిమాణం, సబ్సిడీ మరియు 25 సంవత్సరాల ఆదా వివరాలు లెక్కించండి.",
    calcStateLabel: "రాష్ట్రం ఎంచుకోండి (Select State):",
    calcPropLabel: "వినియోగ రకం ఎంచుకోండి (Category):",
    btnPropHome: "ఇల్లు (Home)",
    btnPropShop: "వాణిజ్యం (Commercial)",
    btnPropFarm: "పొలం / పరిశ్రమ",
    modeUnits: "యూనిట్లు (Units - kWh)",
    modeMeter: "మీటర్ రీడింగ్ (Meter Reading)",
    modeBill: "బిల్లు మొత్తం (Bill - ₹)",
    lblMonthlyUnits: "నెలవారీ యూనిట్లు (Monthly Units)",
    lblCurrReading: "ప్రస్తుత రీడింగ్ (Current Reading)",
    lblPrevReading: "గత రీడింగ్ (Previous Reading)",
    lblConsumedUnits: "మొత్తం వినియోగించిన యూనిట్లు:",
    lblEnergyCharges: "Energy Charges (స్లాబుల ప్రకారం):",
    lblOtherCharges: "Fixed + Meter + Duty + FAC:",
    lblCurrentBill: "ప్రస్తుత నెలవారీ బిల్లు (Current Bill):",
    calcResultTitle: "మీ సోలార్ ప్లాన్ అంచనా",
    metricRecSize: "సిఫార్సు సోలార్ సామర్థ్యం",
    metricSubsidyVal: "కేంద్ర ప్రభుత్వ సబ్సిడీ",
    metricRoofArea: "అవసరమైన రూఫ్ స్థలం",
    metricMonthlySave: "నెలవారీ కరెంట్ ఆదా",
    lifetimeSaveLabel: "25 సంవత్సరాల జీవితకాల విద్యుత్ ఆదా:",
    roiTimelineLabel: "ROI కాలపరిమితి: 3-4 సంవత్సరాలు • ఆ తర్వాత ఉచిత విద్యుత్",
    btnSendCalcWhatsApp: "ఈ ప్లాన్‌ను వాట్సాప్‌కి పంపి కొటేషన్ పొందండి",

    servicesSecTag: "మా సేవలు & ఉత్పత్తులు",
    servicesSecTitle: "పూర్తి సోలార్ & గ్రీన్ ఎనర్జీ సొల్యూషన్స్ (Our Offerings)",
    servicesSecDesc: "పీఎం సూర్య ఘర్ ఆమోదిత వెండర్‌గా, ఆంధ్రప్రదేశ్, తెలంగాణ, బెంగళూరు & చెన్నై వ్యాప్తంగా 21 ఏళ్ల అనుభవంతో అత్యుత్తమ Panasonic, Havells, Polycab, మరియు JSW బ్రాండ్ల పరికరాలతో సమగ్ర పరిష్కారాలు.",
    serv1Title: "నివాస గృహాల సోలార్ (Residential Solar)",
    serv1Desc: "Panasonic 35mm ప్రీమియం ప్యానెల్స్ & ఇన్వర్టర్లతో ఇళ్లపై సోలార్ ప్లాంట్లు. 90% వరకు కరెంట్ బిల్లు ఆదా, ₹78,000 కేంద్ర ప్రభుత్వ సబ్సిడీ మరియు జీరో అడ్వాన్స్ పేమెంట్ సదుపాయం.",
    serv2Title: "వాణిజ్య & పారిశ్రామిక సోలార్ (Commercial)",
    serv2Desc: "పాఠశాలలు, ఆసుపత్రులు, కర్మాగారాలు, దుకాణాలు మరియు పెట్రోల్ బంకులకు 160 km/h గాలిని తట్టుకునే JSW GI హాట్ డిప్డ్ స్ట్రక్చర్లు, Havells DCDB & Polycab కేబుల్స్‌తో భారీ పవర్ ప్లాంట్లు.",
    serv3Title: "లిథియం-అయాన్ బ్యాటరీ & హైబ్రిడ్ ఇన్వర్టర్లు",
    serv3Desc: "అధునాతన RF టెక్నాలజీతో Panasonic 10 సంవత్సరాల వారంటీ ఇన్వర్టర్లు మరియు వాల్-మౌంటెడ్ లిథియం బ్యాటరీలతో 24x7 నిరంతర విద్యుత్ బ్యాకప్.",
    serv4Title: "డొమెస్టిక్ & కమర్షియల్ RO వాటర్ ప్లాంట్స్",
    serv4Desc: "ఆక్వా పిజోన్ ఎంటర్‌ప్రైజెస్ ద్వారా 250 నుండి 5000 LPH వరకు ప్రీమియం SS-304/316 గ్రేడ్ వాటర్ ప్లాంట్లు మరియు గృహాల కోసం మినరల్ & ఆల్కలీన్ వాటర్ ప్యూరిఫైయర్లు.",
    serv5Title: "వ్యవసాయ సోలార్ పంపులు (Agricultural Pumps)",
    serv5Desc: "రైతుల కోసం నాణ్యమైన C.R.I. సోలార్ పంపుసెట్లు మరియు వ్యవసాయ మోటార్లు, తక్కువ వోల్టేజీ సమస్యలు లేకుండా నిరంతర నీటి పారుదల సౌలభ్యం.",
    serv6Title: "పూర్తి డాక్యుమెంటేషన్ & నెట్ మీటరింగ్ బాధ్యత",
    serv6Desc: "APCPDCL / TSSPDCL నెట్ మీటర్ అగ్రిమెంట్, DCR సర్టిఫికేషన్, బ్యాంక్ లోన్ (6.7% వడ్డీ), డిజిటల్ అప్రూవల్ మరియు DBT సబ్సిడీ వరకు మా సర్వీస్ బృందమే పూర్తి బాధ్యత వహిస్తుంది.",

    procSecTag: "సులభమైన ప్రక్రియ",
    procSecTitle: "6 దశల్లో పూర్తి సోలార్ పరిష్కారం",
    procSecDesc: "మొదటి సైట్ సర్వే నుండి సబ్సిడీ మీ బ్యాంక్ ఖాతాలో చేరే వరకు ప్రతి దశను మేమే బాధ్యతగా నిర్వహిస్తాము.",
    step1Title: "1. ఉచిత సైట్ సర్వే",
    step1Desc: "మా ఇంజనీర్లు మీ ఇంటి రూఫ్‌ను పరిశీలించి సూర్యరశ్మి మరియు విస్తీర్ణాన్ని ఖచ్చితంగా లెక్కిస్తారు.",
    step2Title: "2. బ్యాంక్ లోన్ ప్రాసెస్",
    step2Desc: "జాతీయ బ్యాంకుల (SBI, Canara, UBI) ద్వారా అతి తక్కువ వడ్డీతో సులభమైన సోలార్ లోన్ మంజూరు.",
    step3Title: "3. పోర్టల్ రిజిస్ట్రేషన్",
    step3Desc: "కేంద్ర ప్రభుత్వ MNRE పోర్టల్‌లో మీ డాక్యుమెంటేషన్ మరియు దరఖాస్తును సమర్పిస్తాము.",
    step4Title: "4. నాణ్యమైన ఇన్‌స్టాలేషన్",
    step4Desc: "Panasonic, Havells, Polycab ప్యానెల్స్ మరియు JSW స్ట్రక్చర్లతో పటిష్టమైన అమరిక.",
    step5Title: "5. నెట్ మీటర్ కనెక్షన్",
    step5Desc: "డిస్కం విద్యుత్ శాఖ అధికారులతో నెట్ మీటర్ బిగించి, మిగిలిన విద్యుత్‌ను ప్రభుత్వానికి అమ్మే సదుపాయం.",
    step6Title: "6. సబ్సిడీ జమ & సేవలు",
    step6Desc: "30 రోజుల్లోగా ప్రభుత్వ సబ్సిడీ నేరుగా మీ అకౌంట్‌లో జమ. 25 ఏళ్ల పాటు ప్యానెల్ భరోసా.",

    docSecTag: "డాక్యుమెంట్ల జాబితా",
    docSecTitle: "కావలసిన ముఖ్యమైన పత్రాలు (Required Documents)",
    docSecDesc: "సులభమైన మరియు వేగవంతమైన ఆన్‌బోర్డింగ్ ప్రక్రియ కోసం క్రింది పత్రాలను సిద్ధం చేసుకోండి.",
    docCat1Title: "ప్రాథమిక వివరాలు (Basic Details)",
    docCat1Sub: "గుర్తింపు మరియు ప్రాథమిక ఆధారాలు",
    docCat1Item1: "ఆధార్ కార్డు (Aadhar Card)",
    docCat1Item2: "పాన్ కార్డు (PAN Card)",
    docCat1Item3: "బ్యాంక్ పాస్‌బుక్ / చెక్కు (Bank Passbook / Cheque)",
    docCat1Item4: "కరెంట్ బిల్లు (Electricity Bill)",

    docCat2Title: "ఒప్పందాలు & అనుమతులు",
    docCat2Sub: "అధికారిక అనుమతులు మరియు ఒప్పంద పత్రాలు",
    docCat2Item1: "ఫిజిబిలిటీ నివేదిక (Feasibility Report)",
    docCat2Item2: "నెట్ మీటరింగ్ అగ్రిమెంట్ (Netmetering Agreement)",
    docCat2Item3: "డిజిటల్ ఆమోద లేఖ (Digital Approval Letter)",
    docCat2Item4: "వెండర్ & వినియోగదారు ఒప్పందం (Vendor Agreement)",
    docCat2Item5: "డిస్కం ఒప్పందం (DISCOM Agreement)",
    docCat2Item6: "DCR డిక్లరేషన్ (DCR Declaration)",

    docCat3Title: "ఆర్థిక & వాణిజ్య పత్రాలు",
    docCat3Sub: "ఆర్థిక పత్రాలు మరియు కొటేషన్లు",
    docCat3Item1: "సబ్సిడీ / E-టోకెన్ (Subsidy / E-Token)",
    docCat3Item2: "కొటేషన్ (Quotation)",
    docCat3Item3: "ఇన్‌వాయిస్ / బిల్లు (Invoice / Bill)",
    docCat3Item4: "DCR సర్టిఫికెట్ (DCR Certificate)",
    docCat3Item5: "నెట్ మీటర్ చెల్లింపు రసీదు (Payment Receipt)",

    docCat4Title: "ప్రాజెక్ట్ & ముగింపు పత్రాలు",
    docCat4Sub: "ఇన్‌స్టాలేషన్ మరియు పూర్తి నివేదిక పత్రాలు",
    docCat4Item1: "ప్రాజెక్ట్ పూర్తి నివేదిక (Completion Report)",
    docCat4Item2: "నెట్ మీటర్ దరఖాస్తు (Netmeter Application)",
    docCat4Item3: "రసీదు / Acknowledgement",
    docCat4Item4: "అదనపు లోడ్ / Extra Load (అవసరమైతే)",
    docCat4Item5: "సైట్ GPS ఫోటో (GPS Photo of Site)",

    docNoteTitle: "ముఖ్య గమనిక:",
    docNoteDesc: "మీరు అన్ని పత్రాలను వెంటనే సమర్పించాల్సిన అవసరం లేదు. మేము మిమ్మల్ని సంప్రదించినప్పుడు మీ అవసరానికి తగినట్లుగా ఏ పత్రాలు కావాలో మా నిపుణుల బృందం మీకు పూర్తి మార్గదర్శనం చేస్తుంది.",

    contactSecTag: "మమ్మల్ని సంప్రదించండి",
    contactSecTitle: "ఈరోజే మీ ఉచిత సోలార్ కొటేషన్ పొందండి",
    contactSecDesc: "జమ్మలమడుగులోని మా అధికారిక డీలర్లతో మాట్లాడి మీ ఇంటికి సరైన సోలార్ ప్లాన్ ఎంచుకోండి.",
    formTitle: "ఉచిత సైట్ పరిశీలన & కొటేషన్ ఫారం",
    formName: "మీ పూర్తి పేరు",
    formPhone: "మొబైల్ నంబర్",
    formTown: "మీ ఊరు / మండలం (ఉదా: జమ్మలమడుగు)",
    formBill: "నెలవారీ కరెంట్ బిల్లు (రూ.)",
    formSelectDealer: "వాట్సాప్ సందేశం ఎవరికి పంపాలి:",
    btnSubmitQuote: "వాట్సాప్‌లో కొటేషన్ పంపండి",

    footerDesc: "పి.ఎం సూర్య ఘర్ యోజన అధికారిక సోలార్ రూఫ్‌టాప్ డీలర్స్, RO వాటర్ ప్లాంట్లు మరియు లిథియం ఇన్వర్టర్ సొల్యూషన్స్ - జమ్మలమడుగు, వైఎస్సార్ కడప.",
    quickLinksTitle: "ముఖ్యమైన లింకులు",
    contactInfoTitle: "సంప్రదించవలసిన వివరాలు",
    sudhakarAddress: "తుక్కుగూడ, రంగారెడ్డి జిల్లా, హైదరాబాద్, తెలంగాణ.",
    addressText: "నాగులకట్ట, జమ్మలమడుగు (JMD), వైఎస్సార్ కడప జిల్లా, ఆంధ్రప్రదేశ్",
    gstinLabel: "GSTIN: 36ABHPU5110F1ZS",
    copyrightText: "© 2026 ప్రసుధార్క సోలార్ (ఆక్వా పిజోన్ ఎంటర్‌ప్రైజెస్). సర్వహక్కులు రక్షించబడ్డాయి."
  }
};

// Official State DISCOM Tariff Slabs & Configuration (AP & Telangana)
const TARIFF_CONFIG = {
  AP: {
    name: 'Andhra Pradesh (APCPDCL / APSPDCL)',
    badgeName: 'AP Tariff (APCPDCL / APSPDCL)',
    residential: {
      slabs: [
        { from: 0, to: 30, rate: 1.90 },
        { from: 30, to: 75, rate: 3.00 },
        { from: 75, to: 125, rate: 4.50 },
        { from: 125, to: 225, rate: 6.00 },
        { from: 225, to: 400, rate: 8.75 },
        { from: 400, to: Infinity, rate: 9.75 }
      ],
      fixedChargeType: 'per_kw',
      ratePerKw: 10,
      meterRent: 25,
      wheelingRate: 0.15,
      facRate: 0.25,
      dutyOn: 'energy_only',
      dutyPercent: 6,
      subsidy: { type: 'none' }
    },
    commercial: {
      slabs: [
        { from: 0, to: 100, rate: 7.60 },
        { from: 100, to: 300, rate: 9.00 },
        { from: 300, to: 500, rate: 10.10 },
        { from: 500, to: Infinity, rate: 11.00 }
      ],
      fixedChargeType: 'per_kw',
      ratePerKw: 70,
      meterRent: 50,
      wheelingRate: 0.35,
      facRate: 0.35,
      dutyOn: 'energy_plus_fixed',
      dutyPercent: 6,
      subsidy: { type: 'none' }
    },
    farm: {
      slabs: [
        { from: 0, to: 300, rate: 4.50 },
        { from: 300, to: Infinity, rate: 6.80 }
      ],
      fixedChargeType: 'flat',
      flatAmount: 50,
      meterRent: 30,
      wheelingRate: 0.10,
      facRate: 0.15,
      dutyOn: 'energy_only',
      dutyPercent: 5,
      subsidy: { type: 'none' }
    }
  },
  TG: {
    name: 'Telangana (TSSPDCL / TSNPDCL)',
    badgeName: 'Telangana Tariff (TSSPDCL / TSNPDCL)',
    residential: {
      slabs: [
        { from: 0, to: 50, rate: 1.95 },
        { from: 50, to: 100, rate: 3.10 },
        { from: 100, to: 200, rate: 4.80 },
        { from: 200, to: 300, rate: 7.70 },
        { from: 300, to: 400, rate: 9.00 },
        { from: 400, to: Infinity, rate: 9.50 }
      ],
      fixedChargeType: 'per_kw',
      ratePerKw: 15,
      meterRent: 30,
      wheelingRate: 0.18,
      facRate: 0.20,
      dutyOn: 'energy_only',
      dutyPercent: 6,
      subsidy: { type: 'none' }
    },
    commercial: {
      slabs: [
        { from: 0, to: 100, rate: 7.80 },
        { from: 100, to: 300, rate: 9.20 },
        { from: 300, to: 500, rate: 10.20 },
        { from: 500, to: Infinity, rate: 11.20 }
      ],
      fixedChargeType: 'per_kw',
      ratePerKw: 75,
      meterRent: 50,
      wheelingRate: 0.40,
      facRate: 0.40,
      dutyOn: 'energy_plus_fixed',
      dutyPercent: 6,
      subsidy: { type: 'none' }
    },
    farm: {
      slabs: [
        { from: 0, to: 300, rate: 4.20 },
        { from: 300, to: Infinity, rate: 6.50 }
      ],
      fixedChargeType: 'flat',
      flatAmount: 60,
      meterRent: 35,
      wheelingRate: 0.12,
      facRate: 0.20,
      dutyOn: 'energy_only',
      dutyPercent: 5,
      subsidy: { type: 'none' }
    }
  }
};

// 1. Calculate Telescopic Energy & DISCOM Bill based on User specification
function computeDiscomTariff(units, stateKey, propTypeKey, sanctionedLoadKw) {
  const stateTariff = TARIFF_CONFIG[stateKey] || TARIFF_CONFIG.AP;
  const config = stateTariff[propTypeKey] || stateTariff.residential;
  const load = sanctionedLoadKw || Math.max(1, Math.ceil(units / 120));

  // 1. Energy Charges = Σ (Units in Slab_i × Rate_i)
  let remainingUnits = units;
  let energyCharges = 0;
  let slabBreakdown = [];

  for (let i = 0; i < config.slabs.length; i++) {
    const slab = config.slabs[i];
    if (remainingUnits <= 0) break;
    const capacity = slab.to === Infinity ? remainingUnits : (slab.to - slab.from);
    const unitsInSlab = Math.min(remainingUnits, capacity);
    const slabCost = unitsInSlab * slab.rate;
    energyCharges += slabCost;
    remainingUnits -= unitsInSlab;
    slabBreakdown.push({
      from: slab.from,
      to: slab.to,
      units: unitsInSlab,
      rate: slab.rate,
      cost: slabCost
    });
  }

  // 2. Fixed Charge
  let fixedCharge = 0;
  if (config.fixedChargeType === 'flat') {
    fixedCharge = config.flatAmount || 0;
  } else if (config.fixedChargeType === 'per_kw') {
    fixedCharge = load * (config.ratePerKw || 10);
  }

  // 3. Meter Rent
  const meterRent = config.meterRent || 0;

  // 4. Wheeling Charges = total_units × wheeling_rate_per_unit
  const wheelingCharges = units * (config.wheelingRate || 0);

  // 5. FAC = total_units × fac_rate_per_unit
  const facCharges = units * (config.facRate || 0);

  // 6. Electricity Duty
  let dutyBase = energyCharges;
  if (config.dutyOn === 'energy_plus_fixed') {
    dutyBase = energyCharges + fixedCharge;
  }
  const electricityDuty = (dutyBase * (config.dutyPercent || 6)) / 100;

  // 7. Subtotal
  const subtotal = energyCharges + fixedCharge + meterRent + wheelingCharges + facCharges + electricityDuty;

  // 8. Subsidy Deduction
  let subsidyAmount = 0;
  if (config.subsidy && config.subsidy.type === 'percentage_discount') {
    subsidyAmount = Math.min((subtotal * config.subsidy.rate) / 100, config.subsidy.cap || Infinity);
  }

  // 9. Total Bill
  const totalBill = Math.max(0, Math.round(subtotal - subsidyAmount));

  // 10. Effective Per-Unit Rate
  const effectiveRate = units > 0 ? (totalBill / units).toFixed(2) : '0.00';

  return {
    units,
    energyCharges: Math.round(energyCharges),
    fixedCharge: Math.round(fixedCharge),
    otherCharges: Math.round(fixedCharge + meterRent + wheelingCharges + facCharges + electricityDuty),
    meterRent,
    wheelingCharges: Math.round(wheelingCharges),
    facCharges: Math.round(facCharges),
    electricityDuty: Math.round(electricityDuty),
    subtotal: Math.round(subtotal),
    subsidyAmount: Math.round(subsidyAmount),
    totalBill,
    effectiveRate,
    slabBreakdown,
    load
  };
}

// Convert Bill to approximate Units (reverse lookup)
function billToUnits(targetBill, stateKey, propTypeKey) {
  let low = 10;
  let high = 4000;
  let bestUnits = 300;
  let minDiff = Infinity;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    let bill = computeDiscomTariff(mid, stateKey, propTypeKey).totalBill;
    let diff = Math.abs(bill - targetBill);
    if (diff < minDiff) {
      minDiff = diff;
      bestUnits = mid;
    }
    if (bill < targetBill) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return bestUnits;
}

// 2. Solar Sizing & ROI Calculations
function calculateSolarPlan(units, stateKey, propTypeKey) {
  const tariff = computeDiscomTariff(units, stateKey, propTypeKey);
  
  // 1 kW solar generates approx 120 units per month in sunny AP & Telangana
  let recKw = Math.max(1, Math.min(25, Math.ceil((units / 120) * 2) / 2));
  if (propTypeKey === 'commercial') {
    recKw = Math.max(2, Math.min(30, Math.ceil((units / 115) * 2) / 2));
  } else if (propTypeKey === 'farm') {
    recKw = Math.max(3, Math.min(50, Math.ceil((units / 110) * 2) / 2));
  }

  const solarMonthlyGen = Math.round(recKw * 120);
  const offsetPct = Math.min(100, Math.round((solarMonthlyGen / Math.max(1, units)) * 100));

  // Central Government PM Surya Ghar Subsidy
  let subsidy = 0;
  let subsidyDisplay = '';
  if (propTypeKey === 'residential') {
    if (recKw <= 1) {
      subsidy = 30000;
    } else if (recKw <= 2) {
      subsidy = 60000;
    } else {
      subsidy = 78000; // Cap at ₹78,000 for 3kW and above
    }
    subsidyDisplay = '₹' + subsidy.toLocaleString('en-IN');
  } else {
    const lang = appState.currentLang;
    subsidyDisplay = lang === 'te' ? 'టాక్స్ లాభాలు' : 'Tax Benefits';
  }

  // Net Metering: Remaining Grid Units after solar offset
  const netGridUnits = Math.max(0, units - solarMonthlyGen);
  const netBillWithSolar = computeDiscomTariff(netGridUnits, stateKey, propTypeKey, tariff.load).totalBill;

  // Monthly Savings
  const monthlySavings = Math.max(0, tariff.totalBill - netBillWithSolar);
  const annualSavings = monthlySavings * 12;
  const lifetimeSavings = annualSavings * 25;
  const roofArea = Math.round(recKw * 100);

  return {
    units,
    tariff,
    recKw,
    solarMonthlyGen,
    offsetPct,
    subsidy,
    subsidyDisplay,
    netBillWithSolar,
    roofArea,
    monthlySavings,
    annualSavings,
    lifetimeSavings
  };
}

// 3. Update Calculator UI
function updateCalculatorUI() {
  const stateKey = appState.selectedState || 'AP';
  const propTypeKey = appState.propType || 'residential';
  let totalUnits = appState.unitsAmount || 300;

  if (appState.calcMode === 'units') {
    const unitsRangeEl = document.getElementById('unitsRange');
    if (unitsRangeEl) totalUnits = parseInt(unitsRangeEl.value, 10) || 300;
    const numInput = document.getElementById('unitsNumberInput');
    if (numInput && document.activeElement !== numInput) numInput.value = totalUnits;
  } else if (appState.calcMode === 'meter') {
    const curr = parseInt(document.getElementById('currReadingInput').value, 10) || 0;
    const prev = parseInt(document.getElementById('prevReadingInput').value, 10) || 0;
    totalUnits = Math.max(10, curr - prev);
    const meterCalcDisplay = document.getElementById('meterUnitsCalcDisplay');
    if (meterCalcDisplay) meterCalcDisplay.innerText = totalUnits + ' Units (kWh)';
  } else if (appState.calcMode === 'bill') {
    const billRangeEl = document.getElementById('billRange');
    const targetBill = parseInt(billRangeEl.value, 10) || 3000;
    const billDisplay = document.getElementById('billDisplayVal');
    if (billDisplay) billDisplay.innerText = '₹' + targetBill.toLocaleString('en-IN');
    totalUnits = billToUnits(targetBill, stateKey, propTypeKey);
  }

  appState.unitsAmount = totalUnits;
  const result = calculateSolarPlan(totalUnits, stateKey, propTypeKey);
  appState.billAmount = result.tariff.totalBill;

  // Update DISCOM Summary & Tariff Breakdown
  const discomConfig = TARIFF_CONFIG[stateKey];
  const discomBadge = document.getElementById('currentDiscomBadge');
  if (discomBadge) discomBadge.innerText = discomConfig.badgeName;

  const effectiveRateEl = document.getElementById('effectiveRateDisplay');
  if (effectiveRateEl) effectiveRateEl.innerText = `Avg: ₹${result.tariff.effectiveRate} / unit`;

  const bdEnergy = document.getElementById('bdEnergyCharges');
  if (bdEnergy) bdEnergy.innerText = '₹' + result.tariff.energyCharges.toLocaleString('en-IN');

  const bdOther = document.getElementById('bdOtherCharges');
  if (bdOther) bdOther.innerText = '₹' + result.tariff.otherCharges.toLocaleString('en-IN');

  const bdTotal = document.getElementById('bdTotalBill');
  if (bdTotal) bdTotal.innerText = '₹' + result.tariff.totalBill.toLocaleString('en-IN');

  // Update Solar Outputs
  const resBadge = document.getElementById('resStateBadge');
  if (resBadge) resBadge.innerText = `${stateKey} • ${result.tariff.load} kW Load`;

  const calcKw = document.getElementById('calcKwVal');
  if (calcKw) calcKw.innerText = result.recKw + ' kW';

  const calcSubsidy = document.getElementById('calcSubsidyVal');
  if (calcSubsidy) {
    if (propTypeKey === 'residential') {
      calcSubsidy.innerText = '₹' + result.subsidy.toLocaleString('en-IN');
    } else {
      const lang = appState.currentLang;
      calcSubsidy.innerText = lang === 'te' ? 'టాక్స్ లాభాలు' : 'Tax Benefits';
    }
  }

  const calcRoof = document.getElementById('calcRoofVal');
  if (calcRoof) calcRoof.innerText = result.roofArea + ' sq.ft';

  const calcMonthSave = document.getElementById('calcMonthSaveVal');
  if (calcMonthSave) calcMonthSave.innerText = '₹' + result.monthlySavings.toLocaleString('en-IN') + '/mo';

  const solarGenEl = document.getElementById('solarUnitsGenDisplay');
  if (solarGenEl) solarGenEl.innerText = result.solarMonthlyGen + ' units/mo';

  const solarOffsetPctEl = document.getElementById('solarOffsetPct');
  if (solarOffsetPctEl) solarOffsetPctEl.innerText = result.offsetPct + '%';

  const offsetBarEl = document.getElementById('offsetProgressBar');
  if (offsetBarEl) offsetBarEl.style.width = result.offsetPct + '%';

  const calcLifetime = document.getElementById('calcLifetimeVal');
  if (calcLifetime) calcLifetime.innerText = '₹' + result.lifetimeSavings.toLocaleString('en-IN');
}

// Language Switcher Function
function setLanguage(lang) {
  appState.currentLang = lang;
  document.documentElement.lang = lang;
  const dict = I18N[lang];

  // Map elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Update input placeholders
  const nameInput = document.getElementById('formName');
  if (nameInput) nameInput.placeholder = lang === 'te' ? 'మీ పూర్తి పేరు' : 'Full Name';
  const phoneInput = document.getElementById('formPhone');
  if (phoneInput) phoneInput.placeholder = lang === 'te' ? 'మొబైల్ నంబర్ (ఉదా: 9966631599)' : 'Mobile Number (e.g. 9966631599)';
  const townInput = document.getElementById('formTown');
  if (townInput) townInput.placeholder = lang === 'te' ? 'మీ ఊరు / గ్రామం (ఉదా: జమ్మలమడుగు)' : 'Town / Village (e.g. Jammalamadugu)';

  // Update language-dependent logos
  const logoSrc = lang === 'te' ? 'assets/logo_te.jpg' : 'assets/logo_en.jpg';
  const logoAlt = lang === 'te' ? 'ప్రసుధార్క సోలార్ & గ్రీన్ ఎనర్జీ' : 'PraSudhaArka Solar & Green Energy';

  document.querySelectorAll('.lang-logo').forEach(img => {
    img.src = logoSrc;
    img.alt = logoAlt;
  });

  localStorage.setItem('prasudharka_lang', lang);

  // Refresh calculator display
  updateCalculatorUI();
}

// Build WhatsApp Inquiry URL
function openWhatsAppInquiry(targetDealerKey, customDetails) {
  const dealer = DEALERS[targetDealerKey] || DEALERS.sudhakar;
  const lang = appState.currentLang;

  let text = '';
  if (lang === 'te') {
    text = `*నమస్కారం! ప్రసుధార్క సోలార్ విచారణ*\n` +
           `నాకు సోలార్ రూఫ్‌టాప్ ఇన్‌స్టాలేషన్ వివరాలు మరియు ప్రభుత్వ సబ్సిడీ కొటేషన్ కావాలి.\n\n` +
           `👤 *పేరు:* ${customDetails.name || 'వినియోగదారుడు'}\n` +
           `📱 *ఫోన్:* ${customDetails.phone || 'N/A'}\n` +
           `📍 *రాష్ట్రం / ప్రాంతం:* ${appState.selectedState === 'TG' ? 'తెలంగాణ (Telangana)' : 'ఆంధ్రప్రదేశ్ (Andhra Pradesh)'}\n` +
           `⚡ *నెలవారీ వినియోగం:* ${appState.unitsAmount} Units (బిల్లు: ₹${customDetails.bill || appState.billAmount})\n` +
           `☀️ *సిఫార్సు సోలార్ సామర్థ్యం:* ${customDetails.kw || '3'} kW\n` +
           `💰 *ప్రభుత్వ సబ్సిడీ:* ₹${customDetails.subsidy || '78,000'}\n\n` +
           `దయచేసి పూర్తి కొటేషన్ మరియు ఉచిత సైట్ సర్వే వివరాలను తెలియజేయండి.`;
  } else {
    text = `*Hello! Solar Inquiry - Prasudharka Solar*\n` +
           `I am interested in Solar Rooftop installation & PM Surya Ghar Subsidy.\n\n` +
           `👤 *Name:* ${customDetails.name || 'Customer'}\n` +
           `📱 *Phone:* ${customDetails.phone || 'N/A'}\n` +
           `📍 *State / Region:* ${appState.selectedState === 'TG' ? 'Telangana' : 'Andhra Pradesh'}\n` +
           `⚡ *Monthly Consumption:* ${appState.unitsAmount} Units (Bill: ₹${customDetails.bill || appState.billAmount})\n` +
           `☀️ *Recommended Solar:* ${customDetails.kw || '3'} kW\n` +
           `💰 *Govt Subsidy:* ₹${customDetails.subsidy || '78,000'}\n\n` +
           `Please share the detailed quotation and schedule a free site survey.`;
  }

  const encodedText = encodeURIComponent(text);
  const waUrl = `https://wa.me/${dealer.phone.replace(/[^0-9]/g, '')}?text=${encodedText}`;
  window.open(waUrl, '_blank');
}

// DOM Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Global State Defaults
  appState.selectedState = 'AP';
  appState.calcMode = 'units';
  appState.unitsAmount = 300;
  appState.propType = 'residential';
  appState.selectedDealer = 'sudhakar';

  // Load Saved Language Preference or default to Telugu
  const savedLang = localStorage.getItem('prasudharka_lang') || 'te';
  setLanguage(savedLang);

  // Language Toggle Button Event
  const langToggleBtn = document.getElementById('langToggleBtn');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const nextLang = appState.currentLang === 'te' ? 'en' : 'te';
      setLanguage(nextLang);
    });
  }

  // State Selector (AP / TG)
  const btnStateAP = document.getElementById('btnStateAP');
  const btnStateTG = document.getElementById('btnStateTG');
  if (btnStateAP && btnStateTG) {
    btnStateAP.addEventListener('click', () => {
      btnStateAP.classList.add('active');
      btnStateTG.classList.remove('active');
      appState.selectedState = 'AP';
      updateCalculatorUI();
    });
    btnStateTG.addEventListener('click', () => {
      btnStateTG.classList.add('active');
      btnStateAP.classList.remove('active');
      appState.selectedState = 'TG';
      updateCalculatorUI();
    });
  }

  // Mode Tabs (Units / Meter / Bill)
  const tabUnits = document.getElementById('tabUnitsMode');
  const tabMeter = document.getElementById('tabMeterMode');
  const tabBill = document.getElementById('tabBillMode');
  const paneUnits = document.getElementById('paneUnitsMode');
  const paneMeter = document.getElementById('paneMeterMode');
  const paneBill = document.getElementById('paneBillMode');

  function setCalcMode(mode) {
    appState.calcMode = mode;
    [tabUnits, tabMeter, tabBill].forEach(t => t && t.classList.remove('active'));
    [paneUnits, paneMeter, paneBill].forEach(p => p && (p.style.display = 'none'));

    if (mode === 'units') {
      if (tabUnits) tabUnits.classList.add('active');
      if (paneUnits) paneUnits.style.display = 'block';
    } else if (mode === 'meter') {
      if (tabMeter) tabMeter.classList.add('active');
      if (paneMeter) paneMeter.style.display = 'block';
    } else if (mode === 'bill') {
      if (tabBill) tabBill.classList.add('active');
      if (paneBill) paneBill.style.display = 'block';
    }
    updateCalculatorUI();
  }

  if (tabUnits) tabUnits.addEventListener('click', () => setCalcMode('units'));
  if (tabMeter) tabMeter.addEventListener('click', () => setCalcMode('meter'));
  if (tabBill) tabBill.addEventListener('click', () => setCalcMode('bill'));

  // Units Slider & Number Input Sync
  const unitsRange = document.getElementById('unitsRange');
  const unitsNumberInput = document.getElementById('unitsNumberInput');
  if (unitsRange && unitsNumberInput) {
    unitsRange.addEventListener('input', () => {
      unitsNumberInput.value = unitsRange.value;
      updateCalculatorUI();
    });
    unitsNumberInput.addEventListener('input', () => {
      const val = parseInt(unitsNumberInput.value, 10) || 0;
      unitsRange.value = Math.min(1500, val);
      updateCalculatorUI();
    });
  }

  // Meter Readings Input
  const currReading = document.getElementById('currReadingInput');
  const prevReading = document.getElementById('prevReadingInput');
  if (currReading && prevReading) {
    currReading.addEventListener('input', updateCalculatorUI);
    prevReading.addEventListener('input', updateCalculatorUI);
  }

  // Bill Amount Slider
  const billRange = document.getElementById('billRange');
  if (billRange) {
    billRange.addEventListener('input', updateCalculatorUI);
  }

  // Property Type Buttons in Calculator
  document.querySelectorAll('.prop-type-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.prop-type-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      appState.propType = e.currentTarget.getAttribute('data-type');
      updateCalculatorUI();
    });
  });

  // Calculator "Send to WhatsApp" Button
  const btnSendCalcWhatsApp = document.getElementById('btnSendCalcWhatsApp');
  if (btnSendCalcWhatsApp) {
    btnSendCalcWhatsApp.addEventListener('click', () => {
      const plan = calculateSolarPlan(appState.unitsAmount, appState.selectedState, appState.propType);
      openWhatsAppInquiry(appState.selectedDealer, {
        name: 'Website Visitor',
        bill: plan.tariff.totalBill,
        kw: plan.recKw,
        subsidy: plan.subsidy.toLocaleString('en-IN'),
        town: appState.selectedState === 'TG' ? 'Telangana' : 'Andhra Pradesh'
      });
    });
  }

  // Hero Quick Form Submission
  const heroQuickForm = document.getElementById('heroQuickForm');
  if (heroQuickForm) {
    heroQuickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const bill = parseInt(document.getElementById('quickBill').value, 10) || 3000;
      const town = document.getElementById('quickLocation').value || 'Jammalamadugu';
      const prop = document.getElementById('quickPropType').value;
      const units = billToUnits(bill, 'AP', prop);
      const plan = calculateSolarPlan(units, 'AP', prop);

      openWhatsAppInquiry('sudhakar', {
        name: 'Quick Lead',
        bill: bill,
        town: town,
        kw: plan.recKw,
        subsidy: plan.subsidy.toLocaleString('en-IN')
      });
    });
  }

  // Main Contact Form Submission
  const mainContactForm = document.getElementById('mainContactForm');
  if (mainContactForm) {
    mainContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const town = document.getElementById('formTown').value.trim();
      const bill = parseInt(document.getElementById('formBill').value, 10) || 3000;
      const dealer = document.getElementById('formDealerSelect').value || 'sudhakar';
      const units = billToUnits(bill, 'AP', 'residential');
      const plan = calculateSolarPlan(units, 'AP', 'residential');

      openWhatsAppInquiry(dealer, {
        name: name,
        phone: phone,
        town: town,
        bill: bill,
        kw: plan.recKw,
        subsidy: plan.subsidy.toLocaleString('en-IN')
      });
    });
  }

  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // Header Scroll Shadow
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (header) {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // Initial Calculation Run
  updateCalculatorUI();
});

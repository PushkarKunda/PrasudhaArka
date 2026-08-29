/**
 * Official State DISCOM Tariff Slabs & Configuration (AP & Telangana)
 * Matches exact tariff definitions from original static website (APCPDCL / APSPDCL / TSSPDCL)
 */
export const TARIFF_CONFIG = {
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
        { from: 0, to: Infinity, rate: 2.50 }
      ],
      fixedChargeType: 'flat',
      flatAmount: 0,
      meterRent: 30,
      wheelingRate: 0.10,
      facRate: 0.20,
      dutyOn: 'energy_only',
      dutyPercent: 5,
      subsidy: { type: 'none' }
    }
  },
  TS: {
    name: 'Telangana (TSSPDCL / TSNPDCL)',
    badgeName: 'Telangana Tariff (TSSPDCL)',
    residential: {
      // Dynamic telescopic lookup based on consumption tier
      fixedChargeType: 'per_kw',
      ratePerKw: 10,
      meterRent: 40,
      dutyOn: 'energy_only',
      dutyPercent: 6
    },
    commercial: {
      fixedChargeType: 'per_kw',
      ratePerKw: 70,
      meterRent: 70,
      dutyOn: 'energy_only',
      dutyPercent: 8
    },
    farm: {
      slabs: [
        { from: 0, to: Infinity, rate: 2.50 }
      ],
      fixedChargeType: 'flat',
      flatAmount: 0,
      meterRent: 30,
      dutyOn: 'energy_only',
      dutyPercent: 5
    }
  }
};

/**
 * Compute DISCOM electricity bill breakdown matching exact original logic
 */
export function computeDiscomTariff(units = 300, stateKey = 'AP', propTypeKey = 'residential', customLoad = null) {
  const safeUnits = Math.max(0, Number(units) || 0);
  const load = customLoad !== null ? customLoad : Math.max(1, Math.ceil(safeUnits / 150));

  let config;
  if (stateKey === 'AP') {
    config = TARIFF_CONFIG.AP[propTypeKey] || TARIFF_CONFIG.AP.residential;
  } else {
    // Telangana (TSSPDCL) Tariff Tier Rules
    if (propTypeKey === 'residential') {
      if (safeUnits <= 100) {
        // LT-I(A) Domestic (≤100 u)
        config = {
          slabs: [
            { from: 0, to: 50, rate: 1.95 },
            { from: 50, to: 100, rate: 3.10 }
          ],
          fixedChargeType: 'per_kw',
          ratePerKw: 10,
          meterRent: 40,
          dutyOn: 'energy_only',
          dutyPercent: 6,
          tierName: 'LT-I(A) Domestic (≤100 u)'
        };
      } else if (safeUnits <= 200) {
        // LT-I(B) Domestic (101 to 200 Units/Month)
        config = {
          slabs: [
            { from: 0, to: 100, rate: 3.40 },
            { from: 100, to: 200, rate: 4.80 }
          ],
          fixedChargeType: 'per_kw',
          ratePerKw: 10,
          meterRent: 40,
          dutyOn: 'energy_only',
          dutyPercent: 6,
          tierName: 'LT-I(B) Domestic (101-200 u)'
        };
      } else {
        // LT-I(C) Domestic (Above 200 Units/Month)
        config = {
          slabs: [
            { from: 0, to: 200, rate: 5.10 },
            { from: 200, to: 300, rate: 7.70 },
            { from: 300, to: 400, rate: 9.00 },
            { from: 400, to: 800, rate: 9.50 },
            { from: 800, to: Infinity, rate: 10.00 }
          ],
          fixedChargeType: 'per_kw',
          ratePerKw: 10,
          meterRent: 40,
          dutyOn: 'energy_only',
          dutyPercent: 6,
          tierName: 'LT-I(C) Domestic (>200 u)'
        };
      }
    } else if (propTypeKey === 'commercial') {
      if (safeUnits <= 50) {
        config = {
          slabs: [
            { from: 0, to: Infinity, rate: 7.00 }
          ],
          fixedChargeType: 'per_kw',
          ratePerKw: 30,
          meterRent: 70,
          dutyOn: 'energy_only',
          dutyPercent: 8,
          tierName: 'LT-II(A) Commercial (≤50 u)'
        };
      } else {
        config = {
          slabs: [
            { from: 0, to: 100, rate: 8.50 },
            { from: 100, to: 300, rate: 9.90 },
            { from: 300, to: 500, rate: 10.40 },
            { from: 500, to: Infinity, rate: 11.00 }
          ],
          fixedChargeType: 'per_kw',
          ratePerKw: 70,
          meterRent: 70,
          dutyOn: 'energy_only',
          dutyPercent: 8,
          tierName: 'LT-II(B) Commercial (>50 u)'
        };
      }
    } else {
      config = {
        slabs: [
          { from: 0, to: Infinity, rate: 2.50 }
        ],
        fixedChargeType: 'flat',
        flatAmount: 0,
        meterRent: 30,
        dutyOn: 'energy_only',
        dutyPercent: 5,
        tierName: 'LT-V Agriculture'
      };
    }
  }

  // 1. Energy Charges = Σ (Units in Slab_i × Rate_i)
  let remainingUnits = safeUnits;
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

  // 4. Electricity Duty (6% for Domestic, 8% for Commercial)
  let dutyBase = energyCharges;
  if (config.dutyOn === 'energy_plus_fixed') {
    dutyBase = energyCharges + fixedCharge;
  }
  const electricityDuty = (dutyBase * (config.dutyPercent || 6)) / 100;

  // 5. Total DISCOM Bill
  const subtotal = energyCharges + fixedCharge + meterRent + electricityDuty;
  const totalBill = Math.max(0, Math.round(subtotal));

  // 6. Effective Per-Unit Rate
  const effectiveRate = safeUnits > 0 ? (totalBill / safeUnits).toFixed(2) : '0.00';

  return {
    units: safeUnits,
    energyCharges: Math.round(energyCharges),
    fixedCharge: Math.round(fixedCharge),
    otherCharges: Math.round(fixedCharge + meterRent + electricityDuty),
    meterRent,
    electricityDuty: Math.round(electricityDuty),
    subtotal: Math.round(subtotal),
    totalBill,
    effectiveRate,
    slabBreakdown,
    tierName: config.tierName || '',
    load
  };
}

/**
 * Backward compatibility alias for calculateElectricityBill
 */
export const calculateElectricityBill = ({
  state = 'AP',
  units = 300,
  propType = 'residential'
}) => {
  return computeDiscomTariff(units, state, propType);
};

/**
 * Convert Bill to approximate Units (reverse lookup matching original binary search)
 */
export function billToUnits(targetBill, stateKey = 'AP', propTypeKey = 'residential') {
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

/**
 * Official System Configurations Reference (DCR vs NON-DCR)
 */
export const SYSTEM_CONFIG_DATA = {
  dcr: {
    1: { unitCost: 85000, subsidy: 30000, maxLoan: 60000, estEmi: 750, powerGenDay: 5, space: '8 x 10 Feet (Approx)', sqft: 80 },
    2: { unitCost: 160000, subsidy: 60000, maxLoan: 124000, estEmi: 1450, powerGenDay: 10, space: '8 x 16 Feet', sqft: 128 },
    3: { unitCost: 220000, subsidy: 78000, maxLoan: 189000, estEmi: 2200, powerGenDay: 15, space: '12 x 16 Feet', sqft: 192 },
    4: { unitCost: 280000, subsidy: 78000, maxLoan: 245000, estEmi: 2950, powerGenDay: 20, space: '16 x 16 Feet', sqft: 256 },
    5: { unitCost: 335000, subsidy: 78000, maxLoan: 301500, estEmi: 3800, powerGenDay: 25, space: '20 x 16 Feet', sqft: 320 }
  },
  nondcr: {
    1: { unitCost: 72000, subsidy: 0, maxLoan: 60000, estEmi: 750, powerGenDay: 5, space: '8 x 10 Feet (Approx)', sqft: 80 },
    2: { unitCost: 135000, subsidy: 0, maxLoan: 115000, estEmi: 1350, powerGenDay: 10, space: '8 x 16 Feet', sqft: 128 },
    3: { unitCost: 185000, subsidy: 0, maxLoan: 155000, estEmi: 1850, powerGenDay: 15, space: '12 x 16 Feet', sqft: 192 },
    4: { unitCost: 240000, subsidy: 0, maxLoan: 205000, estEmi: 2450, powerGenDay: 20, space: '16 x 16 Feet', sqft: 256 },
    5: { unitCost: 285000, subsidy: 0, maxLoan: 250000, estEmi: 3150, powerGenDay: 25, space: '20 x 16 Feet', sqft: 320 }
  }
};

/**
 * Solar rooftop sizing, subsidy, space, and savings calculation matching original calculateSolarPlan
 */
export function calculateSolarPlan(units = 300, stateKey = 'AP', propTypeKey = 'residential', panelTypeKey = 'dcr') {
  const safeUnits = Math.max(1, Number(units) || 1);
  const tariff = computeDiscomTariff(safeUnits, stateKey, propTypeKey);
  
  // Sizing aligned with System Configurations (1 kW = 5 units/day = 150 units/mo)
  let recKw = 3;
  if (safeUnits <= 180) {
    recKw = 1;
  } else if (safeUnits <= 360) {
    recKw = 2;
  } else if (safeUnits <= 520) {
    recKw = 3;
  } else if (safeUnits <= 680) {
    recKw = 4;
  } else if (safeUnits <= 850) {
    recKw = 5;
  } else {
    recKw = Math.min(25, Math.ceil(safeUnits / 150));
  }

  if (propTypeKey === 'commercial') {
    recKw = Math.max(2, Math.min(30, Math.ceil(safeUnits / 140)));
  } else if (propTypeKey === 'farm') {
    recKw = Math.max(3, Math.min(50, Math.ceil(safeUnits / 130)));
  }

  const powerGenDay = recKw * 5;
  const solarMonthlyGen = powerGenDay * 30;
  const offsetPct = Math.min(100, Math.round((solarMonthlyGen / Math.max(1, safeUnits)) * 100));

  const isDcr = (panelTypeKey === 'dcr');
  const isResidentialCat1 = (propTypeKey === 'residential');
  const isSubsidyEligible = isResidentialCat1 && isDcr;

  const dataset = isDcr ? SYSTEM_CONFIG_DATA.dcr : SYSTEM_CONFIG_DATA.nondcr;

  // Specifications matching the official System Configurations section
  let unitCost, subsidy, maxLoan, estEmi, spaceDisplay, sqft;
  if (dataset[recKw]) {
    const cfg = dataset[recKw];
    unitCost = cfg.unitCost;
    subsidy = isSubsidyEligible ? cfg.subsidy : 0;
    maxLoan = cfg.maxLoan;
    estEmi = cfg.estEmi;
    spaceDisplay = cfg.space;
    sqft = cfg.sqft;
  } else {
    unitCost = isDcr ? Math.round(recKw * 67000) : Math.round(recKw * 57000);
    subsidy = isSubsidyEligible ? 78000 : 0;
    maxLoan = Math.round(unitCost * 0.9);
    estEmi = Math.round(maxLoan * 0.0126);
    spaceDisplay = (recKw * 4) + ' x 16 Feet';
    sqft = recKw * 64;
  }

  // Net investment
  const netInvestment = Math.max(0, unitCost - subsidy);

  // Net Metering: Remaining Grid Units after solar offset
  const netGridUnits = Math.max(0, safeUnits - solarMonthlyGen);
  const netBillWithSolar = computeDiscomTariff(netGridUnits, stateKey, propTypeKey, tariff.load).totalBill;

  // Monthly Savings & ROI
  const monthlySavings = Math.max(0, tariff.totalBill - netBillWithSolar);
  const annualSavings = monthlySavings * 12;
  const lifetimeSavings = annualSavings * 25;
  const paybackYears = monthlySavings > 0 ? (netInvestment / annualSavings).toFixed(1) : '3.5';

  return {
    units: safeUnits,
    effectiveUnits: safeUnits,
    tariff,
    recommendedKW: recKw,
    recKw,
    powerGenDay,
    solarMonthlyGen,
    offsetPct,
    subsidy,
    isSubsidyEligible,
    isDcr,
    unitCost,
    grossCost: unitCost,
    netInvestment,
    maxLoan,
    estEmi,
    spaceDisplay,
    roofSpaceSqFt: sqft,
    sqft,
    netBillWithSolar,
    monthlySavings,
    annualSavings,
    lifetimeSavings,
    paybackYears
  };
}

/**
 * Backward compatibility alias for calculateSolarSpecs
 */
export const calculateSolarSpecs = ({
  units = 300,
  billAmount = 3000,
  calcMode = 'units',
  state = 'AP',
  propType = 'residential',
  panelType = 'dcr'
}) => {
  let effectiveUnits = Number(units) || 300;
  if (calcMode === 'bill') {
    effectiveUnits = billToUnits(Number(billAmount) || 3000, state, propType);
  }
  return calculateSolarPlan(effectiveUnits, state, propType, panelType);
};

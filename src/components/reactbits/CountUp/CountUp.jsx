import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export const CountUp = ({
  to,
  from = 0,
  value, // alternative raw string like "₹78,000" or "25 Years"
  duration = 1.6,
  separator = ',',
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Parse if a string with prefix/suffix was passed
  let targetNumber = to;
  let detectedPrefix = prefix;
  let detectedSuffix = suffix;
  let detectedDecimals = decimals;

  if (value !== undefined && value !== null) {
    const str = String(value);
    const match = str.match(/^([^\d]*)([\d,.]+)(.*)$/);
    if (match) {
      detectedPrefix = prefix || match[1];
      const numClean = match[2].replace(/,/g, '');
      targetNumber = parseFloat(numClean) || 0;
      detectedSuffix = suffix || match[3];
      if (match[2].includes('.')) {
        detectedDecimals = match[2].split('.')[1].length;
      }
    } else {
      targetNumber = parseFloat(str) || 0;
    }
  }

  const [currentVal, setCurrentVal] = useState(from);

  useEffect(() => {
    if (!isInView) return;
    let startTime = null;
    let frameId;
    const startNum = from;
    const endNum = targetNumber ?? 0;

    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easedProgress = easeOutExpo(progress);
      const current = startNum + (endNum - startNum) * easedProgress;
      setCurrentVal(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCurrentVal(endNum);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, targetNumber, from, duration]);

  // Format number
  const formattedNumber = (() => {
    const fixed = Number(currentVal).toFixed(detectedDecimals);
    const [intPart, decPart] = fixed.split('.');
    const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return decPart !== undefined ? `${withCommas}.${decPart}` : withCommas;
  })();

  return (
    <span ref={ref} className={`countup-number ${className}`}>
      {detectedPrefix}
      {formattedNumber}
      {detectedSuffix}
    </span>
  );
};

export default CountUp;

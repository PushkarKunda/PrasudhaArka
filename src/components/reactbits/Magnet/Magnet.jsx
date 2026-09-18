import { useRef, useState, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';

export const Magnet = ({
  children,
  padding = 30,
  disabled = false,
  magnetStrength = 0.35,
  springConfig = { damping: 18, stiffness: 180, mass: 0.2 },
  className = '',
  ...props
}) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = useCallback((e) => {
    if (disabled || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    x.set(distanceX * magnetStrength);
    y.set(distanceY * magnetStrength);
  }, [disabled, magnetStrength, x, y]);

  const handleMouseEnter = useCallback(() => {
    if (disabled) return;
    setIsHovered(true);
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`magnet-wrapper ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Magnet;

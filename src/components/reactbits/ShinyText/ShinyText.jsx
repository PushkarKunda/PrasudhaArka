import React from 'react';
import './ShinyText.css';

export const ShinyText = ({
  text,
  children,
  disabled = false,
  speed = 4,
  variant = 'gold', // 'gold' | 'white' | 'cyan' | 'emerald'
  className = '',
  ...props
}) => {
  const content = text || children;
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`shiny-text shiny-${variant} ${disabled ? 'shiny-disabled' : 'shiny-animated'} ${className}`}
      style={{ animationDuration }}
      {...props}
    >
      {content}
    </span>
  );
};

export default ShinyText;

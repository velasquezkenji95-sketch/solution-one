import React from 'react';
import logoImg from '../assets/Solution 1 Logo.png';

export const Logo: React.FC<{ className?: string; darkBackground?: boolean }> = ({
  className = '',
  darkBackground = true,
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <img
        src={logoImg}
        alt="Solution One - International Payment Provider"
        className={`h-8 w-auto object-contain transition-all sm:h-10 ${darkBackground ? 'brightness-0 invert' : ''}`}
      />
    </div>
  );
};

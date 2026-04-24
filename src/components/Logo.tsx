import React from 'react';
import logooo from '../assets/branding/logooo.jpeg';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'gold';
}

export default function Logo({ className = "", variant = 'light' }: LogoProps) {
  const variantClass = variant === 'dark'
    ? 'brightness-90'
    : variant === 'gold'
      ? 'sepia-[0.3] saturate-[1.2]'
      : '';
  
  return (
    <div className={`relative ${className}`}>
       <img 
         src={logooo} 
         alt="Asian Chocolate Store" 
         className={`w-full h-full object-contain filter drop-shadow-lg ${variantClass}`}
       />
    </div>
  );
}

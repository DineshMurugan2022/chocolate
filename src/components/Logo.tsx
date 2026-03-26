import React from 'react';
import logooo from '../assets/branding/logooo.png';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'gold';
}

export default function Logo({ className = "", variant = 'light' }: LogoProps) {
  // Since we are using a direct image provided by the user, we will ignore the variant
  // and prioritize the official brand logo (logooo.png).
  
  return (
    <div className={`relative ${className}`}>
       <img 
         src={logooo} 
         alt="Asian Chocolate Store" 
         className="w-full h-full object-contain filter drop-shadow-lg"
       />
    </div>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import logooo from '../assets/branding/logooo.png';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'gold' | 'celestial';
  showText?: boolean;
}

export default function Logo({
  className = "",
  variant = 'light',
  showText = true
}: LogoProps) {
  const navigate = useNavigate();

  const getVariantStyles = () => {
    switch (variant) {
      case 'dark':
        return {
          img: 'brightness-110 contrast-110 drop-shadow-[0_4px_20px_rgba(26,15,13,0.15)]',
          text: 'text-cocoa-deep',
          accent: 'bg-burnt-caramel'
        };
      case 'gold':
        return {
          img: 'sepia-[0.2] saturate-[1.5] brightness-125 contrast-110 drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)]',
          text: 'text-gold-soft',
          accent: 'bg-gold-soft'
        };
      case 'celestial':
        return {
          img: 'invert brightness-200 drop-shadow-[0_0_20px_rgba(0,245,255,0.4)]',
          text: 'text-aurora-cyan',
          accent: 'bg-aurora-cyan shadow-[0_0_10px_rgba(0,245,255,0.8)]'
        };
      case 'white':
        return {
          img: 'brightness-0 invert drop-shadow-[0_4px_12px_rgba(255,255,255,0.3)]',
          text: 'text-white',
          accent: 'bg-white'
        };
      default: // light (for dark backgrounds)
        return {
          img: 'brightness-110 contrast-110 drop-shadow-[0_8px_24px_rgba(255,255,255,0.2)]',
          text: 'text-ivory-warm',
          accent: 'bg-gold-soft'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div
      onClick={() => navigate('/')}
      className={`flex items-center gap-4 md:gap-6 cursor-pointer group select-none ${className}`}
    >
      <div className="relative flex-shrink-0">
        <div className={`absolute inset-0 blur-3xl opacity-10 group-hover:opacity-30 transition-opacity duration-700 ${styles.accent}`} />
        <img
          src={logooo}
          alt="British Chocolate Store Logo"
          className={`w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain transition-all duration-700 group-hover:scale-110 group-hover:rotate-[5deg] ${styles.img}`}
        />
      </div>


      {showText && (
        <div className="flex flex-col leading-[0.8] items-start">
          <span className={`font-display text-lg md:text-2xl lg:text-3xl font-black tracking-[0.1em] uppercase italic transition-all duration-700 group-hover:tracking-[0.15em] ${styles.text}`}>
            British
          </span>
          <span className={`font-display text-lg md:text-2xl lg:text-3xl font-black tracking-[0.1em] uppercase italic transition-all duration-700 group-hover:tracking-[0.15em] ${variant === 'celestial' ? 'text-white' : 'text-gold-soft'}`}>
            Chocolate
          </span>
          <span className={`font-display text-lg md:text-2xl lg:text-3xl font-black tracking-[0.1em] uppercase italic transition-all duration-700 group-hover:tracking-[0.15em] ${variant === 'celestial' ? 'text-white' : 'text-gold-soft'}`}>
            Store
          </span>
          <div className="h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-out mt-2 bg-gradient-to-r from-transparent via-gold-soft to-transparent opacity-50" />
        </div>
      )}

    </div>
  );
}


import React from 'react';
import wash from '@/assets/baby-watercolor-wash.jpg';
import rainbow from '@/assets/baby-watercolor-rainbow-cutout.png';

interface BabyHeaderArtProps {
  styleKey: 'babyMoon' | 'babyWash' | 'babyMinimal' | 'babyRainbow';
  height: string | number;
  className?: string;
  headlineFont?: string;
  subtext?: string;
}

export function BabyHeaderArt({ styleKey, height, className = '', headlineFont, subtext }: BabyHeaderArtProps) {
  const styleClass = { babyMoon: 'baby-header--babyMoon', babyWash: 'baby-header--babyWash', babyMinimal: 'baby-header--babyMinimal', babyRainbow: 'baby-header--babyRainbow' }[styleKey];
  const line = subtext || 'Baby Lily · March 3, 2027';
  const name = line.split(' · ')[0].replace(/^Baby\s+/i, '');
  const title = styleKey === 'babyMinimal' ? name : styleKey === 'babyMoon' ? 'Welcome, Little Star' : styleKey === 'babyRainbow' ? 'Hello, Little Wonder' : 'Welcome, Little One';
  return (
    <div className={`baby-header ${styleClass} ${className}`} style={{ height }}>
      {styleKey === 'babyWash' && <img src={wash} width={1200} height={800} loading="lazy" alt="" className="baby-wash-art" aria-hidden="true" />}
      {styleKey === 'babyRainbow' && <img src={rainbow} width={1086} height={549} loading="lazy" alt="" className="baby-rainbow-art" aria-hidden="true" />}
      {styleKey === 'babyMoon' && (
        <svg className="baby-moon-art" viewBox="0 0 220 85" fill="none" aria-hidden="true">
          <path d="M119 7C97 5 84 19 86 37C88 56 107 68 126 58C109 58 99 47 99 33C99 22 106 12 119 7Z" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
            <path d="M53 20l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" />
            <path d="M162 11l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" />
            <path d="M181 49l2 7 7 2-7 2-2 7-2-7-7-2 7-2Z" />
            <path d="M34 53l2 4 4 2-4 2-2 4-2-4-4-2 4-2Z" />
          </g>
        </svg>
      )}
      {styleKey === 'babyMinimal' && (
        <div className="baby-minimal-crest" aria-hidden="true">
          <svg className="baby-minimal-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c.9 6.6 5.4 11.1 12 12-6.6.9-11.1 5.4-12 12-.9-6.6-5.4-11.1-12-12C6.6 11.1 11.1 6.6 12 0Z" /></svg>
          <span className="baby-minimal-initial">{name.charAt(0).toUpperCase()}</span>
        </div>
      )}
      <div className="baby-header-copy">
        {styleKey === 'babyMinimal' && <div className="baby-minimal-arch" aria-hidden="true" />}
        <span className={`baby-header-title${styleKey === 'babyMinimal' ? ' baby-header-name' : ''}`} style={headlineFont ? { fontFamily: headlineFont } : undefined}>{title}</span>
        <span className="baby-header-details">{line}</span>
      </div>
    </div>
  );
}
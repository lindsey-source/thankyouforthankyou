import React from 'react';
import type { Swatch } from '@/lib/cardPalettes';
import wash from '@/assets/baby-watercolor-wash.jpg';
import rainbow from '@/assets/baby-watercolor-rainbow-cutout.png';
import moon from '@/assets/stationery-baby-moon.png';
import { resolveBabyDetails } from '@/lib/babyDetails';

interface BabyHeaderArtProps {
  styleKey: 'babyMoon' | 'babyWash' | 'babyMinimal' | 'babyRainbow';
  height: string | number;
  className?: string;
  headlineFont?: string;
  subtext?: string;
  swatch?: Swatch;
}

export function BabyHeaderArt({ styleKey, height, className = '', headlineFont, subtext, swatch }: BabyHeaderArtProps) {
  const styleClass = { babyMoon: 'baby-header--babyMoon', babyWash: 'baby-header--babyWash', babyMinimal: 'baby-header--babyMinimal', babyRainbow: 'baby-header--babyRainbow' }[styleKey];
  const line = subtext || 'Baby Lily · March 3, 2027';
  const name = line.split(' · ')[0].replace(/^Baby\s+/i, '');
  const details = resolveBabyDetails({ babyName: name });
  const title = details.headline;
  return (
    <div className={`baby-header ${styleClass} ${className}`} style={{ height, ...(swatch ? { background: swatch.bg, color: swatch.ink, ['--swatch-accent' as string]: swatch.accent } : {}) }}>
      {styleKey === 'babyWash' && <img src={wash} width={1200} height={800} loading="lazy" alt="" className="baby-wash-art" aria-hidden="true" />}
      {styleKey === 'babyRainbow' && <img src={rainbow} width={1086} height={549} loading="lazy" alt="" className="baby-rainbow-art" aria-hidden="true" />}
      {styleKey === 'babyMoon' && (
        <img src={moon} alt="" aria-hidden="true" width={1152} height={576} loading="lazy" className="baby-moon-art" />
      )}
      {styleKey === 'babyMinimal' && (
        <div className="baby-minimal-crest" aria-hidden="true">
          <svg className="baby-minimal-star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c.9 6.6 5.4 11.1 12 12-6.6.9-11.1 5.4-12 12-.9-6.6-5.4-11.1-12-12C6.6 11.1 11.1 6.6 12 0Z" /></svg>
          <span className="baby-minimal-initial">{name.charAt(0).toUpperCase()}</span>
        </div>
      )}
      <div className="baby-header-copy">
        {styleKey === 'babyMinimal' && <div className="baby-minimal-arch" aria-hidden="true" />}
        <span className="baby-header-title" style={headlineFont ? { fontFamily: headlineFont } : undefined}>{title}</span>
        <span className="baby-header-from">{details.fromLine}</span>
        <span className="baby-header-details">{line.split(' · ').slice(1).join(' · ')}</span>
      </div>
    </div>
  );
}
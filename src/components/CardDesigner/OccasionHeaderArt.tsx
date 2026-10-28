import React from 'react';
import cap from '@/assets/grad-watercolor-cap.png';
import balloons from '@/assets/bday-watercolor-balloons.png';
import bloom from '@/assets/mitzvah-watercolor-bloom.png';
import ferns from '@/assets/general-pressed-ferns.png';
import seedlings from '@/assets/charity-watercolor-seedlings.png';
import sunrise from '@/assets/charity-watercolor-sunrise.jpg';
import type { OccasionStyleKey } from './occasionStyles';

/* Design-led palette for these headers (artwork, not accent-driven). */
const GOLD = '#c8a464';
const CREAM = '#f6efe3';
const INK = '#2d2420';

interface Props {
  styleKey: OccasionStyleKey;
  headline: string;
  subtext?: string;
  height: string | number;
  className?: string;
  headlineFont?: string;
  photoUrl?: string | null;
}

type Look = { chip?: string; bg: string; ink: string; art?: React.ReactNode; title?: React.ReactNode; justify?: 'center' | 'flex-end' | 'flex-start'; pad?: string };

const caps: React.CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif", fontSize: 10, letterSpacing: '0.22em',
  textTransform: 'uppercase', opacity: 0.88, marginTop: 8, lineHeight: 1.6,
};
const abs: React.CSSProperties = { position: 'absolute', pointerEvents: 'none' };
const img = (src: string, style: React.CSSProperties, w = 1024, h = 768) => (
  <img src={src} alt="" aria-hidden="true" width={w} height={h} loading="lazy" style={{ ...abs, objectFit: 'contain', ...style }} />
);

const star = (cx: number, cy: number, r: number) =>
  `M${cx} ${cy - r}l${r * 0.25} ${r * 0.75} ${r * 0.75} ${r * 0.25} -${r * 0.75} ${r * 0.25} -${r * 0.25} ${r * 0.75} -${r * 0.25} -${r * 0.75} -${r * 0.75} -${r * 0.25} ${r * 0.75} -${r * 0.25}Z`;

function lookFor(key: OccasionStyleKey, p: { subtext: string; first: string; photoUrl?: string | null; font: React.CSSProperties; headline: string }): Look {
  const year = p.subtext.match(/class of\s*(\S+)/i)?.[1] || '2027';
  const age = p.subtext.match(/turns\s+(\S+)/i)?.[1] || '7';
  const initials = p.first.split(/[\s&]+/).filter(Boolean).map((w) => w[0]?.toUpperCase()).slice(0, 2).join('');
  switch (key) {
    case 'goldClass':
      return {
        bg: '#1d2a44', ink: CREAM,
        art: (
          <svg viewBox="0 0 200 120" preserveAspectRatio="none" style={{ ...abs, inset: 10, width: 'calc(100% - 20px)', height: 'calc(100% - 20px)' }} fill="none">
            <path d="M100 4L196 60L100 116L4 60Z" stroke={GOLD} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
            <path d="M100 12L184 60L100 108L16 60Z" stroke={GOLD} strokeWidth="0.5" opacity="0.6" vectorEffect="non-scaling-stroke" />
          </svg>
        ),
        title: (
          <>
            <span style={{ ...caps, marginTop: 0, color: GOLD }}>{p.headline}</span>
            <span style={{ ...p.font, fontSize: 34, color: CREAM, lineHeight: 1.1, marginTop: 4 }}>Class of {year}</span>
          </>
        ),
      };
    case 'capTassel':
      return { bg: '#faf6ee', ink: INK, justify: 'flex-end', pad: '0 24px 18px', art: img(cap, { top: 10, left: '50%', transform: 'translateX(-50%)', width: '42%', height: '50%' }) };
    case 'boldType':
      return {
        bg: '#f1e6d6', ink: '#1f2b3d',
        art: (
          <>
            <div style={{ ...abs, left: 0, top: 0, bottom: 0, width: '38%', background: '#2f4a6b' }} />
            <div style={{ ...abs, right: 0, top: 0, height: '34%', width: '62%', background: '#d9b25f' }} />
          </>
        ),
        chip: '#f1e6d6', title: <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 38, lineHeight: 0.95, letterSpacing: '-0.02em', color: '#1f2b3d', textTransform: 'uppercase' }}>{p.headline}</span>,
      };
    case 'laurelCrest':
      return {
        bg: '#faf6ee', ink: INK,
        title: (
          <>
            <div style={{ position: 'relative', width: 78, height: 78, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 6 }}>
              <svg viewBox="0 0 80 80" style={{ ...abs, inset: 0 }} fill="none" stroke={GOLD} strokeWidth="1">
                <path d="M40 72C20 70 8 54 10 34" /><path d="M40 72C60 70 72 54 70 34" />
                {[0, 1, 2, 3, 4].map((i) => {
                  const a = (Math.PI / 180) * (110 + i * 22);
                  const x = 40 + 31 * Math.cos(a), y = 40 + 31 * Math.sin(a);
                  return <g key={i}><ellipse cx={x} cy={y} rx="5" ry="2.2" transform={`rotate(${110 + i * 22 + 60} ${x} ${y})`} /><ellipse cx={80 - x} cy={y} rx="5" ry="2.2" transform={`rotate(${-(110 + i * 22 + 60)} ${80 - x} ${y})`} /></g>;
                })}
              </svg>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, letterSpacing: '0.1em', color: INK }}>{initials || 'M'}</span>
            </div>
            <span style={{ ...p.font, fontSize: 24, color: INK }}>{p.headline}</span>
          </>
        ),
      };
    case 'goldenNumber':
      return {
        bg: '#f8f1e4', ink: INK,
        art: (
          <svg viewBox="0 0 200 140" style={{ ...abs, top: '50%', left: '50%', width: '72%', maxWidth: 260, transform: 'translate(-50%,-54%)' }} fill="none">
            {/* Thin gold arch framing the numeral */}
            <path d="M30 140V70a70 70 0 0 1 140 0v70" stroke={GOLD} strokeWidth="1" />
            <path d="M38 140V72a62 62 0 0 1 124 0v68" stroke={GOLD} strokeWidth="0.5" opacity="0.55" />
            {/* Tiny gold confetti */}
            {[[18, 30], [42, 12], [160, 16], [184, 34], [12, 74], [190, 78], [30, 108], [172, 104]].map(([x, y], i) => (
              <g key={i}>{i % 2 ? <circle cx={x} cy={y} r="1.6" fill={GOLD} /> : <rect x={x - 1.4} y={y - 1.4} width="2.8" height="2.8" fill={GOLD} transform={`rotate(45 ${x} ${y})`} />}</g>
            ))}
          </svg>
        ),
        title: (
          <>
            <svg viewBox="0 0 120 104" style={{ width: 104, height: 'auto', display: 'block' }} aria-hidden="true">
              <defs>
                <linearGradient id="bdayGoldNum" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#f0dca6" />
                  <stop offset="0.38" stopColor={GOLD} />
                  <stop offset="0.62" stopColor="#8f6d2e" />
                  <stop offset="0.88" stopColor="#e3c87f" />
                  <stop offset="1" stopColor="#b08d42" />
                </linearGradient>
              </defs>
              <text x="60" y="88" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontSize="100" fill="url(#bdayGoldNum)">{age}</text>
            </svg>
            <span style={{ ...p.font, fontSize: 22, color: INK, marginTop: 4 }}>{p.headline}</span>
          </>
        ),
      };
    case 'balloons':
      return {
        bg: '#faf5ec', ink: INK, justify: 'flex-end', pad: '0 24px 18px',
        art: (
          <>
            {/* Soft bunting along the top */}
            <svg viewBox="0 0 200 26" preserveAspectRatio="none" style={{ ...abs, top: 0, left: 0, width: '100%', height: 22 }}>
              <path d="M0 2Q50 14 100 8T200 4" fill="none" stroke="#d8c09a" strokeWidth="0.7" />
              {Array.from({ length: 9 }).map((_, i) => {
                const x = 10 + i * 22.5;
                const y = 3.4 + Math.sin((i / 8) * Math.PI) * 6.5;
                return <path key={i} d={`M${x - 6} ${y}L${x + 6} ${y}L${x} ${y + 11}Z`} fill={['#e8b7c0', '#a9c2a4', '#e5cf9a'][i % 3]} opacity="0.75" />;
              })}
            </svg>
            {img(balloons, { top: 18, left: '50%', transform: 'translateX(-50%)', width: '55%', height: '56%' })}
          </>
        ),
      };
    case 'champagne':
      return {
        bg: '#3e2236', ink: CREAM,
        art: (
          <svg viewBox="0 0 120 92" style={{ ...abs, top: 4, left: '50%', transform: 'translateX(-50%)', width: 132 }} fill="none" stroke={GOLD} strokeWidth="1.1" strokeLinecap="round">
            {/* Left flute, tilted in */}
            <g transform="rotate(-12 44 46)">
              <path d="M36 8h16l-2.5 26c-.8 7-4.5 10-5.5 10s-4.7-3-5.5-10Z" />
              <path d="M37.5 20h13" opacity="0.7" />
              <path d="M44 44v30" /><path d="M36 76h16" />
              {[40, 44, 48].map((x, i) => <circle key={i} cx={x} cy={26 + i * 4} r="0.9" fill={GOLD} stroke="none" opacity="0.85" />)}
            </g>
            {/* Right flute, tilted in */}
            <g transform="rotate(12 76 46)">
              <path d="M68 8h16l-2.5 26c-.8 7-4.5 10-5.5 10s-4.7-3-5.5-10Z" />
              <path d="M69.5 20h13" opacity="0.7" />
              <path d="M76 44v30" /><path d="M68 76h16" />
              {[72, 76, 80].map((x, i) => <circle key={i} cx={x} cy={24 + i * 5} r="0.9" fill={GOLD} stroke="none" opacity="0.85" />)}
            </g>
            {/* Rising bubbles where the flutes meet */}
            {[[58, 12, 1.4], [62, 20, 1], [56, 26, 0.8], [64, 6, 0.9], [54, 4, 0.7]].map(([x, y, r], i) => (
              <circle key={i} cx={x} cy={y} r={r} stroke={GOLD} strokeWidth="0.6" opacity="0.8" />
            ))}
          </svg>
        ),
        justify: 'flex-end', pad: '0 24px 20px',
      };
    case 'colorBlock':
      return {
        bg: '#f4e9dc', ink: '#2a2440',
        art: (
          <svg viewBox="0 0 200 120" style={{ ...abs, inset: 0, width: '100%', height: '100%' }}>
            {/* Matte shapes tucked into the outer corners — clear of all text */}
            <path d="M12 108V90a18 18 0 0 1 36 0v18a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4Z" fill="#e7a07d" />
            <path d="M21 108V97a9 9 0 0 1 18 0v11a2 2 0 0 1-2 2H23a2 2 0 0 1-2-2Z" fill="#f4e9dc" />
            <path d="M158 108V92a16 16 0 0 1 32 0v16a4 4 0 0 1-4 4h-24a4 4 0 0 1-4-4Z" fill="#3e5873" />
            <circle cx="22" cy="20" r="10" fill="#7d9d8a" />
            <circle cx="180" cy="20" r="8" fill="#e3b85b" />
            <circle cx="192" cy="62" r="4" fill="#e7a07d" />
          </svg>
        ),
      };
    case 'boldStar':
      return {
        bg: '#1b2a4a', ink: CREAM,
        art: (
          <svg viewBox="0 0 100 100" style={{ ...abs, top: '50%', left: '50%', width: '78%', maxWidth: 230, transform: 'translate(-50%,-50%)' }}>
            {[1, 0.72, 0.46].map((s, i) => (
              <g key={i} transform={`translate(50 50) scale(${s}) translate(-50 -50)`} fill={['#24365c', '#2d4370', '#36508a'][i]}>
                <path d="M50 4L90 73H10Z" /><path d="M50 96L10 27H90Z" />
              </g>
            ))}
          </svg>
        ),
      };
    case 'tallit':
      return {
        bg: '#ffffff', ink: '#1e3357',
        art: (
          <>
            {[14, 20, 26].map((t) => <div key={t} style={{ ...abs, left: 0, right: 0, top: `${t}%`, height: t === 20 ? 3 : 1, background: '#3f62a0', opacity: 0.75 }} />)}
            {[74, 80, 86].map((t) => <div key={t} style={{ ...abs, left: 0, right: 0, top: `${t}%`, height: t === 80 ? 3 : 1, background: '#3f62a0', opacity: 0.75 }} />)}
            {['8%', '92%'].map((l) => (
              <svg key={l} viewBox="0 0 10 40" style={{ ...abs, left: l, bottom: 0, width: 10, height: 34, transform: 'translateX(-50%)' }} stroke={GOLD} strokeWidth="0.8" fill="none">
                <path d="M5 0v14M2 14l3 3 3-3M3 17v20M5 17v22M7 17v20" />
              </svg>
            ))}
          </>
        ),
      };
    case 'mosaicTorah':
      return {
        bg: '#1f2b33', ink: CREAM,
        art: (
          <svg viewBox="0 0 120 60" style={{ ...abs, top: 12, left: '50%', transform: 'translateX(-50%)', width: 120 }}>
            {[[20, '#2f6b6a'], [100, '#7a2f4a']].map(([x, c]) => (
              <g key={x as number}><rect x={(x as number) - 7} y="8" width="14" height="44" rx="3" fill={c as string} /><rect x={(x as number) - 2} y="2" width="4" height="56" rx="2" fill={GOLD} /></g>
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <rect key={i} x={30 + (i % 6) * 10} y={12 + Math.floor(i / 6) * 18} width="9" height="16" fill={['#2c5d8a', '#c8a464', '#5e3a7a', '#2f6b6a', '#7a2f4a', '#3f7a5e'][(i * 5) % 6]} opacity="0.9" />
            ))}
          </svg>
        ),
        justify: 'flex-end', pad: '0 24px 18px',
      };
    case 'bloom':
      return { bg: '#fbf8f3', ink: INK, art: <>{img(bloom, { top: -6, left: -10, width: '58%', height: '82%', objectPosition: 'left top' })}<div style={{ ...abs, inset: 10, border: `1px solid ${GOLD}`, opacity: 0.7 }} /></> };
    case 'cleanExec':
      return { bg: '#ffffff', ink: '#1c2a44', art: <div style={{ ...abs, left: '30%', right: '30%', top: '30%', height: 1, background: '#1c2a44', opacity: 0.8 }} />, pad: '24px 40px 0' };
    case 'geometric':
      return {
        bg: '#16294a', ink: '#f4efe6',
        art: (
          <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" style={{ ...abs, inset: 0, width: '100%', height: '100%' }}>
            <path d="M0 0H60L0 60Z" fill="#1f8a8a" /><path d="M200 120H130L200 50Z" fill="#1f8a8a" opacity="0.85" />
            <circle cx="178" cy="22" r="14" fill="none" stroke={GOLD} strokeWidth="1.2" />
            <rect x="14" y="92" width="18" height="18" fill={GOLD} transform="rotate(45 23 101)" />
          </svg>
        ),
      };
    case 'nightSky':
      return {
        bg: '#111c33', ink: CREAM,
        art: (
          <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" style={{ ...abs, inset: 0, width: '100%', height: '100%' }} fill="none">
            <path d="M24 24L52 16L76 30L98 20M140 92L162 80L184 96" stroke={GOLD} strokeWidth="0.4" opacity="0.6" />
            {[[24, 24], [52, 16], [76, 30], [98, 20], [140, 92], [162, 80], [184, 96]].map(([x, y]) => <path key={`${x}${y}`} d={star(x, y, 2.4)} fill={GOLD} />)}
          </svg>
        ),
      };
    case 'sketchbook':
      return {
        bg: '#d9c3a0', ink: '#3a2c1e',
        art: (
          <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" style={{ ...abs, inset: 0, width: '100%', height: '100%' }} fill="none" stroke="#4a3826" strokeWidth="0.8" strokeLinecap="round" opacity="0.7">
            <path d="M16 96c4-10 14-12 18-4M18 100h22l-3 14H21Z" /><path d="M28 92c0-8 4-14 8-18M28 92c-2-6-6-10-10-12" />
            <path d="M160 18h24v16h-24ZM163 22h18M163 26h14M163 30h16" /><path d="M150 100l20-6 4 12-20 6Z" /><path d="M174 18c2-4 6-6 10-4" />
          </svg>
        ),
      };
    case 'bigType':
      return { bg: '#f8f2e7', ink: INK, title: <span style={{ ...p.font, fontSize: 52, lineHeight: 1, color: INK, letterSpacing: '0.01em' }}>{p.headline}</span> };
    case 'gildedStripes':
      return {
        bg: 'repeating-linear-gradient(90deg, #eef3f8 0 14px, #dbe6f1 14px 28px)', ink: '#24364f',
        art: (
          <svg viewBox="0 0 200 120" preserveAspectRatio="none" style={{ ...abs, inset: 8, width: 'calc(100% - 16px)', height: 'calc(100% - 16px)' }} fill="none" stroke={GOLD} strokeWidth="1.4" vectorEffect="non-scaling-stroke">
            <path vectorEffect="non-scaling-stroke" d={`M0 4 ${Array.from({ length: 20 }).map((_, i) => `Q${i * 10 + 5} ${i % 2 ? 8 : 0} ${i * 10 + 10} 4`).join(' ')} V116 ${Array.from({ length: 20 }).map((_, i) => `Q${195 - i * 10} ${i % 2 ? 120 : 112} ${190 - i * 10} 116`).join(' ')} Z`} />
          </svg>
        ),
        title: <span style={{ ...p.font, fontSize: 28, color: '#24364f', background: '#f8f4ec', padding: '6px 16px' }}>{p.headline}</span>,
      };
    case 'pressed':
      return { bg: '#f7f2e8', ink: INK, art: <>{img(ferns, { left: -16, top: 0, width: '36%', height: '100%', opacity: 0.85 })}{img(ferns, { right: -16, top: 0, width: '36%', height: '100%', opacity: 0.85, transform: 'scaleX(-1)' })}</>, pad: '0 30%' };
    case 'doodle':
      return {
        bg: '#fff8ec', ink: '#2d2a4a',
        art: (
          <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" style={{ ...abs, inset: 0, width: '100%', height: '100%' }} fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 26c-4-6 4-10 6-4 2-6 10-2 6 4l-6 6Z" stroke="#d9667a" fill="#f6c6cd" />
            <path d={star(176, 24, 8)} stroke="#d9a63a" fill="#f6dc9a" />
            <path d="M160 96c6-6 14-6 20 0" stroke="#4f7fb8" /><path d="M156 104q8-6 16 0t16 0" stroke="#4f7fb8" />
            <rect x="16" y="86" width="22" height="16" rx="3" stroke="#6a9a74" fill="#d5ead6" transform="rotate(-8 27 94)" />
            <path d="M20 90l7 5 8-6" stroke="#6a9a74" transform="rotate(-8 27 94)" />
          </svg>
        ),
      };
    case 'quietCream':
      return {
        bg: '#f6f1e8', ink: '#3a3530',
        title: (
          <>
            <span style={{ ...caps, marginTop: 0 }}>{p.headline}</span>
            <span style={{ width: 40, height: 1, background: '#8a8278', margin: '12px 0' }} />
            <span style={{ ...p.font, fontSize: 28, color: '#3a3530' }}>{p.first || 'Eleanor Cohen'}</span>
          </>
        ),
        pad: '0 28px',
      };
    case 'candle':
      return {
        bg: '#2c3a4a', ink: '#eee6d8',
        art: (
          <div style={{ ...abs, top: 14, left: '50%', transform: 'translateX(-50%)', width: 60, height: 60, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,196,128,0.35), rgba(232,196,128,0) 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 20 30" width="14" height="22"><path d="M10 1C14 9 17 13 17 19a7 7 0 0 1-14 0C3 13 6 9 10 1Z" fill={GOLD} /></svg>
          </div>
        ),
        justify: 'flex-end', pad: '0 24px 20px',
      };
    case 'olive':
      return {
        bg: '#e8e7e3', ink: '#3a3a38',
        art: (
          <svg viewBox="0 0 120 30" style={{ ...abs, top: 16, left: '50%', transform: 'translateX(-50%)', width: 110 }} fill="none" stroke={GOLD} strokeWidth="0.9">
            <path d="M8 22C40 14 80 14 112 8" />
            {[20, 36, 52, 68, 84, 100].map((x, i) => <ellipse key={x} cx={x} cy={i % 2 ? 12 : 24 - i} rx="6" ry="2.2" transform={`rotate(${i % 2 ? -25 : 20} ${x} ${i % 2 ? 12 : 24 - i})`} />)}
          </svg>
        ),
        justify: 'flex-end', pad: '0 24px 20px',
      };
    case 'portraitArch':
      return {
        bg: '#efebe5', ink: '#3a3530',
        art: (
          <div style={{ ...abs, left: 18, top: 14, bottom: 14, width: '32%', borderRadius: '999px 999px 6px 6px', border: `1px solid ${GOLD}`, padding: 4 }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '999px 999px 4px 4px', background: p.photoUrl ? `center/cover url(${p.photoUrl})` : '#ddd6cc' }} />
          </div>
        ),
        pad: '0 18px 0 42%',
      };
    case 'mission':
      return {
        bg: '#ffffff', ink: '#1f2a2a',
        art: <div style={{ ...abs, left: 0, top: 0, bottom: 0, width: 8, background: '#2f7d6a' }} />,
        title: (
          <>
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 28, letterSpacing: '-0.01em', color: '#1f2a2a', lineHeight: 1.05 }}>{p.first || 'Harbor Food Bank'}</span>
            <span style={{ ...caps, color: '#2f7d6a', opacity: 1 }}>{p.headline}</span>
          </>
        ),
      };
    case 'seedling':
      return { bg: '#faf5ea', ink: INK, justify: 'flex-end', pad: '0 24px 18px', art: img(seedlings, { top: 4, left: '50%', transform: 'translateX(-50%)', width: '50%', height: '52%' }) };
    case 'hands':
      return {
        bg: '#164a4f', ink: CREAM,
        art: (
          <svg viewBox="0 0 80 80" style={{ ...abs, top: 12, left: '50%', transform: 'translateX(-50%)', width: 62 }} fill="none" stroke={GOLD} strokeWidth="1" strokeLinecap="round">
            {[0, 60, 120, 180, 240, 300].map((r) => (
              <g key={r} transform={`rotate(${r} 40 40)`}><path d="M40 8c4 0 8 2 9 6l-2 6c-2 2-5 2-7 0" /><path d="M43 10l2-4M46 12l3-3" /></g>
            ))}
            <circle cx="40" cy="40" r="10" opacity="0.5" />
          </svg>
        ),
        justify: 'flex-end', pad: '0 24px 18px',
      };
    case 'newDay':
      return {
        bg: '#fbf3e6', ink: INK,
        art: (
          <>
            <img src={sunrise} alt="" aria-hidden="true" width={1200} height={800} loading="lazy" style={{ ...abs, inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }} />
            <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMax slice" style={{ ...abs, inset: 0, width: '100%', height: '100%' }} stroke={GOLD} strokeWidth="0.5" opacity="0.7">
              {Array.from({ length: 11 }).map((_, i) => { const a = Math.PI * (i / 10); return <line key={i} x1="100" y1="124" x2={100 - 120 * Math.cos(a)} y2={124 - 120 * Math.sin(a)} />; })}
            </svg>
          </>
        ),
      };
  }
}

export function OccasionHeaderArt({ styleKey, headline, subtext = '', height, className = '', headlineFont, photoUrl }: Props) {
  const font: React.CSSProperties = { fontFamily: headlineFont || "'Playfair Display', Georgia, serif", fontWeight: 400, letterSpacing: '0.04em', lineHeight: 1.2 };
  const memorialName = subtext.match(/memory of (.+?)(?: · |$)/i)?.[1];
  const first = memorialName || subtext.split(' · ')[0] || '';
  const look = lookFor(styleKey, { subtext, first, photoUrl, font, headline });
  // Memorial "Quiet Cream" shows the name large; avoid repeating it in caps.
  const showCaps = !!subtext;
  return (
    <div
      className={`relative flex flex-col items-center overflow-hidden ${className}`}
      style={{ height, background: look.bg, color: look.ink, justifyContent: look.justify || 'center', isolation: 'isolate' }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>{look.art}</div>
      <div className="relative flex flex-col items-center text-center" style={{ zIndex: 1, padding: look.pad || '0 24px', width: look.chip ? 'auto' : '100%', maxWidth: '100%', textWrap: 'balance' as any, background: look.chip, ...(look.chip ? { paddingTop: 10, paddingBottom: 10, borderRadius: 4 } : {}) }}>
        {look.title ?? <span style={{ ...font, fontSize: 26, color: look.ink }}>{headline}</span>}
        {showCaps && <span style={{ ...caps, color: look.ink }}>{subtext}</span>}
      </div>
    </div>
  );
}

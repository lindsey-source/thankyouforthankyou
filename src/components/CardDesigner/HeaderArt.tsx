import React from 'react';
import type { Design, FontFamily, HeaderStyle } from './designTypes';
import peonyCorner from '@/assets/watercolor-peony-corner.png';
import eucalyptusSprig from '@/assets/watercolor-eucalyptus-sprig.png';

interface HeaderArtProps {
  /** Full design from Step 2 (provides accent/ink/headerBg/headerStyle/headlineText/font). */
  design: Pick<
    Design,
    'id' | 'headerStyle' | 'accent' | 'ink' | 'headerBg' | 'headlineText' | 'font'
  >;
  /** Optional override height (defaults to 220px for the design grid; preview uses ~42% of card height). */
  height?: string | number;
  /** Optional className for the root element. */
  className?: string;
  /** Optional inline override for headline text (e.g. user-edited message headline). */
  headlineOverride?: string;
  /** Optional photo to use as header background; when set, hides the SVG art. */
  photoUrl?: string | null;
  /** Optional user-chosen headline font family (Step 3 font choice). Falls back to the light serif. */
  headlineFont?: string;
  /** Optional small letter-spaced caps line under the headline (e.g. wedding couple + date). */
  subtext?: string;
  /** Wedding crest: couple's initials inside the gold wreath (e.g. "E & J"). */
  initials?: string;
}

/* Small letter-spaced caps line shown under the headline */
const subtextStyle = (color: string): React.CSSProperties => ({
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: '10px',
  fontWeight: 400,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color,
  opacity: 0.85,
  marginTop: '8px',
});

// Fine-stationery titles: light weight with gentle letter spacing; font family follows the user's choice.
const fontStyleFor = (font: FontFamily, headlineFont?: string): React.CSSProperties => ({
  fontFamily: headlineFont || "'Playfair Display', Georgia, serif",
  fontStyle: font === 'serifItalic' ? 'italic' : 'normal',
  fontSize: '28px',
  fontWeight: 400,
  letterSpacing: '0.06em',
});

const isDarkBackground = (bg: string) => {
  const m = bg.match(/#([0-9a-f]{6})/i);
  if (!m) return false;
  const n = parseInt(m[1], 16);
  return 0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255) < 110;
};

const CREAM_INK = '#f3e7d3';

/** Small interlocking wedding-rings motif. */
const RingsMotif: React.FC<{ color: string; className?: string }> = ({ color, className = '' }) => (
  <svg viewBox="0 0 34 16" className={`w-[28px] h-auto ${className}`} fill="none" aria-hidden="true">
    <circle cx="12" cy="8" r="6.5" stroke={color} strokeWidth="1" />
    <circle cx="22" cy="8" r="6.5" stroke={color} strokeWidth="1" />
  </svg>
);

/** Large couple monogram used across the wedding headers. */
const monogramStyle = (color: string): React.CSSProperties => ({
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: '26px',
  fontWeight: 400,
  letterSpacing: '0.14em',
  color,
  lineHeight: 1.1,
});

/**
 * Reusable header art renderer used by Step 2 (design grid) and Step 3 (live preview).
 * Pure & color-driven from the saved Design tokens.
 */
export const HeaderArt: React.FC<HeaderArtProps> = ({
  design,
  height = '220px',
  className = '',
  headlineOverride,
  photoUrl,
  headlineFont,
  subtext,
  initials,
}) => {
  const {
    headerStyle,
    accent = '#c17b8a',
    ink = '#2d2420',
    headerBg = '#faf7f2',
    headlineText = 'Thank You',
    font = 'serifClassic',
    id,
  } = design;
  const isDarkBg = isDarkBackground(headerBg);
  const headlineColor = isDarkBg ? CREAM_INK : ink;
  const fontStyle = fontStyleFor(font, headlineFont);
  const headline = headlineOverride?.trim() || headlineText;

  // Wedding stationery: gold wreath crest + script headline + serif names.
  if (headerStyle === 'weddingCrest' && !photoUrl) {
    const GOLD_CREST = '#c9a96e';
    const scriptStyle: React.CSSProperties = {
      ...fontStyle,
      fontFamily: headlineFont || "'Dancing Script', cursive",
      fontSize: '34px',
      letterSpacing: '0.02em',
    };
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden ${className}`}
        style={{ height, background: headerBg }}
      >
        {/* Soft cream wash mutes the header color */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: isDarkBg ? 'hsl(38 30% 85% / 0.08)' : 'hsl(38 40% 96% / 0.32)' }}
          aria-hidden="true"
        />
        {/* Thin gold wreath with the couple's initials */}
        <div className="relative">
        <svg viewBox="0 0 120 96" className="w-[92px] h-auto" fill="none" aria-hidden="true">
          {/* Full thin gold wreath — ring plus laurel leaves, tied at the bottom */}
          <g stroke={GOLD_CREST} strokeWidth="1" strokeLinecap="round">
            <circle cx="60" cy="48" r="34" />
            {/* Leaves around the ring, paired on each side */}
            {[15, 45, 75, 105, 135, 165].map((deg) => {
              const a = (deg * Math.PI) / 180;
              const bx = 60 + 34 * Math.cos(a);
              const by = 48 - 34 * Math.sin(a);
              const tangent = -deg;
              return (
                <g key={deg} transform={`translate(${bx} ${by}) rotate(${tangent})`}>
                  <path d="M 0 0 Q 5 -3 10 0 Q 5 3 0 0 Z" fill={GOLD_CREST} fillOpacity="0.55" stroke="none" />
                  <path d="M 2 2 Q 6 5 4 10 Q 1 6 2 2 Z" fill={GOLD_CREST} fillOpacity="0.4" stroke="none" />
                </g>
              );
            })}
            {/* Small bow where the branches meet at the bottom */}
            <path d="M 54 84 Q 60 78 66 84" strokeWidth="0.8" />
            <path d="M 56 85 L 54 90 M 64 85 L 66 90" strokeWidth="0.7" />
          </g>
          {/* Fine inner ring */}
          <circle cx="60" cy="48" r="26" stroke={GOLD_CREST} strokeWidth="0.5" strokeOpacity="0.6" />
        </svg>
        {/* Initials inside the wreath */}
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '19px',
            fontWeight: 400,
            letterSpacing: '0.08em',
            color: GOLD_CREST,
          }}
        >
          {initials || 'E & J'}
        </span>
        </div>
        {/* Refined script headline */}
        <span
          className="relative z-10 text-center px-4 mt-1"
          style={{ ...scriptStyle, color: headlineColor, lineHeight: 1.15 }}
        >
          {headline}
        </span>
        {/* Names + date in classic serif caps */}
        {subtext && (
          <span
            className="relative z-10 text-center px-4"
            style={{ ...subtextStyle(isDarkBg ? CREAM_INK : ink), marginTop: '6px' }}
          >
            {subtext}
          </span>
        )}
      </div>
    );
  }

  // Rose Garden: cream paper, watercolor blush peonies spilling from the top-left corner.
  if (headerStyle === 'roseStem' && !photoUrl) {
    const GOLD = '#c9a96e';
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden ${className}`}
        style={{ height, background: headerBg }}
      >
        <img
          src={peonyCorner}
          alt=""
          loading="lazy"
          width={1024}
          height={1024}
          className="absolute -top-5 -left-5 w-[58%] max-w-[200px] pointer-events-none select-none"
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col items-center px-6">
          <span style={monogramStyle(ink)}>{initials || 'E & J'}</span>
          <RingsMotif color={GOLD} className="mt-1.5" />
          <span
            className="text-center mt-1"
            style={{
              ...fontStyle,
              fontFamily: headlineFont || "'Dancing Script', cursive",
              fontSize: '30px',
              letterSpacing: '0.02em',
              color: ink,
              lineHeight: 1.15,
            }}
          >
            {headline}
          </span>
          {subtext && (
            <span className="text-center" style={{ ...subtextStyle(ink), marginTop: '6px' }}>
              {subtext}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Ivory Elegance: ivory paper, double gold frame, peonies spilling from the top-right corner.
  if (headerStyle === 'ivoryFrame' && !photoUrl) {
    const GOLD = '#c9a96e';
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden ${className}`}
        style={{ height, background: headerBg }}
      >
        {/* Double gold frame */}
        <div className="absolute pointer-events-none" style={{ inset: '10px', border: `1px solid ${GOLD}` }} aria-hidden="true" />
        <div className="absolute pointer-events-none" style={{ inset: '15px', border: `0.5px solid ${GOLD}`, opacity: 0.7 }} aria-hidden="true" />
        {/* Watercolor peonies spilling from the top-right corner (mirrored) */}
        <img
          src={peonyCorner}
          alt=""
          loading="lazy"
          width={1024}
          height={1024}
          className="absolute -top-5 -right-5 w-[52%] max-w-[180px] pointer-events-none select-none"
          style={{ transform: 'scaleX(-1)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col items-center px-6">
          <span style={monogramStyle(ink)}>{initials || 'E & J'}</span>
          <RingsMotif color={GOLD} className="mt-1.5" />
          <span
            className="text-center mt-1"
            style={{ ...fontStyle, color: ink, lineHeight: 1.15 }}
          >
            {headline}
          </span>
          {subtext && (
            <span className="text-center" style={{ ...subtextStyle(ink), marginTop: '6px' }}>
              {subtext}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Garden Party: sage & ivory, watercolor eucalyptus spilling in from both top corners.
  if (headerStyle === 'gardenLeaves' && !photoUrl) {
    const SAGE = '#5e7a5a';
    const GOLD = '#c9a96e';
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden ${className}`}
        style={{ height, background: headerBg }}
      >
        <img
          src={eucalyptusSprig}
          alt=""
          loading="lazy"
          width={1024}
          height={1024}
          className="absolute -top-4 -left-6 w-[34%] max-w-[120px] pointer-events-none select-none"
          style={{ transform: 'rotate(38deg)' }}
          aria-hidden="true"
        />
        <img
          src={eucalyptusSprig}
          alt=""
          loading="lazy"
          width={1024}
          height={1024}
          className="absolute -top-4 -right-6 w-[34%] max-w-[120px] pointer-events-none select-none"
          style={{ transform: 'scaleX(-1) rotate(38deg)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col items-center px-6">
          <span style={monogramStyle(SAGE)}>{initials || 'E & J'}</span>
          <RingsMotif color={GOLD} className="mt-1.5" />
          <span
            className="text-center mt-1"
            style={{ ...fontStyle, color: ink, lineHeight: 1.15 }}
          >
            {headline}
          </span>
          {subtext && (
            <span className="text-center" style={{ ...subtextStyle(ink), marginTop: '6px' }}>
              {subtext}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Timeless: deep navy, gold art deco frame, cream type, peonies spilling from the top-left.
  if (headerStyle === 'decoFrame' && !photoUrl) {
    const GOLD = '#c9a96e';
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden ${className}`}
        style={{ height, background: headerBg }}
      >
        <svg viewBox="0 0 200 120" className="absolute inset-0 w-full h-full pointer-events-none" fill="none" aria-hidden="true" preserveAspectRatio="none">
          {/* Art deco stepped frame */}
          <g stroke={GOLD} strokeWidth="1">
            <rect x="10" y="10" width="180" height="100" />
            <rect x="15" y="15" width="170" height="90" strokeWidth="0.5" strokeOpacity="0.7" />
          </g>
          {/* Stepped corner details */}
          <g stroke={GOLD} strokeWidth="0.8" strokeLinecap="square">
            <path d="M10 26 V18 Q10 10 18 10 H26" />
            <path d="M190 26 V18 Q190 10 182 10 H174" />
            <path d="M10 94 V102 Q10 110 18 110 H26" />
            <path d="M190 94 V102 Q190 110 182 110 H174" />
          </g>
        </svg>
        {/* Watercolor peonies spilling from the top-left corner */}
        <img
          src={peonyCorner}
          alt=""
          loading="lazy"
          width={1024}
          height={1024}
          className="absolute -top-5 -left-5 w-[50%] max-w-[170px] pointer-events-none select-none"
          style={{ opacity: 0.92 }}
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col items-center px-8">
          <span style={monogramStyle(GOLD)}>{initials || 'E & J'}</span>
          <RingsMotif color={GOLD} className="mt-1.5" />
          <span
            className="text-center mt-1"
            style={{
              ...fontStyle,
              color: CREAM_INK,
              lineHeight: 1.15,
              textTransform: 'uppercase',
              fontSize: '22px',
              letterSpacing: '0.18em',
            }}
          >
            {headline}
          </span>
          {subtext && (
            <span className="text-center" style={{ ...subtextStyle(CREAM_INK), marginTop: '8px' }}>
              {subtext}
            </span>
          )}
        </div>
      </div>
    );
  }


  // When a photo is uploaded, replace the art with the photo + dark scrim.
  if (photoUrl) {
    return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ height, background: headerBg }}
    >
        <img src={photoUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
        <span
          className="relative z-10 text-center px-4 text-white drop-shadow-md"
          style={{ ...fontStyle, lineHeight: 1.1 }}
        >
          {headline}
          {subtext && <span className="block" style={subtextStyle('#f3e7d3')}>{subtext}</span>}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ height, background: headerBg }}
    >
      {/* Soft cream wash mutes every header color */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: isDarkBg ? 'hsl(38 30% 85% / 0.08)' : 'hsl(38 40% 96% / 0.32)' }}
        aria-hidden="true"
      />
      {headerStyle === 'botanical' && (
        <svg
          viewBox="0 0 200 120"
          className="absolute inset-0 w-full h-full opacity-40"
          fill="none"
          strokeLinecap="round"
        >
          <path d="M30 100 C 60 80, 90 70, 170 30" stroke={accent} strokeOpacity="0.5" strokeWidth="0.9" />
          <path d="M70 78 C 64 72, 64 66, 70 64 C 74 68, 74 74, 70 78 Z" fill={accent} opacity="0.55" />
          <path d="M105 60 C 99 54, 99 48, 105 46 C 109 50, 109 56, 105 60 Z" fill={accent} opacity="0.55" />
          <path d="M140 44 C 134 38, 134 32, 140 30 C 144 34, 144 40, 140 44 Z" fill={accent} opacity="0.55" />
          {[60, 100, 150].map((cx, i) => (
            <g key={i} transform={`translate(${cx} ${[70, 50, 32][i]})`}>
              <circle cx="0" cy="0" r="6" fill={accent} opacity="0.85" />
              <circle cx="0" cy="0" r="3" fill={ink} opacity="0.5" />
            </g>
          ))}
        </svg>
      )}

      {headerStyle === 'monogram' && (
        <>
          <div
            className="absolute"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '9999px',
              border: `1px solid ${isDarkBg ? 'rgba(243,231,211,0.5)' : accent}`,
              top: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: isDarkBg ? CREAM_INK : ink,
                fontSize: '22px',
                letterSpacing: '0.05em',
              }}
            >
              TY
            </span>
          </div>
          <span
            className="text-center px-4 absolute"
            style={{ ...fontStyle, color: headlineColor, top: '128px' }}
          >
            {headline}
            {subtext && <span className="block" style={subtextStyle(headlineColor)}>{subtext}</span>}
          </span>
        </>
      )}

      {headerStyle === 'starburst' && (
        <svg
          viewBox="0 0 200 120"
          className="absolute inset-0 w-full h-full opacity-40"
          fill="none"
          strokeLinecap="round"
        >
          <g stroke={accent} strokeOpacity="0.55" strokeWidth="0.7">
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i / 16) * Math.PI * 2;
              const x1 = 100 + Math.cos(angle) * 18;
              const y1 = 60 + Math.sin(angle) * 18;
              const x2 = 100 + Math.cos(angle) * 50;
              const y2 = 60 + Math.sin(angle) * 50;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
            })}
          </g>
          <circle cx="100" cy="60" r="14" fill={accent} fillOpacity="0.6" />
        </svg>
      )}

      {headerStyle === 'confetti' && (
        <svg viewBox="0 0 200 120" className="absolute inset-0 w-full h-full" fill="none">
          {[
            [25, 30],
            [60, 22],
            [150, 18],
            [170, 50],
            [40, 60],
            [90, 40],
            [140, 78],
            [30, 90],
            [170, 95],
            [80, 100],
            [120, 18],
            [55, 105],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={i % 3 === 0 ? 3.2 : 2.2}
              fill={i % 2 === 0 ? accent : ink}
              fillOpacity="0.3"
            />
          ))}
        </svg>
      )}

      {headerStyle === 'starOfDavid' && (
        <svg viewBox="0 0 200 120" className="absolute inset-0 w-full h-full" fill="none">
          <g
            transform="translate(100 60)"
            stroke={accent}
            strokeOpacity="0.85"
            strokeWidth="1.2"
            strokeLinejoin="round"
            fill="none"
          >
            <polygon points="0,-26 22.5,13 -22.5,13" />
            <polygon points="0,26 22.5,-13 -22.5,-13" />
          </g>
          <circle cx="100" cy="60" r="40" fill="none" stroke={accent} strokeOpacity="0.25" />
        </svg>
      )}

      {headerStyle === 'ornamentFrame' && (
        <>
          {[
            { top: 18, left: 18, borders: 'tl' },
            { top: 18, right: 18, borders: 'tr' },
            { bottom: 18, left: 18, borders: 'bl' },
            { bottom: 18, right: 18, borders: 'br' },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: (c as any).top,
                bottom: (c as any).bottom,
                left: (c as any).left,
                right: (c as any).right,
                width: '22px',
                height: '22px',
                borderTop: c.borders.includes('t') ? `1px solid ${accent}` : undefined,
                borderBottom: c.borders.includes('b') ? `1px solid ${accent}` : undefined,
                borderLeft: c.borders.includes('l') ? `1px solid ${accent}` : undefined,
                borderRight: c.borders.includes('r') ? `1px solid ${accent}` : undefined,
              }}
            />
          ))}
          <div className="flex flex-col items-center">
            <div style={{ width: '70px', height: '1px', backgroundColor: accent, marginBottom: '14px' }} />
            <span className="text-center px-4" style={{ ...fontStyle, color: headlineColor }}>
              {headline}
              {subtext && <span className="block" style={subtextStyle(headlineColor)}>{subtext}</span>}
            </span>
            <div style={{ width: '70px', height: '1px', backgroundColor: accent, marginTop: '14px' }} />
          </div>
        </>
      )}

      {headerStyle === 'wave' && (
        <svg viewBox="0 0 200 120" className="absolute inset-0 w-full h-full" fill="none">
          <path
            d="M0 80 Q 50 60 100 78 T 200 70"
            stroke={accent}
            strokeOpacity="0.55"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M0 95 Q 50 78 100 92 T 200 86"
            stroke={accent}
            strokeOpacity="0.35"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      )}

      {headerStyle === 'dotsField' && (
        <svg viewBox="0 0 200 120" className="absolute inset-0 w-full h-full" fill="none">
          <defs>
            <pattern id={`dots-${id}`} x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.9" fill={accent} fillOpacity="0.35" />
            </pattern>
          </defs>
          <rect width="200" height="120" fill={`url(#dots-${id})`} />
        </svg>
      )}

      {/* Headline text (skip for monogram + ornamentFrame which place their own) */}
      {headerStyle !== 'monogram' && headerStyle !== 'ornamentFrame' && (
        <span
          className="relative z-10 text-center px-4"
          style={{ ...fontStyle, color: headlineColor, lineHeight: 1.1 }}
        >
          {headline}
          {subtext && <span className="block" style={subtextStyle(headlineColor)}>{subtext}</span>}
        </span>
      )}
    </div>
  );
};

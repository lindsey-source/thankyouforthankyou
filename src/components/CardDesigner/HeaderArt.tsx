import React from 'react';
import type { Design, FontFamily, HeaderStyle } from './designTypes';

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

  // Rose Garden: cream paper, hand-drawn gold-foil botanical stem down the left side.
  if (headerStyle === 'roseStem' && !photoUrl) {
    const GOLD = '#c9a96e';
    const GOLD_DEEP = '#b08d4f';
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden ${className}`}
        style={{ height, background: headerBg }}
      >
        {/* Gold-foil botanical stem down the left side */}
        <svg
          viewBox="0 0 60 120"
          className="absolute left-0 top-0 h-full w-auto pointer-events-none"
          fill="none"
          aria-hidden="true"
          preserveAspectRatio="xMinYMid slice"
        >
          {/* Main hand-drawn stem with gentle waviness */}
          <path
            d="M30 116 C 26 100, 35 88, 29 72 C 24 58, 33 46, 28 32 C 25 22, 31 12, 28 4"
            stroke={GOLD}
            strokeWidth="1"
            strokeLinecap="round"
          />
          {/* Paired leaves along the stem */}
          {[
            { y: 100, side: 1 },
            { y: 84, side: -1 },
            { y: 66, side: 1 },
            { y: 50, side: -1 },
            { y: 34, side: 1 },
            { y: 18, side: -1 },
          ].map(({ y, side }, i) => (
            <g key={i} transform={`translate(29 ${y}) scale(${side} 1)`}>
              <path
                d="M0 0 Q 10 -6 17 -2 Q 10 4 0 0 Z"
                fill={GOLD}
                fillOpacity="0.5"
                stroke={GOLD_DEEP}
                strokeWidth="0.4"
              />
              <path d="M1 -0.5 Q 9 -3 15 -2" stroke={GOLD_DEEP} strokeWidth="0.4" />
            </g>
          ))}
          {/* Small buds */}
          <circle cx="28" cy="4" r="2.2" fill={GOLD} fillOpacity="0.7" />
          <circle cx="33" cy="9" r="1.4" fill={GOLD} fillOpacity="0.55" />
          <circle cx="24" cy="10" r="1.4" fill={GOLD} fillOpacity="0.55" />
        </svg>
        {/* Content shifted right to clear the stem */}
        <div className="relative z-10 flex flex-col items-center pl-14 pr-4">
          <span
            className="text-center"
            style={{
              ...fontStyle,
              fontFamily: headlineFont || "'Dancing Script', cursive",
              fontSize: '32px',
              letterSpacing: '0.02em',
              color: ink,
              lineHeight: 1.15,
            }}
          >
            {headline}
          </span>
          {subtext && (
            <span className="text-center" style={{ ...subtextStyle(ink), marginTop: '8px' }}>
              {subtext}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Ivory Elegance: ivory paper, double gold frame with corner flourishes.
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
        {/* Corner flourishes inside the inner frame */}
        <svg viewBox="0 0 200 120" className="absolute inset-0 w-full h-full pointer-events-none" fill="none" aria-hidden="true">
          {[
            'M 26 34 Q 26 26 34 26',
            'M 174 34 Q 174 26 166 26',
            'M 26 86 Q 26 94 34 94',
            'M 174 86 Q 174 94 166 94',
          ].map((d, i) => (
            <g key={i} stroke={GOLD} strokeWidth="0.8" strokeLinecap="round">
              <path d={d} />
              <circle
                cx={[26, 174, 26, 174][i]}
                cy={[34, 34, 86, 86][i]}
                r="1.1"
                fill={GOLD}
                stroke="none"
              />
              <circle
                cx={[34, 166, 34, 166][i]}
                cy={[26, 26, 94, 94][i]}
                r="1.1"
                fill={GOLD}
                stroke="none"
              />
            </g>
          ))}
        </svg>
        <div className="relative z-10 flex flex-col items-center px-6">
          <span
            className="text-center"
            style={{ ...fontStyle, color: ink, lineHeight: 1.15 }}
          >
            {headline}
          </span>
          {subtext && (
            <span className="text-center" style={{ ...subtextStyle(ink), marginTop: '8px' }}>
              {subtext}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Garden Party: sage & ivory, a fine laurel wreath of line-drawn leaves around the initials.
  if (headerStyle === 'gardenLeaves' && !photoUrl) {
    const SAGE = '#5e7a5a';
    // Sample points + tangents along a cubic bezier branch so leaves follow the curve.
    const branchLeaves = (
      p0: [number, number],
      p1: [number, number],
      p2: [number, number],
      p3: [number, number],
    ) =>
      [0.16, 0.36, 0.56, 0.76, 0.92].map((t) => {
        const mt = 1 - t;
        const x = mt ** 3 * p0[0] + 3 * mt * mt * t * p1[0] + 3 * mt * t * t * p2[0] + t ** 3 * p3[0];
        const y = mt ** 3 * p0[1] + 3 * mt * mt * t * p1[1] + 3 * mt * t * t * p2[1] + t ** 3 * p3[1];
        const dx = 3 * mt * mt * (p1[0] - p0[0]) + 6 * mt * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0]);
        const dy = 3 * mt * mt * (p1[1] - p0[1]) + 6 * mt * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1]);
        return { x, y, ang: (Math.atan2(dy, dx) * 180) / Math.PI };
      });
    const leftBranch: [[number, number], [number, number], [number, number], [number, number]] = [
      [60, 86],
      [30, 78],
      [22, 40],
      [54, 12],
    ];
    const rightBranch: [[number, number], [number, number], [number, number], [number, number]] = [
      [60, 86],
      [90, 78],
      [98, 40],
      [66, 12],
    ];
    return (
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden ${className}`}
        style={{ height, background: headerBg }}
      >
        <div className="relative">
          <svg viewBox="0 0 120 96" className="w-[96px] h-auto" fill="none" aria-hidden="true">
            <g stroke={SAGE} strokeWidth="0.8" strokeLinecap="round">
              {/* Two laurel branches curving up from a tie at the bottom */}
              <path d="M 60 86 C 30 78, 22 40, 54 12" strokeWidth="0.7" />
              <path d="M 60 86 C 90 78, 98 40, 66 12" strokeWidth="0.7" />
              {/* Fine line-drawn leaves along each branch */}
              {[leftBranch, rightBranch].map((b, bi) =>
                branchLeaves(...b).map((leaf, li) => (
                  <g key={`${bi}-${li}`} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.ang - 40})`}>
                    <path
                      d="M 0 0 Q 5 -3.5 11 0 Q 5 3.5 0 0 Z"
                      fill={SAGE}
                      fillOpacity="0.22"
                      strokeWidth="0.5"
                    />
                    <path d="M 1 0 L 10 0" strokeWidth="0.4" strokeOpacity="0.55" />
                  </g>
                )),
              )}
              {/* Small tie where the branches meet */}
              <path d="M 56 88 Q 60 84 64 88" strokeWidth="0.7" />
              <path d="M 57 89 L 55 93 M 63 89 L 65 93" strokeWidth="0.6" />
            </g>
          </svg>
          <span
            className="absolute inset-0 flex items-center justify-center"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '19px',
              fontWeight: 400,
              letterSpacing: '0.08em',
              color: SAGE,
            }}
          >
            {initials || 'E & J'}
          </span>
        </div>
        <span
          className="relative z-10 text-center px-4 mt-1"
          style={{ ...fontStyle, color: ink, lineHeight: 1.15 }}
        >
          {headline}
        </span>
        {subtext && (
          <span className="relative z-10 text-center px-4" style={{ ...subtextStyle(ink), marginTop: '6px' }}>
            {subtext}
          </span>
        )}
      </div>
    );
  }

  // Timeless: deep navy, gold art deco frame, cream type.
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
          {/* Small deco fan at top center */}
          <g stroke={GOLD} strokeWidth="0.7" strokeLinecap="round">
            {[-40, -20, 0, 20, 40].map((deg) => {
              const a = ((deg - 90) * Math.PI) / 180;
              return (
                <line
                  key={deg}
                  x1="100"
                  y1="15"
                  x2={100 + Math.cos(a) * 9}
                  y2={15 - Math.sin(a) * -9}
                />
              );
            })}
          </g>
        </svg>
        <div className="relative z-10 flex flex-col items-center px-8">
          <span
            className="text-center"
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
            <span className="text-center" style={{ ...subtextStyle(CREAM_INK), marginTop: '10px' }}>
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

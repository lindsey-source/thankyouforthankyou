import React from 'react';
import { Heart } from 'lucide-react';
import { HeaderArt } from './HeaderArt';
import type { FontFamily, HeaderStyle } from './designTypes';

export interface LiveCardPreviewProps {
  /** Generic 4-color palette — used as a fallback when full Step 2 tokens are missing. */
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
  };
  /** User-selected font pairing (Step 3). */
  fonts: {
    heading: string;
    body: string;
  };

  /* ---------- Step 2 design tokens (full design object). ----------
     When provided, these take precedence so the preview faithfully matches
     the design picked on Step 2 (e.g. Golden Cap → navy header + gold starburst). */
  designId?: string;
  bg?: string;                    // card body background
  headerBg?: string;              // header band background (gradient or solid)
  ink?: string;                   // primary ink (greeting, signature)
  inkSoft?: string;               // softer ink (body, closing)
  accent?: string;                // accent color (art elements)
  headerStyle?: HeaderStyle;      // botanical | starburst | monogram | …
  headlineText?: string;          // design-default headline
  font?: FontFamily;              // design-default font for header
  fontChoice?: 'inter' | 'playfair' | 'dancing'; // design-default font family id
  donationBg?: string;            // donation badge background
  donationColor?: string;         // donation badge text

  /* ---------- User content + Step 3 customizations ---------- */
  recipientName?: string;
  messageHeadline?: string;
  messageBody?: string;
  closing?: string;
  senderName?: string;
  photoUrl?: string | null;
  charityName?: string | null;
  donationAmount?: number;
  envelopeColor?: string | null;
  texture?: string | null;
  signatureStyle?: string | null;
  className?: string;
}

const textureBackground = (texture: string | null | undefined, baseBg: string) => {
  const key = (texture || 'smooth').toLowerCase();
  if (key === 'linen') {
    return `repeating-linear-gradient(45deg, rgba(120,100,80,0.06) 0px, rgba(120,100,80,0.06) 1px, transparent 1px, transparent 4px), ${baseBg}`;
  }
  if (key === 'watercolor') {
    return `radial-gradient(ellipse at 20% 10%, rgba(193,123,138,0.14), transparent 60%), radial-gradient(ellipse at 80% 90%, rgba(143,170,139,0.14), transparent 60%), ${baseBg}`;
  }
  return baseBg;
};

/**
 * Live preview of the full card face. Pure, prop-driven, real-time.
 *
 * It accepts ALL fields from the Step 2 design object (bg, headerBg, ink,
 * inkSoft, accent, headerStyle, headlineText, font, donationBg, donationColor)
 * so the preview matches the design picked on Step 2. When those design
 * tokens are missing it falls back to the generic palette + simple gradient
 * header so it remains usable in legacy callers.
 */
export const LiveCardPreview: React.FC<LiveCardPreviewProps> = ({
  palette,
  fonts,
  designId,
  bg,
  headerBg,
  ink,
  inkSoft,
  accent,
  headerStyle,
  headlineText,
  font,
  fontChoice,
  donationBg,
  donationColor,
  recipientName,
  messageHeadline,
  messageBody,
  closing,
  senderName,
  photoUrl,
  charityName,
  donationAmount = 0,
  envelopeColor,
  texture,
  signatureStyle,
  className = '',
}) => {
  // Resolved colors: design tokens win, palette is the fallback
  const cardBg = bg || '#ffffff';
  const inkColor = ink || palette.text;
  const inkSoftColor = inkSoft || ink || palette.text;
  const accentColor = accent || palette.accent;
  const donationBgColor = donationBg || accentColor;
  const donationTextColor = donationColor || '#ffffff';

  // Resolved content
  const headline = messageHeadline?.trim() || headlineText || 'Thank You';
  const greeting = `Dear ${recipientName?.trim() || 'Friend'},`;
  const body =
    messageBody?.trim() ||
    'Thank you so much for being part of our special day. Your presence and generosity meant the world to us.';
  const closingLine = closing?.trim() || 'With love,';
  const sender = senderName?.trim();

  const signatureFont =
    signatureStyle === 'handwritten'
      ? "'Dancing Script', cursive"
      : signatureStyle === 'typed'
      ? fonts.body
      : fonts.heading;
  const showSignature = signatureStyle !== 'none' && !!sender;

  const hasEnvelope = !!envelopeColor;
  const hasDonation = !!charityName || donationAmount > 0;

  // If we have a Step 2 headerStyle, render the rich header through HeaderArt.
  // Otherwise fall back to the simple gradient header.
  const useDesignHeader = !!headerStyle && !!headerBg;

  const cardFace = (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: textureBackground(texture, cardBg) }}
    >
      {useDesignHeader ? (
        <div style={{ height: '42%' }}>
          <HeaderArt
            design={{
              id: designId || 'preview',
              headerStyle: headerStyle!,
              accent: accentColor,
              ink: inkColor,
              headerBg: accent || headerBg!,
              headlineText: headline,
              font: font || 'serifClassic',
            }}
            height="100%"
            photoUrl={photoUrl}
          />
        </div>
      ) : (
        <div
          className="relative flex flex-col items-center justify-center overflow-hidden"
          style={{
            height: '42%',
            background:
              accent || headerBg || `linear-gradient(135deg, ${palette.secondary} 0%, ${palette.primary} 100%)`,
          }}
        >
          {photoUrl ? (
            <>
              <img src={photoUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
              <span
                className="relative z-10 text-white drop-shadow-md"
                style={{
                  fontFamily: fonts.heading,
                  fontSize: 'clamp(28px, 6vw, 44px)',
                  letterSpacing: '0.04em',
                  lineHeight: 1.1,
                }}
              >
                {headline}
              </span>
            </>
          ) : (
            <>
              <span
                style={{
                  fontFamily: fonts.heading,
                  fontSize: 'clamp(28px, 6vw, 44px)',
                  color: accentColor,
                  letterSpacing: '0.04em',
                  lineHeight: 1.1,
                }}
              >
                {headline}
              </span>
              <div className="flex items-center gap-2 mt-3 opacity-70" aria-hidden="true">
                <div style={{ width: '28px', height: '1px', backgroundColor: accentColor }} />
                <div
                  style={{
                    width: '4px',
                    height: '4px',
                    backgroundColor: accentColor,
                    transform: 'rotate(45deg)',
                  }}
                />
                <div style={{ width: '28px', height: '1px', backgroundColor: accentColor }} />
              </div>
            </>
          )}
        </div>
      )}

      {/* Body */}
      <div
        className="px-5 pt-4 pb-3 flex flex-col"
        style={{ height: hasDonation ? '46%' : '58%' }}
      >
        <p className="text-lg mb-2" style={{ fontFamily: fonts.heading, color: inkColor }}>
          {greeting}
        </p>
        <p
          className="text-sm leading-relaxed flex-1 overflow-hidden"
          style={{
            fontFamily: fonts.body,
            color: inkSoftColor,
            opacity: 0.9,
            display: '-webkit-box',
            WebkitLineClamp: 5,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {body}
        </p>
        <div className="mt-2">
          <p className="text-sm" style={{ fontFamily: fonts.body, color: inkSoftColor, opacity: 0.9 }}>
            {closingLine}
          </p>
          {showSignature && (
            <p
              className={signatureStyle === 'handwritten' ? 'text-xl mt-1' : 'text-sm mt-0.5'}
              style={{ fontFamily: signatureFont, color: inkColor }}
            >
              {sender}
            </p>
          )}
        </div>
      </div>

      {/* Donation badge — uses design.donationBg / donationColor when provided */}
      {hasDonation && (
        <div
          className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center gap-2"
          style={{
            backgroundColor: donationBgColor,
            color: donationTextColor,
            height: '12%',
          }}
        >
          <Heart className="w-4 h-4 flex-shrink-0" fill="currentColor" />
          <div className="flex-1 min-w-0">
            <p
              className="text-[11px] uppercase tracking-wider opacity-90 leading-tight"
              style={{ fontFamily: fonts.body }}
            >
              A gift in your name
            </p>
            <p
              className="text-xs font-semibold truncate leading-tight"
              style={{ fontFamily: fonts.body }}
            >
              {donationAmount > 0 && `$${donationAmount.toFixed(2)} to `}
              {charityName || 'a chosen cause'}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  if (!hasEnvelope) {
    return (
      <div
        className={`relative w-full aspect-[3/4] rounded-2xl border overflow-hidden shadow-warm ${className}`}
        style={{ borderColor: 'rgba(45, 36, 32, 0.08)' }}
        role="img"
        aria-label="Live card preview"
      >
        {cardFace}
      </div>
    );
  }

  return (
    <div
      className={`relative w-full aspect-[3/4] ${className}`}
      role="img"
      aria-label="Live card preview with envelope"
    >
      <div
        className="absolute inset-0 rounded-2xl shadow-warm"
        style={{
          backgroundColor: envelopeColor!,
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 5px)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-0 right-0 overflow-hidden rounded-t-2xl"
        style={{ height: '18%' }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-x-0 top-0"
          style={{
            height: '200%',
            background: envelopeColor!,
            clipPath: 'polygon(0 0, 100% 0, 50% 50%)',
            filter: 'brightness(0.92)',
          }}
        />
      </div>
      <div
        className="absolute left-[6%] right-[6%] top-[14%] bottom-[6%] rounded-lg overflow-hidden border"
        style={{
          borderColor: 'rgba(45, 36, 32, 0.12)',
          boxShadow: '0 6px 14px -4px rgba(0,0,0,0.18), 0 2px 4px -1px rgba(0,0,0,0.08)',
        }}
      >
        {cardFace}
      </div>
    </div>
  );
};

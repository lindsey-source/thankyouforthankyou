import React from 'react';
import { Heart } from 'lucide-react';
import { HeaderArt } from './HeaderArt';
import type { Design } from './designTypes';

export interface DesignedCardPreviewProps {
  /** The Step 2 design tokens (saved into cardData.colorPalette). */
  design: Design;
  /** Optional user-supplied overrides — these win over the design defaults. */
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
  /** Optional font override (Step 3 lets the user pick a different pairing). */
  fontOverride?: { heading: string; body: string } | null;
  className?: string;
}

const TEXTURE_BG = (texture: string | null | undefined, baseBg: string) => {
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
 * Renders the full card face using the Step 2 Design tokens as the source of truth.
 * Step 3 customizations (photo, envelope, texture, signature, optional font override)
 * are layered on top — but the headerBg, headerStyle, ink/inkSoft/accent and donation
 * styling all come from the saved design.
 */
export const DesignedCardPreview: React.FC<DesignedCardPreviewProps> = ({
  design,
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
  fontOverride,
  className = '',
}) => {
  const greeting = `Dear ${recipientName?.trim() || 'Friend'},`;
  const body =
    messageBody?.trim() ||
    design.body ||
    'Thank you so much for being part of our special day. Your presence and generosity meant the world to us.';
  const closingLine = closing?.trim() || 'With love,';
  const sender = senderName?.trim();
  const headlineForArt = messageHeadline?.trim() || design.headlineText;

  const bodyFont = fontOverride?.body || "'Inter', sans-serif";
  const headingFont = fontOverride?.heading || "'Playfair Display', Georgia, serif";

  const signatureFont =
    signatureStyle === 'handwritten'
      ? "'Dancing Script', cursive"
      : signatureStyle === 'typed'
      ? bodyFont
      : headingFont;
  const showSignature = signatureStyle !== 'none' && !!sender;

  const hasEnvelope = !!envelopeColor;
  const hasDonation = !!charityName || donationAmount > 0;

  // Card face — uses Step 2's bg + texture overlay
  const cardFace = (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: TEXTURE_BG(texture, design.bg || '#ffffff') }}
    >
      {/* Header art = exact Step 2 rendering (header bg + style + headline + font) */}
      <div style={{ height: '42%' }}>
        <HeaderArt
          design={design}
          height="100%"
          headlineOverride={headlineForArt}
          photoUrl={photoUrl}
        />
      </div>

      {/* Body — ink colors come from design */}
      <div
        className="px-5 pt-4 pb-3 flex flex-col"
        style={{ height: hasDonation ? '46%' : '58%' }}
      >
        <p className="text-lg mb-2" style={{ fontFamily: headingFont, color: design.ink }}>
          {greeting}
        </p>
        <p
          className="text-sm leading-relaxed flex-1 overflow-hidden"
          style={{
            fontFamily: bodyFont,
            color: design.inkSoft || design.ink,
            opacity: 0.92,
            display: '-webkit-box',
            WebkitLineClamp: 5,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {body}
        </p>
        <div className="mt-2">
          <p
            className="text-sm"
            style={{ fontFamily: bodyFont, color: design.inkSoft || design.ink, opacity: 0.9 }}
          >
            {closingLine}
          </p>
          {showSignature && (
            <p
              className={signatureStyle === 'handwritten' ? 'text-xl mt-1' : 'text-sm mt-0.5'}
              style={{ fontFamily: signatureFont, color: design.ink }}
            >
              {sender}
            </p>
          )}
        </div>
      </div>

      {/* Donation badge — uses design.donationBg / donationColor for an authentic look */}
      {hasDonation && (
        <div
          className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center gap-2"
          style={{
            backgroundColor: design.donationBg,
            color: design.donationColor,
            height: '12%',
          }}
        >
          <Heart className="w-4 h-4 flex-shrink-0" fill="currentColor" />
          <div className="flex-1 min-w-0">
            <p
              className="text-[11px] uppercase tracking-wider opacity-90 leading-tight"
              style={{ fontFamily: bodyFont }}
            >
              A gift in your name
            </p>
            <p
              className="text-xs font-semibold truncate leading-tight"
              style={{ fontFamily: bodyFont }}
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

  // With envelope — card peeks out of an open envelope
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

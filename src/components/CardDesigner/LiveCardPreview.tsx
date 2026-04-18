import React from 'react';
import { Heart } from 'lucide-react';

export interface LiveCardPreviewProps {
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
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

const TEXTURE_BG: Record<string, string> = {
  smooth: '#ffffff',
  linen:
    "#fefcf8 repeating-linear-gradient(45deg, rgba(120,100,80,0.05) 0px, rgba(120,100,80,0.05) 1px, transparent 1px, transparent 4px)",
  watercolor:
    'radial-gradient(ellipse at 20% 10%, rgba(193,123,138,0.10), transparent 60%), radial-gradient(ellipse at 80% 90%, rgba(143,170,139,0.10), transparent 60%), #fffdf9',
};

/**
 * Live preview of the full card face. Pure, prop-driven, real-time.
 * Renders header art, headline, "Dear [Name]," body, closing, and
 * a charity donation badge at the bottom.
 */
export const LiveCardPreview: React.FC<LiveCardPreviewProps> = ({
  palette,
  fonts,
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
  const headline = messageHeadline?.trim() || 'Thank You';
  const greeting = `Dear ${recipientName?.trim() || 'Friend'},`;
  const body =
    messageBody?.trim() ||
    'Thank you so much for being part of our special day. Your presence and generosity meant the world to us.';
  const closingLine = closing?.trim() || 'With love,';
  const sender = senderName?.trim();
  const textureKey = (texture || 'smooth').toLowerCase();
  const textureBg = TEXTURE_BG[textureKey] || TEXTURE_BG.smooth;
  const isWatercolor = textureKey === 'watercolor';
  const isLinen = textureKey === 'linen';

  // Signature rendering style
  const signatureFont =
    signatureStyle === 'handwritten'
      ? "'Dancing Script', cursive"
      : signatureStyle === 'typed'
      ? fonts.body
      : fonts.heading;
  const showSignature = signatureStyle !== 'none' && !!sender;

  return (
    <div
      className={`relative w-full aspect-[3/4] rounded-2xl border overflow-hidden shadow-warm ${className}`}
      style={{
        borderColor: 'rgba(45, 36, 32, 0.08)',
        background: isLinen
          ? 'repeating-linear-gradient(45deg, rgba(120,100,80,0.05) 0px, rgba(120,100,80,0.05) 1px, transparent 1px, transparent 4px), #fefcf8'
          : isWatercolor
          ? 'radial-gradient(ellipse at 20% 10%, rgba(193,123,138,0.12), transparent 60%), radial-gradient(ellipse at 80% 90%, rgba(143,170,139,0.12), transparent 60%), #fffdf9'
          : '#ffffff',
      }}
      role="img"
      aria-label="Live card preview"
    >
      {/* Header art — photo if uploaded, otherwise gradient + decorative thank-you */}
      <div
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{
          height: '42%',
          background: `linear-gradient(135deg, ${palette.secondary} 0%, ${palette.primary} 100%)`,
        }}
      >
        {photoUrl ? (
          <>
            <img
              src={photoUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
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
                color: palette.accent,
                letterSpacing: '0.04em',
                lineHeight: 1.1,
              }}
            >
              {headline}
            </span>
            <div className="flex items-center gap-2 mt-3 opacity-70" aria-hidden="true">
              <div style={{ width: '28px', height: '1px', backgroundColor: palette.accent }} />
              <div
                style={{
                  width: '4px',
                  height: '4px',
                  backgroundColor: palette.accent,
                  transform: 'rotate(45deg)',
                }}
              />
              <div style={{ width: '28px', height: '1px', backgroundColor: palette.accent }} />
            </div>
          </>
        )}
      </div>

      {/* Body */}
      <div
        className="px-5 pt-4 pb-3 flex flex-col"
        style={{ height: charityName || donationAmount > 0 ? '46%' : '58%' }}
      >
        <p
          className="text-lg mb-2"
          style={{ fontFamily: fonts.heading, color: palette.text }}
        >
          {greeting}
        </p>
        <p
          className="text-sm leading-relaxed flex-1 overflow-hidden"
          style={{
            fontFamily: fonts.body,
            color: palette.text,
            opacity: 0.78,
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
            style={{ fontFamily: fonts.body, color: palette.text, opacity: 0.85 }}
          >
            {closingLine}
          </p>
          {showSignature && (
            <p
              className={signatureStyle === 'handwritten' ? 'text-xl mt-1' : 'text-sm mt-0.5'}
              style={{ fontFamily: signatureFont, color: palette.text }}
            >
              {sender}
            </p>
          )}
        </div>
      </div>

      {/* Charity / donation badge at the bottom */}
      {(charityName || donationAmount > 0) && (
        <div
          className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center gap-2"
          style={{
            backgroundColor: palette.accent,
            color: '#fff',
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

      {/* Envelope color band — bottom edge accent */}
      {envelopeColor && !(charityName || donationAmount > 0) && (
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '8px',
            backgroundColor: envelopeColor,
            boxShadow: 'inset 0 1px 0 rgba(0,0,0,0.06)',
          }}
          aria-hidden="true"
        />
      )}
      {envelopeColor && (
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: '4px',
            backgroundColor: envelopeColor,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

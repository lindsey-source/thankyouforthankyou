import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardWizard } from '@/contexts/CardWizardContext';
import { motion } from 'framer-motion';

const TOTAL_STEPS = 7;

type OccasionId =
  | 'wedding'
  | 'baby'
  | 'graduation'
  | 'birthday'
  | 'mitzvah'
  | 'corporate'
  | 'general'
  | 'memorial'
  | 'charity';

interface Occasion {
  id: OccasionId;
  name: string;
  /** Renders the unique header artwork inside a 2:3 portrait area */
  Art: React.FC;
}

/* ---------- Per-occasion unique artwork (CSS gradients + subtle SVG) ---------- */

const ArtFrame: React.FC<{ background: string; children?: React.ReactNode }> = ({
  background,
  children,
}) => (
  <div className="absolute inset-0" style={{ background }}>
    {children}
  </div>
);

const WeddingArt: React.FC = () => (
  <ArtFrame background="linear-gradient(160deg, #f7e3e5 0%, #f1cdd2 55%, #e6b3bb 100%)">
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 300"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="#7a3744"
      strokeWidth="0.6"
      strokeOpacity="0.45"
      strokeLinecap="round"
    >
      {/* botanical line art */}
      <path d="M30 280 C 40 240, 50 220, 70 200 C 85 185, 95 165, 100 140" />
      <path d="M70 200 q -10 -8 -18 -6" />
      <path d="M82 180 q 10 -6 18 -2" />
      <path d="M92 160 q -10 -8 -18 -4" />
      <path d="M98 145 q 12 -6 20 -1" />
      <path d="M170 280 C 160 240, 150 220, 130 200 C 115 185, 105 165, 100 140" />
      <path d="M130 200 q 10 -8 18 -6" />
      <path d="M118 180 q -10 -6 -18 -2" />
      <path d="M108 160 q 10 -8 18 -4" />
      <circle cx="100" cy="138" r="3" fill="#7a3744" fillOpacity="0.35" stroke="none" />
      <circle cx="100" cy="138" r="6" />
    </svg>
  </ArtFrame>
);

const BabyArt: React.FC = () => (
  <ArtFrame background="linear-gradient(165deg, #e8f4ec 0%, #cfe7d6 55%, #b6d7c0 100%)">
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 300"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="babyStars" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M20 10 l2 6 6 0 -5 4 2 6 -5 -4 -5 4 2 -6 -5 -4 6 0 z"
            fill="#3a5a45"
            fillOpacity="0.18"
          />
        </pattern>
      </defs>
      <rect width="200" height="300" fill="url(#babyStars)" />
    </svg>
  </ArtFrame>
);

const GraduationArt: React.FC = () => (
  <ArtFrame background="linear-gradient(170deg, #faf3e3 0%, #f1e3c2 60%, #e6d099 100%)">
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 300"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="#8a6a1e"
      strokeOpacity="0.55"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0.8"
    >
      {/* gold cap motif */}
      <g transform="translate(100 145)">
        <path d="M-40 0 L0 -18 L40 0 L0 18 Z" fill="#c8a24c" fillOpacity="0.35" />
        <path d="M-26 6 L-26 26 Q0 38 26 26 L26 6" />
        <path d="M0 18 L0 32" />
        <circle cx="0" cy="36" r="3" fill="#8a6a1e" fillOpacity="0.6" stroke="none" />
        <path d="M0 36 q 8 4 14 12" />
        <path d="M14 48 l-2 6 m2 -6 l4 4" />
      </g>
      {/* corner sparkles */}
      <g stroke="#8a6a1e" strokeOpacity="0.3">
        <path d="M30 40 l4 0 M32 38 l0 4" />
        <path d="M170 60 l4 0 M172 58 l0 4" />
        <path d="M40 240 l4 0 M42 238 l0 4" />
        <path d="M160 250 l4 0 M162 248 l0 4" />
      </g>
    </svg>
  </ArtFrame>
);

const BirthdayArt: React.FC = () => (
  <ArtFrame background="linear-gradient(165deg, #fde6d3 0%, #f8c9a8 55%, #f0a87c 100%)">
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 300"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* confetti dots */}
      {[
        ['25', '40', '#c17b8a'],
        ['60', '70', '#8faa8b'],
        ['150', '50', '#2d2420'],
        ['170', '110', '#c17b8a'],
        ['40', '120', '#8faa8b'],
        ['90', '160', '#2d2420'],
        ['140', '180', '#c17b8a'],
        ['30', '210', '#2d2420'],
        ['170', '230', '#8faa8b'],
        ['80', '250', '#c17b8a'],
        ['120', '275', '#2d2420'],
        ['55', '285', '#8faa8b'],
      ].map(([cx, cy, fill], i) => (
        <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 3.5 : 2.5} fill={fill} fillOpacity="0.55" />
      ))}
      {/* small streaks */}
      <g stroke="#7a3744" strokeOpacity="0.35" strokeWidth="1.2" strokeLinecap="round">
        <path d="M110 90 l8 -10" />
        <path d="M50 170 l-8 6" />
        <path d="M160 200 l8 -6" />
      </g>
    </svg>
  </ArtFrame>
);

const MitzvahArt: React.FC = () => (
  <ArtFrame background="linear-gradient(165deg, #1f2d44 0%, #16213a 60%, #0f1828 100%)">
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 300"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* subtle dots */}
      <defs>
        <pattern id="mitzvahDots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.7" fill="#d8b870" fillOpacity="0.25" />
        </pattern>
      </defs>
      <rect width="200" height="300" fill="url(#mitzvahDots)" />
      {/* Star of David */}
      <g
        transform="translate(100 145)"
        fill="none"
        stroke="#d8b870"
        strokeOpacity="0.85"
        strokeWidth="1.2"
        strokeLinejoin="round"
      >
        <polygon points="0,-34 29.4,17 -29.4,17" />
        <polygon points="0,34 29.4,-17 -29.4,-17" />
      </g>
      <circle cx="100" cy="145" r="48" fill="none" stroke="#d8b870" strokeOpacity="0.25" />
    </svg>
  </ArtFrame>
);

const CorporateArt: React.FC = () => (
  <ArtFrame background="linear-gradient(165deg, #e9ecef 0%, #c9cfd6 55%, #a8b2bc 100%)">
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 300"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="#3b4754"
      strokeOpacity="0.4"
      strokeWidth="0.7"
    >
      {/* geometric line grid */}
      <g>
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40 + 10} x2="200" y2={i * 40 + 10} />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="300" />
        ))}
      </g>
      {/* accent diagonals */}
      <g stroke="#3b4754" strokeOpacity="0.55" strokeWidth="1">
        <line x1="20" y1="280" x2="180" y2="60" />
        <line x1="40" y1="280" x2="200" y2="80" />
      </g>
    </svg>
  </ArtFrame>
);

const GeneralArt: React.FC = () => (
  <ArtFrame background="linear-gradient(165deg, #f3ede3 0%, #e6dccc 60%, #d4c6ae 100%)">
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 300"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="#7a6a4f"
      strokeOpacity="0.45"
      strokeWidth="0.8"
      strokeLinecap="round"
    >
      <path d="M30 200 q 70 -120 140 -50" />
      <path d="M40 215 q 60 -90 130 -30" />
      <path d="M50 230 q 50 -60 120 -10" />
      <circle cx="100" cy="150" r="32" strokeOpacity="0.25" />
    </svg>
  </ArtFrame>
);

const MemorialArt: React.FC = () => (
  <ArtFrame background="linear-gradient(170deg, #eef0ec 0%, #d6dcd2 60%, #b8c2b3 100%)">
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 300"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="#4a5a48"
      strokeOpacity="0.45"
      strokeLinecap="round"
      strokeWidth="0.7"
    >
      <path d="M100 60 C 80 130, 80 200, 100 260" />
      <path d="M100 110 q -20 -10 -34 -2" />
      <path d="M100 130 q 22 -10 36 -2" />
      <path d="M100 160 q -22 -8 -36 0" />
      <path d="M100 190 q 22 -10 36 -2" />
      <path d="M100 220 q -18 -6 -28 0" />
    </svg>
  </ArtFrame>
);

const CharityArt: React.FC = () => (
  <ArtFrame background="linear-gradient(165deg, #f5e6e9 0%, #ddc1c8 55%, #c19aa4 100%)">
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 300"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="#7a3744"
      strokeOpacity="0.5"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M100 195 c -14 -22 -38 -28 -38 -50 a 18 18 0 0 1 38 -8 a 18 18 0 0 1 38 8 c 0 22 -24 28 -38 50 z" />
      <path d="M70 235 q 30 18 60 0" strokeOpacity="0.3" />
    </svg>
  </ArtFrame>
);

const occasions: Occasion[] = [
  { id: 'wedding', name: 'Wedding', Art: WeddingArt },
  { id: 'baby', name: 'Baby', Art: BabyArt },
  { id: 'graduation', name: 'Graduation', Art: GraduationArt },
  { id: 'birthday', name: 'Birthday', Art: BirthdayArt },
  { id: 'mitzvah', name: 'Bar / Bat Mitzvah', Art: MitzvahArt },
  { id: 'corporate', name: 'Corporate', Art: CorporateArt },
  { id: 'general', name: 'General Thank You', Art: GeneralArt },
  { id: 'memorial', name: 'Memorial', Art: MemorialArt },
  { id: 'charity', name: 'Charity', Art: CharityArt },
];

/* ---------- Minimal dot step indicator ---------- */
const StepDots: React.FC<{ current: number; total: number }> = ({ current, total }) => (
  <div className="flex items-center justify-center gap-2 pt-8">
    {Array.from({ length: total }).map((_, i) => {
      const idx = i + 1;
      const isActive = idx === current;
      const isDone = idx < current;
      return (
        <span
          key={i}
          className="block rounded-full transition-all duration-300"
          style={{
            width: isActive ? 22 : 6,
            height: 6,
            backgroundColor: isActive
              ? '#c17b8a'
              : isDone
              ? 'rgba(45, 36, 32, 0.55)'
              : 'rgba(45, 36, 32, 0.18)',
          }}
        />
      );
    })}
  </div>
);

export default function CreateCardStep1() {
  const navigate = useNavigate();
  const { cardData, updateCardData, setCurrentStep } = useCardWizard();

  const handleOccasionSelect = (occasionId: OccasionId) => {
    updateCardData({ occasion: occasionId });
    setCurrentStep(2);
    navigate('/create-card/step2');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf7f2' }}>
      <StepDots current={1} total={TOTAL_STEPS} />

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-12 md:pt-16 pb-24">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h1
            className="text-4xl md:text-6xl tracking-tight"
            style={{
              fontFamily: "Georgia, 'Playfair Display', serif",
              color: '#2d2420',
              fontWeight: 500,
              letterSpacing: '-0.01em',
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Choose Your Occasion
          </motion.h1>
        </div>

        {/* Occasion Cards — portrait 2:3 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
          {occasions.map((occasion, index) => {
            const isSelected = cardData.occasion === occasion.id;
            const Art = occasion.Art;

            return (
              <motion.button
                key={occasion.id}
                type="button"
                onClick={() => handleOccasionSelect(occasion.id)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="group block text-left rounded-[14px] overflow-hidden bg-white transition-all duration-300"
                style={{
                  border: isSelected ? '2px solid #c17b8a' : '1px solid rgba(45, 36, 32, 0.08)',
                  boxShadow: isSelected
                    ? '0 16px 40px rgba(193, 123, 138, 0.22)'
                    : '0 2px 14px rgba(45, 36, 32, 0.05)',
                }}
                aria-pressed={isSelected}
                aria-label={`Select ${occasion.name}`}
              >
                {/* Portrait artwork — 2:3 ratio */}
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3 / 4' }}>
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]">
                    <Art />
                  </div>
                  {/* gentle inner edge */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.25)' }}
                  />
                </div>

                {/* Name in serif */}
                <div className="px-4 py-5 text-center">
                  <h3
                    className="text-[17px] md:text-[19px] leading-tight"
                    style={{
                      fontFamily: "Georgia, 'Playfair Display', serif",
                      color: '#2d2420',
                      fontWeight: 500,
                      letterSpacing: '0.005em',
                    }}
                  >
                    {occasion.name}
                  </h3>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

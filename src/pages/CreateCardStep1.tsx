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

/* Shared subtle dot pattern overlay */
const DotPattern: React.FC<{ id: string; color: string; opacity?: number }> = ({
  id,
  color,
  opacity = 0.22,
}) => (
  <defs>
    <pattern id={id} x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="0.7" fill={color} fillOpacity={opacity} />
    </pattern>
  </defs>
);

const WeddingArt: React.FC = () => (
  <ArtFrame background="linear-gradient(165deg, #4a1d2c 0%, #6b2a3e 55%, #3d1825 100%)">
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 300"
      preserveAspectRatio="xMidYMid slice"
    >
      <DotPattern id="weddingDots" color="#f0d4b8" opacity={0.18} />
      <rect width="200" height="300" fill="url(#weddingDots)" />
      {/* Two interlocking rings — bold gold */}
      <g transform="translate(100 145)" fill="none" stroke="#e8c98a" strokeWidth="3.2">
        <circle cx="-14" cy="0" r="28" />
        <circle cx="14" cy="0" r="28" strokeOpacity="0.95" />
        {/* tiny highlight */}
        <circle cx="-14" cy="0" r="28" stroke="#fff3d6" strokeOpacity="0.35" strokeWidth="0.8" />
        <circle cx="14" cy="0" r="28" stroke="#fff3d6" strokeOpacity="0.35" strokeWidth="0.8" />
      </g>
      <circle cx="100" cy="145" r="62" fill="none" stroke="#e8c98a" strokeOpacity="0.2" />
    </svg>
  </ArtFrame>
);

const BabyArt: React.FC = () => (
  <ArtFrame background="linear-gradient(165deg, #1e3a52 0%, #2a4d6a 55%, #15293d 100%)">
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 300"
      preserveAspectRatio="xMidYMid slice"
    >
      <DotPattern id="babyDots" color="#f2d9b8" opacity={0.18} />
      <rect width="200" height="300" fill="url(#babyDots)" />
      {/* Crescent moon cradling a star */}
      <g transform="translate(100 145)">
        <path
          d="M 22 -28 A 36 36 0 1 0 22 28 A 28 28 0 1 1 22 -28 Z"
          fill="#f2d9b8"
          fillOpacity="0.92"
        />
        <path
          d="M40 -8 l2.4 7.4 7.8 0 -6.3 4.6 2.4 7.4 -6.3 -4.6 -6.3 4.6 2.4 -7.4 -6.3 -4.6 7.8 0 z"
          fill="#f2d9b8"
        />
      </g>
      <circle cx="100" cy="145" r="62" fill="none" stroke="#f2d9b8" strokeOpacity="0.2" />
    </svg>
  </ArtFrame>
);

const GraduationArt: React.FC = () => (
  <ArtFrame background="linear-gradient(165deg, #2b1a0e 0%, #3d2515 55%, #1f130a 100%)">
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 300"
      preserveAspectRatio="xMidYMid slice"
    >
      <DotPattern id="gradDots" color="#e8c98a" opacity={0.18} />
      <rect width="200" height="300" fill="url(#gradDots)" />
      {/* Bold mortarboard cap */}
      <g transform="translate(100 145)" stroke="#e8c98a" strokeLinejoin="round" strokeLinecap="round">
        <polygon points="-44,0 0,-22 44,0 0,22" fill="#e8c98a" fillOpacity="0.95" stroke="none" />
        <path d="M-30 6 L-30 26 Q0 40 30 26 L30 6" fill="#e8c98a" fillOpacity="0.85" strokeWidth="1.2" />
        <line x1="0" y1="22" x2="0" y2="40" strokeWidth="2" />
        <circle cx="0" cy="42" r="3.5" fill="#e8c98a" stroke="none" />
        <path d="M0 42 q 12 6 18 18" fill="none" strokeWidth="2.2" />
        <path d="M18 60 l-3 7 m3 -7 l5 5" fill="none" strokeWidth="2" />
      </g>
      <circle cx="100" cy="145" r="62" fill="none" stroke="#e8c98a" strokeOpacity="0.2" />
    </svg>
  </ArtFrame>
);

const BirthdayArt: React.FC = () => (
  <ArtFrame background="linear-gradient(165deg, #5a1a3d 0%, #7a2552 55%, #421530 100%)">
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 300"
      preserveAspectRatio="xMidYMid slice"
    >
      <DotPattern id="bdayDots" color="#ffd97a" opacity={0.16} />
      <rect width="200" height="300" fill="url(#bdayDots)" />
      {/* Birthday cake silhouette with candle */}
      <g transform="translate(100 160)">
        {/* candle flame */}
        <path d="M0 -68 q 6 -8 0 -16 q -6 8 0 16 z" fill="#ffd97a" />
        {/* candle */}
        <rect x="-2" y="-66" width="4" height="14" fill="#ffd97a" opacity="0.9" />
        {/* top tier */}
        <rect x="-26" y="-52" width="52" height="22" rx="2" fill="#ffd97a" fillOpacity="0.95" />
        {/* drips */}
        <path d="M-22 -30 q 4 8 8 0 q 4 8 8 0 q 4 8 8 0 q 4 8 8 0" fill="#ffd97a" fillOpacity="0.95" />
        {/* base tier */}
        <rect x="-40" y="-22" width="80" height="34" rx="2" fill="#ffd97a" fillOpacity="0.85" />
        {/* plate */}
        <ellipse cx="0" cy="14" rx="50" ry="4" fill="#ffd97a" fillOpacity="0.6" />
      </g>
      <circle cx="100" cy="145" r="62" fill="none" stroke="#ffd97a" strokeOpacity="0.2" />
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
  <ArtFrame background="linear-gradient(165deg, #0f1f2e 0%, #1a3148 55%, #081523 100%)">
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 300"
      preserveAspectRatio="xMidYMid slice"
    >
      <DotPattern id="corpDots" color="#c8d4e0" opacity={0.16} />
      <rect width="200" height="300" fill="url(#corpDots)" />
      {/* Architectural skyline of bold blocks */}
      <g transform="translate(100 175)" fill="#c8d4e0">
        <rect x="-58" y="-30" width="22" height="60" fillOpacity="0.85" />
        <rect x="-32" y="-70" width="22" height="100" fillOpacity="0.95" />
        <rect x="-6" y="-50" width="22" height="80" fillOpacity="0.9" />
        <rect x="20" y="-90" width="22" height="120" fillOpacity="1" />
        <rect x="46" y="-40" width="14" height="70" fillOpacity="0.8" />
        {/* window dots */}
        <g fill="#0f1f2e" fillOpacity="0.6">
          <circle cx="-21" cy="-50" r="1.4" /><circle cx="-21" cy="-30" r="1.4" /><circle cx="-21" cy="-10" r="1.4" />
          <circle cx="5" cy="-30" r="1.4" /><circle cx="5" cy="-10" r="1.4" />
          <circle cx="31" cy="-70" r="1.4" /><circle cx="31" cy="-50" r="1.4" /><circle cx="31" cy="-30" r="1.4" /><circle cx="31" cy="-10" r="1.4" />
        </g>
      </g>
      <circle cx="100" cy="145" r="62" fill="none" stroke="#c8d4e0" strokeOpacity="0.18" />
    </svg>
  </ArtFrame>
);

const GeneralArt: React.FC = () => (
  <ArtFrame background="linear-gradient(165deg, #3d2a1a 0%, #5a4028 55%, #2a1c0f 100%)">
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 300"
      preserveAspectRatio="xMidYMid slice"
    >
      <DotPattern id="genDots" color="#f0d4b8" opacity={0.18} />
      <rect width="200" height="300" fill="url(#genDots)" />
      {/* Bold heart */}
      <g transform="translate(100 145)">
        <path
          d="M0 38 C -32 14, -52 -8, -52 -28 a 26 26 0 0 1 52 -8 a 26 26 0 0 1 52 8 c 0 20, -20 42, -52 66 z"
          fill="#f0d4b8"
          fillOpacity="0.95"
        />
        <path
          d="M0 38 C -32 14, -52 -8, -52 -28 a 26 26 0 0 1 52 -8 a 26 26 0 0 1 52 8 c 0 20, -20 42, -52 66 z"
          fill="none"
          stroke="#fff3d6"
          strokeOpacity="0.3"
          strokeWidth="0.8"
        />
      </g>
      <circle cx="100" cy="145" r="62" fill="none" stroke="#f0d4b8" strokeOpacity="0.2" />
    </svg>
  </ArtFrame>
);

const MemorialArt: React.FC = () => (
  <ArtFrame background="linear-gradient(170deg, #1a2e1f 0%, #284535 55%, #0f1f15 100%)">
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 300"
      preserveAspectRatio="xMidYMid slice"
    >
      <DotPattern id="memDots" color="#d4c896" opacity={0.16} />
      <rect width="200" height="300" fill="url(#memDots)" />
      {/* Olive branch — bold */}
      <g transform="translate(100 145)" stroke="#d4c896" strokeLinecap="round" strokeLinejoin="round" fill="#d4c896">
        <path d="M0 -60 C -6 -20, -8 20, 0 60" stroke="#d4c896" strokeWidth="2.4" fill="none" />
        {/* leaves left */}
        <ellipse cx="-14" cy="-38" rx="11" ry="4" transform="rotate(-30 -14 -38)" fillOpacity="0.95" />
        <ellipse cx="-18" cy="-12" rx="13" ry="4.5" transform="rotate(-25 -18 -12)" fillOpacity="0.95" />
        <ellipse cx="-20" cy="16" rx="13" ry="4.5" transform="rotate(-20 -20 16)" fillOpacity="0.95" />
        <ellipse cx="-16" cy="42" rx="11" ry="4" transform="rotate(-15 -16 42)" fillOpacity="0.9" />
        {/* leaves right */}
        <ellipse cx="14" cy="-26" rx="11" ry="4" transform="rotate(30 14 -26)" fillOpacity="0.95" />
        <ellipse cx="18" cy="0" rx="13" ry="4.5" transform="rotate(25 18 0)" fillOpacity="0.95" />
        <ellipse cx="18" cy="28" rx="12" ry="4.2" transform="rotate(20 18 28)" fillOpacity="0.9" />
      </g>
      <circle cx="100" cy="145" r="62" fill="none" stroke="#d4c896" strokeOpacity="0.2" />
    </svg>
  </ArtFrame>
);

const CharityArt: React.FC = () => (
  <ArtFrame background="linear-gradient(165deg, #4a1d2c 0%, #6b2a3e 55%, #3d1825 100%)">
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 200 300"
      preserveAspectRatio="xMidYMid slice"
    >
      <DotPattern id="charDots" color="#f0d4b8" opacity={0.16} />
      <rect width="200" height="300" fill="url(#charDots)" />
      {/* Open hand cradling a heart */}
      <g transform="translate(100 145)">
        {/* heart */}
        <path
          d="M0 6 C -16 -8, -28 -20, -28 -32 a 14 14 0 0 1 28 -4 a 14 14 0 0 1 28 4 c 0 12, -12 24, -28 38 z"
          fill="#e8c98a"
          fillOpacity="0.98"
        />
        {/* hand cradle */}
        <path
          d="M-44 14 q 0 30 44 30 q 44 0 44 -30"
          fill="none"
          stroke="#e8c98a"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <path
          d="M-44 14 q -4 -2 -8 2 M44 14 q 4 -2 8 2"
          fill="none"
          stroke="#e8c98a"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <circle cx="100" cy="145" r="62" fill="none" stroke="#e8c98a" strokeOpacity="0.2" />
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

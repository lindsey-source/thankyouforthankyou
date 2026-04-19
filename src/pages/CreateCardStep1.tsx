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
  /** Renders the unique cover artwork inside a 3:4 portrait area */
  Art: React.FC;
}

/* ---------- Per-occasion unique artwork (CSS gradients + SVG) ---------- */

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
  opacity = 0.18,
}) => (
  <defs>
    <pattern id={id} x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="0.7" fill={color} fillOpacity={opacity} />
    </pattern>
  </defs>
);

/* Decorative ornament line above the cover name */
const Ornament: React.FC<{ y: number; color: string }> = ({ y, color }) => (
  <g stroke={color} strokeOpacity="0.7" strokeLinecap="round" fill="none">
    <line x1="62" y1={y} x2="88" y2={y} strokeWidth="0.8" />
    <g transform={`translate(100 ${y})`}>
      <circle r="1.6" fill={color} stroke="none" fillOpacity="0.9" />
      <circle r="3.2" strokeWidth="0.6" />
    </g>
    <line x1="112" y1={y} x2="138" y2={y} strokeWidth="0.8" />
  </g>
);

/* Cover name typeset directly into the SVG (greeting-card style) */
const CoverName: React.FC<{ name: string; color: string; secondary?: string }> = ({
  name,
  color,
  secondary,
}) => (
  <>
    <Ornament y={256} color={color} />
    <text
      x="100"
      y="280"
      textAnchor="middle"
      fontFamily="Georgia, 'Playfair Display', serif"
      fontSize="13"
      fontStyle="italic"
      fill={color}
      letterSpacing="2.4"
    >
      {name}
    </text>
    {secondary && (
      <text
        x="100"
        y="294"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="6"
        fill={color}
        fillOpacity="0.7"
        letterSpacing="3"
      >
        {secondary}
      </text>
    )}
  </>
);

const WeddingArt: React.FC = () => (
  <ArtFrame background="linear-gradient(165deg, #4a1d2c 0%, #6b2a3e 55%, #3d1825 100%)">
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice">
      <DotPattern id="weddingDots" color="#f0d4b8" />
      <rect width="200" height="300" fill="url(#weddingDots)" />
      {/* Botanical wreath frame */}
      <g fill="none" stroke="#e8c98a" strokeOpacity="0.5" strokeLinecap="round" strokeWidth="0.9">
        <path d="M55 75 q -8 55 0 110" />
        <path d="M145 75 q 8 55 0 110" />
        {[80, 110, 140, 170].map((y) => (
          <g key={y}>
            <ellipse cx="55" cy={y} rx="6" ry="1.8" transform={`rotate(-30 55 ${y})`} fill="#e8c98a" fillOpacity="0.55" stroke="none" />
            <ellipse cx="145" cy={y} rx="6" ry="1.8" transform={`rotate(30 145 ${y})`} fill="#e8c98a" fillOpacity="0.55" stroke="none" />
          </g>
        ))}
      </g>
      {/* Two interlocking rings */}
      <g transform="translate(100 130)" fill="none" stroke="#e8c98a" strokeWidth="3.4">
        <circle cx="-13" cy="0" r="24" />
        <circle cx="13" cy="0" r="24" />
        <circle cx="-13" cy="0" r="24" stroke="#fff3d6" strokeOpacity="0.4" strokeWidth="0.7" />
        <circle cx="13" cy="0" r="24" stroke="#fff3d6" strokeOpacity="0.4" strokeWidth="0.7" />
      </g>
      <CoverName name="WEDDING" color="#e8c98a" secondary="WITH GRATITUDE" />
    </svg>
  </ArtFrame>
);

const BabyArt: React.FC = () => (
  <ArtFrame background="linear-gradient(165deg, #1e3a52 0%, #2a4d6a 55%, #15293d 100%)">
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice">
      <DotPattern id="babyDots" color="#f2d9b8" />
      <rect width="200" height="300" fill="url(#babyDots)" />
      <g fill="#f2d9b8" fillOpacity="0.65">
        <circle cx="40" cy="60" r="1.2" /><circle cx="160" cy="80" r="1.2" />
        <circle cx="55" cy="200" r="1.2" /><circle cx="150" cy="190" r="1.2" />
        <circle cx="30" cy="140" r="1" /><circle cx="170" cy="150" r="1" />
        <circle cx="65" cy="105" r="0.9" /><circle cx="135" cy="55" r="0.9" />
      </g>
      {/* Crescent moon cradling a star */}
      <g transform="translate(100 132)">
        <path d="M 22 -34 A 42 42 0 1 0 22 34 A 32 32 0 1 1 22 -34 Z" fill="#f2d9b8" />
        <path d="M44 -6 l2.6 8 8.4 0 -6.8 5 2.6 8 -6.8 -5 -6.8 5 2.6 -8 -6.8 -5 8.4 0 z" fill="#f2d9b8" />
      </g>
      <CoverName name="LITTLE ONE" color="#f2d9b8" secondary="WELCOMED WITH LOVE" />
    </svg>
  </ArtFrame>
);

const GraduationArt: React.FC = () => (
  <ArtFrame background="linear-gradient(165deg, #2b1a0e 0%, #3d2515 55%, #1f130a 100%)">
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice">
      <DotPattern id="gradDots" color="#e8c98a" />
      <rect width="200" height="300" fill="url(#gradDots)" />
      <g transform="translate(100 132)" stroke="#e8c98a" strokeLinejoin="round" strokeLinecap="round">
        <polygon points="-46,0 0,-24 46,0 0,24" fill="#e8c98a" stroke="none" />
        <path d="M-32 6 L-32 28 Q0 42 32 28 L32 6" fill="#e8c98a" fillOpacity="0.85" strokeWidth="1.2" />
        <line x1="0" y1="24" x2="0" y2="44" strokeWidth="2.2" />
        <circle cx="0" cy="46" r="3.6" fill="#e8c98a" stroke="none" />
        <path d="M0 46 q 14 6 20 20" fill="none" strokeWidth="2.4" />
        <path d="M20 66 l-3 8 m3 -8 l6 5" fill="none" strokeWidth="2.2" />
      </g>
      <CoverName name="GRADUATION" color="#e8c98a" secondary="WITH GRATITUDE" />
    </svg>
  </ArtFrame>
);

const BirthdayArt: React.FC = () => (
  <ArtFrame background="linear-gradient(165deg, #5a1a3d 0%, #7a2552 55%, #421530 100%)">
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice">
      <DotPattern id="bdayDots" color="#ffd97a" opacity={0.16} />
      <rect width="200" height="300" fill="url(#bdayDots)" />
      <g fill="#ffd97a" fillOpacity="0.7">
        <circle cx="35" cy="55" r="1.6" /><circle cx="165" cy="65" r="1.6" />
        <circle cx="50" cy="100" r="1.2" /><circle cx="155" cy="110" r="1.2" />
        <circle cx="30" cy="180" r="1.2" /><circle cx="172" cy="180" r="1.2" />
      </g>
      {/* Birthday cake with candle */}
      <g transform="translate(100 150)">
        <path d="M0 -78 q 7 -10 0 -20 q -7 10 0 20 z" fill="#ffd97a" />
        <circle cx="0" cy="-86" r="1.4" fill="#fff3d6" />
        <rect x="-2.2" y="-76" width="4.4" height="14" fill="#ffd97a" />
        <rect x="-28" y="-62" width="56" height="22" rx="2" fill="#ffd97a" />
        <path d="M-24 -40 q 4 8 8 0 q 4 8 8 0 q 4 8 8 0 q 4 8 8 0" fill="#ffd97a" />
        <rect x="-44" y="-32" width="88" height="36" rx="2" fill="#ffd97a" fillOpacity="0.92" />
        <line x1="-44" y1="-20" x2="44" y2="-20" stroke="#5a1a3d" strokeOpacity="0.3" strokeWidth="0.8" />
        <line x1="-44" y1="-8" x2="44" y2="-8" stroke="#5a1a3d" strokeOpacity="0.3" strokeWidth="0.8" />
        <ellipse cx="0" cy="6" rx="54" ry="4" fill="#ffd97a" fillOpacity="0.6" />
      </g>
      <CoverName name="BIRTHDAY" color="#ffd97a" secondary="ANOTHER YEAR · THANK YOU" />
    </svg>
  </ArtFrame>
);

const MitzvahArt: React.FC = () => (
  <ArtFrame background="linear-gradient(165deg, #1f2d44 0%, #16213a 60%, #0f1828 100%)">
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice">
      <DotPattern id="mitzvahDots" color="#d8b870" opacity={0.22} />
      <rect width="200" height="300" fill="url(#mitzvahDots)" />
      <g transform="translate(100 130)" fill="none" stroke="#d8b870" strokeWidth="2.2" strokeLinejoin="round">
        <polygon points="0,-40 34.6,20 -34.6,20" />
        <polygon points="0,40 34.6,-20 -34.6,-20" />
      </g>
      <circle cx="100" cy="130" r="56" fill="none" stroke="#d8b870" strokeOpacity="0.25" />
      <CoverName name="BAR / BAT MITZVAH" color="#d8b870" secondary="MAZEL TOV · TODAH" />
    </svg>
  </ArtFrame>
);

const CorporateArt: React.FC = () => (
  <ArtFrame background="linear-gradient(165deg, #0f1f2e 0%, #1a3148 55%, #081523 100%)">
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice">
      <DotPattern id="corpDots" color="#c8d4e0" opacity={0.14} />
      <rect width="200" height="300" fill="url(#corpDots)" />
      <g transform="translate(100 175)" fill="#c8d4e0">
        <rect x="-58" y="-30" width="20" height="60" fillOpacity="0.78" />
        <rect x="-34" y="-72" width="22" height="102" fillOpacity="0.92" />
        <rect x="-8" y="-50" width="22" height="80" fillOpacity="0.86" />
        <rect x="18" y="-92" width="22" height="122" fillOpacity="1" />
        <rect x="44" y="-42" width="14" height="72" fillOpacity="0.78" />
        <g fill="#0f1f2e" fillOpacity="0.65">
          <circle cx="-23" cy="-52" r="1.4" /><circle cx="-23" cy="-32" r="1.4" /><circle cx="-23" cy="-12" r="1.4" />
          <circle cx="3" cy="-30" r="1.4" /><circle cx="3" cy="-10" r="1.4" />
          <circle cx="29" cy="-72" r="1.4" /><circle cx="29" cy="-52" r="1.4" /><circle cx="29" cy="-32" r="1.4" /><circle cx="29" cy="-12" r="1.4" />
        </g>
      </g>
      <CoverName name="CORPORATE" color="#c8d4e0" secondary="WITH APPRECIATION" />
    </svg>
  </ArtFrame>
);

const GeneralArt: React.FC = () => (
  <ArtFrame background="linear-gradient(165deg, #3d2a1a 0%, #5a4028 55%, #2a1c0f 100%)">
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice">
      <DotPattern id="genDots" color="#f0d4b8" />
      <rect width="200" height="300" fill="url(#genDots)" />
      <g transform="translate(100 130)">
        <path
          d="M0 38 C -32 14, -52 -8, -52 -28 a 26 26 0 0 1 52 -8 a 26 26 0 0 1 52 8 c 0 20, -20 42, -52 66 z"
          fill="#f0d4b8"
        />
      </g>
      <CoverName name="THANK YOU" color="#f0d4b8" secondary="WITH ALL MY HEART" />
    </svg>
  </ArtFrame>
);

const MemorialArt: React.FC = () => (
  <ArtFrame background="linear-gradient(170deg, #1a2e1f 0%, #284535 55%, #0f1f15 100%)">
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice">
      <DotPattern id="memDots" color="#d4c896" opacity={0.16} />
      <rect width="200" height="300" fill="url(#memDots)" />
      <g transform="translate(100 132)" stroke="#d4c896" strokeLinecap="round" strokeLinejoin="round" fill="#d4c896">
        <path d="M0 -68 C -6 -24, -8 22, 0 66" stroke="#d4c896" strokeWidth="2.4" fill="none" />
        <ellipse cx="-15" cy="-44" rx="12" ry="4.2" transform="rotate(-30 -15 -44)" />
        <ellipse cx="-19" cy="-16" rx="14" ry="4.6" transform="rotate(-25 -19 -16)" />
        <ellipse cx="-21" cy="14" rx="14" ry="4.6" transform="rotate(-20 -21 14)" />
        <ellipse cx="-17" cy="42" rx="12" ry="4.2" transform="rotate(-15 -17 42)" />
        <ellipse cx="15" cy="-30" rx="12" ry="4.2" transform="rotate(30 15 -30)" />
        <ellipse cx="19" cy="0" rx="14" ry="4.6" transform="rotate(25 19 0)" />
        <ellipse cx="19" cy="28" rx="13" ry="4.4" transform="rotate(20 19 28)" />
      </g>
      <CoverName name="IN LOVING MEMORY" color="#d4c896" secondary="WITH HEARTFELT THANKS" />
    </svg>
  </ArtFrame>
);

const CharityArt: React.FC = () => (
  <ArtFrame background="linear-gradient(165deg, #4a1d2c 0%, #6b2a3e 55%, #3d1825 100%)">
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice">
      <DotPattern id="charDots" color="#e8c98a" opacity={0.16} />
      <rect width="200" height="300" fill="url(#charDots)" />
      <g transform="translate(100 130)">
        <path
          d="M0 4 C -16 -10, -28 -22, -28 -34 a 14 14 0 0 1 28 -4 a 14 14 0 0 1 28 4 c 0 12, -12 24, -28 38 z"
          fill="#e8c98a"
        />
        <path
          d="M-46 14 q 0 32 46 32 q 46 0 46 -32"
          fill="none"
          stroke="#e8c98a"
          strokeWidth="3.6"
          strokeLinecap="round"
        />
        <path
          d="M-46 14 q -4 -2 -8 2 M46 14 q 4 -2 8 2"
          fill="none"
          stroke="#e8c98a"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </g>
      <CoverName name="A GIFT IN YOUR NAME" color="#e8c98a" secondary="GIVING BACK" />
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

        {/* Occasion Cards — premium greeting card covers */}
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
                className="group block text-left rounded-[14px] overflow-hidden transition-all duration-300"
                style={{
                  border: isSelected ? '2px solid #c17b8a' : '1px solid rgba(45, 36, 32, 0.08)',
                  boxShadow: isSelected
                    ? '0 16px 40px rgba(193, 123, 138, 0.28)'
                    : '0 6px 22px rgba(45, 36, 32, 0.12)',
                }}
                aria-pressed={isSelected}
                aria-label={`Select ${occasion.name}`}
              >
                {/* Full-bleed cover artwork — 3:4 ratio */}
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3 / 4' }}>
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]">
                    <Art />
                  </div>
                  {/* gentle inner edge */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.18)' }}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

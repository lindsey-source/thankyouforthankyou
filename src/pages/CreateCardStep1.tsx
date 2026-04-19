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
  <ArtFrame background="#8B4A5A">
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice">
      <DotPattern id="weddingDots" color="#f5e0c4" opacity={0.14} />
      <rect width="200" height="300" fill="url(#weddingDots)" />
      {/* Small heart above ring intersection */}
      <g transform="translate(100 88)" fill="#f5e0c4">
        <path d="M0 8 C -7 2, -12 -3, -12 -8 a 6 6 0 0 1 12 -2 a 6 6 0 0 1 12 2 c 0 5, -5 10, -12 16 z" />
      </g>
      {/* Two interlocking wedding bands — bold gold */}
      <g transform="translate(100 140)" fill="none" stroke="#f5e0c4" strokeWidth="5">
        <circle cx="-15" cy="0" r="32" />
        <circle cx="15" cy="0" r="32" />
        {/* inner highlight */}
        <circle cx="-15" cy="0" r="32" stroke="#fff5e1" strokeOpacity="0.55" strokeWidth="1" />
        <circle cx="15" cy="0" r="32" stroke="#fff5e1" strokeOpacity="0.55" strokeWidth="1" />
      </g>
      <CoverName name="WEDDING" color="#f5e0c4" secondary="WITH GRATITUDE" />
    </svg>
  </ArtFrame>
);

const BabyArt: React.FC = () => (
  <ArtFrame background="#5B8FA8">
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice">
      <DotPattern id="babyDots" color="#ffffff" opacity={0.1} />
      <rect width="200" height="300" fill="url(#babyDots)" />
      {/* Scattered stars */}
      <g fill="#ffffff" fillOpacity="0.85">
        {[
          [38, 70, 3], [162, 60, 2.4], [50, 130, 2], [155, 140, 2.6],
          [30, 195, 2.4], [170, 200, 2], [60, 235, 1.8], [148, 100, 1.6],
          [90, 50, 1.6], [115, 245, 2],
        ].map(([cx, cy, r], i) => (
          <path
            key={i}
            d={`M${cx} ${cy - r} l${r * 0.3} ${r * 0.9} ${r * 0.95} 0 -${r * 0.78} ${r * 0.6} ${r * 0.3} ${r * 0.95} -${r * 0.78} -${r * 0.58} -${r * 0.78} ${r * 0.58} ${r * 0.3} -${r * 0.95} -${r * 0.78} -${r * 0.6} ${r * 0.95} 0 z`}
          />
        ))}
      </g>
      {/* Classic baby onesie / bodysuit silhouette in white outline */}
      <g transform="translate(100 152)" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round">
        {/* Main body shape */}
        <path d="
          M -30 -50
          C -30 -58, -20 -64, -10 -64
          L 10 -64
          C 20 -64, 30 -58, 30 -50
          L 44 -38
          C 50 -32, 50 -22, 44 -16
          L 32 -8
          L 32 30
          C 32 38, 26 44, 18 44
          L 8 44
          L 8 28
          C 8 24, 4 22, 0 22
          C -4 22, -8 24, -8 28
          L -8 44
          L -18 44
          C -26 44, -32 38, -32 30
          L -32 -8
          L -44 -16
          C -50 -22, -50 -32, -44 -38
          Z
        " />
        {/* Neckline */}
        <path d="M -10 -64 q 10 6 20 0" />
        {/* Snap buttons at crotch */}
        <circle cx="-6" cy="36" r="1.6" fill="#ffffff" stroke="none" />
        <circle cx="6" cy="36" r="1.6" fill="#ffffff" stroke="none" />
        {/* Tiny chest detail — small heart */}
        <path
          d="M0 -28 C -4 -32, -8 -34, -8 -38 a 3 3 0 0 1 8 -1 a 3 3 0 0 1 8 1 c 0 4, -4 6, -8 10 z"
          fill="#ffffff"
          fillOpacity="0.9"
          stroke="none"
        />
      </g>
      <CoverName name="BABY" color="#ffffff" secondary="WELCOMED WITH LOVE" />
    </svg>
  </ArtFrame>
);

const GraduationArt: React.FC = () => (
  <ArtFrame background="#1B2A4A">
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice">
      <DotPattern id="gradDots" color="#e8c98a" opacity={0.14} />
      <rect width="200" height="300" fill="url(#gradDots)" />
      {/* Mortarboard cap centered, gold fill, tassel to the right */}
      <g transform="translate(100 140)">
        {/* Cap base (band beneath the board) */}
        <path
          d="M -32 4 L -32 22 Q 0 36 32 22 L 32 4 Z"
          fill="#d8a955"
          stroke="#b88838"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Top board (square diamond) */}
        <polygon
          points="-50,-2 0,-26 50,-2 0,22"
          fill="#e8c98a"
          stroke="#b88838"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <polygon
          points="-50,-2 0,-26 50,-2 0,22"
          fill="none"
          stroke="#fff5e1"
          strokeOpacity="0.35"
          strokeWidth="0.6"
        />
        {/* Button at center */}
        <circle cx="0" cy="-2" r="3" fill="#b88838" />
        <circle cx="0" cy="-2" r="1.4" fill="#fff5e1" fillOpacity="0.8" />
        {/* Tassel cord curving to the right */}
        <path
          d="M 0 -2 Q 22 4 30 22"
          fill="none"
          stroke="#e8c98a"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        {/* Tassel binding */}
        <rect x="26" y="20" width="8" height="4" rx="1" fill="#b88838" />
        {/* Tassel knot */}
        <circle cx="30" cy="22" r="3.4" fill="#e8c98a" />
        {/* Tassel strands */}
        <g stroke="#e8c98a" strokeWidth="2" strokeLinecap="round" fill="none">
          <line x1="27" y1="25" x2="24" y2="42" />
          <line x1="30" y1="25" x2="30" y2="44" />
          <line x1="33" y1="25" x2="36" y2="42" />
          <line x1="29" y1="25" x2="27" y2="43" />
          <line x1="31" y1="25" x2="33" y2="43" />
        </g>
      </g>
      <CoverName name="GRADUATION" color="#e8c98a" secondary="WITH GRATITUDE" />
    </svg>
  </ArtFrame>
);

const BirthdayArt: React.FC = () => (
  <ArtFrame background="#7B3F6E">
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice">
      <DotPattern id="bdayDots" color="#f5e0c4" opacity={0.14} />
      <rect width="200" height="300" fill="url(#bdayDots)" />
      {/* Subtle confetti dots */}
      <g fill="#f5e0c4" fillOpacity="0.55">
        <circle cx="35" cy="60" r="1.6" /><circle cx="165" cy="70" r="1.6" />
        <circle cx="55" cy="105" r="1.2" /><circle cx="150" cy="115" r="1.2" />
        <circle cx="30" cy="195" r="1.4" /><circle cx="172" cy="200" r="1.4" />
        <circle cx="80" cy="50" r="1" /><circle cx="125" cy="55" r="1" />
      </g>
      {/* Birthday cake — cream/gold strokes, 3 lit candles */}
      <g transform="translate(100 160)" stroke="#f5e0c4" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Three flames */}
        <g fill="#f5e0c4" stroke="none">
          {/* Left flame */}
          <path d="M -22 -78 q 4 -6 0 -12 q -4 6 0 12 z" />
          <circle cx="-22" cy="-83" r="1" fill="#fff5e1" />
          {/* Center flame (slightly taller) */}
          <path d="M 0 -82 q 5 -7 0 -14 q -5 7 0 14 z" />
          <circle cx="0" cy="-88" r="1.2" fill="#fff5e1" />
          {/* Right flame */}
          <path d="M 22 -78 q 4 -6 0 -12 q -4 6 0 12 z" />
          <circle cx="22" cy="-83" r="1" fill="#fff5e1" />
        </g>
        {/* Candles */}
        <line x1="-22" y1="-66" x2="-22" y2="-50" strokeWidth="3" />
        <line x1="0" y1="-68" x2="0" y2="-50" strokeWidth="3" />
        <line x1="22" y1="-66" x2="22" y2="-50" strokeWidth="3" />
        {/* Top tier */}
        <path d="M -32 -50 L 32 -50 L 32 -28 L -32 -28 Z" />
        {/* Drips between tiers */}
        <path d="M -28 -28 q 3 6 6 0 q 3 6 6 0 q 3 6 6 0 q 3 6 6 0 q 3 6 6 0" />
        {/* Base tier */}
        <path d="M -48 -22 L 48 -22 L 48 14 L -48 14 Z" />
        {/* Decorative band on base */}
        <line x1="-48" y1="-4" x2="48" y2="-4" strokeWidth="1.4" strokeOpacity="0.7" />
        {/* Plate */}
        <ellipse cx="0" cy="18" rx="58" ry="4" />
      </g>
      <CoverName name="BIRTHDAY" color="#f5e0c4" secondary="ANOTHER YEAR · THANK YOU" />
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
  <ArtFrame background="#2C3E50">
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice">
      <DotPattern id="corpDots" color="#e8c98a" opacity={0.1} />
      <rect width="200" height="300" fill="url(#corpDots)" />
      {/* Award badge with ribbon tails — gold strokes */}
      <g transform="translate(100 130)" fill="none" stroke="#e8c98a" strokeLinecap="round" strokeLinejoin="round">
        {/* Ribbon tails behind badge */}
        <path d="M -22 28 L -32 78 L -16 66 L -6 86 L 4 36" strokeWidth="2.4" fill="#2C3E50" />
        <path d="M 22 28 L 32 78 L 16 66 L 6 86 L -4 36" strokeWidth="2.4" fill="#2C3E50" />
        {/* Outer medallion */}
        <circle cx="0" cy="0" r="42" strokeWidth="3" />
        {/* Inner ring */}
        <circle cx="0" cy="0" r="34" strokeWidth="1.4" strokeOpacity="0.7" />
        {/* Decorative notches around outer ring */}
        <g strokeWidth="1.4" strokeOpacity="0.85">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * Math.PI * 2) / 12;
            const x1 = Math.cos(a) * 42;
            const y1 = Math.sin(a) * 42;
            const x2 = Math.cos(a) * 47;
            const y2 = Math.sin(a) * 47;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
        {/* Center star */}
        <path
          d="M 0 -18 L 5 -6 L 18 -4 L 8 5 L 11 18 L 0 11 L -11 18 L -8 5 L -18 -4 L -5 -6 Z"
          fill="#e8c98a"
          stroke="#e8c98a"
          strokeWidth="1"
        />
      </g>
      <CoverName name="CORPORATE" color="#e8c98a" secondary="WITH APPRECIATION" />
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

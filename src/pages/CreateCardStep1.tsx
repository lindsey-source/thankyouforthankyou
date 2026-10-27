import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardWizard } from '@/contexts/CardWizardContext';
import { motion } from 'framer-motion';
import { ProgressBar } from '@/components/CardDesigner/ProgressBar';
import {
  Heart,
  Baby,
  GraduationCap,
  Cake,
  Star,
  Briefcase,
  Mail,
  Flame,
  HandHeart,
  type LucideIcon,
} from 'lucide-react';

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
  /** Muted deep background tone for the cover */
  bg: string;
  /** Thin-line gold icon — one consistent set, same stroke weight */
  Icon: LucideIcon;
}

/* ---------- Fine-stationery cover system ---------- */

const GOLD = '#d8c09a';        // soft gold-tone for icon + inner border
const CREAM = '#f3e7d3';       // warm cream for labels on deep tones

/**
 * One shared cover treatment for every occasion: muted deep tone, thin gold
 * inner border, faint paper grain, a single thin-line gold icon, and a light
 * letter-spaced serif label — matching the style cards' finish.
 */
const StationeryCover: React.FC<{ occasion: Occasion }> = ({ occasion }) => {
  const { Icon } = occasion;
  return (
    <div className="absolute inset-0" style={{ background: occasion.bg }}>
      {/* Faint paper grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 4px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 5px)',
        }}
        aria-hidden="true"
      />
      {/* Thin gold inner border */}
      <div
        className="absolute pointer-events-none"
        style={{ inset: '10px', border: `1px solid ${GOLD}`, opacity: 0.55 }}
        aria-hidden="true"
      />
      {/* Icon + label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-4">
        <Icon size={44} strokeWidth={1.1} color={GOLD} aria-hidden="true" />
        {/* Small ornament divider */}
        <div className="flex items-center gap-2" aria-hidden="true">
          <div style={{ width: '22px', height: '1px', backgroundColor: GOLD, opacity: 0.7 }} />
          <div style={{ width: '3px', height: '3px', backgroundColor: GOLD, transform: 'rotate(45deg)', opacity: 0.7 }} />
          <div style={{ width: '22px', height: '1px', backgroundColor: GOLD, opacity: 0.7 }} />
        </div>
        <span
          className="text-center uppercase"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 400,
            fontSize: '15px',
            letterSpacing: '0.16em',
            color: CREAM,
            lineHeight: 1.4,
          }}
        >
          {occasion.name}
        </span>
      </div>
    </div>
  );
};

const occasions: Occasion[] = [
  { id: 'wedding', name: 'Wedding', bg: '#6d3d4b', Icon: Heart },
  { id: 'baby', name: 'Baby', bg: '#4a6b7d', Icon: Baby },
  { id: 'graduation', name: 'Graduation', bg: '#1B2A4A', Icon: GraduationCap },
  { id: 'birthday', name: 'Birthday', bg: '#5e3355', Icon: Cake },
  { id: 'mitzvah', name: 'Bar / Bat Mitzvah', bg: '#1a2740', Icon: Star },
  { id: 'corporate', name: 'Corporate', bg: '#2C3E50', Icon: Briefcase },
  { id: 'general', name: 'General Thank You', bg: '#33543f', Icon: Mail },
  { id: 'memorial', name: 'Memorial', bg: '#4a4a56', Icon: Flame },
  { id: 'charity', name: 'Charity', bg: '#255555', Icon: HandHeart },
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
      <ProgressBar currentStep={1} />

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
          <motion.p
            className="mt-4 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#2d2420', opacity: 0.7 }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            You'll write a personal message and upload your guest list after — one card design sends to everyone who matters.
          </motion.p>
        </div>

        {/* Occasion Cards — premium greeting card covers */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
          {occasions.map((occasion, index) => {
            const isSelected = cardData.occasion === occasion.id;

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
                {/* Full-bleed cover artwork — taller 2:3 ratio for bolder presence */}
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: '2 / 3' }}>
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]">
                    <StationeryCover occasion={occasion} />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

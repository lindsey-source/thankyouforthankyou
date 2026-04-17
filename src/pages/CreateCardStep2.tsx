import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardWizard } from '@/contexts/CardWizardContext';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { toast } from 'sonner';
import { ProgressBar } from '@/components/CardDesigner/ProgressBar';

const STEP_NAMES = [
  'Choose Occasion',
  'Pick Your Style',
  'Customize Design',
  'Write Your Message',
  'Choose Your Cause',
  'Add Finishing Touches',
  'Preview & Send',
];

type DesignId = 'wedding-rose' | 'corporate-gold' | 'baby-sage' | 'gala-navy';

interface Design {
  id: DesignId;
  name: string;
  tag: string;
  tagBg: string;
  tagColor: string;
  donation: string;
  shadow: string;
  greeting: string;
  body: string;
  buttonBg: string;
  buttonColor: string;
  // Header style as JSX
}

const DESIGNS: Design[] = [
  {
    id: 'wedding-rose',
    name: 'Rose Branch',
    tag: 'Perfect for Weddings',
    tagBg: '#f5ede9',
    tagColor: '#8b4a5a',
    donation: '$4 to Rainforest Alliance',
    shadow: '0 10px 40px -12px rgba(193,123,138,0.18)',
    greeting: 'Dear Emma & James,',
    body: 'Your wedding was the most beautiful day…',
    buttonBg: '#c17b8a',
    buttonColor: '#fdf6f3',
  },
  {
    id: 'corporate-gold',
    name: 'Gilded Note',
    tag: 'Corporate & Professional',
    tagBg: '#f5efe2',
    tagColor: '#8a7340',
    donation: '$3 to local food bank',
    shadow: '0 10px 40px -12px rgba(201,169,110,0.18)',
    greeting: 'Dear Team,',
    body: 'Your hard work on Q3 made all the difference…',
    buttonBg: '#2d2420',
    buttonColor: '#c9a96e',
  },
  {
    id: 'baby-sage',
    name: 'Wildflower Sage',
    tag: 'Baby Showers & Birthdays',
    tagBg: '#eef2e8',
    tagColor: '#3d5a3a',
    donation: '$3 to UNICEF',
    shadow: '0 10px 40px -12px rgba(143,170,139,0.20)',
    greeting: 'Dear Sarah,',
    body: "We're so thrilled to celebrate baby Lily…",
    buttonBg: '#3d5a3a',
    buttonColor: '#fdf6f3',
  },
  {
    id: 'gala-navy',
    name: 'Midnight Gala',
    tag: 'Bar/Bat Mitzvahs & Galas',
    tagBg: '#1e2a3a',
    tagColor: '#c9a96e',
    donation: '$5 to Jewish Federation',
    shadow: '0 10px 40px -12px rgba(30,42,58,0.30)',
    greeting: 'Dear David,',
    body: "Your presence at Noah's Bar Mitzvah meant everything…",
    buttonBg: '#1e2a3a',
    buttonColor: '#c9a96e',
  },
];

// ----- Header components for each design -----

const WeddingRoseHeader = () => (
  <div
    className="relative flex items-center justify-center"
    style={{
      height: '220px',
      background: 'linear-gradient(180deg, #fdf6f3 0%, #f9d9d2 100%)',
    }}
  >
    <svg
      viewBox="0 0 200 120"
      className="absolute inset-0 w-full h-full opacity-90"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M30 100 C 60 80, 90 70, 170 30" stroke="#a87a6a" strokeWidth="0.9" />
      <path d="M70 78 C 64 72, 64 66, 70 64 C 74 68, 74 74, 70 78 Z" fill="#a8b89a" opacity="0.8" />
      <path d="M105 60 C 99 54, 99 48, 105 46 C 109 50, 109 56, 105 60 Z" fill="#a8b89a" opacity="0.8" />
      <path d="M140 44 C 134 38, 134 32, 140 30 C 144 34, 144 40, 140 44 Z" fill="#a8b89a" opacity="0.8" />
      <g transform="translate(60 70)">
        <circle cx="0" cy="0" r="6" fill="#c17b8a" opacity="0.85" />
        <circle cx="0" cy="0" r="3.5" fill="#b06070" opacity="0.9" />
        <circle cx="0" cy="0" r="1.5" fill="#8b4a5a" />
      </g>
      <g transform="translate(100 50)">
        <circle cx="0" cy="0" r="7" fill="#c17b8a" opacity="0.85" />
        <circle cx="0" cy="0" r="4" fill="#b06070" opacity="0.9" />
        <circle cx="0" cy="0" r="1.5" fill="#8b4a5a" />
      </g>
      <g transform="translate(150 32)">
        <circle cx="0" cy="0" r="6" fill="#c17b8a" opacity="0.85" />
        <circle cx="0" cy="0" r="3.5" fill="#b06070" opacity="0.9" />
        <circle cx="0" cy="0" r="1.5" fill="#8b4a5a" />
      </g>
    </svg>
    <span
      className="relative z-10 text-center px-4"
      style={{
        fontFamily: "'Dancing Script', cursive",
        fontSize: '44px',
        color: '#b06070',
        letterSpacing: '0.03em',
        lineHeight: 1.1,
      }}
    >
      With Love & Gratitude
    </span>
  </div>
);

const CorporateGoldHeader = () => (
  <div
    className="relative flex items-center justify-center"
    style={{ height: '220px', backgroundColor: '#faf6ef' }}
  >
    <div style={{ position: 'absolute', top: '20px', left: '20px', width: '24px', height: '24px', borderTop: '1px solid #c9a96e', borderLeft: '1px solid #c9a96e' }} />
    <div style={{ position: 'absolute', top: '20px', right: '20px', width: '24px', height: '24px', borderTop: '1px solid #c9a96e', borderRight: '1px solid #c9a96e' }} />
    <div style={{ position: 'absolute', bottom: '20px', left: '20px', width: '24px', height: '24px', borderBottom: '1px solid #c9a96e', borderLeft: '1px solid #c9a96e' }} />
    <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '24px', height: '24px', borderBottom: '1px solid #c9a96e', borderRight: '1px solid #c9a96e' }} />
    <div className="flex flex-col items-center">
      <div style={{ width: '90px', height: '1px', backgroundColor: '#c9a96e', marginBottom: '16px' }} />
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '15px',
          letterSpacing: '0.28em',
          color: '#2d2420',
          fontWeight: 400,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        A Note of Appreciation
      </span>
      <div style={{ width: '90px', height: '1px', backgroundColor: '#c9a96e', marginTop: '16px' }} />
    </div>
  </div>
);

const BabySageHeader = () => (
  <div
    className="relative flex items-center justify-center"
    style={{
      height: '220px',
      background: 'linear-gradient(180deg, #eef2e8 0%, #c5d4bc 100%)',
    }}
  >
    <svg
      viewBox="0 0 200 120"
      className="absolute inset-0 w-full h-full opacity-80"
      fill="none"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M28 110 C 30 90, 32 70, 30 48" stroke="#5e7a5a" strokeWidth="0.8" />
      <path d="M30 70 C 24 66, 22 60, 26 56 C 30 60, 32 66, 30 70 Z" fill="#5e7a5a" opacity="0.7" />
      <path d="M30 56 C 36 52, 38 46, 34 42 C 30 46, 30 52, 30 56 Z" fill="#5e7a5a" opacity="0.7" />
      <circle cx="30" cy="44" r="2" fill="#c17b8a" opacity="0.7" />
      <circle cx="33" cy="40" r="1.6" fill="#c17b8a" opacity="0.7" />
      <circle cx="27" cy="40" r="1.6" fill="#c17b8a" opacity="0.7" />
      <path d="M172 110 C 170 90, 168 70, 170 48" stroke="#5e7a5a" strokeWidth="0.8" />
      <path d="M170 70 C 176 66, 178 60, 174 56 C 170 60, 168 66, 170 70 Z" fill="#5e7a5a" opacity="0.7" />
      <path d="M170 56 C 164 52, 162 46, 166 42 C 170 46, 170 52, 170 56 Z" fill="#5e7a5a" opacity="0.7" />
      <circle cx="170" cy="44" r="2" fill="#fbeaa0" opacity="0.85" />
      <circle cx="173" cy="40" r="1.6" fill="#fbeaa0" opacity="0.85" />
      <circle cx="167" cy="40" r="1.6" fill="#fbeaa0" opacity="0.85" />
    </svg>
    <span
      className="relative z-10 text-center px-4"
      style={{
        fontFamily: "'Dancing Script', cursive",
        fontSize: '44px',
        color: '#3d5a3a',
        letterSpacing: '0.03em',
        lineHeight: 1.1,
      }}
    >
      Welcome, Little One
    </span>
  </div>
);

const GalaNavyHeader = () => (
  <div
    className="relative flex items-center justify-center"
    style={{ height: '220px', backgroundColor: '#1e2a3a' }}
  >
    <div
      className="absolute"
      style={{
        width: '60px',
        height: '60px',
        borderRadius: '9999px',
        border: '1px solid rgba(255,255,255,0.5)',
        top: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          color: '#ffffff',
          fontSize: '24px',
          letterSpacing: '0.05em',
        }}
      >
        TY
      </span>
    </div>
    <span
      className="text-center px-4"
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: '32px',
        color: '#c9a96e',
        fontStyle: 'italic',
        fontWeight: 500,
        marginTop: '80px',
        letterSpacing: '0.02em',
        lineHeight: 1.15,
      }}
    >
      L'Chaim & Thank You
    </span>
  </div>
);

const HEADER_MAP: Record<DesignId, React.FC> = {
  'wedding-rose': WeddingRoseHeader,
  'corporate-gold': CorporateGoldHeader,
  'baby-sage': BabySageHeader,
  'gala-navy': GalaNavyHeader,
};

export default function CreateCardStep2() {
  const navigate = useNavigate();
  const { updateCardData, setCurrentStep } = useCardWizard();
  const [selectedId, setSelectedId] = useState<DesignId | null>(null);

  const handleContinue = () => {
    if (!selectedId) {
      toast.error('Please choose a design');
      return;
    }
    const design = DESIGNS.find((d) => d.id === selectedId);
    if (!design) return;

    updateCardData({
      templateId: null,
      colorPalette: { theme: design.id },
      fontChoice: design.id === 'corporate-gold' ? 'inter' : 'playfair',
    });
    setCurrentStep(3);
    navigate('/create-card/step3');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf7f2' }}>
      <ProgressBar currentStep={2} totalSteps={7} stepNames={STEP_NAMES} />

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8 pb-32">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2a2622' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Your Card Design
          </motion.h1>
          <motion.p
            className="text-base md:text-lg max-w-xl mx-auto"
            style={{ color: '#6b6259' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            Choose a design you love. You'll customize the details next.
          </motion.p>
        </div>

        {/* Back link */}
        <button
          onClick={() => navigate('/create-card/step1')}
          className="inline-flex items-center gap-2 text-sm mb-8 transition-opacity hover:opacity-70"
          style={{ color: '#8a8079' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to occasions
        </button>

        {/* Premium card mockup grid — 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {DESIGNS.map((design, index) => {
            const Header = HEADER_MAP[design.id];
            const isSelected = selectedId === design.id;
            return (
              <motion.button
                key={design.id}
                type="button"
                onClick={() => setSelectedId(design.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className="group relative text-left rounded-2xl overflow-hidden bg-white transition-all duration-300"
                style={{
                  border: isSelected ? '2px solid #c17b8a' : '1px solid #ede8e3',
                  boxShadow: isSelected
                    ? '0 16px 44px rgba(193, 123, 138, 0.22)'
                    : design.shadow,
                }}
              >
                {/* Selected check */}
                {isSelected && (
                  <div
                    className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center shadow-md"
                    style={{ backgroundColor: '#c17b8a' }}
                  >
                    <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                )}

                {/* Designed header */}
                <Header />

                {/* Body */}
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs"
                      style={{ backgroundColor: design.tagBg, color: design.tagColor }}
                    >
                      {design.tag}
                    </span>
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                      style={{ backgroundColor: '#eef2e8', color: '#3d5a3a' }}
                    >
                      💚 {design.donation}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: '#2d2420',
                      fontSize: '16px',
                    }}
                  >
                    {design.greeting}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed line-clamp-1" style={{ color: '#2d2420', opacity: 0.7 }}>
                    {design.body}
                  </p>
                  <div
                    className="mt-4 w-full py-2 rounded-md text-sm text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: design.buttonBg, color: design.buttonColor }}
                  >
                    Preview Card
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Sticky footer */}
      {selectedId && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-md"
          style={{
            backgroundColor: 'rgba(250, 247, 242, 0.92)',
            borderColor: '#ede8e3',
          }}
        >
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
            <p className="text-sm" style={{ color: '#6b6259' }}>
              Beautiful choice — let's customize it.
            </p>
            <button
              onClick={handleContinue}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: '#c17b8a',
                boxShadow: '0 6px 18px rgba(193, 123, 138, 0.35)',
              }}
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

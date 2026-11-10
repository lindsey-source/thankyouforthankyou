import { useNavigate } from 'react-router-dom';
import { useCardWizard } from '@/contexts/CardWizardContext';
import { motion } from 'framer-motion';
import { ProgressBar } from '@/components/CardDesigner/ProgressBar';
import IconCircle from '@/components/stationery/IconCircle';
import { OCCASION_TILES, type OccasionId } from '@/lib/occasionTiles';

export default function CreateCardStep1() {
  const navigate = useNavigate();
  const { cardData, updateCardData, setCurrentStep } = useCardWizard();

  const handleOccasionSelect = (occasionId: OccasionId) => {
    updateCardData({ occasion: occasionId });
    setCurrentStep(2);
    navigate('/create-card/step2');
  };

  return (
    <div className="min-h-screen">
      <ProgressBar currentStep={1} />

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-12 md:pt-16 pb-24">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h1
            className="text-4xl md:text-6xl tracking-tight"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Choose Your Occasion
          </motion.h1>
          <motion.p
            className="mt-4 text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            You'll write a personal message and upload your guest list after — one card design sends to everyone who matters.
          </motion.p>
        </div>

        {/* Occasion tiles — white stationery cards, hairline gold border */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
          {OCCASION_TILES.map((occasion, index) => {
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
                className={`occasion-tile group ${isSelected ? 'is-selected' : ''}`}
                aria-pressed={isSelected}
                aria-label={`Select ${occasion.name}`}
              >
                <IconCircle Icon={occasion.Icon} tone={occasion.tone} size="md" />
                <span className="occasion-tile-title">{occasion.name}</span>
                <span className="occasion-tile-line">{occasion.line}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

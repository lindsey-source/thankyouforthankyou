import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardWizard } from '@/contexts/CardWizardContext';
import { motion } from 'framer-motion';
import { Heart, Baby, GraduationCap, Cake, Gift, Flower2, HandHeart } from 'lucide-react';
import { ProgressBar } from '@/components/CardDesigner/ProgressBar';

import weddingSample from '@/assets/card-wedding-elegant.jpg';
import babySample from '@/assets/card-baby-arrival.jpg';
import graduationSample from '@/assets/card-graduation-rays.jpg';
import birthdaySample from '@/assets/card-birthday-modern.jpg';
import generalSample from '@/assets/card-thank-you-artistic.jpg';
import memorialSample from '@/assets/card-memorial-nature.jpg';
import charitySample from '@/assets/card-charity-hands.jpg';

const STEP_NAMES = [
  'Choose Occasion',
  'Pick Your Style',
  'Customize Design',
  'Write Your Message',
  'Choose Your Cause',
  'Add Finishing Touches',
  'Preview & Send',
];

const occasions = [
  { id: 'wedding', name: 'Wedding', tagline: 'Celebrate your big day', icon: Heart, image: weddingSample },
  { id: 'baby', name: 'Baby', tagline: 'Welcome the little one', icon: Baby, image: babySample },
  { id: 'graduation', name: 'Graduation', tagline: 'Honor the achievement', icon: GraduationCap, image: graduationSample },
  { id: 'birthday', name: 'Birthday', tagline: 'Mark another year', icon: Cake, image: birthdaySample },
  { id: 'general', name: 'General Thank You', tagline: 'Everyday gratitude', icon: Gift, image: generalSample },
  { id: 'memorial', name: 'Memorial', tagline: 'A gentle tribute', icon: Flower2, image: memorialSample },
  { id: 'charity', name: 'Charity', tagline: 'Give back with grace', icon: HandHeart, image: charitySample },
];

export default function CreateCardStep1() {
  const navigate = useNavigate();
  const { cardData, updateCardData, setCurrentStep } = useCardWizard();

  const handleOccasionSelect = (occasionId: string) => {
    updateCardData({ occasion: occasionId });
    setCurrentStep(2);
    navigate('/create-card/step2');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf7f2' }}>
      <ProgressBar currentStep={1} totalSteps={7} stepNames={STEP_NAMES} />

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-24 pb-20">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.h1
            className="text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2a2622' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Your Occasion
          </motion.h1>
          <motion.p
            className="text-base md:text-lg max-w-xl mx-auto"
            style={{ color: '#6b6259' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            Choose the moment you're celebrating. We'll tailor each detail to fit.
          </motion.p>
        </div>

        {/* Occasion Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {occasions.map((occasion, index) => {
            const Icon = occasion.icon;
            const isSelected = cardData.occasion === occasion.id;

            return (
              <motion.button
                key={occasion.id}
                type="button"
                onClick={() => handleOccasionSelect(occasion.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className="group text-left rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: '#ffffff',
                  border: isSelected ? '2px solid #c17b8a' : '1px solid #ede8e3',
                  boxShadow: isSelected
                    ? '0 12px 32px rgba(193, 123, 138, 0.18)'
                    : '0 4px 16px rgba(42, 38, 34, 0.04)',
                }}
              >
                {/* Sample card preview */}
                <div className="relative w-full aspect-[4/5] overflow-hidden" style={{ backgroundColor: '#f5f1ea' }}>
                  <img
                    src={occasion.image}
                    alt={`${occasion.name} sample card`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(180deg, transparent 60%, rgba(42, 38, 34, 0.25) 100%)',
                    }}
                  />
                </div>

                {/* Footer with icon + name */}
                <div className="px-6 py-5 flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: isSelected ? '#c17b8a' : '#f5f1ea' }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: isSelected ? '#ffffff' : '#8a9a82' }}
                      strokeWidth={1.75}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3
                      className="text-lg leading-tight"
                      style={{ fontFamily: "'Playfair Display', serif", color: '#2a2622' }}
                    >
                      {occasion.name}
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: '#8a8079' }}>
                      {occasion.tagline}
                    </p>
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

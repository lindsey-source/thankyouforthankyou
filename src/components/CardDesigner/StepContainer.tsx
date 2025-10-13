import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface StepContainerProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  showNext?: boolean;
  isNextDisabled?: boolean;
}

export const StepContainer: React.FC<StepContainerProps> = ({
  children,
  title,
  subtitle,
  onBack,
  onNext,
  nextLabel = 'Next',
  showNext = true,
  isNextDisabled = false
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {title}
        </motion.h1>
        <motion.p 
          className="text-lg text-white/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {children}
      </motion.div>

      {(onBack || (onNext && showNext)) && (
        <div className="mt-8 flex justify-between items-center">
          {onBack ? (
            <Button
              variant="outline"
              onClick={onBack}
              className="bg-white/95 hover:bg-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          ) : (
            <div /> 
          )}
          
          {onNext && showNext && (
            <Button 
              variant="hero" 
              onClick={onNext}
              disabled={isNextDisabled}
            >
              {nextLabel}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

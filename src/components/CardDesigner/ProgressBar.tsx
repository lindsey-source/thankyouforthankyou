import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepNames: string[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  currentStep, 
  totalSteps, 
  stepNames 
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-white mb-1">
          {stepNames[currentStep - 1]}
        </h3>
        <p className="text-sm text-white/70">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
      
      <div className="h-2 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
};

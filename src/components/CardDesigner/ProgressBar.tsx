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
  stepNames,
}) => {
  const progress = (currentStep / totalSteps) * 100;
  const stepName = stepNames[currentStep - 1] ?? '';

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Thin rose progress line */}
      <div className="h-[2px] w-full bg-transparent">
        <motion.div
          className="h-full"
          style={{ backgroundColor: '#c17b8a' }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>

      {/* Sage step label */}
      <div className="flex justify-center pt-3 pb-2">
        <span
          className="text-[11px] tracking-[0.2em] uppercase font-medium"
          style={{ color: '#8a9a82' }}
        >
          {stepName} · Step {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { WIZARD_STEP_NAMES, WIZARD_TOTAL_STEPS } from '@/lib/wizardSteps';

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
  stepNames?: string[];
  /** Escape parent page padding (p-4 md:p-8) so the bar spans edge to edge. */
  bleed?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps = WIZARD_TOTAL_STEPS,
  stepNames = WIZARD_STEP_NAMES,
  bleed = false,
}) => {
  const progress = (currentStep / totalSteps) * 100;
  const stepName = stepNames[currentStep - 1] ?? '';

  return (
    <div className={`wizard-topbar mb-8 ${bleed ? '-mx-4 md:-mx-8 -mt-4 md:-mt-8' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" aria-label="Thank You for Thank You home">
          <img src="/logo.png" alt="Thank You for Thank You" className="h-12 w-auto" style={{ mixBlendMode: 'multiply' }} />
        </Link>
        <span className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
          {stepName} · Step {currentStep} of {totalSteps}
        </span>
      </div>
      <div className="h-px w-full bg-border/40">
        <motion.div
          className="h-full wizard-gold-line"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
};

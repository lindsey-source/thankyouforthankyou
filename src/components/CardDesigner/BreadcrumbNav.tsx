import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface BreadcrumbNavProps {
  currentStep: number;
  steps: Array<{ name: string; path: string }>;
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ 
  currentStep, 
  steps 
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center flex-wrap gap-2 mb-6 px-4">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;
        const isClickable = stepNumber < currentStep;

        return (
          <React.Fragment key={stepNumber}>
            <motion.button
              onClick={() => isClickable && navigate(step.path)}
              disabled={!isClickable && !isActive}
              className={`
                px-3 py-1.5 rounded-full text-sm font-medium transition-all
                ${isActive 
                  ? 'bg-white text-primary shadow-md' 
                  : isCompleted 
                    ? 'bg-white/70 text-primary/80 hover:bg-white hover:shadow-md cursor-pointer' 
                    : 'bg-white/30 text-white/50 cursor-not-allowed'
                }
              `}
              whileHover={isClickable ? { scale: 1.05 } : {}}
              whileTap={isClickable ? { scale: 0.95 } : {}}
            >
              {stepNumber}. {step.name}
            </motion.button>
            
            {stepNumber < steps.length && (
              <ChevronRight className="w-4 h-4 text-white/50" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

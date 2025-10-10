import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface StickyFooterCTAProps {
  visible: boolean;
  onContinue: () => void;
}

export const StickyFooterCTA: React.FC<StickyFooterCTAProps> = ({
  visible,
  onContinue
}) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t shadow-lg z-50"
        >
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Template selected. Ready to continue?
            </p>
            <Button
              onClick={onContinue}
              size="lg"
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

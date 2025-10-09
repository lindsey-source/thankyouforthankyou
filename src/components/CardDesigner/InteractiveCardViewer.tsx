import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { CardTemplate } from './CardTemplates';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface InteractiveCardViewerProps {
  template: CardTemplate;
  photo: { file: File; preview: string } | null;
  message: string;
  recipientName: string;
  senderName: string;
  charityName?: string;
}

type Stage = 'envelope' | 'card-front' | 'card-interior';

export const InteractiveCardViewer: React.FC<InteractiveCardViewerProps> = ({
  template,
  photo,
  message,
  recipientName,
  senderName,
  charityName
}) => {
  const [stage, setStage] = useState<Stage>('envelope');
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleEnvelopeClick = () => {
    setHasInteracted(true);
    setStage('card-front');
    setTimeout(() => setStage('card-interior'), 1200);
  };

  const handleReset = () => {
    setStage('envelope');
    setHasInteracted(false);
  };

  // Get occasion-specific colors
  const getOccasionColors = () => {
    switch (template.category) {
      case 'wedding':
        return { primary: '#F5E6D3', accent: '#D4A574', text: '#8B6F47' };
      case 'baby':
      case 'baby-shower':
        return { primary: '#FFF0F5', accent: '#FFB6C1', text: '#8B7355' };
      case 'celebration':
        return { primary: '#FFF9E6', accent: '#FFD700', text: '#FF6B6B' };
      case 'memorial':
        return { primary: '#F8FBF8', accent: '#9DB5A5', text: '#6B8B7F' };
      default:
        return { primary: '#FFF8F0', accent: '#F4A460', text: '#8B7355' };
    }
  };

  const colors = getOccasionColors();

  return (
    <div className="relative w-full h-full min-h-[600px] flex items-center justify-center bg-gradient-to-br from-background to-muted/30 p-8">
      <AnimatePresence mode="wait">
        {stage === 'envelope' && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="cursor-pointer"
            onClick={handleEnvelopeClick}
          >
            {/* Envelope */}
            <div className="relative w-80 h-56 group">
              {/* Envelope body */}
              <div 
                className="absolute inset-0 rounded-sm shadow-2xl transition-transform group-hover:scale-105"
                style={{ backgroundColor: colors.primary }}
              >
                {/* Envelope texture overlay */}
                <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
                
                {/* Recipient name */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-8">
                  <p className="font-serif text-sm mb-1" style={{ color: colors.text }}>To:</p>
                  <p className="font-serif text-xl font-semibold" style={{ color: colors.text }}>
                    {recipientName || 'Dear Friend'}
                  </p>
                </div>

                {/* Envelope flap shadow */}
                <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/5 to-transparent"></div>
              </div>

              {/* Envelope flap */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-32 rounded-t-sm shadow-lg origin-top"
                style={{ 
                  backgroundColor: colors.accent,
                  clipPath: 'polygon(0 0, 50% 100%, 100% 0)'
                }}
                animate={hasInteracted ? { rotateX: 180 } : {}}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {/* Seal */}
                <div className="absolute top-24 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center">
                  <Heart className="w-5 h-5" style={{ color: colors.accent }} fill="currentColor" />
                </div>
              </motion.div>

              {/* Tap instruction */}
              <motion.div
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-sm text-muted-foreground"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Tap to open
              </motion.div>
            </div>
          </motion.div>
        )}

        {stage === 'card-front' && (
          <motion.div
            key="card-front"
            initial={{ y: 100, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            {/* Card front */}
            <Card className="w-80 h-96 shadow-2xl overflow-hidden">
              <div className="relative w-full h-full">
                {/* Template background */}
                <img 
                  src={template.preview}
                  alt="Card front"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Overlay with occasion text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-center p-8">
                  <motion.h2 
                    className="font-serif text-3xl text-white text-center drop-shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Thank You
                  </motion.h2>
                </div>

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </Card>
          </motion.div>
        )}

        {stage === 'card-interior' && (
          <motion.div
            key="card-interior"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            {/* Opened card */}
            <div className="flex gap-2 perspective-1000">
              {/* Left side - Card front (opened) */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -15 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="origin-right"
              >
                <Card className="w-80 h-96 shadow-2xl overflow-hidden">
                  <div className="relative w-full h-full">
                    <img 
                      src={template.preview}
                      alt="Card design"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {photo && (
                      <div className="absolute inset-4 rounded-lg overflow-hidden shadow-lg">
                        <img 
                          src={photo.preview}
                          alt="Your photo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>

              {/* Right side - Message */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 15 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="origin-left"
              >
                <Card className="w-80 h-96 shadow-2xl overflow-hidden" style={{ backgroundColor: colors.primary }}>
                  <div className="relative w-full h-full p-8 flex flex-col justify-between">
                    {/* Message content */}
                    <div className="space-y-6 flex-1 flex flex-col justify-center">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-4"
                      >
                        <p className="font-serif text-base leading-relaxed" style={{ color: colors.text }}>
                          {message || `Dear ${recipientName || 'Friend'}, thank you so much for your thoughtful gift and support!`}
                        </p>
                        
                        <p className="font-serif text-sm italic text-right" style={{ color: colors.accent }}>
                          With gratitude,<br />
                          <span className="font-semibold">{senderName || 'Anonymous'}</span>
                        </p>
                      </motion.div>

                      {/* Charity acknowledgment */}
                      {charityName && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="pt-4 border-t border-current/20"
                        >
                          <div className="flex items-center gap-2 text-xs" style={{ color: colors.text }}>
                            <Heart className="w-4 h-4" fill="currentColor" />
                            <p>
                              A donation was made in your honor to <span className="font-semibold">{charityName}</span>
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Footer branding */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-center text-xs opacity-50"
                      style={{ color: colors.text }}
                    >
                      Sent with gratitude via Thank You for Thank You
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Reset button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={handleReset}
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Close card
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
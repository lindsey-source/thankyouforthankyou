import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RotateCcw } from 'lucide-react';

interface EnvelopeRevealProps {
  /** The card face to reveal (e.g. LiveCardPreview). */
  children: React.ReactNode;
  recipientName?: string;
  /** Envelope body color — defaults to warm cream. */
  envelopeColor?: string | null;
  /** Liner color peeking from the flap — defaults to dusty rose. */
  linerColor?: string;
}

/**
 * "See it as your guests will" — a sealed envelope whose flap opens and
 * lets the card rise out, then settles into the full-size card view.
 * Calm, stationery-grade motion: one open gesture, no looping.
 */
export const EnvelopeReveal: React.FC<EnvelopeRevealProps> = ({
  children,
  recipientName,
  envelopeColor,
  linerColor = '#c17b8a',
}) => {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const body = envelopeColor || '#f3ebe3';
  const goldLine = 'rgba(176, 141, 79, 0.55)';

  const replay = () => {
    setRevealed(false);
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center">
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.45 }}
            className="relative w-[320px] sm:w-[360px]"
            style={{ perspective: '1200px' }}
          >
            {/* Card rising out of the envelope — clipped below the envelope's bottom edge
                so it stays hidden until it rises above the flap line */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{ clipPath: 'inset(-160% 0 0 0)' }}
            >
              <motion.div
                className="absolute left-1/2 w-[240px] sm:w-[270px] aspect-[3/4]"
                style={{ x: '-50%', top: '10%' }}
                initial={false}
                animate={open ? { y: '-56%' } : { y: '4%' }}
                transition={{ delay: open ? 0.45 : 0, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={() => {
                  if (open) setRevealed(true);
                }}
              >
                <div
                  className="w-full h-full rounded-xl overflow-hidden bg-white"
                  style={{ boxShadow: '0 18px 44px -14px rgba(45, 36, 32, 0.28)' }}
                >
                  {children}
                </div>
              </motion.div>
            </div>

            {/* Envelope body */}
            <div
              className="relative z-20 w-full aspect-[7/5] rounded-2xl overflow-hidden"
              style={{
                backgroundColor: body,
                backgroundImage:
                  'repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 5px)',
                boxShadow: '0 24px 60px -18px rgba(45, 36, 32, 0.25)',
              }}
            >
              {/* Thin gold-tone inner border */}
              <div
                className="absolute inset-[10px] rounded-xl pointer-events-none"
                style={{ border: `1px solid ${goldLine}` }}
                aria-hidden="true"
              />

              {/* Front pocket folds */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top right, transparent 49.6%, rgba(45,36,32,0.06) 50%, transparent 50.4%), linear-gradient(to top left, transparent 49.6%, rgba(45,36,32,0.06) 50%, transparent 50.4%)`,
                }}
                aria-hidden="true"
              />

              {/* Recipient name */}
              <div className="absolute inset-x-0 bottom-[18%] text-center px-6">
                <p
                  className="text-lg sm:text-xl"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: '#2d2420',
                    letterSpacing: '0.04em',
                  }}
                >
                  For {recipientName?.trim() || 'someone dear'}
                </p>
              </div>
            </div>

            {/* Flap — rotates open */}
            <motion.div
              className="absolute top-0 left-0 right-0 z-30"
              style={{
                height: '52%',
                transformOrigin: 'top center',
                transformStyle: 'preserve-3d',
              }}
              initial={false}
              animate={open ? { rotateX: 180 } : { rotateX: 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              {/* Flap front */}
              <div
                className="absolute inset-0 rounded-t-2xl"
                style={{
                  background: body,
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  filter: 'brightness(0.96)',
                  backfaceVisibility: 'hidden',
                }}
              />
              {/* Flap liner (seen when open) */}
              <div
                className="absolute inset-0 rounded-t-2xl"
                style={{
                  background: linerColor,
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  transform: 'rotateX(180deg)',
                  backfaceVisibility: 'hidden',
                  opacity: 0.92,
                }}
              />
            </motion.div>

            {/* Seal — the click target when closed */}
            {!open && (
              <motion.button
                type="button"
                onClick={() => setOpen(true)}
                className="absolute left-1/2 top-[46%] z-40 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-105"
                style={{
                  backgroundColor: linerColor,
                  boxShadow: '0 6px 18px rgba(193, 123, 138, 0.45)',
                }}
                aria-label="Open your envelope"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Heart className="w-5 h-5 text-white" strokeWidth={1.75} />
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 0.92, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="w-[300px] sm:w-[340px]"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prompt / replay */}
      <div className="mt-6 h-6">
        {!open && !revealed && (
          <p
            className="text-sm tracking-wide"
            style={{ color: '#8a8079' }}
          >
            Tap the seal to open your envelope
          </p>
        )}
        {revealed && (
          <button
            type="button"
            onClick={replay}
            className="inline-flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70"
            style={{ color: '#8a8079' }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Replay the opening
          </button>
        )}
      </div>
    </div>
  );
};

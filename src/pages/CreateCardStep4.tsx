import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardWizard } from '@/contexts/CardWizardContext';
import { useAuth } from '@/contexts/AuthContext';
import { useAutoSave } from '@/hooks/useAutoSave';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Lightbulb, Check } from 'lucide-react';
import { toast } from 'sonner';
import { ProgressBar } from '@/components/CardDesigner/ProgressBar';
import { getTemplateImage } from '@/lib/templateImageMap';

const STEP_NAMES = [
  'Choose Occasion',
  'Pick Your Style',
  'Customize Design',
  'Write Your Message',
  'Add Finishing Touches',
  'Preview & Send',
];

const sampleMessages: Record<string, Array<{ headline: string; body: string; closing: string }>> = {
  wedding: [
    { headline: 'With Love & Gratitude', body: 'Thank you for celebrating our special day with us. Your presence made our wedding truly unforgettable.', closing: 'Love always' },
    { headline: 'Forever Grateful', body: 'Your thoughtful gift and warm wishes mean the world to us as we begin this new chapter together.', closing: 'With appreciation' },
  ],
  baby: [
    { headline: 'Welcome to the World', body: 'Thank you for the beautiful gift and for celebrating the arrival of our little one with us!', closing: 'With love' },
    { headline: 'Our Hearts Are Full', body: 'Your kindness and generosity have touched our hearts during this special time.', closing: 'Gratefully yours' },
  ],
  general: [
    { headline: 'Thank You So Much', body: 'Your thoughtfulness and generosity have truly brightened my day. I am so grateful to have you in my life.', closing: 'With heartfelt thanks' },
    { headline: 'Deeply Grateful', body: 'Words cannot express how much your kindness means to me. Thank you for being so wonderful.', closing: 'Warmly' },
  ],
};

export default function CreateCardStep3Message() {
  const navigate = useNavigate();
  const { cardData, updateCardData, setCurrentStep } = useCardWizard();
  const { userId } = useAuth();
  const [showInspiration, setShowInspiration] = useState(false);
  const [cardId, setCardId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    messageHeadline: cardData.messageHeadline || '',
    messageBody: cardData.messageBody || '',
    closing: cardData.closing || '',
  });

  useAutoSave(
    {
      template_id: cardData.templateId,
      message_headline: formData.messageHeadline,
      message_body: formData.messageBody,
      closing: formData.closing,
      color_palette: cardData.colorPalette,
      font_choice: cardData.fontChoice,
    },
    userId ?? undefined,
    cardId,
    setCardId
  );

  const getOccasionMessages = () => {
    const occasion = cardData.occasion || 'general';
    return sampleMessages[occasion] || sampleMessages.general;
  };

  const handleUseInspiration = (sample: { headline: string; body: string; closing: string }) => {
    setFormData({
      messageHeadline: sample.headline,
      messageBody: sample.body,
      closing: sample.closing,
    });
    setShowInspiration(false);
  };

  const handleNext = () => {
    if (!formData.messageBody.trim()) {
      toast.error('Please write your thank you message');
      return;
    }
    updateCardData({
      messageHeadline: formData.messageHeadline,
      messageBody: formData.messageBody,
      closing: formData.closing,
    });
    setCurrentStep(5);
    navigate('/create-card/step5');
  };

  const previewImage = cardData.templateId
    ? getTemplateImage((cardData as any).previewImage || '')
    : null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf7f2' }}>
      <ProgressBar currentStep={4} totalSteps={6} stepNames={STEP_NAMES} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-32">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h1
            className="text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2a2622' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Your Message
          </motion.h1>
          <motion.p
            className="text-base md:text-lg max-w-xl mx-auto"
            style={{ color: '#6b6259' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            Write something meaningful — see it come alive on your card.
          </motion.p>
        </div>

        {/* Back link */}
        <button
          onClick={() => navigate('/create-card/step3')}
          className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:opacity-70"
          style={{ color: '#8a8079' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* LEFT — Writing area */}
          <div className="space-y-7">
            {/* Inspiration toggle */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowInspiration(!showInspiration)}
                className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
                style={{ color: '#8a9a82' }}
              >
                <Lightbulb className="w-4 h-4" />
                Need inspiration?
              </button>
            </div>

            <AnimatePresence>
              {showInspiration && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 overflow-hidden"
                >
                  {getOccasionMessages().map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleUseInspiration(sample)}
                      className="w-full text-left p-4 rounded-xl transition-all hover:shadow-md"
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #ede8e3',
                      }}
                    >
                      <h4
                        className="text-base mb-1"
                        style={{ fontFamily: "'Playfair Display', serif", color: '#2a2622' }}
                      >
                        {sample.headline}
                      </h4>
                      <p className="text-sm mb-2" style={{ color: '#6b6259' }}>
                        {sample.body}
                      </p>
                      <p className="text-xs italic" style={{ color: '#8a8079' }}>
                        {sample.closing}
                      </p>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Headline */}
            <div className="space-y-2">
              <label
                className="text-xs uppercase tracking-[0.18em]"
                style={{ color: '#8a9a82' }}
              >
                Headline
              </label>
              <input
                type="text"
                placeholder="With Heartfelt Thanks"
                value={formData.messageHeadline}
                onChange={(e) => setFormData({ ...formData, messageHeadline: e.target.value })}
                className="w-full bg-transparent border-0 border-b text-2xl py-3 focus:outline-none focus:border-b-2 transition-all"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: '#2a2622',
                  borderColor: '#ede8e3',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#c17b8a')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#ede8e3')}
              />
            </div>

            {/* Body */}
            <div className="space-y-2">
              <label
                className="text-xs uppercase tracking-[0.18em]"
                style={{ color: '#8a9a82' }}
              >
                Your Message
              </label>
              <textarea
                placeholder="Write your heartfelt thank you message here..."
                value={formData.messageBody}
                onChange={(e) => setFormData({ ...formData, messageBody: e.target.value })}
                rows={8}
                className="w-full bg-transparent border rounded-xl p-4 text-base leading-relaxed resize-none focus:outline-none transition-all"
                style={{
                  color: '#2a2622',
                  borderColor: '#ede8e3',
                  backgroundColor: '#ffffff',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#c17b8a')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#ede8e3')}
              />
              <p className="text-xs text-right" style={{ color: '#8a8079' }}>
                {formData.messageBody.length} characters
              </p>
            </div>

            {/* Closing */}
            <div className="space-y-2">
              <label
                className="text-xs uppercase tracking-[0.18em]"
                style={{ color: '#8a9a82' }}
              >
                Closing
              </label>
              <input
                type="text"
                placeholder="With gratitude, [Your Name]"
                value={formData.closing}
                onChange={(e) => setFormData({ ...formData, closing: e.target.value })}
                className="w-full bg-transparent border-0 border-b text-lg italic py-3 focus:outline-none focus:border-b-2 transition-all"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: '#2a2622',
                  borderColor: '#ede8e3',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#c17b8a')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#ede8e3')}
              />
            </div>

            {cardId && (
              <div className="flex items-center gap-2 text-sm" style={{ color: '#8a9a82' }}>
                <Check className="w-4 h-4" />
                Draft saved automatically
              </div>
            )}
          </div>

          {/* RIGHT — Live card preview */}
          <div className="lg:sticky lg:top-28">
            <p
              className="text-xs uppercase tracking-[0.2em] mb-4 text-center"
              style={{ color: '#8a9a82' }}
            >
              Live Preview
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-2xl overflow-hidden"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #ede8e3',
                boxShadow: '0 20px 50px rgba(42, 38, 34, 0.10)',
              }}
            >
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Card background"
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
              )}

              <div className="relative h-full flex flex-col items-center justify-center text-center p-10">
                <AnimatePresence mode="wait">
                  {formData.messageHeadline && (
                    <motion.h2
                      key={formData.messageHeadline}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-2xl md:text-3xl mb-6 leading-tight"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: '#2a2622',
                      }}
                    >
                      {formData.messageHeadline}
                    </motion.h2>
                  )}
                </AnimatePresence>

                <p
                  className="text-sm md:text-base leading-relaxed whitespace-pre-wrap"
                  style={{ color: '#3d3833' }}
                >
                  {formData.messageBody || (
                    <span style={{ color: '#bcb4ab' }}>
                      Your message will appear here as you type…
                    </span>
                  )}
                </p>

                {formData.closing && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-8 text-base md:text-lg italic"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: '#c17b8a',
                    }}
                  >
                    {formData.closing}
                  </motion.p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Sticky footer */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(250, 247, 242, 0.92)',
          borderColor: '#ede8e3',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <p className="text-sm" style={{ color: '#6b6259' }}>
            {formData.messageBody.trim() ? 'Ready when you are.' : 'Add a message to continue.'}
          </p>
          <button
            onClick={handleNext}
            disabled={!formData.messageBody.trim()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{
              backgroundColor: '#c17b8a',
              boxShadow: '0 6px 18px rgba(193, 123, 138, 0.35)',
            }}
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

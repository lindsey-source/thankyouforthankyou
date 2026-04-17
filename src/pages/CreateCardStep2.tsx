import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardWizard } from '@/contexts/CardWizardContext';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
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

interface Template {
  id: string;
  name: string;
  category: string;
  colors: any;
  fonts: any;
  preview_image: string;
  base_theme: string;
}

export default function CreateCardStep2() {
  const navigate = useNavigate();
  const { cardData, updateCardData, setCurrentStep } = useCardWizard();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    cardData.templateId
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    setIsLoading(true);
    const occasion = cardData.occasion?.toLowerCase();

    let query = supabase.from('card_templates').select('*');
    if (occasion) query = query.eq('category', occasion);

    const { data, error } = await query.order('name', { ascending: true }).limit(6);

    if (error) {
      toast.error('Failed to load templates');
      setIsLoading(false);
      return;
    }

    // If we have fewer than 6 in the chosen category, top up with other templates
    let result = data || [];
    if (result.length < 6) {
      const { data: extra } = await supabase
        .from('card_templates')
        .select('*')
        .neq('category', occasion ?? '')
        .limit(6 - result.length);
      if (extra) result = [...result, ...extra];
    }

    setTemplates(result.slice(0, 6));
    setIsLoading(false);
  };

  const handleContinue = () => {
    if (!selectedTemplateId) {
      toast.error('Please select a card design');
      return;
    }
    const selected = templates.find((t) => t.id === selectedTemplateId);
    if (!selected) return;

    updateCardData({
      templateId: selected.id,
      colorPalette: selected.colors,
      fontChoice: selected.fonts,
    });
    setCurrentStep(3);
    navigate('/create-card/step3');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf7f2' }}>
      <ProgressBar currentStep={2} totalSteps={6} stepNames={STEP_NAMES} />

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-24 pb-32">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2a2622' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Your Card Design
          </motion.h1>
          <motion.p
            className="text-base md:text-lg max-w-xl mx-auto"
            style={{ color: '#6b6259' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            Choose a design you love. You'll be able to customize it next.
          </motion.p>
        </div>

        {/* Back link */}
        <button
          onClick={() => navigate('/create-card/step1')}
          className="inline-flex items-center gap-2 text-sm mb-8 transition-colors"
          style={{ color: '#8a8079' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to occasions
        </button>

        {/* Template Grid — 2 columns x 3 rows */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-2xl animate-pulse"
                style={{ backgroundColor: '#ede8e3' }}
              />
            ))}
          </div>
        ) : templates.length === 0 ? (
          <div className="text-center py-20" style={{ color: '#8a8079' }}>
            No designs available right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {templates.map((template, index) => {
              const isSelected = selectedTemplateId === template.id;
              return (
                <motion.button
                  key={template.id}
                  type="button"
                  onClick={() => setSelectedTemplateId(template.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07, duration: 0.4 }}
                  whileHover={{ y: -4 }}
                  className="group relative text-left rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    backgroundColor: '#ffffff',
                    border: isSelected ? '2px solid #c17b8a' : '1px solid #ede8e3',
                    boxShadow: isSelected
                      ? '0 16px 40px rgba(193, 123, 138, 0.20)'
                      : '0 6px 20px rgba(42, 38, 34, 0.06)',
                  }}
                >
                  {/* Selected check badge */}
                  {isSelected && (
                    <div
                      className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-md"
                      style={{ backgroundColor: '#c17b8a' }}
                    >
                      <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
                    </div>
                  )}

                  {/* Large card preview */}
                  <div
                    className="relative w-full aspect-[3/4] overflow-hidden"
                    style={{ backgroundColor: '#f5f1ea' }}
                  >
                    <img
                      src={getTemplateImage(template.preview_image)}
                      alt={`${template.name} card design`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>

                  {/* Footer with template name */}
                  <div className="px-6 py-5">
                    <h3
                      className="text-xl leading-tight"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: '#2a2622',
                      }}
                    >
                      {template.name}
                    </h3>
                    <p
                      className="text-xs mt-1 uppercase tracking-[0.15em]"
                      style={{ color: '#8a9a82' }}
                    >
                      {template.category}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      {/* Sticky footer CTA */}
      {selectedTemplateId && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-md"
          style={{
            backgroundColor: 'rgba(250, 247, 242, 0.92)',
            borderColor: '#ede8e3',
          }}
        >
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
            <p className="text-sm" style={{ color: '#6b6259' }}>
              Beautiful choice — let's customize it.
            </p>
            <button
              onClick={handleContinue}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium transition-all hover:scale-[1.02]"
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
      )}
    </div>
  );
}

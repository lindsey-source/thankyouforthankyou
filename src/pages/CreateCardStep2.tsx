import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardWizard } from '@/contexts/CardWizardContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { CategorySection } from '@/components/CardDesigner/CategorySection';
import { StickyFooterCTA } from '@/components/CardDesigner/StickyFooterCTA';
import { TemplateGallerySkeleton } from '@/components/CardDesigner/TemplateGallerySkeleton';
import { ProgressBar } from '@/components/CardDesigner/ProgressBar';
import { BreadcrumbNav } from '@/components/CardDesigner/BreadcrumbNav';

const STEPS = [
  { name: 'Occasion', path: '/create-card/step1' },
  { name: 'Style', path: '/create-card/step2' },
  { name: 'Customize', path: '/create-card/step3' },
  { name: 'Message', path: '/create-card/step4' },
  { name: 'Touches', path: '/create-card/step5' },
  { name: 'Preview', path: '/create-card/step6' }
];

const STEP_NAMES = ['Choose Occasion', 'Pick Your Style', 'Customize Design', 'Write Your Message', 'Add Finishing Touches', 'Preview & Send'];

interface Template {
  id: string;
  name: string;
  category: string;
  colors: any;
  fonts: any;
  preview_image: string;
  base_theme: string;
}

const CATEGORY_CONFIG = [
  { key: 'wedding', emoji: '💍', title: 'Weddings & Engagements' },
  { key: 'baby', emoji: '👶', title: 'Baby & Family' },
  { key: 'graduation', emoji: '🎓', title: 'Graduation & Achievement' },
  { key: 'birthday', emoji: '🎉', title: 'Birthdays & Celebrations' },
  { key: 'general', emoji: '💌', title: 'Everyday Gratitude' },
  { key: 'memorial', emoji: '🌿', title: 'Memorial & Tribute' },
  { key: 'charity', emoji: '💖', title: 'Charity & Community' }
];


export default function CreateCardStep2() {
  const navigate = useNavigate();
  const { cardData, updateCardData, setCurrentStep } = useCardWizard();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('card_templates')
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      toast.error('Failed to load templates');
      setIsLoading(false);
      return;
    }

    setTemplates(data || []);
    setIsLoading(false);
  };

  // Filter templates based on selected occasion
  const selectedOccasion = cardData.occasion?.toLowerCase();
  const relevantTemplates = selectedOccasion 
    ? templates.filter(t => t.category === selectedOccasion)
    : templates;

  const groupedTemplates = CATEGORY_CONFIG.map(category => ({
    ...category,
    templates: relevantTemplates.filter(t => t.category === category.key)
  })).filter(category => category.templates.length > 0);

  const handleNext = () => {
    if (!selectedTemplateId) {
      toast.error('Please select a template');
      return;
    }

    const selectedTemplate = templates.find(t => t.id === selectedTemplateId);
    if (!selectedTemplate) return;

    updateCardData({
      templateId: selectedTemplate.id,
      colorPalette: selectedTemplate.colors,
      fontChoice: selectedTemplate.fonts
    });
    setCurrentStep(3);
    navigate('/create-card/step3');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 p-4 md:p-8 pb-32">
      <div className="max-w-6xl mx-auto">
        <ProgressBar currentStep={2} totalSteps={6} stepNames={STEP_NAMES} />
        <BreadcrumbNav currentStep={2} steps={STEPS} />
        
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Pick your style
          </h1>
          <p className="text-lg text-gray-600">
            Choose a template and customize it.
          </p>
        </motion.div>

        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/create-card/step1')}
            className="bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Template Gallery */}
        <div className="rounded-2xl p-10 shadow-lg bg-white/90 backdrop-blur-sm">
          {isLoading ? (
            <TemplateGallerySkeleton />
          ) : (
            <>
              {groupedTemplates.map((category, index) => (
                <div key={category.key}>
                  <CategorySection
                    emoji={category.emoji}
                    title={category.title}
                    templates={category.templates}
                    initiallyVisible={4}
                    selectedTemplateId={selectedTemplateId}
                    onSelectTemplate={setSelectedTemplateId}
                  />
                  {index < groupedTemplates.length - 1 && (
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-12" />
                  )}
                </div>
              ))}

              {groupedTemplates.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No templates available at the moment.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Sticky Footer CTA */}
      <StickyFooterCTA
        visible={!!selectedTemplateId}
        onContinue={handleNext}
      />
    </div>
  );
}

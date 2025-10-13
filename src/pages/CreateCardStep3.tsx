import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardWizard } from '@/contexts/CardWizardContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { getTemplateImage } from '@/lib/templateImageMap';
import { ProgressBar } from '@/components/CardDesigner/ProgressBar';
import { BreadcrumbNav } from '@/components/CardDesigner/BreadcrumbNav';
import { StepContainer } from '@/components/CardDesigner/StepContainer';
import { Check } from 'lucide-react';

const STEPS = [
  { name: 'Occasion', path: '/create-card/step1' },
  { name: 'Style', path: '/create-card/step2' },
  { name: 'Customize', path: '/create-card/step3' },
  { name: 'Message', path: '/create-card/step4' },
  { name: 'Touches', path: '/create-card/step5' },
  { name: 'Preview', path: '/create-card/step6' }
];

const STEP_NAMES = ['Choose Occasion', 'Pick Your Style', 'Customize Design', 'Write Your Message', 'Add Finishing Touches', 'Preview & Send'];

export default function CreateCardStep3() {
  const navigate = useNavigate();
  const { cardData, updateCardData, setCurrentStep } = useCardWizard();
  const [template, setTemplate] = useState<any>(null);
  const [selectedPalette, setSelectedPalette] = useState<any>(null);
  const [selectedFont, setSelectedFont] = useState<string | null>(null);

  useEffect(() => {
    loadTemplate();
  }, []);

  useEffect(() => {
    if (template) {
      setSelectedPalette(cardData.colorPalette || template.colors);
      setSelectedFont(cardData.fontChoice || Object.keys(template.fonts || {})[0]);
    }
  }, [template, cardData]);

  const loadTemplate = async () => {
    if (!cardData.templateId) {
      toast.error('Please select a template first');
      navigate('/create-card/step2');
      return;
    }

    const { data, error } = await supabase
      .from('card_templates')
      .select('*')
      .eq('id', cardData.templateId)
      .single();

    if (error) {
      toast.error('Failed to load template');
      return;
    }

    setTemplate(data);
  };

  const handleNext = () => {
    if (!selectedPalette || !selectedFont) {
      toast.error('Please select a color palette and font');
      return;
    }

    updateCardData({
      colorPalette: selectedPalette,
      fontChoice: selectedFont
    });
    setCurrentStep(4);
    navigate('/create-card/step4');
  };

  const colorPalettes = template?.colors ? [
    { id: 'default', name: 'Original', colors: template.colors },
    { 
      id: 'warm', 
      name: 'Warm Sunset',
      colors: { 
        primary: 'hsl(25, 75%, 65%)', 
        secondary: 'hsl(45, 85%, 75%)', 
        accent: 'hsl(15, 70%, 60%)',
        text: 'hsl(25, 40%, 30%)'
      }
    },
    { 
      id: 'cool', 
      name: 'Ocean Breeze',
      colors: { 
        primary: 'hsl(200, 70%, 65%)', 
        secondary: 'hsl(180, 60%, 75%)', 
        accent: 'hsl(210, 65%, 55%)',
        text: 'hsl(210, 40%, 30%)'
      }
    },
    { 
      id: 'elegant', 
      name: 'Elegant Neutrals',
      colors: { 
        primary: 'hsl(30, 15%, 85%)', 
        secondary: 'hsl(40, 20%, 90%)', 
        accent: 'hsl(35, 25%, 65%)',
        text: 'hsl(30, 30%, 25%)'
      }
    },
    { 
      id: 'romantic', 
      name: 'Romantic Blush',
      colors: { 
        primary: 'hsl(350, 65%, 85%)', 
        secondary: 'hsl(340, 55%, 90%)', 
        accent: 'hsl(355, 70%, 75%)',
        text: 'hsl(340, 35%, 35%)'
      }
    }
  ] : [];

  const fontPairings = template?.fonts ? [
    { id: 'default', name: 'Original', fonts: template.fonts },
    { 
      id: 'classic', 
      name: 'Classic Serif',
      fonts: { heading: 'Playfair Display', body: 'Lora' }
    },
    { 
      id: 'modern', 
      name: 'Modern Sans',
      fonts: { heading: 'Poppins', body: 'Inter' }
    },
    { 
      id: 'elegant', 
      name: 'Elegant Script',
      fonts: { heading: 'Dancing Script', body: 'Montserrat' }
    }
  ] : [];

  if (!template) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading template...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero p-4 md:p-8">
      <ProgressBar currentStep={3} totalSteps={6} stepNames={STEP_NAMES} />
      <BreadcrumbNav currentStep={3} steps={STEPS} />
      
      <StepContainer
        title="Customize your design"
        subtitle="Choose colors and fonts that match your style"
        onBack={() => navigate('/create-card/step2')}
        onNext={handleNext}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Preview */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <Label className="text-lg font-semibold mb-4 block">Live Preview</Label>
              <div 
                className="aspect-[3/4] rounded-lg overflow-hidden shadow-lg"
                style={{
                  backgroundColor: selectedPalette?.primary || template.colors?.primary,
                  color: selectedPalette?.text || template.colors?.text
                }}
              >
                <img
                  src={getTemplateImage(template.preview_image)}
                  alt="Template preview"
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.95)' }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Right: Controls */}
          <div className="space-y-6">
            {/* Color Palettes */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <Label className="text-lg font-semibold mb-4 block">Color Palette</Label>
                <div className="space-y-3">
                  {colorPalettes.map((palette) => (
                    <div
                      key={palette.id}
                      onClick={() => setSelectedPalette(palette.colors)}
                      className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                        selectedPalette === palette.colors
                          ? 'border-primary ring-2 ring-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{palette.name}</span>
                        {selectedPalette === palette.colors && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div className="flex gap-2">
                        {Object.values(palette.colors).slice(0, 4).map((color: any, idx) => (
                          <div
                            key={idx}
                            className="w-12 h-12 rounded-lg shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Font Pairings */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <Label className="text-lg font-semibold mb-4 block">Font Pairing</Label>
                <div className="space-y-3">
                  {fontPairings.map((pairing) => (
                    <div
                      key={pairing.id}
                      onClick={() => setSelectedFont(pairing.id)}
                      className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                        selectedFont === pairing.id
                          ? 'border-primary ring-2 ring-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{pairing.name}</span>
                        {selectedFont === pairing.id && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Heading: {pairing.fonts.heading} • Body: {pairing.fonts.body}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </StepContainer>
    </div>
  );
}

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
  const [selectedPaletteId, setSelectedPaletteId] = useState<string>('default');
  const [selectedFont, setSelectedFont] = useState<string | null>(null);

  useEffect(() => {
    loadTemplate();
  }, []);

  useEffect(() => {
    if (template) {
      setSelectedPaletteId('default');
      setSelectedFont(cardData.fontChoice || 'default');
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
    if (!selectedPaletteId || !selectedFont) {
      toast.error('Please select a color palette and font');
      return;
    }

    const selectedPalette = colorPalettes.find(p => p.id === selectedPaletteId)?.colors;

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
      id: 'serif', 
      name: 'Elegant Serif',
      fonts: { heading: 'Cormorant Garamond', body: 'Crimson Text' }
    },
    { 
      id: 'modern', 
      name: 'Modern Sans',
      fonts: { heading: 'Poppins', body: 'Inter' }
    },
    { 
      id: 'script', 
      name: 'Romantic Script',
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
        {/* Live Preview - Compact */}
        <Card className="bg-white/95 backdrop-blur-sm mb-6">
          <CardContent className="p-4">
            <Label className="text-base font-semibold mb-3 block">Live Preview</Label>
            <div className="max-w-xs mx-auto">
              <div 
                className="aspect-[3/4] rounded-lg overflow-hidden shadow-lg"
                style={{
                  backgroundColor: colorPalettes.find(p => p.id === selectedPaletteId)?.colors.primary || template.colors?.primary,
                  color: colorPalettes.find(p => p.id === selectedPaletteId)?.colors.text || template.colors?.text
                }}
              >
                <img
                  src={getTemplateImage(template.preview_image)}
                  alt="Template preview"
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.95)' }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Palettes Section */}
        <Card className="bg-white/95 backdrop-blur-sm mb-6">
          <CardContent className="p-6">
            <div className="mb-4">
              <Label className="text-xl font-bold mb-1 block">Choose Your Colors</Label>
              <p className="text-sm text-muted-foreground">Select a color palette that matches your style</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {colorPalettes.map((palette) => (
                <div
                  key={palette.id}
                  onClick={() => setSelectedPaletteId(palette.id)}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                    selectedPaletteId === palette.id
                      ? 'border-primary ring-2 ring-primary bg-primary/5 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">{palette.name}</span>
                    {selectedPaletteId === palette.id && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div className="flex gap-2">
                    {Object.values(palette.colors).slice(0, 4).map((color: any, idx) => (
                      <div
                        key={idx}
                        className="flex-1 h-12 rounded-lg shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Font Pairings Section */}
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="mb-4">
              <Label className="text-xl font-bold mb-1 block">Choose Your Fonts</Label>
              <p className="text-sm text-muted-foreground">Pick typography that expresses your message</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fontPairings.map((pairing) => (
                <div
                  key={pairing.id}
                  onClick={() => setSelectedFont(pairing.id)}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                    selectedFont === pairing.id
                      ? 'border-primary ring-2 ring-primary bg-primary/5 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">{pairing.name}</span>
                    {selectedFont === pairing.id && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Heading</p>
                      <p 
                        className="text-2xl"
                        style={{ fontFamily: pairing.fonts.heading }}
                      >
                        Congratulations
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Body</p>
                      <p 
                        className="text-sm"
                        style={{ fontFamily: pairing.fonts.body }}
                      >
                        Thank you for your thoughtful gift.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </StepContainer>
    </div>
  );
}

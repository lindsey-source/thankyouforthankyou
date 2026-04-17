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

const STEP_NAMES = ['Choose Occasion', 'Pick Your Style', 'Customize Design', 'Write Your Message', 'Choose Your Cause', 'Add Finishing Touches', 'Preview & Send'];

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
    // Step 2 uses synthetic designs (not DB rows) — fall back to an in-memory template
    if (!cardData.templateId) {
      setTemplate({
        id: 'synthetic',
        name: (cardData.colorPalette as any)?.theme || 'Custom',
        colors: {
          primary: 'hsl(343, 35%, 62%)',
          secondary: 'hsl(35, 45%, 92%)',
          accent: 'hsl(40, 38%, 60%)',
          text: 'hsl(25, 20%, 14%)',
        },
        fonts: { heading: 'Playfair Display', body: 'Inter' },
        preview_image: null,
      });
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
      <ProgressBar currentStep={3} totalSteps={7} stepNames={STEP_NAMES} />
      <BreadcrumbNav currentStep={3} steps={STEPS} />
      
      <StepContainer
        title="Customize your design"
        subtitle="Choose colors and fonts that match your style"
        onBack={() => navigate('/create-card/step2')}
        onNext={handleNext}
      >
        {/* Live Preview - Real card */}
        <Card className="bg-white/95 backdrop-blur-sm mb-6">
          <CardContent className="p-6">
            <Label className="text-base font-semibold mb-4 block text-center">Live Preview</Label>
            {(() => {
              const activePalette = colorPalettes.find(p => p.id === selectedPaletteId)?.colors || template.colors;
              const activeFonts = fontPairings.find(f => f.id === selectedFont)?.fonts || template.fonts;
              return (
                <div className="max-w-[300px] mx-auto">
                  <div
                    className="relative w-full aspect-[3/4] rounded-2xl bg-white border overflow-hidden shadow-warm"
                    style={{ borderColor: 'rgba(45, 36, 32, 0.08)' }}
                    role="img"
                    aria-label="Live card preview"
                  >
                    {/* Header band using selected primary/secondary */}
                    <div
                      className="relative flex flex-col items-center justify-center"
                      style={{
                        height: '42%',
                        background: `linear-gradient(135deg, ${activePalette.secondary} 0%, ${activePalette.primary} 100%)`,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: activeFonts.heading,
                          fontSize: '44px',
                          color: activePalette.accent,
                          letterSpacing: '0.04em',
                          lineHeight: 1.1,
                        }}
                      >
                        Thank You
                      </span>
                      <div
                        className="flex items-center gap-2 mt-3 opacity-70"
                        aria-hidden="true"
                      >
                        <div style={{ width: '28px', height: '1px', backgroundColor: activePalette.accent }} />
                        <div
                          style={{
                            width: '4px',
                            height: '4px',
                            backgroundColor: activePalette.accent,
                            transform: 'rotate(45deg)',
                          }}
                        />
                        <div style={{ width: '28px', height: '1px', backgroundColor: activePalette.accent }} />
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5 flex flex-col" style={{ height: '58%' }}>
                      <p
                        className="text-xl mb-2"
                        style={{ fontFamily: activeFonts.heading, color: activePalette.text }}
                      >
                        Dear Sarah,
                      </p>
                      <p
                        className="text-sm leading-relaxed flex-1"
                        style={{ fontFamily: activeFonts.body, color: activePalette.text, opacity: 0.75 }}
                      >
                        Thank you so much for being part of our special day. Your presence meant the world to us.
                      </p>
                      <p
                        className="text-sm mt-3"
                        style={{ fontFamily: activeFonts.body, color: activePalette.text, opacity: 0.85 }}
                      >
                        With love,
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
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
                        Thank You
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

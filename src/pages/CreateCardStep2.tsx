import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardWizard } from '@/contexts/CardWizardContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { toast } from 'sonner';

interface Template {
  id: string;
  name: string;
  category: string;
  colors: any;
  fonts: any;
  preview_image: string;
  base_theme: string;
}

const colorPalettes = [
  { id: 'warm', colors: ['#FFF8F0', '#F4A460', '#8B7355'], name: 'Warm' },
  { id: 'cool', colors: ['#F0F8FF', '#4A6FA5', '#2C4A6F'], name: 'Cool' },
  { id: 'romantic', colors: ['#FFF0F5', '#FFB6C1', '#8B7355'], name: 'Romantic' },
  { id: 'natural', colors: ['#F8FBF8', '#9DB5A5', '#6B8B7F'], name: 'Natural' }
];

const fontPairings = [
  { id: 'classic', name: 'Classic Elegance', heading: 'Playfair Display', body: 'Lato' },
  { id: 'modern', name: 'Modern Clean', heading: 'Montserrat', body: 'Open Sans' },
  { id: 'romantic', name: 'Romantic Script', heading: 'Dancing Script', body: 'Nunito' },
  { id: 'playful', name: 'Playful Joy', heading: 'Pacifico', body: 'Quicksand' },
  { id: 'sophisticated', name: 'Sophisticated', heading: 'Cormorant Garamond', body: 'Lora' },
  { id: 'editorial', name: 'Editorial', heading: 'EB Garamond', body: 'Crimson Text' },
  { id: 'bold', name: 'Bold Impact', heading: 'Bebas Neue', body: 'Roboto' },
  { id: 'artistic', name: 'Artistic', heading: 'Amatic SC', body: 'Cabin' }
];

export default function CreateCardStep2() {
  const navigate = useNavigate();
  const { cardData, updateCardData, setCurrentStep } = useCardWizard();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [selectedPalette, setSelectedPalette] = useState(colorPalettes[0]);
  const [selectedFont, setSelectedFont] = useState(fontPairings[0]);

  useEffect(() => {
    loadTemplates();
  }, [cardData.occasion]);

  const loadTemplates = async () => {
    const { data, error } = await supabase
      .from('card_templates')
      .select('*')
      .eq('category', cardData.occasion || 'general');

    if (error) {
      toast.error('Failed to load templates');
      return;
    }

    setTemplates(data || []);
    if (data && data.length > 0) {
      setSelectedTemplate(data[0]);
    }
  };

  const handleNext = () => {
    if (!selectedTemplate) {
      toast.error('Please select a template');
      return;
    }

    updateCardData({
      templateId: selectedTemplate.id,
      colorPalette: selectedPalette,
      fontChoice: selectedFont.id
    });
    setCurrentStep(3);
    navigate('/create-card/step3');
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Pick your style
          </motion.h1>
          <p className="text-white/90">Choose a template and customize it</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Controls */}
          <div className="space-y-6">
            {/* Templates */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Templates</h3>
                <div className="grid grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template)}
                      className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        selectedTemplate?.id === template.id
                          ? 'border-primary ring-2 ring-primary'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={template.preview_image}
                        alt={template.name}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-2 bg-white">
                        <p className="text-sm font-medium text-center">{template.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Color Palette */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Color Palette</h3>
                <div className="grid grid-cols-2 gap-4">
                  {colorPalettes.map((palette) => (
                    <div
                      key={palette.id}
                      onClick={() => setSelectedPalette(palette)}
                      className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                        selectedPalette.id === palette.id
                          ? 'border-primary ring-2 ring-primary'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex gap-2 mb-2">
                        {palette.colors.map((color, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <p className="text-sm font-medium">{palette.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Font Pairing */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Font Style</h3>
                <div className="space-y-3">
                  {fontPairings.map((font) => (
                    <div
                      key={font.id}
                      onClick={() => setSelectedFont(font)}
                      className={`cursor-pointer p-6 rounded-lg border-2 transition-all ${
                        selectedFont.id === font.id
                          ? 'border-primary ring-2 ring-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-semibold text-sm">{font.name}</p>
                        {selectedFont.id === font.id && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <p 
                          className="text-2xl"
                          style={{ fontFamily: font.heading }}
                        >
                          Thank You
                        </p>
                        <p 
                          className="text-sm text-muted-foreground"
                          style={{ fontFamily: font.body }}
                        >
                          Your kindness means the world to us. We are deeply grateful.
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        {font.heading} • {font.body}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => navigate('/create-card/step1')}
            className="bg-white/95"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <p className="text-sm text-white/70">Step 2 of 5</p>
          
          <Button variant="hero" onClick={handleNext}>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

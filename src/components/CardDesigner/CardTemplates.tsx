import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Check } from 'lucide-react';

// Import all card template images
import cardNavyLinen from '@/assets/card-navy-linen.jpg';
import cardSunsetMountains from '@/assets/card-sunset-mountains.jpg';
import cardGoldModern from '@/assets/card-gold-modern.jpg';
import cardSageAbstract from '@/assets/card-sage-abstract.jpg';
import cardBotanicalRustic from '@/assets/card-botanical-rustic.jpg';
import cardCoralWatercolor from '@/assets/card-coral-watercolor.jpg';
import cardVintageBotanical from '@/assets/card-vintage-botanical.jpg';
import cardNavyStars from '@/assets/card-navy-stars.jpg';
import cardEucalyptusGold from '@/assets/card-eucalyptus-gold.jpg';
import cardLineArtFlorals from '@/assets/card-line-art-florals.jpg';
import cardCherryBlossom from '@/assets/card-cherry-blossom.jpg';
import starryNight from '@/assets/starry-night.jpg';
import pineTrees from '@/assets/pine-trees.jpg';
import cardEmeraldMarble from '@/assets/card-emerald-marble.jpg';
import oceanWave from '@/assets/ocean-wave.jpg';
import cardFloralPink from '@/assets/card-floral-pink.jpg';
import cardBlushBotanical from '@/assets/card-blush-botanical.jpg';
import cardWildflowerInk from '@/assets/card-wildflower-ink.jpg';

export type TemplateCategory = 'wedding' | 'baby' | 'baby-shower' | 'general' | 'celebration';

export interface CardTemplate {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  preview: string;
  style: {
    layout: 'full-background' | 'photo-frame' | 'split-layout' | 'overlay-text';
    textPosition: 'bottom' | 'top' | 'center' | 'side';
    backgroundColor: string;
    textColor: string;
    accentColor: string;
  };
}

const templates: CardTemplate[] = [
  {
    id: 'elegant-frame',
    name: 'Elegant Frame',
    description: 'Classic border with photo centered',
    category: 'wedding',
    preview: cardNavyLinen,
    style: {
      layout: 'photo-frame',
      textPosition: 'bottom',
      backgroundColor: '#FAFF9F6',
      textColor: '#444444',
      accentColor: '#5A9FD4'
    }
  },
  {
    id: 'full-background',
    name: 'Full Background',
    description: 'Photo fills entire card with overlay text',
    category: 'general',
    preview: cardSunsetMountains,
    style: {
      layout: 'full-background',
      textPosition: 'center',
      backgroundColor: 'transparent',
      textColor: '#FFFFFF',
      accentColor: '#F787DD'
    }
  },
  {
    id: 'split-modern',
    name: 'Modern Split',
    description: 'Photo on left, message on right',
    category: 'wedding',
    preview: cardGoldModern,
    style: {
      layout: 'split-layout',
      textPosition: 'side',
      backgroundColor: '#FAFF9F6',
      textColor: '#444444',
      accentColor: '#AA6D9A3'
    }
  },
  {
    id: 'minimal-overlay',
    name: 'Minimal Overlay',
    description: 'Subtle text overlay on photo',
    category: 'general',
    preview: cardSageAbstract,
    style: {
      layout: 'overlay-text',
      textPosition: 'bottom',
      backgroundColor: 'rgba(0,0,0,0.3)',
      textColor: '#FFFFFF',
      accentColor: '#5A9FD4'
    }
  },
  {
    id: 'botanical-frame',
    name: 'Botanical Frame',
    description: 'Nature-inspired border with elegant typography',
    category: 'baby-shower',
    preview: cardBotanicalRustic,
    style: {
      layout: 'photo-frame',
      textPosition: 'bottom',
      backgroundColor: '#F0F9F0',
      textColor: '#2D5016',
      accentColor: '#7FB069'
    }
  },
  {
    id: 'sunset-gradient',
    name: 'Sunset Gradient',
    description: 'Warm gradient background with photo overlay',
    category: 'celebration',
    preview: cardCoralWatercolor,
    style: {
      layout: 'overlay-text',
      textPosition: 'top',
      backgroundColor: 'linear-gradient(135deg, #FF8A80, #FFD54F)',
      textColor: '#FFFFFF',
      accentColor: '#FF6F00'
    }
  },
  {
    id: 'polaroid-vintage',
    name: 'Vintage Polaroid',
    description: 'Classic polaroid style with handwritten feel',
    category: 'baby',
    preview: cardVintageBotanical,
    style: {
      layout: 'photo-frame',
      textPosition: 'bottom',
      backgroundColor: '#F5F5DC',
      textColor: '#4A4A4A',
      accentColor: '#8B4513'
    }
  },
  {
    id: 'ocean-wave',
    name: 'Ocean Wave',
    description: 'Flowing wave design with coastal vibes',
    category: 'baby-shower',
    preview: cardNavyStars,
    style: {
      layout: 'split-layout',
      textPosition: 'side',
      backgroundColor: '#E3F2FD',
      textColor: '#0D47A1',
      accentColor: '#2196F3'
    }
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    description: 'Warm, luxurious gold accents with photo',
    category: 'wedding',
    preview: cardEucalyptusGold,
    style: {
      layout: 'full-background',
      textPosition: 'center',
      backgroundColor: 'rgba(255, 215, 0, 0.15)',
      textColor: '#B8860B',
      accentColor: '#FFD700'
    }
  },
  {
    id: 'minimalist-zen',
    name: 'Minimalist Zen',
    description: 'Clean, simple design with plenty of white space',
    category: 'general',
    preview: cardLineArtFlorals,
    style: {
      layout: 'photo-frame',
      textPosition: 'bottom',
      backgroundColor: '#FAFAFA',
      textColor: '#424242',
      accentColor: '#9E9E9E'
    }
  },
  {
    id: 'cherry-blossom',
    name: 'Cherry Blossom',
    description: 'Soft pink theme with delicate spring vibes',
    category: 'baby-shower',
    preview: cardCherryBlossom,
    style: {
      layout: 'overlay-text',
      textPosition: 'bottom',
      backgroundColor: 'rgba(255, 182, 193, 0.3)',
      textColor: '#8E24AA',
      accentColor: '#E91E63'
    }
  },
  {
    id: 'starry-night',
    name: 'Starry Night',
    description: 'Deep blue night sky with starlight accents',
    category: 'celebration',
    preview: starryNight,
    style: {
      layout: 'full-background',
      textPosition: 'center',
      backgroundColor: 'rgba(25, 25, 112, 0.4)',
      textColor: '#FFFFFF',
      accentColor: '#FFD700'
    }
  },
  {
    id: 'rustic-wood',
    name: 'Rustic Wood',
    description: 'Warm wooden texture with handcrafted feel',
    category: 'wedding',
    preview: pineTrees,
    style: {
      layout: 'split-layout',
      textPosition: 'side',
      backgroundColor: '#F5E6D3',
      textColor: '#5D4037',
      accentColor: '#8D6E63'
    }
  },
  {
    id: 'marble-luxury',
    name: 'Marble Luxury',
    description: 'Elegant marble pattern with sophisticated text',
    category: 'wedding',
    preview: cardEmeraldMarble,
    style: {
      layout: 'photo-frame',
      textPosition: 'bottom',
      backgroundColor: '#F8F8FF',
      textColor: '#2C2C54',
      accentColor: '#6C5CE7'
    }
  },
  {
    id: 'watercolor-splash',
    name: 'Watercolor Splash',
    description: 'Artistic watercolor background with flowing design',
    category: 'baby',
    preview: oceanWave,
    style: {
      layout: 'overlay-text',
      textPosition: 'top',
      backgroundColor: 'rgba(129, 236, 236, 0.3)',
      textColor: '#0D7377',
      accentColor: '#14A085'
    }
  },
  {
    id: 'floral-pink',
    name: 'Floral Pink',
    description: 'Delicate pink florals with romantic feel',
    category: 'baby',
    preview: cardFloralPink,
    style: {
      layout: 'photo-frame',
      textPosition: 'bottom',
      backgroundColor: '#FFF0F5',
      textColor: '#8B008B',
      accentColor: '#FF69B4'
    }
  },
  {
    id: 'blush-botanical',
    name: 'Blush Botanical',
    description: 'Soft blush tones with botanical elements',
    category: 'baby-shower',
    preview: cardBlushBotanical,
    style: {
      layout: 'overlay-text',
      textPosition: 'bottom',
      backgroundColor: 'rgba(255, 218, 185, 0.4)',
      textColor: '#8B4513',
      accentColor: '#CD853F'
    }
  },
  {
    id: 'wildflower-ink',
    name: 'Wildflower Ink',
    description: 'Hand-drawn wildflowers with ink details',
    category: 'general',
    preview: cardWildflowerInk,
    style: {
      layout: 'split-layout',
      textPosition: 'side',
      backgroundColor: '#F5F5F0',
      textColor: '#2F4F4F',
      accentColor: '#6B8E23'
    }
  }
];

const categoryLabels: Record<TemplateCategory, string> = {
  wedding: 'Wedding',
  baby: 'Baby/Birth',
  'baby-shower': 'Baby Shower',
  general: 'General',
  celebration: 'Celebration'
};

interface CardTemplatesProps {
  selectedTemplate: string | null;
  onTemplateSelect: (template: CardTemplate) => void;
}

export const CardTemplates: React.FC<CardTemplatesProps> = ({ 
  selectedTemplate, 
  onTemplateSelect 
}) => {
  const renderTemplateCard = (template: CardTemplate) => (
    <Card 
      key={template.id}
      className={`cursor-pointer transition-all hover:shadow-soft ${
        selectedTemplate === template.id 
          ? 'ring-2 ring-primary border-primary' 
          : 'hover:border-primary/50'
      }`}
      onClick={() => onTemplateSelect(template)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Template preview image */}
          <div className="w-16 h-20 flex-shrink-0 rounded overflow-hidden border">
            <img 
              src={template.preview}
              alt={template.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                const fallback = img.nextElementSibling as HTMLDivElement;
                img.style.display = 'none';
                fallback.style.display = 'flex';
              }}
            />
            <div 
              className="w-full h-full bg-muted flex items-center justify-center text-2xl" 
              style={{ display: 'none' }}
            >
              🎨
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium">{template.name}</h4>
              {selectedTemplate === template.id && (
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {template.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Choose a Card Template</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select a template based on your occasion
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="wedding">Wedding</TabsTrigger>
          <TabsTrigger value="baby">Baby/Birth</TabsTrigger>
          <TabsTrigger value="baby-shower">Baby Shower</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="celebration">Celebration</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => renderTemplateCard(template))}
          </div>
        </TabsContent>

        <TabsContent value="wedding" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.filter(t => t.category === 'wedding').map((template) => renderTemplateCard(template))}
          </div>
        </TabsContent>

        <TabsContent value="baby" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.filter(t => t.category === 'baby').map((template) => renderTemplateCard(template))}
          </div>
        </TabsContent>

        <TabsContent value="baby-shower" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.filter(t => t.category === 'baby-shower').map((template) => renderTemplateCard(template))}
          </div>
        </TabsContent>

        <TabsContent value="general" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.filter(t => t.category === 'general').map((template) => renderTemplateCard(template))}
          </div>
        </TabsContent>

        <TabsContent value="celebration" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.filter(t => t.category === 'celebration').map((template) => renderTemplateCard(template))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { templates };
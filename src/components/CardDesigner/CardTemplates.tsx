import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export interface CardTemplate {
  id: string;
  name: string;
  description: string;
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
    preview: '/src/assets/card-navy-linen.jpg',
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
    preview: '/src/assets/card-sunset-mountains.jpg',
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
    preview: '/src/assets/card-gold-modern.jpg',
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
    preview: '/src/assets/card-sage-abstract.jpg',
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
    preview: '/src/assets/card-botanical-rustic.jpg',
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
    preview: '/src/assets/card-coral-watercolor.jpg',
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
    preview: '/src/assets/card-vintage-botanical.jpg',
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
    preview: '/src/assets/card-navy-stars.jpg',
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
    preview: '/src/assets/card-eucalyptus-gold.jpg',
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
    preview: '/src/assets/card-line-art-florals.jpg',
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
    preview: '/src/assets/card-cherry-blossom.jpg',
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
    preview: '/src/assets/starry-night.jpg',
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
    preview: '/src/assets/pine-trees.jpg',
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
    preview: '/src/assets/card-emerald-marble.jpg',
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
    preview: '/src/assets/ocean-wave.jpg',
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
    preview: '/src/assets/card-floral-pink.jpg',
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
    preview: '/src/assets/card-blush-botanical.jpg',
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
    preview: '/src/assets/card-wildflower-ink.jpg',
    style: {
      layout: 'split-layout',
      textPosition: 'side',
      backgroundColor: '#F5F5F0',
      textColor: '#2F4F4F',
      accentColor: '#6B8E23'
    }
  }
];

interface CardTemplatesProps {
  selectedTemplate: string | null;
  onTemplateSelect: (template: CardTemplate) => void;
}

export const CardTemplates: React.FC<CardTemplatesProps> = ({ 
  selectedTemplate, 
  onTemplateSelect 
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Choose a Card Template</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select how you'd like your photo and message to be displayed
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
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
                      // Fallback to emoji if image fails to load
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
        ))}
      </div>
    </div>
  );
};

export { templates };
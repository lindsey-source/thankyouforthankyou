import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Check } from 'lucide-react';

// Import all card template images
import cardWeddingElegant from '@/assets/card-wedding-elegant.jpg';
import cardBabyShowerClouds from '@/assets/card-baby-shower-clouds.jpg';
import cardBabyArrival from '@/assets/card-baby-arrival.jpg';
import cardGeneralHeart from '@/assets/card-general-heart.jpg';
import cardBirthdayModern from '@/assets/card-birthday-modern.jpg';
import cardGraduationRays from '@/assets/card-graduation-rays.jpg';
import cardMemorialNature from '@/assets/card-memorial-nature.jpg';
import cardCharityHands from '@/assets/card-charity-hands.jpg';

// Legacy templates
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

export type TemplateCategory = 'wedding' | 'baby' | 'baby-shower' | 'general' | 'celebration' | 'memorial';

export interface CardTemplate {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  preview: string;
  preview_image?: string; // Database column
  style: {
    layout: 'full-background' | 'photo-frame' | 'split-layout' | 'overlay-text';
    textPosition: 'bottom' | 'top' | 'center' | 'side';
    backgroundColor: string;
    textColor: string;
    accentColor: string;
  };
}

const templates: CardTemplate[] = [
  // 💍 WEDDING / ENGAGEMENT TEMPLATES
  {
    id: 'wedding-rose-elegance',
    name: 'Rose Garden Elegance',
    description: 'Soft blush roses with eucalyptus, perfect for classic weddings',
    category: 'wedding',
    preview: cardWeddingElegant,
    style: {
      layout: 'photo-frame',
      textPosition: 'center',
      backgroundColor: '#FFF9F5',
      textColor: '#8B6F47',
      accentColor: '#D4A574'
    }
  },
  {
    id: 'wedding-gold-modern',
    name: 'Modern Gold Frame',
    description: 'Contemporary elegance with gold accents',
    category: 'wedding',
    preview: cardGoldModern,
    style: {
      layout: 'split-layout',
      textPosition: 'side',
      backgroundColor: '#FAFCF6',
      textColor: '#444444',
      accentColor: '#D4A574'
    }
  },
  {
    id: 'wedding-navy-linen',
    name: 'Navy Linen Classic',
    description: 'Timeless navy and cream with elegant typography',
    category: 'wedding',
    preview: cardNavyLinen,
    style: {
      layout: 'photo-frame',
      textPosition: 'bottom',
      backgroundColor: '#F9F6F0',
      textColor: '#2B3E50',
      accentColor: '#5A9FD4'
    }
  },
  {
    id: 'wedding-eucalyptus-gold',
    name: 'Eucalyptus & Gold',
    description: 'Botanical elegance with warm metallic touches',
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
    id: 'wedding-marble-luxury',
    name: 'Marble Sophistication',
    description: 'Luxe marble pattern for upscale celebrations',
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

  // 👶 BABY / BIRTH TEMPLATES
  {
    id: 'baby-rainbow-dreams',
    name: 'Rainbow Dreams',
    description: 'Gentle watercolor rainbow for new arrivals',
    category: 'baby',
    preview: cardBabyArrival,
    style: {
      layout: 'overlay-text',
      textPosition: 'center',
      backgroundColor: '#FFF8F0',
      textColor: '#8B7355',
      accentColor: '#F4C2C2'
    }
  },
  {
    id: 'baby-floral-pink',
    name: 'Pink Blossom Garden',
    description: 'Delicate florals celebrating your little one',
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
    id: 'baby-vintage-botanical',
    name: 'Vintage Botanical',
    description: 'Heirloom-quality botanical illustrations',
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
    id: 'baby-watercolor-splash',
    name: 'Ocean Splash',
    description: 'Playful watercolor for joyful announcements',
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

  // 🍼 BABY SHOWER TEMPLATES
  {
    id: 'baby-shower-clouds',
    name: 'Clouds & Stars',
    description: 'Whimsical clouds with gentle animals',
    category: 'baby-shower',
    preview: cardBabyShowerClouds,
    style: {
      layout: 'photo-frame',
      textPosition: 'center',
      backgroundColor: '#F8FCFF',
      textColor: '#5A7D9A',
      accentColor: '#A8D8EA'
    }
  },
  {
    id: 'baby-shower-botanical',
    name: 'Garden Party',
    description: 'Nature-inspired design for outdoor showers',
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
    id: 'baby-shower-ocean-wave',
    name: 'Coastal Dreams',
    description: 'Flowing waves for beach-themed celebrations',
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
    id: 'baby-shower-cherry-blossom',
    name: 'Cherry Blossom Spring',
    description: 'Delicate spring florals in soft pink',
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
    id: 'baby-shower-blush-botanical',
    name: 'Blush Garden',
    description: 'Warm blush tones with botanical elegance',
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

  // 💌 GENERAL THANK YOU TEMPLATES  
  {
    id: 'general-watercolor-heart',
    name: 'Watercolor Heart',
    description: 'Timeless gratitude with flowing watercolor',
    category: 'general',
    preview: cardGeneralHeart,
    style: {
      layout: 'overlay-text',
      textPosition: 'center',
      backgroundColor: '#FFF8F0',
      textColor: '#8B7355',
      accentColor: '#F4A460'
    }
  },
  {
    id: 'general-minimalist-zen',
    name: 'Minimalist Zen',
    description: 'Clean simplicity with modern line art',
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
    id: 'general-sage-abstract',
    name: 'Sage Abstract',
    description: 'Organic shapes in calming sage tones',
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
    id: 'general-wildflower-ink',
    name: 'Wildflower Sketch',
    description: 'Hand-drawn botanicals with rustic charm',
    category: 'general',
    preview: cardWildflowerInk,
    style: {
      layout: 'split-layout',
      textPosition: 'side',
      backgroundColor: '#F5F5F0',
      textColor: '#2F4F4F',
      accentColor: '#6B8E23'
    }
  },
  {
    id: 'general-sunset-mountains',
    name: 'Mountain Sunset',
    description: 'Natural beauty for heartfelt thanks',
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

  // 🎉 CELEBRATION / BIRTHDAY / GRADUATION TEMPLATES
  {
    id: 'celebration-birthday-confetti',
    name: 'Confetti Celebration',
    description: 'Vibrant joy with modern confetti design',
    category: 'celebration',
    preview: cardBirthdayModern,
    style: {
      layout: 'overlay-text',
      textPosition: 'center',
      backgroundColor: '#FFFFFF',
      textColor: '#FF6B6B',
      accentColor: '#4ECDC4'
    }
  },
  {
    id: 'celebration-graduation-rays',
    name: 'Achievement Rays',
    description: 'Bold rays of light for graduates',
    category: 'celebration',
    preview: cardGraduationRays,
    style: {
      layout: 'full-background',
      textPosition: 'center',
      backgroundColor: '#F8F6F0',
      textColor: '#1A2B3C',
      accentColor: '#D4A574'
    }
  },
  {
    id: 'celebration-sunset-gradient',
    name: 'Sunset Gradient',
    description: 'Warm celebration with coral and gold',
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
    id: 'celebration-starry-night',
    name: 'Starry Night Magic',
    description: 'Celestial celebration under the stars',
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
    id: 'celebration-rustic-wood',
    name: 'Rustic Celebration',
    description: 'Warm wood textures for milestone moments',
    category: 'celebration',
    preview: pineTrees,
    style: {
      layout: 'split-layout',
      textPosition: 'side',
      backgroundColor: '#F5E6D3',
      textColor: '#5D4037',
      accentColor: '#8D6E63'
    }
  },

  // 🌿 MEMORIAL / TRIBUTE TEMPLATES
  {
    id: 'memorial-feather-nature',
    name: 'Gentle Feathers',
    description: 'Peaceful remembrance with natural elements',
    category: 'memorial',
    preview: cardMemorialNature,
    style: {
      layout: 'overlay-text',
      textPosition: 'center',
      backgroundColor: '#F8FBF8',
      textColor: '#6B8B7F',
      accentColor: '#9DB5A5'
    }
  },

  // 💖 CHARITY / COMMUNITY SUPPORT TEMPLATE
  {
    id: 'charity-community-hands',
    name: 'Community Hearts',
    description: 'Hopeful gratitude for charitable support',
    category: 'general',
    preview: cardCharityHands,
    style: {
      layout: 'overlay-text',
      textPosition: 'center',
      backgroundColor: '#FFFEF8',
      textColor: '#5A7D7C',
      accentColor: '#F4A261'
    }
  },
];

const categoryLabels: Record<TemplateCategory, string> = {
  wedding: 'Wedding',
  baby: 'Baby/Birth',
  'baby-shower': 'Baby Shower',
  general: 'General',
  celebration: 'Celebration',
  memorial: 'Memorial/Tribute'
};

interface CardTemplatesProps {
  selectedTemplate: string | null;
  onTemplateSelect: (template: CardTemplate) => void;
  filterByOccasion?: TemplateCategory | null;
}

export const CardTemplates: React.FC<CardTemplatesProps> = ({ 
  selectedTemplate, 
  onTemplateSelect,
  filterByOccasion 
}) => {
  // If filterByOccasion is provided, use it as default, otherwise show all
  const initialCategory = filterByOccasion || 'all';
  const [activeCategory, setActiveCategory] = React.useState<TemplateCategory | 'all'>(initialCategory);

  const filteredTemplates = activeCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  const renderTemplateCard = (template: CardTemplate) => (
    <Card 
      key={template.id}
      className={`cursor-pointer transition-all hover:shadow-warm border-2 ${
        selectedTemplate === template.id 
          ? 'ring-2 ring-primary border-primary shadow-glow' 
          : 'hover:border-primary/50 border-transparent'
      }`}
      onClick={() => onTemplateSelect(template)}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Template preview image */}
          <div className="w-full aspect-video rounded-lg overflow-hidden border-2 border-border shadow-soft">
            <img 
              src={template.preview}
              alt={template.name}
              className="w-full h-full object-cover transition-transform hover:scale-105"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                const fallback = img.nextElementSibling as HTMLDivElement;
                img.style.display = 'none';
                fallback.style.display = 'flex';
              }}
            />
            <div 
              className="w-full h-full bg-muted flex items-center justify-center text-4xl" 
              style={{ display: 'none' }}
            >
              🎨
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-semibold text-base">{template.name}</h4>
              {selectedTemplate === template.id && (
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-scale-in">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {template.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // If an occasion is already selected (coming from step 1), just show filtered templates
  if (filterByOccasion) {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-serif font-semibold mb-2">Choose a Card Template</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Select a beautiful {categoryLabels[filterByOccasion].toLowerCase()} design
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => renderTemplateCard(template))}
        </div>
      </div>
    );
  }

  // Otherwise show tabs for all occasions
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-serif font-semibold mb-2">Choose a Card Template</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select a beautiful design that matches your occasion
        </p>
      </div>

      <Tabs defaultValue={initialCategory} className="w-full" onValueChange={(value) => setActiveCategory(value as TemplateCategory | 'all')}>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="wedding">Wedding</TabsTrigger>
          <TabsTrigger value="baby">Baby/Birth</TabsTrigger>
          <TabsTrigger value="baby-shower">Baby Shower</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="celebration">Celebration</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

        <TabsContent value="memorial" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.filter(t => t.category === 'memorial').map((template) => renderTemplateCard(template))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { templates };
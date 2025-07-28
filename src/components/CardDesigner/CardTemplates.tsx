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
    preview: '🖼️',
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
    preview: '🌅',
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
    preview: '📱',
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
    preview: '✨',
    style: {
      layout: 'overlay-text',
      textPosition: 'bottom',
      backgroundColor: 'rgba(0,0,0,0.3)',
      textColor: '#FFFFFF',
      accentColor: '#5A9FD4'
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
                <div className="text-3xl">{template.preview}</div>
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
              
              {/* Template preview */}
              <div className="mt-3 h-20 rounded border-2 border-dashed border-muted relative overflow-hidden">
                <div 
                  className="w-full h-full flex items-center justify-center text-xs"
                  style={{ 
                    backgroundColor: template.style.backgroundColor === 'transparent' 
                      ? '#f0f0f0' 
                      : template.style.backgroundColor 
                  }}
                >
                  <div className="text-center space-y-1">
                    <div className="w-8 h-6 bg-gray-300 mx-auto rounded"></div>
                    <div className="w-12 h-1 bg-gray-400 mx-auto rounded"></div>
                  </div>
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
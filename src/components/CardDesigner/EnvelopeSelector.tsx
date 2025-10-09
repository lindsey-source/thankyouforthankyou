import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

export interface EnvelopeStyle {
  id: string;
  name: string;
  primaryColor: string;
  accentColor: string;
  textColor: string;
  description: string;
}

export const envelopeStyles: EnvelopeStyle[] = [
  {
    id: 'classic-cream',
    name: 'Classic Cream',
    primaryColor: '#F5E6D3',
    accentColor: '#D4A574',
    textColor: '#8B6F47',
    description: 'Elegant and timeless'
  },
  {
    id: 'blush-pink',
    name: 'Blush Pink',
    primaryColor: '#FFF0F5',
    accentColor: '#FFB6C1',
    textColor: '#8B7355',
    description: 'Soft and romantic'
  },
  {
    id: 'sage-green',
    name: 'Sage Green',
    primaryColor: '#F8FBF8',
    accentColor: '#9DB5A5',
    textColor: '#6B8B7F',
    description: 'Natural and calming'
  },
  {
    id: 'navy-blue',
    name: 'Navy Blue',
    primaryColor: '#E8EDF4',
    accentColor: '#4A6FA5',
    textColor: '#2C4A6F',
    description: 'Professional and modern'
  },
  {
    id: 'lavender',
    name: 'Lavender',
    primaryColor: '#F5F3FF',
    accentColor: '#C4B5FD',
    textColor: '#7C6BA8',
    description: 'Gentle and peaceful'
  },
  {
    id: 'coral',
    name: 'Coral',
    primaryColor: '#FFF9E6',
    accentColor: '#FF9B7A',
    textColor: '#B85C38',
    description: 'Warm and cheerful'
  },
  {
    id: 'champagne',
    name: 'Champagne Gold',
    primaryColor: '#FFF8F0',
    accentColor: '#F4A460',
    textColor: '#8B7355',
    description: 'Luxurious and festive'
  },
  {
    id: 'mint',
    name: 'Mint Green',
    primaryColor: '#F0FFF4',
    accentColor: '#86EFAC',
    textColor: '#065F46',
    description: 'Fresh and uplifting'
  }
];

interface EnvelopeSelectorProps {
  selectedEnvelope: string | null;
  onEnvelopeSelect: (envelope: EnvelopeStyle) => void;
}

export const EnvelopeSelector: React.FC<EnvelopeSelectorProps> = ({
  selectedEnvelope,
  onEnvelopeSelect
}) => {
  return (
    <Card className="bg-white/95 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">Choose Your Envelope</h3>
            <p className="text-muted-foreground text-sm">
              Select the envelope color that best matches your occasion
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {envelopeStyles.map((envelope) => (
              <div
                key={envelope.id}
                onClick={() => onEnvelopeSelect(envelope)}
                className={`relative cursor-pointer group transition-all ${
                  selectedEnvelope === envelope.id
                    ? 'ring-2 ring-primary ring-offset-2'
                    : 'hover:scale-105'
                }`}
              >
                <div className="aspect-[4/3] rounded-lg shadow-md overflow-hidden relative">
                  {/* Envelope preview */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center p-4"
                    style={{ backgroundColor: envelope.primaryColor }}
                  >
                    {/* Mini envelope flap */}
                    <div className="relative w-full h-full">
                      <div 
                        className="absolute top-0 left-0 right-0 h-1/2"
                        style={{ 
                          backgroundColor: envelope.accentColor,
                          clipPath: 'polygon(0 0, 50% 100%, 100% 0)'
                        }}
                      />
                      {/* Envelope body */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: 'white' }}
                        >
                          <div 
                            className="w-4 h-4"
                            style={{ color: envelope.accentColor }}
                          >
                            ❤️
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Selection checkmark */}
                  {selectedEnvelope === envelope.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="mt-2 text-center">
                  <p className="font-medium text-sm">{envelope.name}</p>
                  <p className="text-xs text-muted-foreground">{envelope.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

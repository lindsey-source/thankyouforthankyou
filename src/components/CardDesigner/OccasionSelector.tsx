import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

export type Occasion = 'wedding' | 'baby' | 'baby-shower' | 'general' | 'celebration' | 'memorial';

interface OccasionSelectorProps {
  selectedOccasion: Occasion | null;
  onOccasionSelect: (occasion: Occasion) => void;
}

const occasions: { id: Occasion; label: string; description: string; icon: string }[] = [
  {
    id: 'wedding',
    label: 'Wedding',
    description: 'Thank guests for celebrating your special day',
    icon: '💍'
  },
  {
    id: 'baby',
    label: 'Baby/Birth',
    description: 'Welcome your little one with gratitude',
    icon: '👶'
  },
  {
    id: 'baby-shower',
    label: 'Baby Shower',
    description: 'Thank attendees for their gifts and support',
    icon: '🍼'
  },
  {
    id: 'general',
    label: 'General Thank You',
    description: 'Express gratitude for any occasion',
    icon: '💝'
  },
  {
    id: 'celebration',
    label: 'Celebration',
    description: 'Birthday, anniversary, or special events',
    icon: '🎉'
  },
  {
    id: 'memorial',
    label: 'Memorial/Tribute',
    description: 'Honor and remember with heartfelt thanks',
    icon: '🌿'
  }
];

export const OccasionSelector: React.FC<OccasionSelectorProps> = ({
  selectedOccasion,
  onOccasionSelect
}) => {
  return (
    <Card className="bg-white/95 backdrop-blur-sm">
      <CardContent className="p-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">What's the Occasion?</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Select the occasion for your thank you card
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {occasions.map((occasion) => (
            <Card
              key={occasion.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedOccasion === occasion.id
                  ? 'ring-2 ring-primary border-primary'
                  : 'hover:border-primary/50'
              }`}
              onClick={() => onOccasionSelect(occasion.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{occasion.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-lg">{occasion.label}</h4>
                      {selectedOccasion === occasion.id && (
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {occasion.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

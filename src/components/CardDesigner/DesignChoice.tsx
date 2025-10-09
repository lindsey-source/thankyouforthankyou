import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Palette } from 'lucide-react';

export type DesignChoice = 'template' | 'custom';

interface DesignChoiceProps {
  selectedChoice: DesignChoice | null;
  onChoiceSelect: (choice: DesignChoice) => void;
}

export const DesignChoiceSelector: React.FC<DesignChoiceProps> = ({
  selectedChoice,
  onChoiceSelect
}) => {
  return (
    <Card className="bg-white/95 backdrop-blur-sm">
      <CardContent className="p-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">How Would You Like to Design?</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Choose a pre-designed template or create your own
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Template Option */}
          <Card
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedChoice === 'template'
                ? 'ring-2 ring-primary border-primary'
                : 'hover:border-primary/50'
            }`}
            onClick={() => onChoiceSelect('template')}
          >
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-semibold text-xl mb-2">Use a Template</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Choose from our beautiful pre-designed templates matched to your occasion
              </p>
              <div className="text-xs text-muted-foreground">
                ✓ Quick and easy<br />
                ✓ Professional designs<br />
                ✓ Occasion-specific
              </div>
            </CardContent>
          </Card>

          {/* Custom Option */}
          <Card
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedChoice === 'custom'
                ? 'ring-2 ring-primary border-primary'
                : 'hover:border-primary/50'
            }`}
            onClick={() => onChoiceSelect('custom')}
          >
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                <Palette className="w-8 h-8 text-accent" />
              </div>
              <h4 className="font-semibold text-xl mb-2">Design Your Own</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Start with a blank canvas and create a completely custom card
              </p>
              <div className="text-xs text-muted-foreground">
                ✓ Full creative control<br />
                ✓ Unique designs<br />
                ✓ Express yourself
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

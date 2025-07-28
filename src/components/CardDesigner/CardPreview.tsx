import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CardTemplate } from './CardTemplates';

interface CardPreviewProps {
  template: CardTemplate | null;
  photo: { file: File; preview: string } | null;
  message: string;
  recipientName: string;
  senderName: string;
}

export const CardPreview: React.FC<CardPreviewProps> = ({ 
  template, 
  photo, 
  message, 
  recipientName,
  senderName 
}) => {
  if (!template) {
    return (
      <Card className="h-80 border-2 border-dashed border-muted">
        <CardContent className="h-full flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p>Select a template to preview your card</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const renderCard = () => {
    const { layout, textPosition, backgroundColor, textColor, accentColor } = template.style;

    const cardStyles = {
      backgroundColor: backgroundColor === 'transparent' ? 'rgba(0,0,0,0.1)' : backgroundColor,
      color: textColor,
      backgroundImage: layout === 'full-background' && photo ? `url(${photo.preview})` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };

    const messageText = message || `Dear ${recipientName || 'Friend'}, thank you so much for your thoughtful gift!`;
    const signature = senderName ? `With gratitude, ${senderName}` : 'With gratitude';

    switch (layout) {
      case 'full-background':
        return (
          <div className="relative w-full h-full rounded-lg overflow-hidden" style={cardStyles}>
            {photo && (
              <div className="absolute inset-0 bg-black/30"></div>
            )}
            <div className="relative z-10 h-full flex flex-col justify-center items-center p-6 text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 max-w-sm">
                <p className="text-sm leading-relaxed mb-3">{messageText}</p>
                <p className="text-xs font-medium" style={{ color: accentColor }}>{signature}</p>
              </div>
            </div>
          </div>
        );

      case 'photo-frame':
        return (
          <div className="w-full h-full p-4" style={{ backgroundColor }}>
            {photo && (
              <div className="w-full h-2/3 mb-4 rounded-lg overflow-hidden shadow-soft">
                <img src={photo.preview} alt="Card" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="text-center space-y-2">
              <p className="text-xs leading-relaxed" style={{ color: textColor }}>{messageText}</p>
              <p className="text-xs font-medium" style={{ color: accentColor }}>{signature}</p>
            </div>
          </div>
        );

      case 'split-layout':
        return (
          <div className="w-full h-full flex" style={{ backgroundColor }}>
            <div className="w-1/2 h-full">
              {photo ? (
                <img src={photo.preview} alt="Card" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Photo</span>
                </div>
              )}
            </div>
            <div className="w-1/2 h-full flex flex-col justify-center p-4">
              <div className="space-y-2">
                <p className="text-xs leading-relaxed" style={{ color: textColor }}>{messageText}</p>
                <p className="text-xs font-medium" style={{ color: accentColor }}>{signature}</p>
              </div>
            </div>
          </div>
        );

      case 'overlay-text':
        return (
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            {photo && (
              <img src={photo.preview} alt="Card" className="w-full h-full object-cover" />
            )}
            <div 
              className="absolute bottom-0 left-0 right-0 p-4"
              style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
            >
              <div className="text-center space-y-2">
                <p className="text-xs leading-relaxed text-white">{messageText}</p>
                <p className="text-xs font-medium" style={{ color: accentColor }}>{signature}</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full flex items-center justify-center" style={cardStyles}>
            <p className="text-xs">Preview not available</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Card Preview</h3>
        <p className="text-sm text-muted-foreground">
          How your thank you card will look
        </p>
      </div>
      
      <Card className="shadow-soft">
        <CardContent className="p-0">
          <div className="aspect-[3/4] w-full max-w-sm mx-auto">
            {renderCard()}
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-muted-foreground">
        Template: {template.name}
      </div>
    </div>
  );
};
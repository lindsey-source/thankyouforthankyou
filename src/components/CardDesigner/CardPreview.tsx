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
  console.log('CardPreview received template:', template);
  console.log('CardPreview received photo:', photo);
  
  if (!template) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">Card Preview</h3>
            <div className="aspect-[3/4] border-2 border-dashed border-muted rounded-lg flex items-center justify-center text-muted-foreground">
              <div className="text-center space-y-2">
                <div className="text-4xl">📄</div>
                <p>Select a template to see your card preview</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const renderCard = () => {
    const { layout, textPosition, backgroundColor, textColor, accentColor } = template.style;
    
    console.log('Rendering card with styles:', {
      layout,
      backgroundColor,
      textColor,
      accentColor
    });

    const messageText = message || `Dear ${recipientName || 'Friend'}, thank you so much for your thoughtful gift!`;
    const signature = senderName ? `With gratitude, ${senderName}` : 'With gratitude';

    switch (layout) {
      case 'full-background':
        return (
          <div 
            className="relative w-full h-full rounded-lg overflow-hidden p-6 flex items-center justify-center" 
            style={{ 
              background: backgroundColor,
              color: textColor
            }}
          >
            <div className="text-center bg-black bg-opacity-20 p-4 rounded">
              <p className="text-sm font-medium mb-2" style={{ color: textColor }}>{messageText}</p>
              <p className="text-xs" style={{ color: accentColor }}>{signature}</p>
            </div>
          </div>
        );

      case 'photo-frame':
        return (
          <div 
            className="w-full h-full p-4" 
            style={{ background: backgroundColor }}
          >
            <div className="w-full h-2/3 mb-4 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
              {photo ? (
                <img 
                  src={photo.preview} 
                  alt="Your uploaded photo" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <div className="text-2xl mb-2">📷</div>
                  <p className="text-xs">Your photo will appear here</p>
                </div>
              )}
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm" style={{ color: textColor }}>{messageText}</p>
              <p className="text-xs font-medium" style={{ color: accentColor }}>{signature}</p>
            </div>
          </div>
        );

      case 'split-layout':
        return (
          <div 
            className="w-full h-full flex rounded-lg overflow-hidden" 
            style={{ background: backgroundColor }}
          >
            <div className="w-1/2 h-full overflow-hidden">
              {photo ? (
                <img 
                  src={photo.preview} 
                  alt="Your uploaded photo" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="text-2xl mb-2">📷</div>
                    <p className="text-xs">Photo</p>
                  </div>
                </div>
              )}
            </div>
            <div className="w-1/2 h-full flex flex-col justify-center p-4">
              <div className="space-y-3">
                <p className="text-sm font-medium" style={{ color: textColor }}>{messageText}</p>
                <p className="text-xs font-bold" style={{ color: accentColor }}>{signature}</p>
              </div>
            </div>
          </div>
        );

      case 'overlay-text':
        return (
          <div 
            className="relative w-full h-full rounded-lg overflow-hidden"
            style={{ background: backgroundColor }}
          >
            {/* Show uploaded photo or template preview image */}
            <div className="absolute inset-0">
              <img 
                src={photo ? photo.preview : template.preview}
                alt={photo ? "Your uploaded photo" : "Template background"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to solid background if image fails
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className="relative z-10 h-full flex items-center justify-center p-4">
              <div className="text-center bg-black bg-opacity-40 p-4 rounded">
                <p className="text-sm font-medium mb-2 text-white">{messageText}</p>
                <p className="text-xs text-white" style={{ color: accentColor }}>{signature}</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div 
            className="w-full h-full flex items-center justify-center rounded-lg"
            style={{ background: backgroundColor || '#f3f4f6' }}
          >
            <div className="text-center">
              <p className="text-sm font-medium" style={{ color: textColor || '#000' }}>{messageText}</p>
              <p className="text-xs mt-2" style={{ color: accentColor || '#666' }}>{signature}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Card Preview</h3>
            <p className="text-sm text-muted-foreground">
              How your thank you card will look
            </p>
          </div>
          
          <div className="aspect-[3/4] w-full max-w-sm mx-auto border rounded-lg overflow-hidden bg-white shadow-sm">
            {renderCard()}
          </div>

          <div className="text-center text-xs text-muted-foreground">
            Template: {template.name}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
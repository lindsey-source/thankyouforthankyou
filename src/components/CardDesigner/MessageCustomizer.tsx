import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface MessageCustomizerProps {
  message: string;
  onMessageChange: (message: string) => void;
  recipientName: string;
  onRecipientNameChange: (name: string) => void;
  senderName: string;
  onSenderNameChange: (name: string) => void;
}

const thankYouTemplates = [
  "Thank you so much for the beautiful gift and for being part of our special day!",
  "Your thoughtful present meant the world to us. We're so grateful to have you in our lives!",
  "Thank you for celebrating with us and for your generous gift. It was perfect!",
  "We were touched by your kindness and generosity. Thank you for making our day even more special!",
  "Your presence at our celebration was the best gift of all, and your thoughtful present was the cherry on top!",
  "Thank you for your love, support, and beautiful gift. We feel so blessed to have friends like you!"
];

export const MessageCustomizer: React.FC<MessageCustomizerProps> = ({
  message,
  onMessageChange,
  recipientName,
  onRecipientNameChange,
  senderName,
  onSenderNameChange
}) => {
  const handleTemplateSelect = (template: string) => {
    onMessageChange(template);
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Customize Your Message</h3>
          <p className="text-sm text-muted-foreground">
            Personalize the thank you message for your recipients
          </p>
        </div>

        {/* Recipient and Sender Names */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="recipientName">Recipient Name</Label>
            <Input
              id="recipientName"
              placeholder="e.g., Sarah & John"
              value={recipientName}
              onChange={(e) => onRecipientNameChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="senderName">From</Label>
            <Input
              id="senderName"
              placeholder="e.g., The Smith Family"
              value={senderName}
              onChange={(e) => onSenderNameChange(e.target.value)}
            />
          </div>
        </div>

        {/* Message Templates */}
        <div className="space-y-3">
          <Label>Quick Templates</Label>
          <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
            {thankYouTemplates.map((template, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-left h-auto p-3 text-xs justify-start"
                onClick={() => handleTemplateSelect(template)}
              >
                <Sparkles className="h-3 w-3 mr-2 flex-shrink-0" />
                <span className="truncate">{template}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Message */}
        <div className="space-y-2">
          <Label htmlFor="customMessage">Your Message</Label>
          <Textarea
            id="customMessage"
            placeholder="Write your personalized thank you message here..."
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            className="min-h-[120px] resize-none"
          />
          <p className="text-xs text-muted-foreground">
            This message will appear on all cards. You can personalize individual cards later.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
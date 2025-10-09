import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardWizard } from '@/contexts/CardWizardContext';
import { useAuth } from '@/contexts/AuthContext';
import { useAutoSave } from '@/hooks/useAutoSave';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Lightbulb, Check } from 'lucide-react';
import { toast } from 'sonner';

const sampleMessages = {
  wedding: [
    { headline: 'With Love & Gratitude', body: 'Thank you for celebrating our special day with us. Your presence made our wedding truly unforgettable.', closing: 'Love always' },
    { headline: 'Forever Grateful', body: 'Your thoughtful gift and warm wishes mean the world to us as we begin this new chapter together.', closing: 'With appreciation' }
  ],
  baby: [
    { headline: 'Welcome to the World', body: 'Thank you for the beautiful gift and for celebrating the arrival of our little one with us!', closing: 'With love' },
    { headline: 'Our Hearts Are Full', body: 'Your kindness and generosity have touched our hearts during this special time.', closing: 'Gratefully yours' }
  ],
  general: [
    { headline: 'Thank You So Much', body: 'Your thoughtfulness and generosity have truly brightened my day. I am so grateful to have you in my life.', closing: 'With heartfelt thanks' },
    { headline: 'Deeply Grateful', body: 'Words cannot express how much your kindness means to me. Thank you for being so wonderful.', closing: 'Warmly' }
  ]
};

export default function CreateCardStep3() {
  const navigate = useNavigate();
  const { cardData, updateCardData, setCurrentStep } = useCardWizard();
  const { user } = useAuth();
  const [showInspiration, setShowInspiration] = useState(false);
  const [cardId, setCardId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    messageHeadline: cardData.messageHeadline || '',
    messageBody: cardData.messageBody || '',
    closing: cardData.closing || ''
  });

  // Auto-save functionality
  useAutoSave(
    {
      template_id: cardData.templateId,
      message_headline: formData.messageHeadline,
      message_body: formData.messageBody,
      closing: formData.closing,
      color_palette: cardData.colorPalette,
      font_choice: cardData.fontChoice
    },
    user?.id,
    cardId,
    setCardId
  );

  const getOccasionMessages = () => {
    const occasion = cardData.occasion || 'general';
    return sampleMessages[occasion as keyof typeof sampleMessages] || sampleMessages.general;
  };

  const handleUseInspiration = (sample: any) => {
    setFormData({
      messageHeadline: sample.headline,
      messageBody: sample.body,
      closing: sample.closing
    });
    setShowInspiration(false);
    toast.success('Message applied!');
  };

  const handleNext = () => {
    if (!formData.messageBody.trim()) {
      toast.error('Please write your thank you message');
      return;
    }

    updateCardData({
      messageHeadline: formData.messageHeadline,
      messageBody: formData.messageBody,
      closing: formData.closing
    });
    setCurrentStep(4);
    navigate('/create-card/step4');
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Personalize your message
          </motion.h1>
          <p className="text-white/90">Express your heartfelt gratitude</p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm mb-6">
          <CardContent className="p-6 space-y-6">
            {/* Inspiration Toggle */}
            <div className="flex justify-between items-center">
              <Label className="text-lg font-semibold">Your Message</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowInspiration(!showInspiration)}
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Need inspiration?
              </Button>
            </div>

            {/* Inspiration Samples */}
            {showInspiration && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-3"
              >
                {getOccasionMessages().map((sample, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleUseInspiration(sample)}
                    className="p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    <h4 className="font-semibold mb-1">{sample.headline}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{sample.body}</p>
                    <p className="text-xs italic text-muted-foreground">{sample.closing}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Headline */}
            <div className="space-y-2">
              <Label htmlFor="headline">Headline (Optional)</Label>
              <Input
                id="headline"
                placeholder="With Heartfelt Thanks"
                value={formData.messageHeadline}
                onChange={(e) => setFormData({ ...formData, messageHeadline: e.target.value })}
              />
            </div>

            {/* Message Body */}
            <div className="space-y-2">
              <Label htmlFor="message">Your Message *</Label>
              <Textarea
                id="message"
                placeholder="Write your heartfelt thank you message here..."
                value={formData.messageBody}
                onChange={(e) => setFormData({ ...formData, messageBody: e.target.value })}
                rows={8}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground text-right">
                {formData.messageBody.length} characters
              </p>
            </div>

            {/* Closing */}
            <div className="space-y-2">
              <Label htmlFor="closing">Closing (Optional)</Label>
              <Input
                id="closing"
                placeholder="With gratitude, [Your Name]"
                value={formData.closing}
                onChange={(e) => setFormData({ ...formData, closing: e.target.value })}
              />
            </div>

            {/* Auto-save Indicator */}
            {cardId && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Check className="w-4 h-4" />
                Draft saved automatically
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => navigate('/create-card/step2')}
            className="bg-white/95"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <p className="text-sm text-white/70">Step 3 of 5</p>
          
          <Button variant="hero" onClick={handleNext}>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

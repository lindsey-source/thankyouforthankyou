import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Save } from 'lucide-react';
import { PhotoUpload } from './PhotoUpload';
import { CardTemplates, CardTemplate } from './CardTemplates';
import { BackgroundRemover } from './BackgroundRemover';
import { MessageCustomizer } from './MessageCustomizer';
import { CardPreview } from './CardPreview';
import { toast } from 'sonner';

interface CardDesign {
  photo: { file: File; preview: string } | null;
  template: CardTemplate | null;
  message: string;
  recipientName: string;
  senderName: string;
}

interface CardDesignerProps {
  onSaveDesign: (design: CardDesign) => void;
  onCancel: () => void;
  initialDesign?: Partial<CardDesign>;
}

export const CardDesigner: React.FC<CardDesignerProps> = ({ 
  onSaveDesign, 
  onCancel, 
  initialDesign = {} 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [design, setDesign] = useState<CardDesign>({
    photo: initialDesign.photo || null,
    template: initialDesign.template || null,
    message: initialDesign.message || '',
    recipientName: initialDesign.recipientName || '',
    senderName: initialDesign.senderName || '',
  });
  const [showBackgroundRemover, setShowBackgroundRemover] = useState(false);

  const steps = [
    { id: 1, title: 'Upload Photo', description: 'Add your special moment' },
    { id: 2, title: 'Choose Template', description: 'Select card layout' },
    { id: 3, title: 'Customize Message', description: 'Write your thank you' },
    { id: 4, title: 'Preview & Save', description: 'Review your card' },
  ];

  const handlePhotoUpload = (file: File, preview: string) => {
    setDesign(prev => ({ ...prev, photo: { file, preview } }));
    setShowBackgroundRemover(true);
  };

  const handleRemovePhoto = () => {
    setDesign(prev => ({ ...prev, photo: null }));
    setShowBackgroundRemover(false);
  };

  const handleBackgroundRemoved = (file: File, preview: string) => {
    setDesign(prev => ({ ...prev, photo: { file, preview } }));
    setShowBackgroundRemover(false);
    toast.success('Background removed! Your photo looks great!');
  };

  const handleTemplateSelect = (template: CardTemplate) => {
    setDesign(prev => ({ ...prev, template }));
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !design.photo) {
      toast.error('Please upload a photo first');
      return;
    }
    if (currentStep === 2 && !design.template) {
      toast.error('Please select a card template');
      return;
    }
    if (currentStep === 3 && !design.message.trim()) {
      toast.error('Please write a thank you message');
      return;
    }
    
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDesign = () => {
    if (!design.photo || !design.template || !design.message.trim()) {
      toast.error('Please complete all steps before saving');
      return;
    }
    
    onSaveDesign(design);
    toast.success('Card design saved successfully!');
  };

  const isStepComplete = (stepId: number) => {
    switch (stepId) {
      case 1: return !!design.photo;
      case 2: return !!design.template;
      case 3: return !!design.message.trim();
      case 4: return !!design.photo && !!design.template && !!design.message.trim();
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Design Your Thank You Card</h1>
          <p className="text-white/80">Create a personalized card with your special photos</p>
        </div>

        {/* Progress Steps */}
        <Card className="mb-8 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                        currentStep === step.id 
                          ? 'bg-primary text-white' 
                          : isStepComplete(step.id)
                          ? 'bg-accent text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {step.id}
                    </div>
                    <div className="ml-3 text-left hidden md:block">
                      <p className="text-sm font-medium">{step.title}</p>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-full h-0.5 bg-muted mx-4 hidden md:block"></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Design Tools */}
          <div className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <PhotoUpload 
                  onPhotoUpload={handlePhotoUpload}
                  uploadedPhoto={design.photo}
                  onRemovePhoto={handleRemovePhoto}
                />
                
                {showBackgroundRemover && design.photo && (
                  <BackgroundRemover 
                    originalImage={design.photo}
                    onBackgroundRemoved={handleBackgroundRemoved}
                  />
                )}
              </div>
            )}

            {currentStep === 2 && (
              <CardTemplates 
                selectedTemplate={design.template?.id || null}
                onTemplateSelect={handleTemplateSelect}
              />
            )}

            {currentStep === 3 && (
              <MessageCustomizer 
                message={design.message}
                onMessageChange={(message) => setDesign(prev => ({ ...prev, message }))}
                recipientName={design.recipientName}
                onRecipientNameChange={(name) => setDesign(prev => ({ ...prev, recipientName: name }))}
                senderName={design.senderName}
                onSenderNameChange={(name) => setDesign(prev => ({ ...prev, senderName: name }))}
              />
            )}

            {currentStep === 4 && (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-semibold">Your Card is Ready!</h3>
                    <p className="text-muted-foreground">
                      Review your card design and save it to use in your thank you campaigns.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Photo:</span>
                        <span className="text-accent">✓ Uploaded</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Template:</span>
                        <span className="text-accent">✓ {design.template?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Message:</span>
                        <span className="text-accent">✓ Written</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Preview */}
          <div className="lg:sticky lg:top-4">
            <CardPreview 
              template={design.template}
              photo={design.photo}
              message={design.message}
              recipientName={design.recipientName}
              senderName={design.senderName}
            />
          </div>
        </div>

        {/* Navigation */}
        <Card className="mt-8 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                {currentStep > 1 && (
                  <Button variant="outline" onClick={handlePrevStep}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                )}
              </div>

              <div className="flex gap-2">
                {currentStep < steps.length ? (
                  <Button onClick={handleNextStep} variant="hero">
                    Next Step
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSaveDesign} variant="highlight">
                    <Save className="h-4 w-4 mr-2" />
                    Save Card Design
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
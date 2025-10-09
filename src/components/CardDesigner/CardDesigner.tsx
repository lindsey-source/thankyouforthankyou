import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PhotoUpload } from './PhotoUpload';
import { CardTemplates, CardTemplate } from './CardTemplates';
import { BackgroundRemover } from './BackgroundRemover';
import { MessageCustomizer } from './MessageCustomizer';
import { CardPreview } from './CardPreview';
import { CampaignSaveDialog } from '@/components/CampaignSaveDialog';
import { OccasionSelector, Occasion } from './OccasionSelector';
import { DesignChoiceSelector, DesignChoice } from './DesignChoice';
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
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion | null>(null);
  const [designChoice, setDesignChoice] = useState<DesignChoice | null>(null);
  const [design, setDesign] = useState<CardDesign>({
    photo: initialDesign.photo || null,
    template: initialDesign.template || null,
    message: initialDesign.message || '',
    recipientName: initialDesign.recipientName || '',
    senderName: initialDesign.senderName || '',
  });
  const [showBackgroundRemover, setShowBackgroundRemover] = useState(false);
  const stepContentRef = useRef<HTMLDivElement>(null);

  // Track design state changes for debugging
  useEffect(() => {
    console.log('Design state changed:', design);
  }, [design]);

  // Auto-scroll to step content when step changes
  useEffect(() => {
    if (stepContentRef.current) {
      stepContentRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }, [currentStep]);

  const steps = [
    { id: 1, title: 'Choose Occasion', description: 'Select your event' },
    { id: 2, title: 'Design Choice', description: 'Template or custom' },
    { id: 3, title: 'Select Design', description: 'Pick your style' },
    { id: 4, title: 'Add Photo (Optional)', description: 'Upload image' },
    { id: 5, title: 'Write Message', description: 'Your thank you' },
    { id: 6, title: 'Preview & Save', description: 'Review card' },
  ];

  const handlePhotoUpload = (file: File, preview: string) => {
    console.log('Photo uploaded:', { file: file.name, preview: preview.substring(0, 50) + '...' });
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
    console.log('Template selected:', template);
    setDesign(prev => ({ ...prev, template }));
  };

  const handleNextStep = () => {
    console.log('Next step clicked, current step:', currentStep);
    
    if (currentStep === 1 && !selectedOccasion) {
      toast.error('Please select an occasion');
      return;
    }
    if (currentStep === 2 && !designChoice) {
      toast.error('Please choose a design approach');
      return;
    }
    if (currentStep === 3 && designChoice === 'template' && !design.template) {
      toast.error('Please select a card template');
      return;
    }
    // Step 4 (photo upload) is optional - no validation needed
    if (currentStep === 5 && !design.message.trim()) {
      toast.error('Please write a thank you message');
      return;
    }
    
    if (currentStep < steps.length) {
      console.log('Moving to next step:', currentStep + 1);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDesign = () => {
    if (!design.template || !design.message.trim()) {
      toast.error('Please select a template and write a message before saving');
      return;
    }
    
    onSaveDesign(design);
    toast.success('Card design saved successfully!');
  };

  const handleCampaignSaved = (campaignId: string) => {
    toast.success('Campaign saved successfully!');
    navigate('/dashboard');
  };

  const isStepComplete = (stepId: number) => {
    switch (stepId) {
      case 1: return !!selectedOccasion;
      case 2: return !!designChoice;
      case 3: return designChoice === 'custom' || !!design.template;
      case 4: return true; // Photo step is optional
      case 5: return !!design.message.trim();
      case 6: return !!design.message.trim() && (designChoice === 'custom' || !!design.template);
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
            <div className="flex items-center justify-between overflow-x-auto pb-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-shrink-0">
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
                    <div className="ml-3 text-left hidden lg:block">
                      <p className="text-sm font-medium whitespace-nowrap">{step.title}</p>
                      <p className="text-xs text-muted-foreground whitespace-nowrap">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-8 lg:w-12 h-0.5 bg-muted mx-2 lg:mx-4"></div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Design Tools */}
          <div ref={stepContentRef} className="space-y-6">
            {currentStep === 1 && (
              <OccasionSelector 
                selectedOccasion={selectedOccasion}
                onOccasionSelect={setSelectedOccasion}
              />
            )}

            {currentStep === 2 && (
              <DesignChoiceSelector 
                selectedChoice={designChoice}
                onChoiceSelect={setDesignChoice}
              />
            )}

            {currentStep === 3 && designChoice === 'template' && (
              <CardTemplates 
                selectedTemplate={design.template?.id || null}
                onTemplateSelect={handleTemplateSelect}
                filterByOccasion={selectedOccasion}
              />
            )}

            {currentStep === 3 && designChoice === 'custom' && (
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="text-6xl mb-4">🎨</div>
                    <h3 className="text-lg font-semibold">Custom Design Coming Soon!</h3>
                    <p className="text-muted-foreground">
                      Custom design tools are being developed. For now, please choose a template and customize it with your photo and message.
                    </p>
                    <Button variant="outline" onClick={() => setDesignChoice('template')}>
                      Choose a Template Instead
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 4 && (
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

            {currentStep === 5 && (
              <MessageCustomizer 
                message={design.message}
                onMessageChange={(message) => setDesign(prev => ({ ...prev, message }))}
                recipientName={design.recipientName}
                onRecipientNameChange={(name) => setDesign(prev => ({ ...prev, recipientName: name }))}
                senderName={design.senderName}
                onSenderNameChange={(name) => setDesign(prev => ({ ...prev, senderName: name }))}
              />
            )}

            {currentStep === 6 && (
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-semibold">Your Card is Ready!</h3>
                    <p className="text-muted-foreground">
                      Review your card design and save it to use in your thank you campaigns.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Occasion:</span>
                        <span className="text-accent">✓ {selectedOccasion}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Design:</span>
                        <span className="text-accent">✓ {designChoice === 'template' ? design.template?.name : 'Custom'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Photo:</span>
                        <span className={design.photo ? "text-accent" : "text-muted-foreground"}>
                          {design.photo ? "✓ Uploaded" : "○ Optional"}
                        </span>
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
          {currentStep > 2 && (
            <div className="lg:sticky lg:top-4">
              <CardPreview 
                template={design.template}
                photo={design.photo}
                message={design.message}
                recipientName={design.recipientName}
                senderName={design.senderName}
              />
            </div>
          )}
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
                  <div className="flex gap-2">
                    <CampaignSaveDialog 
                      cardDesign={{
                        template: design.template,
                        message: design.message,
                        recipientName: design.recipientName,
                        senderName: design.senderName,
                        uploadedImage: design.photo?.preview
                      }}
                      onSaved={handleCampaignSaved}
                      trigger={
                        <Button variant="outline">
                          <Save className="h-4 w-4 mr-2" />
                          Save Campaign
                        </Button>
                      }
                    />
                    <Button onClick={handleSaveDesign} variant="highlight">
                      <Save className="h-4 w-4 mr-2" />
                      Save Card Design
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
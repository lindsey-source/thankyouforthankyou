import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardWizard } from '@/contexts/CardWizardContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { ProgressBar } from '@/components/CardDesigner/ProgressBar';
import { BreadcrumbNav } from '@/components/CardDesigner/BreadcrumbNav';
import { GuestListUpload } from '@/components/CardDesigner/GuestListUpload';

const STEPS = [
  { name: 'Occasion', path: '/create-card/step1' },
  { name: 'Style', path: '/create-card/step2' },
  { name: 'Customize', path: '/create-card/step3' },
  { name: 'Message', path: '/create-card/step4' },
  { name: 'Recipients', path: '/create-card/step5' },
  { name: 'Impact', path: '/create-card/impact' },
  { name: 'Preview', path: '/create-card/step6' }
];

const STEP_NAMES = [
  'Choose Occasion',
  'Pick Your Style',
  'Customize Design',
  'Write Your Message',
  'Recipients',
  'Choose Your Cause',
  'Preview & Send'
];

export default function CreateCardStep5() {
  const navigate = useNavigate();
  const { setCurrentStep } = useCardWizard();

  const handleNext = () => {
    setCurrentStep(6);
    navigate('/create-card/impact');
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <ProgressBar currentStep={5} totalSteps={7} stepNames={STEP_NAMES} />
        <BreadcrumbNav currentStep={5} steps={STEPS} />
        <div className="text-center mb-8">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Recipients
          </motion.h1>
          <p className="text-white/90">
            Add the people you want to thank — upload a list or add them one by one
          </p>
        </div>

        <div className="space-y-6">
          {/* Returning-from-pre-event note */}
          <div className="rounded-xl bg-white/85 backdrop-blur-sm border border-white/60 px-4 py-3 flex items-start gap-3">
            <Sparkles className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-foreground/80">
              Coming from a pre-event setup? Upload your completed tracker here.
            </p>
          </div>

          {/* Guest List Upload — download template, upload CSV/Excel, preview & manual add */}
          <GuestListUpload />
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => navigate('/create-card/step4')}
            className="bg-white/95"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <p className="text-sm text-white/70">Step 5 of 7</p>

          <Button variant="hero" onClick={handleNext}>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

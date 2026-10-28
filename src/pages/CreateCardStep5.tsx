import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardWizard } from '@/contexts/CardWizardContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { ProgressBar } from '@/components/CardDesigner/ProgressBar';
import { BreadcrumbNav } from '@/components/CardDesigner/BreadcrumbNav';
import { WIZARD_STEPS } from '@/lib/wizardSteps';
import { GuestListUpload } from '@/components/CardDesigner/GuestListUpload';
import { LiveCardPreview } from '@/components/CardDesigner/LiveCardPreview';

const FONT_MAP: Record<string, { heading: string; body: string }> = {
  default: { heading: "'Playfair Display', Georgia, serif", body: "'Inter', sans-serif" },
  playfair: { heading: "'Playfair Display', Georgia, serif", body: "'Inter', sans-serif" },
  dancing: { heading: "'Dancing Script', cursive", body: "'Inter', sans-serif" },
  inter: { heading: "'Inter', sans-serif", body: "'Inter', sans-serif" },
};

export default function CreateCardStep5() {
  const navigate = useNavigate();
  const { cardData, setCurrentStep } = useCardWizard();

  const palette = (cardData.colorPalette as any) || {};
  const fonts = FONT_MAP[cardData.fontChoice || 'default'] || FONT_MAP.default;
  const guestTotal = cardData.guests?.length || cardData.guestCount || 0;

  const handleNext = () => {
    setCurrentStep(5);
    navigate('/create-card/step5');
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <ProgressBar currentStep={4} />
        <BreadcrumbNav currentStep={4} steps={WIZARD_STEPS} />
        <div className="text-center mb-8">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-stone-800 mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Guests
          </motion.h1>
          <p className="text-stone-500">
            Add the people you want to thank — upload a list or add them one by one
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_340px] lg:gap-12 items-start">
          <div className="space-y-6 min-w-0">
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

          {/* Large live preview — sticky on desktop, stacked below on phones */}
          <div className="mt-12 lg:mt-0 lg:sticky lg:top-24">
            <p
              className="text-xs uppercase tracking-[0.2em] text-center mb-4"
              style={{ color: '#8a9a82' }}
            >
              Your card, live
            </p>
            <LiveCardPreview
              palette={{
                primary: palette.headerBg || '#f0d8d0',
                secondary: palette.bg || '#f9ece8',
                accent: palette.accent || '#8b4a5a',
                text: palette.ink || '#2d2420',
              }}
              fonts={fonts}
              designId={palette.id || palette.theme || cardData.templateId || undefined}
              bg={palette.bg}
              headerBg={palette.headerBg}
              ink={palette.ink}
              inkSoft={palette.inkSoft}
              headerStyle={palette.headerStyle}
              headlineText={palette.headlineText}
              font={palette.font}
              donationBg={palette.donationBg}
              donationColor={palette.donationColor}
              recipientName={cardData.recipientName}
              messageHeadline={cardData.messageHeadline}
              messageBody={cardData.messageBody}
              closing={cardData.closing}
              senderName={cardData.senderName}
              photoUrl={cardData.photoUrl}
              texture={cardData.texture}
              signatureStyle={cardData.signatureStyle}
              {...(cardData.occasion === 'wedding'
                ? { coupleNames: cardData.coupleNames, weddingDate: cardData.weddingDate }
                : {})}
              occasion={cardData.occasion}
                details={cardData as any}
                {...(cardData.occasion === 'baby'
                ? { babyName: cardData.babyName, babyDate: cardData.babyDate, parentsNames: cardData.parentsNames }
                : {})}
            />
            <p
              className="text-center text-sm mt-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#6b6259' }}
            >
              {guestTotal > 0
                ? `Going to ${guestTotal} ${guestTotal === 1 ? 'guest' : 'guests'}`
                : 'One design sends to everyone who matters'}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => navigate('/create-card/step3')}
            className="bg-white/95"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <span />

          <Button variant="hero" onClick={handleNext}>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

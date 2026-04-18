import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardWizard } from '@/contexts/CardWizardContext';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { ProgressBar } from '@/components/CardDesigner/ProgressBar';
import { BreadcrumbNav } from '@/components/CardDesigner/BreadcrumbNav';
import { LiveCardPreview } from '@/components/CardDesigner/LiveCardPreview';
import { Check, Eye, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const STEPS = [
  { name: 'Occasion', path: '/create-card/step1' },
  { name: 'Style', path: '/create-card/step2' },
  { name: 'Customize', path: '/create-card/step3' },
  { name: 'Message', path: '/create-card/step4' },
  { name: 'Touches', path: '/create-card/step5' },
  { name: 'Preview', path: '/create-card/step6' },
];

const STEP_NAMES = [
  'Choose Occasion',
  'Pick Your Style',
  'Customize Design',
  'Write Your Message',
  'Choose Your Cause',
  'Add Finishing Touches',
  'Preview & Send',
];

interface PaletteColors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
}

interface FontPair {
  heading: string;
  body: string;
}

const FONT_PAIRINGS: { id: string; name: string; fonts: FontPair }[] = [
  { id: 'playfair', name: 'Elegant Serif', fonts: { heading: "'Playfair Display', Georgia, serif", body: "'Inter', sans-serif" } },
  { id: 'inter', name: 'Modern Sans', fonts: { heading: "'Inter', sans-serif", body: "'Inter', sans-serif" } },
  { id: 'dancing', name: 'Romantic Script', fonts: { heading: "'Dancing Script', cursive", body: "'Montserrat', sans-serif" } },
  { id: 'cormorant', name: 'Classic Serif', fonts: { heading: "'Cormorant Garamond', Georgia, serif", body: "'Crimson Text', Georgia, serif" } },
];

export default function CreateCardStep3() {
  const navigate = useNavigate();
  const { cardData, updateCardData, setCurrentStep } = useCardWizard();
  const [previewOpen, setPreviewOpen] = useState(false);

  // Guard: if user lands here without a chosen design, send them back to Step 2.
  useEffect(() => {
    if (!cardData.templateId) {
      navigate('/create-card/step2', { replace: true });
    }
  }, [cardData.templateId, navigate]);

  // Build the "Original" palette from the design chosen in Step 2 (already in context).
  const originalPalette: PaletteColors = useMemo(() => {
    const cp = (cardData.colorPalette as any) || {};
    return {
      primary: cp.accent || '#c17b8a',
      secondary: cp.accentSoft || cp.bg || '#f5ede9',
      accent: cp.accent || '#c17b8a',
      text: cp.ink || '#2d2420',
    };
  }, [cardData.colorPalette]);

  const colorPalettes = useMemo(
    () => [
      { id: 'default', name: 'Original', colors: originalPalette },
      {
        id: 'warm',
        name: 'Warm Sunset',
        colors: {
          primary: 'hsl(25, 75%, 65%)',
          secondary: 'hsl(45, 85%, 75%)',
          accent: 'hsl(15, 70%, 60%)',
          text: 'hsl(25, 40%, 30%)',
        },
      },
      {
        id: 'cool',
        name: 'Ocean Breeze',
        colors: {
          primary: 'hsl(200, 70%, 65%)',
          secondary: 'hsl(180, 60%, 75%)',
          accent: 'hsl(210, 65%, 55%)',
          text: 'hsl(210, 40%, 30%)',
        },
      },
      {
        id: 'elegant',
        name: 'Elegant Neutrals',
        colors: {
          primary: 'hsl(30, 15%, 85%)',
          secondary: 'hsl(40, 20%, 90%)',
          accent: 'hsl(35, 25%, 65%)',
          text: 'hsl(30, 30%, 25%)',
        },
      },
      {
        id: 'romantic',
        name: 'Romantic Blush',
        colors: {
          primary: 'hsl(350, 65%, 85%)',
          secondary: 'hsl(340, 55%, 90%)',
          accent: 'hsl(355, 70%, 75%)',
          text: 'hsl(340, 35%, 35%)',
        },
      },
    ],
    [originalPalette]
  );

  // Seed selection from the design coming out of Step 2.
  const initialFont = cardData.fontChoice && FONT_PAIRINGS.some((f) => f.id === cardData.fontChoice)
    ? cardData.fontChoice
    : 'playfair';

  const [selectedPaletteId, setSelectedPaletteId] = useState<string>('default');
  const [selectedFontId, setSelectedFontId] = useState<string>(initialFont);

  // Keep font in sync if context changes (e.g. user goes back to Step 2 and picks a different design).
  useEffect(() => {
    if (cardData.fontChoice && FONT_PAIRINGS.some((f) => f.id === cardData.fontChoice)) {
      setSelectedFontId(cardData.fontChoice);
    }
  }, [cardData.fontChoice]);

  const activePalette = colorPalettes.find((p) => p.id === selectedPaletteId)?.colors || originalPalette;
  const activeFonts = FONT_PAIRINGS.find((f) => f.id === selectedFontId)?.fonts || FONT_PAIRINGS[0].fonts;

  const handleNext = () => {
    if (!selectedPaletteId || !selectedFontId) {
      toast.error('Please select a color palette and font');
      return;
    }

    updateCardData({
      colorPalette: {
        ...((cardData.colorPalette as any) || {}),
        ...activePalette,
      },
      fontChoice: selectedFontId,
    });
    setCurrentStep(4);
    navigate('/create-card/step4');
  };

  // Shared preview props — pulled live from context + local selections.
  const previewProps = {
    palette: activePalette,
    fonts: activeFonts,
    recipientName: cardData.recipientName,
    messageHeadline: cardData.messageHeadline,
    messageBody: cardData.messageBody,
    closing: cardData.closing,
    senderName: cardData.senderName,
    photoUrl: cardData.photoUrl,
    charityName: cardData.charityName,
    donationAmount: cardData.donationAmount,
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4 md:p-8 pb-24 lg:pb-8">
      <ProgressBar currentStep={3} totalSteps={7} stepNames={STEP_NAMES} />
      <BreadcrumbNav currentStep={3} steps={STEPS} />

      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Customize your design
          </motion.h1>
          <motion.p
            className="text-lg text-white/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Choose colors and fonts that match your style
          </motion.p>
        </div>

        {/* Two-column layout: controls scroll, preview sticks (desktop) */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* LEFT: Scrollable controls */}
          <div className="space-y-6 min-w-0">
            {/* Color Palettes */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4">
                  <Label className="text-xl font-bold mb-1 block">Choose Your Colors</Label>
                  <p className="text-sm text-muted-foreground">Select a color palette that matches your style</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {colorPalettes.map((palette) => {
                    const isSelected = selectedPaletteId === palette.id;
                    return (
                      <div
                        key={palette.id}
                        onClick={() => setSelectedPaletteId(palette.id)}
                        role="button"
                        tabIndex={0}
                        aria-pressed={isSelected}
                        className={`relative cursor-pointer p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                          isSelected
                            ? 'border-[#c17b8a] ring-2 ring-[#c17b8a]/40 bg-[#c17b8a]/5 shadow-md'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#c17b8a] flex items-center justify-center shadow-md ring-2 ring-white">
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                          </div>
                        )}
                        <div className="mb-3">
                          <span className="font-semibold text-sm sm:text-base">{palette.name}</span>
                        </div>
                        <div className="flex gap-2">
                          {Object.values(palette.colors).slice(0, 4).map((color: any, idx) => (
                            <div
                              key={idx}
                              className="flex-1 h-10 sm:h-12 rounded-lg shadow-sm"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Font Pairings */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="mb-4">
                  <Label className="text-xl font-bold mb-1 block">Choose Your Fonts</Label>
                  <p className="text-sm text-muted-foreground">Pick typography that expresses your message</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {FONT_PAIRINGS.map((pairing) => {
                    const isSelected = selectedFontId === pairing.id;
                    return (
                      <div
                        key={pairing.id}
                        onClick={() => setSelectedFontId(pairing.id)}
                        role="button"
                        tabIndex={0}
                        aria-pressed={isSelected}
                        className={`relative cursor-pointer p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                          isSelected
                            ? 'border-[#c17b8a] ring-2 ring-[#c17b8a]/40 bg-[#c17b8a]/5 shadow-md'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#c17b8a] flex items-center justify-center shadow-md ring-2 ring-white">
                            <Check className="w-4 h-4 text-white" strokeWidth={3} />
                          </div>
                        )}
                        <div className="mb-3">
                          <span className="font-semibold text-sm sm:text-base">{pairing.name}</span>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Heading</p>
                            <p className="text-xl sm:text-2xl truncate" style={{ fontFamily: pairing.fonts.heading }}>
                              Thank You
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Body</p>
                            <p className="text-sm" style={{ fontFamily: pairing.fonts.body }}>
                              Thank you for your thoughtful gift.
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Desktop nav buttons */}
            <div className="hidden lg:flex justify-between items-center pt-2">
              <Button variant="outline" onClick={() => navigate('/create-card/step2')} className="bg-white/95 hover:bg-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button variant="hero" onClick={handleNext}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* RIGHT: Sticky live preview (desktop only) */}
          <aside className="hidden lg:block">
            <div className="sticky top-6">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-5">
                  <Label className="text-base font-semibold mb-3 block text-center">Live Preview</Label>
                  <LiveCardPreview {...previewProps} />
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Updates in real-time as you change options
                  </p>
                </CardContent>
              </Card>
            </div>
          </aside>
        </motion.div>
      </div>

      {/* Mobile sticky bottom bar with Preview + Next */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-3 flex items-center gap-2 shadow-lg">
        <Button variant="outline" onClick={() => navigate('/create-card/step2')} className="px-3">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          onClick={() => setPreviewOpen(true)}
          className="flex-1 gap-2"
        >
          <Eye className="w-4 h-4" />
          Preview
        </Button>
        <Button variant="hero" onClick={handleNext} className="flex-1 gap-2">
          Next
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Mobile fullscreen preview overlay */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogTitle className="text-center mb-4">Card Preview</DialogTitle>
          <LiveCardPreview {...previewProps} />
          <Button onClick={() => setPreviewOpen(false)} variant="hero" className="w-full mt-4">
            Looks Good
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

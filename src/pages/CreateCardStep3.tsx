import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useCardWizard } from '@/contexts/CardWizardContext';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { ProgressBar } from '@/components/CardDesigner/ProgressBar';
import { BreadcrumbNav } from '@/components/CardDesigner/BreadcrumbNav';
import { LiveCardPreview } from '@/components/CardDesigner/LiveCardPreview';
import { Check, Eye, ArrowLeft, ArrowRight, Upload, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const STEPS = [
  { name: 'Occasion', path: '/create-card/step1' },
  { name: 'Style', path: '/create-card/step2' },
  { name: 'Customize', path: '/create-card/step3' },
  { name: 'Message', path: '/create-card/step4' },
  { name: 'Recipients', path: '/create-card/step5' },
  { name: 'Cause', path: '/create-card/impact' },
  { name: 'Preview', path: '/create-card/step6' },
];

const STEP_NAMES = [
  'Choose Occasion',
  'Pick Your Style',
  'Customize Design',
  'Write Your Message',
  'Recipients',
  'Choose Your Cause',
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

const ENVELOPE_COLORS = [
  { id: 'cream', name: 'Cream', color: '#F5E6D3' },
  { id: 'blush', name: 'Blush', color: '#FFD9DC' },
  { id: 'sage', name: 'Sage', color: '#9DB5A5' },
  { id: 'navy', name: 'Navy', color: '#4A6FA5' },
  { id: 'lavender', name: 'Lavender', color: '#C4B5FD' },
  { id: 'champagne', name: 'Champagne', color: '#E8D5B0' },
];

const TEXTURES = [
  { id: 'smooth', name: 'Smooth', description: 'Clean, classic finish' },
  { id: 'linen', name: 'Linen', description: 'Subtle woven texture' },
  { id: 'watercolor', name: 'Watercolor', description: 'Soft artistic wash' },
];

const SIGNATURES = [
  { id: 'none', name: 'No Signature', description: 'Leave it unsigned' },
  { id: 'handwritten', name: 'Handwritten', description: 'Personal script style' },
  { id: 'typed', name: 'Typed Name', description: 'Clean typed name' },
];

export default function CreateCardStep3() {
  const navigate = useNavigate();
  const { cardData, updateCardData, setCurrentStep } = useCardWizard();
  const [previewOpen, setPreviewOpen] = useState(false);

  const FALLBACK_PALETTE: PaletteColors = {
    primary: '#c17b8a',
    secondary: '#f5ede9',
    accent: '#c17b8a',
    text: '#2d2420',
  };

  const originalPalette: PaletteColors = useMemo(() => {
    const cp = (cardData.colorPalette as any) || {};
    const hasPalette = cp && (cp.accent || cp.bg || cp.ink);
    if (!hasPalette) return FALLBACK_PALETTE;
    return {
      primary: cp.accent || FALLBACK_PALETTE.primary,
      secondary: cp.accentSoft || cp.bg || FALLBACK_PALETTE.secondary,
      accent: cp.accent || FALLBACK_PALETTE.accent,
      text: cp.ink || FALLBACK_PALETTE.text,
    };
  }, [cardData.colorPalette]);

  const colorPalettes = useMemo(
    () => [
      { id: 'default', name: 'Original', colors: originalPalette },
      { id: 'warm', name: 'Warm Sunset', colors: { primary: 'hsl(25, 75%, 65%)', secondary: 'hsl(45, 85%, 75%)', accent: 'hsl(15, 70%, 60%)', text: 'hsl(25, 40%, 30%)' } },
      { id: 'cool', name: 'Ocean Breeze', colors: { primary: 'hsl(200, 70%, 65%)', secondary: 'hsl(180, 60%, 75%)', accent: 'hsl(210, 65%, 55%)', text: 'hsl(210, 40%, 30%)' } },
      { id: 'elegant', name: 'Elegant Neutrals', colors: { primary: 'hsl(30, 15%, 85%)', secondary: 'hsl(40, 20%, 90%)', accent: 'hsl(35, 25%, 65%)', text: 'hsl(30, 30%, 25%)' } },
      { id: 'romantic', name: 'Romantic Blush', colors: { primary: 'hsl(350, 65%, 85%)', secondary: 'hsl(340, 55%, 90%)', accent: 'hsl(355, 70%, 75%)', text: 'hsl(340, 35%, 35%)' } },
    ],
    [originalPalette]
  );

  const initialFont = cardData.fontChoice && FONT_PAIRINGS.some((f) => f.id === cardData.fontChoice)
    ? cardData.fontChoice
    : 'playfair';

  const [selectedPaletteId, setSelectedPaletteId] = useState<string>('default');
  const [selectedFontId, setSelectedFontId] = useState<string>(initialFont);
  const [envelopeColor, setEnvelopeColor] = useState<string | null>(cardData.envelopeColor || null);
  const [texture, setTexture] = useState<string | null>(cardData.texture || 'smooth');
  const [signatureStyle, setSignatureStyle] = useState<string | null>(cardData.signatureStyle || 'handwritten');

  useEffect(() => {
    if (cardData.fontChoice && FONT_PAIRINGS.some((f) => f.id === cardData.fontChoice)) {
      setSelectedFontId(cardData.fontChoice);
    }
  }, [cardData.fontChoice]);

  const activePalette = colorPalettes.find((p) => p.id === selectedPaletteId)?.colors || originalPalette;
  const activeFonts = FONT_PAIRINGS.find((f) => f.id === selectedFontId)?.fonts || FONT_PAIRINGS[0].fonts;

  // Photo upload via dropzone
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Please upload an image smaller than 10MB');
      return;
    }
    const preview = URL.createObjectURL(file);
    updateCardData({ photoUrl: preview });
    toast.success('Photo added!');
  }, [updateCardData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] },
    multiple: false,
  });

  const handleNext = () => {
    if (!selectedPaletteId || !selectedFontId) {
      toast.error('Please select a color palette and font');
      return;
    }
    updateCardData({
      colorPalette: { ...((cardData.colorPalette as any) || {}), ...activePalette },
      fontChoice: selectedFontId,
      envelopeColor,
      texture,
      signatureStyle,
    });
    setCurrentStep(4);
    navigate('/create-card/step4');
  };

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
    envelopeColor,
    texture,
    signatureStyle,
  };

  const SectionLabel = ({ children, sub }: { children: React.ReactNode; sub?: string }) => (
    <div className="mb-4">
      <Label className="text-xl font-bold mb-1 block">{children}</Label>
      {sub && <p className="text-sm text-muted-foreground">{sub}</p>}
    </div>
  );

  const SelectableTile = ({
    selected,
    onClick,
    children,
  }: {
    selected: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      className={`relative cursor-pointer p-4 rounded-xl border-2 transition-all hover:shadow-md ${
        selected
          ? 'border-[#c17b8a] ring-2 ring-[#c17b8a]/40 bg-[#c17b8a]/5 shadow-md'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {selected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#c17b8a] flex items-center justify-center shadow-md ring-2 ring-white">
          <Check className="w-4 h-4 text-white" strokeWidth={3} />
        </div>
      )}
      {children}
    </div>
  );

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
            Colors, fonts, photo, envelope and finishing touches — all in one place
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* LEFT */}
          <div className="space-y-6 min-w-0">
            {/* Colors */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <SectionLabel sub="Select a color palette that matches your style">
                  Choose Your Colors
                </SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {colorPalettes.map((palette) => (
                    <SelectableTile
                      key={palette.id}
                      selected={selectedPaletteId === palette.id}
                      onClick={() => setSelectedPaletteId(palette.id)}
                    >
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
                    </SelectableTile>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Fonts */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <SectionLabel sub="Pick typography that expresses your message">
                  Choose Your Fonts
                </SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {FONT_PAIRINGS.map((pairing) => (
                    <SelectableTile
                      key={pairing.id}
                      selected={selectedFontId === pairing.id}
                      onClick={() => setSelectedFontId(pairing.id)}
                    >
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
                    </SelectableTile>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* ✨ Finishing Touches */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6 space-y-8">
                <div>
                  <Label className="text-2xl font-bold block">✨ Finishing Touches</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add a photo, choose an envelope, paper texture and signature style
                  </p>
                </div>

                {/* Photo */}
                <div>
                  <SectionLabel sub="Optional — adds a personal touch to the card header">
                    Add a Photo
                  </SectionLabel>
                  {cardData.photoUrl ? (
                    <div className="relative group rounded-xl overflow-hidden border-2 border-[#c17b8a]/30">
                      <img
                        src={cardData.photoUrl}
                        alt="Uploaded"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateCardData({ photoUrl: null })}
                          className="bg-white text-red-600 hover:bg-white hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div
                      {...getRootProps()}
                      className={`cursor-pointer text-center p-8 rounded-xl border-2 border-dashed transition-all ${
                        isDragActive
                          ? 'border-[#c17b8a] bg-[#c17b8a]/5'
                          : 'border-gray-300 hover:border-[#c17b8a]/60'
                      }`}
                    >
                      <input {...getInputProps()} />
                      <div className="mx-auto w-12 h-12 bg-[#c17b8a]/10 rounded-full flex items-center justify-center mb-3">
                        <Upload className="h-6 w-6 text-[#c17b8a]" />
                      </div>
                      <p className="font-medium text-sm">
                        {isDragActive ? 'Drop your photo here' : 'Drag & drop or click to upload'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        JPG, PNG, GIF, WebP • Max 10MB
                      </p>
                    </div>
                  )}
                </div>

                {/* Envelope Color */}
                <div>
                  <SectionLabel sub="Sets the accent band on your card">
                    Envelope Color
                  </SectionLabel>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {ENVELOPE_COLORS.map((env) => {
                      const selected = envelopeColor === env.color;
                      return (
                        <button
                          key={env.id}
                          type="button"
                          onClick={() => setEnvelopeColor(env.color)}
                          className={`relative rounded-lg p-2 border-2 transition-all hover:shadow-md ${
                            selected
                              ? 'border-[#c17b8a] ring-2 ring-[#c17b8a]/40'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          aria-pressed={selected}
                        >
                          <div
                            className="w-full aspect-square rounded-md shadow-inner"
                            style={{ backgroundColor: env.color }}
                          />
                          <p className="text-[11px] mt-1.5 font-medium">{env.name}</p>
                          {selected && (
                            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#c17b8a] flex items-center justify-center ring-2 ring-white">
                              <Check className="w-3 h-3 text-white" strokeWidth={3} />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Paper Texture */}
                <div>
                  <SectionLabel sub="Choose how the paper feels">
                    Paper Texture
                  </SectionLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {TEXTURES.map((tex) => (
                      <SelectableTile
                        key={tex.id}
                        selected={texture === tex.id}
                        onClick={() => setTexture(tex.id)}
                      >
                        <div
                          className="w-full h-16 rounded-md mb-2"
                          style={{
                            background:
                              tex.id === 'linen'
                                ? 'repeating-linear-gradient(45deg, rgba(120,100,80,0.08) 0px, rgba(120,100,80,0.08) 1px, #fefcf8 1px, #fefcf8 4px)'
                                : tex.id === 'watercolor'
                                ? 'radial-gradient(ellipse at 20% 20%, rgba(193,123,138,0.18), transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(143,170,139,0.18), transparent 60%), #fffdf9'
                                : '#ffffff',
                            border: '1px solid rgba(0,0,0,0.06)',
                          }}
                        />
                        <p className="font-semibold text-sm">{tex.name}</p>
                        <p className="text-xs text-muted-foreground">{tex.description}</p>
                      </SelectableTile>
                    ))}
                  </div>
                </div>

                {/* Signature Style */}
                <div>
                  <SectionLabel sub="How your name appears at the bottom of the card">
                    Signature Style
                  </SectionLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {SIGNATURES.map((sig) => (
                      <SelectableTile
                        key={sig.id}
                        selected={signatureStyle === sig.id}
                        onClick={() => setSignatureStyle(sig.id)}
                      >
                        <div className="h-12 flex items-center justify-center mb-2">
                          {sig.id === 'none' ? (
                            <span className="text-xs text-muted-foreground italic">— blank —</span>
                          ) : sig.id === 'handwritten' ? (
                            <span
                              className="text-2xl"
                              style={{ fontFamily: "'Dancing Script', cursive", color: '#2d2420' }}
                            >
                              {cardData.senderName?.trim() || 'Your Name'}
                            </span>
                          ) : (
                            <span className="text-base font-medium" style={{ color: '#2d2420' }}>
                              {cardData.senderName?.trim() || 'Your Name'}
                            </span>
                          )}
                        </div>
                        <p className="font-semibold text-sm">{sig.name}</p>
                        <p className="text-xs text-muted-foreground">{sig.description}</p>
                      </SelectableTile>
                    ))}
                  </div>
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

          {/* RIGHT — sticky live preview */}
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

      {/* Mobile sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-3 flex items-center gap-2 shadow-lg">
        <Button variant="outline" onClick={() => navigate('/create-card/step2')} className="px-3">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button variant="outline" onClick={() => setPreviewOpen(true)} className="flex-1 gap-2">
          <Eye className="w-4 h-4" />
          Preview
        </Button>
        <Button variant="hero" onClick={handleNext} className="flex-1 gap-2">
          Next
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

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

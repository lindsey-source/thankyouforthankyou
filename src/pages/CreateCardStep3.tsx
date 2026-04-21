import React, { useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Upload, Trash2, Check } from 'lucide-react';
import { toast } from 'sonner';

import { useCardWizard } from '@/contexts/CardWizardContext';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ProgressBar } from '@/components/CardDesigner/ProgressBar';
import { BreadcrumbNav } from '@/components/CardDesigner/BreadcrumbNav';
import { LiveCardPreview } from '@/components/CardDesigner/LiveCardPreview';
import { DESIGN_SETS } from './CreateCardStep2';
import { readDesignFromPalette, type Design, type OccasionId } from '@/components/CardDesigner/designTypes';

/* ---------- Wizard chrome ---------- */
const STEPS = [
  { name: 'Occasion', path: '/create-card/step1' },
  { name: 'Style', path: '/create-card/step2' },
  { name: 'Customize', path: '/create-card/step3' },
  { name: 'Recipients', path: '/create-card/step5' },
  { name: 'Cause', path: '/create-card/impact' },
  { name: 'Preview', path: '/create-card/step6' },
];
const STEP_NAMES = [
  'Choose Occasion',
  'Pick Your Style',
  'Customize Design',
  'Recipients',
  'Choose Your Cause',
  'Preview & Send',
];

/* ---------- Section 1: Accent Color (8 fixed swatches) ---------- */
const ACCENT_SWATCHES = [
  '#8B4A5A', '#1B2A4A', '#3D6B4F', '#7B3F6E',
  '#5B8FA8', '#C17B8A', '#8B6914', '#5A5A6A',
];

/* ---------- Section 2: Font (3 pill choices) ---------- */
type FontChoiceId = 'playfair' | 'dancing' | 'inter';
const FONT_CHOICES: { id: FontChoiceId; label: string; family: string }[] = [
  { id: 'playfair', label: 'Playfair', family: "'Playfair Display', Georgia, serif" },
  { id: 'dancing',  label: 'Script',   family: "'Dancing Script', cursive" },
  { id: 'inter',    label: 'Modern',   family: "'Inter', system-ui, sans-serif" },
];

/* ---------- Section 3: Finishing Touches ---------- */
const ENVELOPE_COLORS = [
  { id: 'cream',  color: '#F5E6D3', name: 'Cream'  },
  { id: 'blush',  color: '#FFD9DC', name: 'Blush'  },
  { id: 'sage',   color: '#9DB5A5', name: 'Sage'   },
  { id: 'navy',   color: '#4A6FA5', name: 'Navy'   },
];
const TEXTURES = [
  { id: 'smooth',     name: 'Smooth' },
  { id: 'linen',      name: 'Linen' },
  { id: 'watercolor', name: 'Watercolor' },
];
const SIGNATURES = [
  { id: 'none',        name: 'None' },
  { id: 'handwritten', name: 'Handwritten' },
  { id: 'typed',       name: 'Typed' },
];

/* ---------- Helpers ---------- */
// Parse "#rrggbb" → {r,g,b}; tolerate gradients/non-hex by returning null.
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  if (typeof hex !== 'string') return null;
  const m = hex.trim().match(/^#?([a-f0-9]{6})$/i);
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
};
const colorDistance = (a: string, b: string): number => {
  const ra = hexToRgb(a); const rb = hexToRgb(b);
  if (!ra || !rb) return Number.POSITIVE_INFINITY;
  const dr = ra.r - rb.r, dg = ra.g - rb.g, db = ra.b - rb.b;
  return dr*dr + dg*dg + db*db;
};
const closestSwatch = (target: string | undefined): string => {
  if (!target) return ACCENT_SWATCHES[0];
  let best = ACCENT_SWATCHES[0];
  let bestD = Number.POSITIVE_INFINITY;
  for (const s of ACCENT_SWATCHES) {
    const d = colorDistance(s, target);
    if (d < bestD) { bestD = d; best = s; }
  }
  return best;
};

/* =========================================================================
   CreateCardStep3 — controls only retint/restyle. Wording NEVER changes.
   ========================================================================= */
export default function CreateCardStep3() {
  const navigate = useNavigate();
  const { cardData, updateCardData, setCurrentStep } = useCardWizard();

  // Always-defined design (never blank, never crash).
  const design: Design = useMemo(() => {
    const occ = (cardData.occasion as OccasionId) ?? 'general';
    const fallback = DESIGN_SETS[occ]?.[0] ?? DESIGN_SETS.general[0];
    const saved = readDesignFromPalette(cardData.colorPalette);

    return saved
      ? { ...fallback, ...saved }
      : fallback;
  }, [cardData.colorPalette, cardData.occasion]);

  // Local control state — these only retint/restyle the preview.
  const [accentColor, setAccentColor] = useState<string>(() => closestSwatch(design.accent));
  const [fontChoice, setFontChoice] = useState<FontChoiceId>(() => {
    const fromCard = cardData.fontChoice as FontChoiceId | null | undefined;
    if (fromCard && FONT_CHOICES.some(f => f.id === fromCard)) return fromCard;
    const fromDesign = design.fontChoice as FontChoiceId | undefined;
    if (fromDesign && FONT_CHOICES.some(f => f.id === fromDesign)) return fromDesign;
    return 'playfair';
  });
  const [envelopeColor, setEnvelopeColor] = useState<string | null>(cardData.envelopeColor ?? null);
  const [texture, setTexture] = useState<string>(cardData.texture ?? 'smooth');
  const [signatureStyle, setSignatureStyle] = useState<string>(cardData.signatureStyle ?? 'handwritten');

  // Message + closing — pre-fill from saved data, fall back to design defaults.
  const [messageBody, setMessageBody] = useState<string>(
    () => cardData.messageBody?.trim() || design.body
  );
  const [closing, setClosing] = useState<string>(
    () => cardData.closing?.trim() || 'With love,'
  );

  // Live-sync into wizard so the preview (and downstream steps) stay current.
  React.useEffect(() => {
    updateCardData({ messageBody, closing });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageBody, closing]);

  // Photo upload
  const onDrop = useCallback((files: File[]) => {
    const file = files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { toast.error('Please upload an image file'); return; }
    if (file.size > 10 * 1024 * 1024)    { toast.error('Image must be smaller than 10MB'); return; }
    updateCardData({ photoUrl: URL.createObjectURL(file) });
    toast.success('Photo added');
  }, [updateCardData]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'] },
    multiple: false,
  });

  /* ---------- Live preview props ----------
     CRITICAL: headlineText/greeting/body/closing come ONLY from the design
     object and NEVER change when accent or font changes. */
  const fontFamily = FONT_CHOICES.find(f => f.id === fontChoice)!.family;
  const previewProps = {
    palette: {
      primary: accentColor,
      secondary: design.accentSoft,
      accent: accentColor,
      text: design.ink,
    },
    fonts: { heading: fontFamily, body: fontFamily },
    designId: design.id,
    bg: design.bg,
    headerBg: design.headerBg,
    ink: design.ink,
    inkSoft: design.inkSoft,
    accent: accentColor,                 // ← retints header art only
    headerStyle: design.headerStyle,
    headlineText: design.headlineText,   // ← from design, never mutated
    font: design.font,
    fontChoice,
    donationBg: design.donationBg,
    donationColor: design.donationColor,

    // Wording fields fixed to design — never altered by these controls.
    messageHeadline: design.headlineText,
    messageBody: design.body,
    closing: 'With heartfelt thanks,',
    recipientName: cardData.recipientName || design.greeting.replace(/^Dear\s+/i, '').replace(/,$/, ''),
    senderName: cardData.senderName,

    photoUrl: cardData.photoUrl,
    charityName: cardData.charityName,
    donationAmount: cardData.donationAmount,
    envelopeColor,
    texture,
    signatureStyle,
  };

  const handleNext = () => {
    updateCardData({
      // Persist the (still-complete) design object plus the user's accent override.
      colorPalette: { ...design, accent: accentColor } as any,
      fontChoice,
      envelopeColor,
      texture,
      signatureStyle,
    });
    setCurrentStep(4);
    navigate('/create-card/step4');
  };

  const handleBack = () => {
    setCurrentStep(2);
    navigate('/create-card/step2');
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4 md:p-8 pb-24 lg:pb-8">
      <ProgressBar currentStep={3} totalSteps={7} stepNames={STEP_NAMES} />
      <BreadcrumbNav currentStep={3} steps={STEPS} />

      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          >
            Customize your design
          </motion.h1>
          <motion.p
            className="text-lg text-white/90"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          >
            Pick an accent, a font, and finishing touches — your message stays put
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        >
          {/* ============= LEFT: Controls ============= */}
          <div className="space-y-6 min-w-0">

            {/* Section 1 — Accent Color */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <Label className="text-xl font-bold mb-1 block">Accent Color</Label>
                <p className="text-sm text-muted-foreground mb-4">
                  Tints the card header — nothing else changes
                </p>
                <div className="flex flex-wrap gap-3">
                  {ACCENT_SWATCHES.map((color) => {
                    const selected = accentColor.toLowerCase() === color.toLowerCase();
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setAccentColor(color)}
                        aria-label={`Accent ${color}`}
                        aria-pressed={selected}
                        className={`relative w-11 h-11 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c17b8a] ${
                          selected ? 'ring-2 ring-offset-2 ring-[#2d2420] scale-110' : ''
                        }`}
                        style={{ backgroundColor: color }}
                      >
                        {selected && (
                          <Check className="absolute inset-0 m-auto w-5 h-5 text-white drop-shadow" strokeWidth={3} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Section 2 — Font */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <Label className="text-xl font-bold mb-1 block">Font</Label>
                <p className="text-sm text-muted-foreground mb-4">
                  Changes preview text font only — nothing else changes
                </p>
                <div className="flex flex-wrap gap-3">
                  {FONT_CHOICES.map((f) => {
                    const selected = fontChoice === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFontChoice(f.id)}
                        aria-pressed={selected}
                        className={`flex items-center gap-3 px-5 py-3 rounded-full border-2 transition-all ${
                          selected
                            ? 'border-[#c17b8a] bg-[#c17b8a]/10 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <span className="text-2xl leading-none" style={{ fontFamily: f.family }}>Aa</span>
                        <span className="text-sm font-medium text-[#2d2420]">{f.label}</span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Section 3 — Finishing Touches */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6 space-y-8">
                <div>
                  <Label className="text-2xl font-bold block">✨ Finishing Touches</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Photo, envelope, paper texture, and signature
                  </p>
                </div>

                {/* Photo */}
                <div>
                  <Label className="text-base font-semibold mb-2 block">Add a Photo</Label>
                  {cardData.photoUrl ? (
                    <div className="relative group rounded-xl overflow-hidden border-2 border-[#c17b8a]/30">
                      <img src={cardData.photoUrl} alt="Uploaded" className="w-full h-48 object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          variant="outline" size="sm"
                          onClick={() => updateCardData({ photoUrl: null })}
                          className="bg-white text-red-600 hover:bg-white hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                        isDragActive ? 'border-[#c17b8a] bg-[#c17b8a]/5' : 'border-gray-300 hover:border-[#c17b8a]/50'
                      }`}
                    >
                      <input {...getInputProps()} />
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        {isDragActive ? 'Drop your photo here' : 'Drag a photo here, or click to browse'}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">JPG, PNG, GIF or WEBP — up to 10MB</p>
                    </div>
                  )}
                </div>

                {/* Envelope */}
                <div>
                  <Label className="text-base font-semibold mb-2 block">Envelope Color</Label>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setEnvelopeColor(null)}
                      aria-pressed={envelopeColor === null}
                      className={`px-4 h-11 rounded-full border-2 text-sm transition-all ${
                        envelopeColor === null
                          ? 'border-[#c17b8a] bg-[#c17b8a]/10'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      No envelope
                    </button>
                    {ENVELOPE_COLORS.map((e) => {
                      const selected = envelopeColor === e.color;
                      return (
                        <button
                          key={e.id}
                          type="button"
                          onClick={() => setEnvelopeColor(e.color)}
                          aria-label={`Envelope ${e.name}`}
                          aria-pressed={selected}
                          className={`relative w-11 h-11 rounded-full transition-transform hover:scale-110 ${
                            selected ? 'ring-2 ring-offset-2 ring-[#2d2420] scale-110' : ''
                          }`}
                          style={{ backgroundColor: e.color }}
                        >
                          {selected && (
                            <Check className="absolute inset-0 m-auto w-5 h-5 text-white drop-shadow" strokeWidth={3} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Texture */}
                <div>
                  <Label className="text-base font-semibold mb-2 block">Paper Texture</Label>
                  <div className="flex flex-wrap gap-3">
                    {TEXTURES.map((t) => {
                      const selected = texture === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTexture(t.id)}
                          aria-pressed={selected}
                          className={`px-5 py-2.5 rounded-full border-2 text-sm font-medium transition-all ${
                            selected
                              ? 'border-[#c17b8a] bg-[#c17b8a]/10 text-[#2d2420]'
                              : 'border-gray-200 hover:border-gray-300 bg-white text-[#2d2420]'
                          }`}
                        >
                          {t.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Signature */}
                <div>
                  <Label className="text-base font-semibold mb-2 block">Signature Style</Label>
                  <div className="flex flex-wrap gap-3">
                    {SIGNATURES.map((s) => {
                      const selected = signatureStyle === s.id;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSignatureStyle(s.id)}
                          aria-pressed={selected}
                          className={`px-5 py-2.5 rounded-full border-2 text-sm font-medium transition-all ${
                            selected
                              ? 'border-[#c17b8a] bg-[#c17b8a]/10 text-[#2d2420]'
                              : 'border-gray-200 hover:border-gray-300 bg-white text-[#2d2420]'
                          }`}
                        >
                          {s.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nav buttons (desktop) */}
            <div className="hidden lg:flex items-center justify-between pt-2">
              <Button variant="outline" onClick={handleBack} className="bg-white/95">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <Button onClick={handleNext} className="bg-[#c17b8a] hover:bg-[#a8697a] text-white">
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* ============= RIGHT: Sticky Live Preview ============= */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 text-center">
                  Live Preview
                </p>
                <LiveCardPreview {...previewProps} />
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      {/* Sticky mobile nav */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 p-3 flex items-center justify-between gap-3 z-40">
        <Button variant="outline" onClick={handleBack} className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={handleNext} className="flex-1 bg-[#c17b8a] hover:bg-[#a8697a] text-white">
          Next <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

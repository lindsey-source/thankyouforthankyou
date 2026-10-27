import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardWizard } from '@/contexts/CardWizardContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Heart, Mail, Sparkles, Check } from 'lucide-react';
import { toast } from 'sonner';
import { ProgressBar } from '@/components/CardDesigner/ProgressBar';
import { LiveCardPreview } from '@/components/CardDesigner/LiveCardPreview';
import { EnvelopeReveal } from '@/components/CardDesigner/EnvelopeReveal';

const STEP_NAMES = [
  'Choose Occasion',
  'Pick Your Style',
  'Customize Design',
  'Write Your Message',
  'Choose Your Cause',
  'Add Finishing Touches',
  'Preview & Send',
];

interface Charity {
  id: string;
  name: string;
  description: string;
  impact_message: string;
  logo_url: string;
}

const PRINTING_SAVINGS = 4.25;
const PRESET_AMOUNTS = [5, 10, 25, 50];

export default function CreateCardStep5Impact() {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const { cardData, updateCardData, resetWizard } = useCardWizard();

  const [recipientName, setRecipientName] = useState(cardData.recipientName || '');
  const [recipientEmail, setRecipientEmail] = useState(cardData.recipientEmail || '');
  const [senderName, setSenderName] = useState(cardData.senderName || '');
  const [sending, setSending] = useState(false);

  // Read-only values from prior steps (chosen on /create-card/impact)
  const donationAmount = cardData.donationAmount || 0;
  const charityName = cardData.charityName || 'your chosen cause';
  const charityId = cardData.charityId;

  const totalImpact = donationAmount + PRINTING_SAVINGS;

  // Live preview values from wizard context (with brand defaults)
  const palette = (cardData.colorPalette as any) || {};
  const previewPrimary = palette.primary || '#f0d8d0';
  const previewSecondary = palette.secondary || '#f9ece8';
  const previewAccent = palette.accent || '#8b4a5a';
  const previewText = palette.text || '#2d2420';

  const fontMap: Record<string, { heading: string; body: string }> = {
    default: { heading: "'Playfair Display', Georgia, serif", body: "'Inter', sans-serif" },
    serif: { heading: "'Cormorant Garamond', Georgia, serif", body: "'Crimson Text', serif" },
    modern: { heading: "'Poppins', sans-serif", body: "'Inter', sans-serif" },
    script: { heading: "'Dancing Script', cursive", body: "'Montserrat', sans-serif" },
  };
  const fonts = fontMap[cardData.fontChoice || 'default'] || fontMap.default;

  const headline = cardData.messageHeadline?.trim() || 'Thank You';
  const bodyText =
    cardData.messageBody?.trim() ||
    'Thank you so much for being part of our special day. Your presence meant the world to us.';
  const closing = cardData.closing?.trim() || 'With love';

  const handleSend = async () => {
    if (!recipientName.trim() || !recipientEmail.trim()) {
      toast.error('Please enter recipient name and email');
      return;
    }
    setSending(true);
    try {
      const { data: savedCard, error: cardError } = await supabase
        .from('user_cards')
        .insert({
          user_id: userId!,
          template_id: cardData.templateId,
          message_headline: cardData.messageHeadline,
          message_body: cardData.messageBody,
          closing: cardData.closing,
          photo_url: cardData.photoUrl,
          color_palette: cardData.colorPalette,
          font_choice: cardData.fontChoice,
          envelope_color: cardData.envelopeColor,
          texture: cardData.texture,
          signature_style: cardData.signatureStyle,
          charity_id: charityId,
          donation_amount: donationAmount,
          sent_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (cardError) throw cardError;

      if (donationAmount > 0 && charityId) {
        await supabase.from('transactions').insert({
          user_card_id: savedCard.id,
          amount: donationAmount,
          charity_id: charityId,
          status: 'completed',
        });
      }

      toast.success('Your gratitude has been sent — and made a difference.', { duration: 5000 });
      setTimeout(() => {
        resetWizard();
        navigate('/dashboard');
      }, 1500);
    } catch (error: any) {
      toast.error(error.message || 'Failed to send card');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#faf7f2' }}>
      <ProgressBar currentStep={6} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-32">
        {/* Back link — top of page, matches other steps */}
        <button
          onClick={() => navigate('/create-card/step5')}
          className="inline-flex items-center gap-2 text-sm mb-6 transition-opacity hover:opacity-70"
          style={{ color: '#8a8079' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to finishing touches
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2a2622' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Your finished card
          </motion.h1>
          <motion.p
            className="text-base md:text-lg max-w-xl mx-auto"
            style={{ color: '#6b6259' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            Take a moment. The people who showed up for you deserve to know it.
          </motion.p>

          {/* Decorative ornament — matches Step 2 brand motif */}
          <div className="flex items-center justify-center gap-2 mt-6 opacity-60" aria-hidden="true">
            <div className="h-px w-10" style={{ backgroundColor: '#c17b8a' }} />
            <div
              className="h-1.5 w-1.5 rotate-45"
              style={{ backgroundColor: '#c17b8a' }}
            />
            <div className="h-px w-10" style={{ backgroundColor: '#c17b8a' }} />
          </div>
        </div>

        {/* === See it as your guests will — envelope reveal === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p
            className="text-xs uppercase tracking-[0.2em] text-center mb-8"
            style={{ color: '#8a9a82' }}
          >
            See it as your guests will
          </p>

          <div className="flex items-center justify-center min-h-[460px] md:min-h-[520px]">
            <EnvelopeReveal
              recipientName={recipientName}
              envelopeColor={cardData.envelopeColor}
            >
              <LiveCardPreview
                palette={{
                  primary: previewPrimary,
                  secondary: previewSecondary,
                  accent: previewAccent,
                  text: previewText,
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
                recipientName={recipientName || undefined}
                messageHeadline={cardData.messageHeadline}
                messageBody={cardData.messageBody}
                closing={cardData.closing}
                senderName={senderName || undefined}
                photoUrl={cardData.photoUrl}
                charityName={cardData.charityName}
                donationAmount={donationAmount}
                texture={cardData.texture}
                signatureStyle={cardData.signatureStyle}
                {...(cardData.occasion === 'wedding'
                  ? { coupleNames: cardData.coupleNames, weddingDate: cardData.weddingDate }
                  : {})}
                {...(cardData.occasion === 'baby'
                  ? { babyName: cardData.babyName, babyDate: cardData.babyDate, parentsNames: cardData.parentsNames }
                  : {})}
                className="h-full"
              />
            </EnvelopeReveal>
          </div>

          {/* Summary line */}
          <motion.p
            key={`${donationAmount}-${charityName}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-base md:text-lg mt-8 max-w-xl mx-auto"
            style={{ fontFamily: "'Playfair Display', serif", color: '#2a2622' }}
          >
            Your card will donate{' '}
            <span style={{ color: '#c17b8a', fontWeight: 600 }}>
              ${donationAmount.toFixed(2)}
            </span>{' '}
            to{' '}
            <span style={{ color: '#5a7257', fontWeight: 600 }}>{charityName}</span>.
          </motion.p>

          {/* Send Cards CTA */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleSend}
              disabled={sending || !recipientName.trim() || !recipientEmail.trim()}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white text-base font-medium transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                backgroundColor: '#c17b8a',
                boxShadow: '0 10px 28px rgba(193, 123, 138, 0.4)',
                fontFamily: "'Playfair Display', serif",
              }}
            >
              <Mail className="w-4 h-4" />
              {sending ? 'Sending…' : 'Send Cards'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>



        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-14 items-start">
          {/* LEFT — Form */}
          <div className="space-y-10">
            {/* Recipient */}
            <section className="space-y-5">
              <div>
                <p
                  className="text-xs uppercase tracking-[0.2em] mb-1"
                  style={{ color: '#8a9a82' }}
                >
                  01 — Send to
                </p>
                <h2
                  className="text-2xl"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#2a2622' }}
                >
                  Who is this for?
                </h2>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Recipient's name"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full bg-transparent border-0 border-b text-lg py-3 focus:outline-none transition-all"
                  style={{ color: '#2a2622', borderColor: '#ede8e3' }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#c17b8a')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#ede8e3')}
                />
                <input
                  type="email"
                  placeholder="Recipient's email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="w-full bg-transparent border-0 border-b text-lg py-3 focus:outline-none transition-all"
                  style={{ color: '#2a2622', borderColor: '#ede8e3' }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#c17b8a')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#ede8e3')}
                />
                <input
                  type="text"
                  placeholder='From (e.g. "The Smith Family")'
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  maxLength={80}
                  className="w-full bg-transparent border-0 border-b text-lg py-3 focus:outline-none transition-all"
                  style={{ color: '#2a2622', borderColor: '#ede8e3' }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#c17b8a')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#ede8e3')}
                />
                <p className="text-xs" style={{ color: '#8a8079' }}>
                  This is how your name will appear on the card signature.
                </p>
              </div>
            </section>

            {/* Your gift — read-only summary from Choose Your Cause step */}
            <section className="space-y-3">
              <div>
                <p
                  className="text-xs uppercase tracking-[0.2em] mb-1"
                  style={{ color: '#8a9a82' }}
                >
                  02 — Your gift
                </p>
                <h2
                  className="text-2xl"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#2a2622' }}
                >
                  Where the kindness goes
                </h2>
              </div>

              <div
                className="flex items-center justify-between gap-4 p-5 rounded-xl"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #ede8e3',
                  boxShadow: '0 2px 8px rgba(42, 38, 34, 0.04)',
                }}
              >
                <p
                  className="text-base flex items-center gap-2"
                  style={{ color: '#2a2622', fontFamily: "'Playfair Display', serif" }}
                >
                  <Heart className="w-4 h-4" style={{ color: '#8faa8b' }} fill="#8faa8b" />
                  <span>
                    <span style={{ color: '#c17b8a', fontWeight: 600 }}>
                      ${donationAmount.toFixed(2)}
                    </span>{' '}
                    donated to{' '}
                    <span style={{ color: '#5a7257', fontWeight: 600 }}>{charityName}</span>
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/create-card/step5')}
                  className="text-sm underline underline-offset-4 transition-opacity hover:opacity-70 flex-shrink-0"
                  style={{ color: '#8a8079' }}
                >
                  change
                </button>
              </div>
            </section>

          </div>

          {/* RIGHT — Live Impact Summary */}
          <div className="lg:sticky lg:top-28">
            <p
              className="text-xs uppercase tracking-[0.2em] mb-4 text-center"
              style={{ color: '#8a9a82' }}
            >
              Your Impact
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl overflow-hidden p-8"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #ede8e3',
                boxShadow: '0 20px 50px rgba(42, 38, 34, 0.10)',
              }}
            >
              {/* Hero number */}
              <div className="text-center pb-6 border-b" style={{ borderColor: '#ede8e3' }}>
                <p className="text-xs uppercase tracking-[0.18em] mb-2" style={{ color: '#8a9a82' }}>
                  Total impact
                </p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={totalImpact}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="text-5xl"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#c17b8a' }}
                  >
                    ${totalImpact.toFixed(2)}
                  </motion.div>
                </AnimatePresence>
                <p className="text-sm mt-2" style={{ color: '#6b6259' }}>
                  of gratitude into good
                </p>
              </div>

              {/* Breakdown */}
              <div className="space-y-4 py-6 border-b" style={{ borderColor: '#ede8e3' }}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" style={{ color: '#8a9a82' }} />
                    <span className="text-sm" style={{ color: '#3d3833' }}>
                      Saved by going digital
                    </span>
                  </div>
                  <span
                    className="text-base"
                    style={{ fontFamily: "'Playfair Display', serif", color: '#2a2622' }}
                  >
                    ${PRINTING_SAVINGS.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" style={{ color: '#c17b8a' }} fill="#c17b8a" />
                    <span className="text-sm" style={{ color: '#3d3833' }}>
                      Your donation
                    </span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={donationAmount}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-base"
                      style={{ fontFamily: "'Playfair Display', serif", color: '#2a2622' }}
                    >
                      ${donationAmount.toFixed(2)}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* Recipient + charity summary */}
              <div className="pt-6 space-y-3 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em]" style={{ color: '#8a9a82' }}>
                    To
                  </p>
                  <p style={{ color: '#2a2622' }}>
                    {recipientName || <span style={{ color: '#bcb4ab' }}>Add a recipient</span>}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.15em]" style={{ color: '#8a9a82' }}>
                    Supporting
                  </p>
                  <p style={{ color: '#2a2622' }}>
                    {cardData.charityName || (
                      <span style={{ color: '#bcb4ab' }}>Choose a cause</span>
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Sticky footer */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(250, 247, 242, 0.92)',
          borderColor: '#ede8e3',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <p className="text-sm" style={{ color: '#6b6259' }}>
            {recipientName && recipientEmail
              ? 'Beautifully done — ready to send.'
              : 'Add recipient details to send.'}
          </p>
          <button
            onClick={handleSend}
            disabled={sending || !recipientName.trim() || !recipientEmail.trim()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{
              backgroundColor: '#c17b8a',
              boxShadow: '0 6px 18px rgba(193, 123, 138, 0.35)',
            }}
          >
            <Mail className="w-4 h-4" />
            {sending ? 'Sending…' : 'Send with love'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

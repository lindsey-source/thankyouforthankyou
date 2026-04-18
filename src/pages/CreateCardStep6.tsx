import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardWizard } from '@/contexts/CardWizardContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Heart, Mail, Sparkles, Check } from 'lucide-react';
import { toast } from 'sonner';
import { ProgressBar } from '@/components/CardDesigner/ProgressBar';

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

  const [charities, setCharities] = useState<Charity[]>([]);
  const [selectedCharity, setSelectedCharity] = useState<Charity | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(cardData.donationAmount || 10);
  const [recipientName, setRecipientName] = useState(cardData.recipientName || '');
  const [recipientEmail, setRecipientEmail] = useState(cardData.recipientEmail || '');
  const [senderName, setSenderName] = useState(cardData.senderName || '');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadCharities();
  }, []);

  const loadCharities = async () => {
    const { data, error } = await supabase.from('charities').select('*');
    if (!error && data) {
      setCharities(data);
      if (data.length > 0 && !selectedCharity) setSelectedCharity(data[0]);
    }
  };

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
  const charityName = selectedCharity?.name || cardData.charityName || 'your chosen cause';

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
          charity_id: selectedCharity?.id,
          donation_amount: donationAmount,
          sent_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (cardError) throw cardError;

      if (donationAmount > 0 && selectedCharity) {
        await supabase.from('transactions').insert({
          user_card_id: savedCard.id,
          amount: donationAmount,
          charity_id: selectedCharity.id,
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
      <ProgressBar currentStep={7} totalSteps={7} stepNames={STEP_NAMES} />

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
          <motion.p
            className="text-xs uppercase tracking-[0.25em] mb-3"
            style={{ color: '#8faa8b' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Step 7 — Preview &amp; Send
          </motion.p>
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

        {/* === Final card preview === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p
            className="text-xs uppercase tracking-[0.2em] text-center mb-4"
            style={{ color: '#8a9a82' }}
          >
            Your finished card
          </p>

          <div className="relative flex items-center justify-center min-h-[460px] md:min-h-[520px]">
            {/* Back peeking card */}
            <div
              className="absolute w-[300px] sm:w-[340px] aspect-[3/4] rounded-2xl border"
              style={{
                transform: 'rotate(3deg) translate(32px, 18px)',
                backgroundColor: '#f5ede9',
                borderColor: 'rgba(45, 36, 32, 0.06)',
                boxShadow: '0 10px 30px rgba(45, 36, 32, 0.06)',
              }}
              aria-hidden="true"
            />

            {/* Front card — uses live wizard data */}
            <motion.div
              whileHover={{ rotate: -1, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="relative w-[300px] sm:w-[340px] aspect-[3/4] rounded-2xl bg-white border overflow-hidden"
              style={{
                transform: 'rotate(-3deg)',
                borderColor: 'rgba(45, 36, 32, 0.08)',
                boxShadow: '0 24px 60px rgba(45, 36, 32, 0.18)',
              }}
              role="img"
              aria-label="Your finished thank-you card"
            >
              {/* Header band */}
              <div
                className="relative flex flex-col items-center justify-center"
                style={{
                  height: '42%',
                  background: `linear-gradient(135deg, ${previewSecondary} 0%, ${previewPrimary} 100%)`,
                }}
              >
                {cardData.photoUrl ? (
                  <img
                    src={cardData.photoUrl}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                  />
                ) : null}
                <span
                  className="relative z-10 text-center px-4"
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: '44px',
                    color: previewAccent,
                    letterSpacing: '0.04em',
                    lineHeight: 1.05,
                  }}
                >
                  {headline}
                </span>
                <div
                  className="relative z-10 flex items-center gap-2 mt-3 opacity-70"
                  aria-hidden="true"
                >
                  <div style={{ width: '30px', height: '1px', backgroundColor: previewAccent }} />
                  <div
                    style={{
                      width: '4px',
                      height: '4px',
                      backgroundColor: previewAccent,
                      transform: 'rotate(45deg)',
                    }}
                  />
                  <div style={{ width: '30px', height: '1px', backgroundColor: previewAccent }} />
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col" style={{ height: '58%' }}>
                <p
                  className="text-lg mb-2"
                  style={{ fontFamily: fonts.heading, color: previewText }}
                >
                  Dear {recipientName?.trim() || 'friend'},
                </p>
                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ fontFamily: fonts.body, color: previewText, opacity: 0.75 }}
                >
                  {bodyText}
                </p>
                <p
                  className="text-sm mt-2"
                  style={{ fontFamily: fonts.body, color: previewText, opacity: 0.85 }}
                >
                  {closing},
                </p>
                <p
                  className="text-sm"
                  style={{ fontFamily: fonts.heading, color: previewText, opacity: 0.95 }}
                >
                  {senderName.trim() || <span style={{ opacity: 0.4 }}>Your name</span>}
                </p>

                {/* Donation badge */}
                <div className="mt-3">
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: 'rgba(143, 170, 139, 0.18)',
                      color: '#5a7257',
                    }}
                  >
                    <Heart className="w-3 h-3" fill="#5a7257" />
                    ${donationAmount.toFixed(2)} donated to {charityName}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative dots */}
            <div
              className="absolute -top-2 left-1/4 h-3 w-3 rounded-full opacity-70"
              style={{ backgroundColor: '#c17b8a' }}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-1 right-1/4 h-3 w-3 rounded-full opacity-70"
              style={{ backgroundColor: '#8faa8b' }}
              aria-hidden="true"
            />
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

            {/* Charity */}
            <section className="space-y-5">
              <div>
                <p
                  className="text-xs uppercase tracking-[0.2em] mb-1"
                  style={{ color: '#8a9a82' }}
                >
                  02 — Choose a cause
                </p>
                <h2
                  className="text-2xl"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#2a2622' }}
                >
                  Where should the kindness go?
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {charities.map((charity) => {
                  const isSelected = selectedCharity?.id === charity.id;
                  return (
                    <button
                      key={charity.id}
                      type="button"
                      onClick={() => setSelectedCharity(charity)}
                      className="text-left p-4 rounded-xl flex items-start gap-4 transition-all"
                      style={{
                        backgroundColor: '#ffffff',
                        border: isSelected ? '2px solid #c17b8a' : '1px solid #ede8e3',
                        boxShadow: isSelected
                          ? '0 8px 22px rgba(193, 123, 138, 0.15)'
                          : '0 2px 8px rgba(42, 38, 34, 0.04)',
                      }}
                    >
                      {charity.logo_url && (
                        <img
                          src={charity.logo_url}
                          alt={charity.name}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4
                          className="text-base mb-0.5"
                          style={{ fontFamily: "'Playfair Display', serif", color: '#2a2622' }}
                        >
                          {charity.name}
                        </h4>
                        <p className="text-xs" style={{ color: '#6b6259' }}>
                          {charity.description}
                        </p>
                      </div>
                      {isSelected && (
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: '#c17b8a' }}
                        >
                          <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Donation */}
            <section className="space-y-5">
              <div>
                <p
                  className="text-xs uppercase tracking-[0.2em] mb-1"
                  style={{ color: '#8a9a82' }}
                >
                  03 — Donation
                </p>
                <h2
                  className="text-2xl"
                  style={{ fontFamily: "'Playfair Display', serif", color: '#2a2622' }}
                >
                  Add a gift
                </h2>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {PRESET_AMOUNTS.map((amount) => {
                  const isActive = donationAmount === amount;
                  return (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setDonationAmount(amount)}
                      className="py-4 rounded-xl text-lg transition-all"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        backgroundColor: isActive ? '#c17b8a' : '#ffffff',
                        color: isActive ? '#ffffff' : '#2a2622',
                        border: isActive ? '2px solid #c17b8a' : '1px solid #ede8e3',
                      }}
                    >
                      ${amount}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <span className="text-sm" style={{ color: '#8a8079' }}>
                  Or custom:
                </span>
                <div className="flex items-center gap-1">
                  <span style={{ color: '#2a2622' }}>$</span>
                  <input
                    type="number"
                    min={0}
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(Math.max(0, Number(e.target.value) || 0))}
                    className="w-20 bg-transparent border-0 border-b text-lg py-1 focus:outline-none"
                    style={{ color: '#2a2622', borderColor: '#ede8e3' }}
                  />
                </div>
              </div>

              {selectedCharity?.impact_message && (
                <p className="text-sm italic pt-2" style={{ color: '#6b6259' }}>
                  “{selectedCharity.impact_message}”
                </p>
              )}
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
                    {selectedCharity?.name || (
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

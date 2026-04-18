import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Heart } from 'lucide-react';
import { toast } from 'sonner';
import {
  Leaf, Baby, Utensils, HeartPulse, PawPrint,
  GraduationCap, Scale, LifeBuoy,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCardWizard } from '@/contexts/CardWizardContext';
import { ProgressBar } from '@/components/CardDesigner/ProgressBar';

type Charity = {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  impact_message: string | null;
};

const STEP_NAMES = [
  'Choose Occasion',
  'Pick Your Style',
  'Customize Design',
  'Write Your Message',
  'Choose Your Cause',
  'Add Finishing Touches',
  'Preview & Send',
];

const CATEGORIES: Array<{
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  tint: string; // soft bg
  ink: string; // icon/text accent
}> = [
  { id: 'environment',     label: 'Environment',      icon: Leaf,         tint: 'hsl(115 30% 92%)', ink: 'hsl(115 25% 38%)' },
  { id: 'children',        label: 'Children',         icon: Baby,         tint: 'hsl(347 45% 94%)', ink: 'hsl(347 40% 50%)' },
  { id: 'hunger_housing',  label: 'Hunger & Housing', icon: Utensils,     tint: 'hsl(28 50% 92%)',  ink: 'hsl(28 45% 42%)' },
  { id: 'health',          label: 'Health',           icon: HeartPulse,   tint: 'hsl(0 50% 94%)',   ink: 'hsl(0 45% 50%)' },
  { id: 'animals',         label: 'Animals',          icon: PawPrint,     tint: 'hsl(35 45% 90%)',  ink: 'hsl(28 40% 38%)' },
  { id: 'education',       label: 'Education',        icon: GraduationCap,tint: 'hsl(220 35% 93%)', ink: 'hsl(220 35% 45%)' },
  { id: 'human_rights',    label: 'Human Rights',     icon: Scale,        tint: 'hsl(265 30% 93%)', ink: 'hsl(265 30% 45%)' },
  { id: 'disaster_relief', label: 'Disaster Relief',  icon: LifeBuoy,     tint: 'hsl(195 35% 92%)', ink: 'hsl(195 40% 38%)' },
];

const PRESET_AMOUNTS = [1, 2, 3, 5, 10] as const;
const SUGGESTED_AMOUNT = 3;

export default function CreateCardImpact() {
  const navigate = useNavigate();
  const { cardData, updateCardData, setCurrentStep } = useCardWizard();

  const [charities, setCharities] = useState<Charity[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0].id);
  const [selectedId, setSelectedId] = useState<string | null>(cardData.charityId);
  const [guestCount, setGuestCount] = useState<number>(cardData.guestCount || 50);
  const [loading, setLoading] = useState(true);

  // Donation state — preserves per-guest overrides when toggling back to flat
  const [donationMode, setDonationMode] = useState<'flat' | 'per_guest'>(
    cardData.donationMode || 'flat'
  );
  const [flatAmount, setFlatAmount] = useState<number>(
    cardData.donationAmount || SUGGESTED_AMOUNT
  );
  const [customOpen, setCustomOpen] = useState<boolean>(
    !!cardData.donationAmount && !PRESET_AMOUNTS.includes(cardData.donationAmount as any)
  );
  const [perGuest, setPerGuest] = useState<Record<string, number>>(
    cardData.donationPerGuest || {}
  );

  const guests = cardData.guests || [];
  const effectiveGuestCount = guests.length > 0 ? guests.length : guestCount;

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error } = await supabase
        .from('charities')
        .select('id, name, description, category, impact_message')
        .order('name', { ascending: true });
      if (!active) return;
      if (error) {
        toast.error('Could not load charities');
      } else {
        setCharities(data ?? []);
      }
      setLoading(false);
    })();
    return () => { active = false; };
  }, []);

  const totalDonation = useMemo(() => {
    if (donationMode === 'per_guest' && guests.length > 0) {
      const sum = guests.reduce(
        (acc, g) => acc + (perGuest[g.id] ?? flatAmount),
        0
      );
      return Math.round(sum * 100) / 100;
    }
    return Math.round(flatAmount * effectiveGuestCount * 100) / 100;
  }, [donationMode, flatAmount, perGuest, guests, effectiveGuestCount]);

  const selectedCharity = useMemo(
    () => charities.find(c => c.id === selectedId) || null,
    [charities, selectedId],
  );

  const filtered = useMemo(
    () => charities.filter(c => c.category === activeCategory),
    [charities, activeCategory],
  );

  const handleSelect = (c: Charity) => {
    setSelectedId(c.id);
  };

  const updatePerGuest = (id: string, value: number) => {
    setPerGuest(prev => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (!selectedCharity) {
      toast.error('Please choose a cause to support');
      return;
    }
    updateCardData({
      charityId: selectedCharity.id,
      charityName: selectedCharity.name,
      guestCount: effectiveGuestCount,
      donationAmount: flatAmount,
      donationMode,
      donationPerGuest: perGuest, // preserved even when in flat mode
    });
    setCurrentStep(7);
    navigate('/create-card/step6');
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <ProgressBar currentStep={5} totalSteps={7} stepNames={STEP_NAMES} />

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8 pb-40">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h1
            className="text-4xl md:text-5xl mb-3 text-brand-dark"
            style={{ fontFamily: "'Playfair Display', serif" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Choose your cause
          </motion.h1>
          <motion.p
            className="text-base md:text-lg max-w-2xl mx-auto text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            Your gratitude carries more than words — it carries impact. Choose a cause that feels right for this moment.
          </motion.p>
        </div>

        {/* Back */}
        <button
          onClick={() => navigate('/create-card/step5')}
          className="inline-flex items-center gap-2 text-sm mb-8 text-muted-foreground hover:opacity-70 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor: isActive ? 'hsl(var(--brand-rose))' : 'white',
                  color: isActive ? 'white' : 'hsl(var(--brand-dark))',
                  border: `1px solid ${isActive ? 'hsl(var(--brand-rose))' : 'hsl(var(--border))'}`,
                  boxShadow: isActive ? '0 6px 18px hsl(var(--brand-rose) / 0.30)' : 'none',
                }}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Charity grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {loading
            ? Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-44 rounded-2xl bg-white/60 animate-pulse border border-border" />
              ))
            : filtered.map(c => {
                const cat = CATEGORIES.find(k => k.id === c.category)!;
                const Icon = cat?.icon ?? Heart;
                const isSelected = selectedId === c.id;
                return (
                  <motion.button
                    key={c.id}
                    onClick={() => handleSelect(c)}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -2 }}
                    className="text-left p-6 rounded-2xl bg-white transition-all relative"
                    style={{
                      border: `2px solid ${isSelected ? 'hsl(var(--brand-rose))' : 'hsl(var(--border))'}`,
                      boxShadow: isSelected
                        ? '0 12px 32px hsl(var(--brand-rose) / 0.18)'
                        : '0 2px 10px hsl(var(--brand-dark) / 0.04)',
                    }}
                  >
                    {isSelected && (
                      <div
                        className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'hsl(var(--brand-rose))' }}
                      >
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: cat?.tint }}
                      >
                        <Icon className="w-6 h-6" style={{ color: cat?.ink }} />
                      </div>
                      <div className="flex-1">
                        <h3
                          className="text-xl mb-1.5 text-brand-dark leading-tight"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {c.name}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                          {c.description}
                        </p>
                        <p
                          className="text-[11px] tracking-[0.18em] uppercase font-medium"
                          style={{ color: 'hsl(var(--brand-sage))' }}
                        >
                          Every card amplifies your gratitude
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
        </div>

        {/* Donation amount + impact */}
        <motion.div
          layout
          className="rounded-3xl p-8 md:p-10 bg-white border border-border space-y-8"
          style={{ boxShadow: '0 10px 40px hsl(var(--brand-dark) / 0.06)' }}
        >
          {/* Header row */}
          <div>
            <p
              className="text-[11px] uppercase tracking-[0.2em] font-medium mb-2"
              style={{ color: 'hsl(var(--brand-sage))' }}
            >
              Your donation
            </p>
            <h3
              className="text-2xl md:text-3xl text-brand-dark"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              How much would you like to give with each card?
            </h3>
          </div>

          {/* Mode toggle */}
          <div
            className="inline-flex items-center rounded-full p-1 border"
            style={{ borderColor: 'hsl(var(--border))', backgroundColor: 'hsl(var(--brand-cream))' }}
          >
            {([
              { id: 'flat', label: 'Same amount for everyone' },
              { id: 'per_guest', label: 'Set amount per guest', disabled: guests.length === 0 },
            ] as const).map(opt => {
              const isActive = donationMode === opt.id;
              const disabled = 'disabled' in opt && opt.disabled;
              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => !disabled && setDonationMode(opt.id)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: isActive ? 'white' : 'transparent',
                    color: isActive ? 'hsl(var(--brand-dark))' : 'hsl(var(--muted-foreground))',
                    boxShadow: isActive ? '0 2px 8px hsl(var(--brand-dark) / 0.06)' : 'none',
                  }}
                  title={disabled ? 'Add guests in the previous step to enable per-guest amounts' : undefined}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Flat amount mode */}
          {donationMode === 'flat' && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {PRESET_AMOUNTS.map(amt => {
                  const isActive = !customOpen && flatAmount === amt;
                  const isSuggested = amt === SUGGESTED_AMOUNT;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => { setFlatAmount(amt); setCustomOpen(false); }}
                      className="relative px-5 py-3 rounded-xl text-base font-medium transition-all"
                      style={{
                        backgroundColor: isActive ? 'hsl(var(--brand-rose))' : 'white',
                        color: isActive ? 'white' : 'hsl(var(--brand-dark))',
                        border: `1.5px solid ${isActive ? 'hsl(var(--brand-rose))' : 'hsl(var(--border))'}`,
                        boxShadow: isActive ? '0 6px 18px hsl(var(--brand-rose) / 0.30)' : 'none',
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      ${amt}
                      {isSuggested && (
                        <span
                          className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full font-semibold"
                          style={{
                            backgroundColor: 'hsl(var(--brand-sage))',
                            color: 'white',
                          }}
                        >
                          Suggested
                        </span>
                      )}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setCustomOpen(true)}
                  className="px-5 py-3 rounded-xl text-base font-medium transition-all"
                  style={{
                    backgroundColor: customOpen ? 'hsl(var(--brand-rose))' : 'white',
                    color: customOpen ? 'white' : 'hsl(var(--brand-dark))',
                    border: `1.5px solid ${customOpen ? 'hsl(var(--brand-rose))' : 'hsl(var(--border))'}`,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  Custom
                </button>
              </div>

              {flatAmount === SUGGESTED_AMOUNT && !customOpen && (
                <p className="text-xs text-muted-foreground italic">
                  Suggested — covers what you'd spend on a stamp.
                </p>
              )}

              {customOpen && (
                <div className="flex items-center gap-3">
                  <span className="text-xl text-brand-dark" style={{ fontFamily: "'Playfair Display', serif" }}>$</span>
                  <input
                    type="number"
                    min={1}
                    max={1000}
                    value={flatAmount}
                    onChange={(e) => setFlatAmount(Math.max(1, Number(e.target.value) || 0))}
                    className="w-28 text-2xl font-medium bg-transparent border-b py-1 focus:outline-none text-brand-dark"
                    style={{ borderColor: 'hsl(var(--border))', fontFamily: "'Playfair Display', serif" }}
                    autoFocus
                  />
                  <span className="text-sm text-muted-foreground">per card</span>
                </div>
              )}

              {/* Guest count slider — only shown in flat mode without an uploaded list */}
              {guests.length === 0 && (
                <div className="pt-2">
                  <label
                    className="text-[11px] uppercase tracking-[0.2em] font-medium block mb-3"
                    style={{ color: 'hsl(var(--brand-sage))' }}
                  >
                    Number of guests
                  </label>
                  <div className="flex items-center gap-4 max-w-md">
                    <input
                      type="range"
                      min={1}
                      max={500}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="flex-1 accent-[hsl(var(--brand-rose))]"
                    />
                    <input
                      type="number"
                      min={1}
                      max={2000}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Math.max(1, Number(e.target.value) || 0))}
                      className="w-20 text-2xl font-medium bg-transparent border-b text-brand-dark py-1 text-center focus:outline-none"
                      style={{ borderColor: 'hsl(var(--border))', fontFamily: "'Playfair Display', serif" }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Per-guest mode */}
          {donationMode === 'per_guest' && guests.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Set a different donation amount for each guest. Leave blank to use the default
                of <span className="font-semibold text-brand-dark">${flatAmount}</span>.
              </p>
              <div className="border rounded-xl overflow-hidden" style={{ borderColor: 'hsl(var(--border))' }}>
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/40 text-muted-foreground sticky top-0">
                      <tr>
                        <th className="text-left px-4 py-2 font-medium">Guest</th>
                        <th className="text-right px-4 py-2 font-medium w-32">Donation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {guests.map(g => (
                        <tr key={g.id} className="border-t" style={{ borderColor: 'hsl(var(--border))' }}>
                          <td className="px-4 py-2 text-brand-dark">{g.guestName || <span className="text-muted-foreground italic">Unnamed</span>}</td>
                          <td className="px-4 py-2 text-right">
                            <div className="inline-flex items-center gap-1">
                              <span className="text-muted-foreground">$</span>
                              <input
                                type="number"
                                min={0}
                                max={1000}
                                value={perGuest[g.id] ?? ''}
                                placeholder={String(flatAmount)}
                                onChange={(e) => {
                                  const v = e.target.value;
                                  if (v === '') {
                                    setPerGuest(prev => {
                                      const next = { ...prev };
                                      delete next[g.id];
                                      return next;
                                    });
                                  } else {
                                    updatePerGuest(g.id, Math.max(0, Number(v) || 0));
                                  }
                                }}
                                className="w-20 bg-transparent border-b py-1 text-right focus:outline-none text-brand-dark"
                                style={{ borderColor: 'hsl(var(--border))' }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Live total */}
          <div
            className="pt-6 border-t"
            style={{ borderColor: 'hsl(var(--border))' }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={`${totalDonation}-${selectedCharity?.id ?? 'none'}-${effectiveGuestCount}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xl md:text-2xl text-brand-dark leading-snug"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Your total donation:{' '}
                <span style={{ color: 'hsl(var(--brand-rose))' }}>${totalDonation.toFixed(2)}</span>
                {selectedCharity && (
                  <>
                    {' to '}
                    <span style={{ color: 'hsl(var(--brand-sage))' }}>{selectedCharity.name}</span>
                  </>
                )}
                {' for '}
                <span className="font-semibold">{effectiveGuestCount}</span>{' '}
                {effectiveGuestCount === 1 ? 'guest' : 'guests'}.
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Sticky footer */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-md"
        style={{
          backgroundColor: 'hsl(var(--brand-cream) / 0.92)',
          borderColor: 'hsl(var(--border))',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {selectedCharity
              ? `Supporting ${selectedCharity.name} — $${totalDonation.toFixed(2)}`
              : 'Pick a cause to continue.'}
          </p>
          <button
            onClick={handleNext}
            disabled={!selectedCharity}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{
              backgroundColor: 'hsl(var(--brand-rose))',
              boxShadow: '0 6px 18px hsl(var(--brand-rose) / 0.35)',
            }}
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

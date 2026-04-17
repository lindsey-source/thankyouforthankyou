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

const SAVINGS_PER_GUEST = 4.24; // savings vs paper card per guest

export default function CreateCardImpact() {
  const navigate = useNavigate();
  const { cardData, updateCardData, setCurrentStep } = useCardWizard();

  const [charities, setCharities] = useState<Charity[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0].id);
  const [selectedId, setSelectedId] = useState<string | null>(cardData.charityId);
  const [guestCount, setGuestCount] = useState<number>(cardData.guestCount || 50);
  const [loading, setLoading] = useState(true);

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

  const totalDonation = useMemo(
    () => Math.round(guestCount * SAVINGS_PER_GUEST * 100) / 100,
    [guestCount],
  );

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

  const handleNext = () => {
    if (!selectedCharity) {
      toast.error('Please choose a cause to support');
      return;
    }
    updateCardData({
      charityId: selectedCharity.id,
      charityName: selectedCharity.name,
      guestCount,
      donationAmount: totalDonation,
    });
    setCurrentStep(6);
    navigate('/create-card/step5');
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
            className="text-base md:text-lg max-w-xl mx-auto text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            100% of what you save by going paperless goes to the cause you pick.
          </motion.p>
        </div>

        {/* Back */}
        <button
          onClick={() => navigate('/create-card/step4')}
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
                          100% of card savings go here
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
        </div>

        {/* Guest count + impact */}
        <motion.div
          layout
          className="rounded-3xl p-8 md:p-10 bg-white border border-border"
          style={{ boxShadow: '0 10px 40px hsl(var(--brand-dark) / 0.06)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <label
                className="text-[11px] uppercase tracking-[0.2em] font-medium block mb-3"
                style={{ color: 'hsl(var(--brand-sage))' }}
              >
                Number of guests
              </label>
              <div className="flex items-center gap-4">
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

            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground mb-2">Your impact</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={`${guestCount}-${selectedCharity?.id ?? 'none'}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-2xl md:text-3xl text-brand-dark leading-snug"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Your <span className="font-semibold">{guestCount}</span> guests ={' '}
                  <span style={{ color: 'hsl(var(--brand-rose))' }}>${totalDonation.toFixed(2)}</span> donated
                  {selectedCharity && (
                    <>
                      {' to '}
                      <span style={{ color: 'hsl(var(--brand-sage))' }}>
                        {selectedCharity.name}
                      </span>
                    </>
                  )}
                </motion.p>
              </AnimatePresence>
            </div>
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

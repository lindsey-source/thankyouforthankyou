import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardWizard } from '@/contexts/CardWizardContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Heart, Baby, GraduationCap, Cake, Gift, Flower2, HandHeart } from 'lucide-react';
import { ProgressBar } from '@/components/CardDesigner/ProgressBar';
import { BreadcrumbNav } from '@/components/CardDesigner/BreadcrumbNav';

const STEPS = [
  { name: 'Occasion', path: '/create-card/step1' },
  { name: 'Style', path: '/create-card/step2' },
  { name: 'Customize', path: '/create-card/step3' },
  { name: 'Message', path: '/create-card/step4' },
  { name: 'Touches', path: '/create-card/step5' },
  { name: 'Preview', path: '/create-card/step6' }
];

const STEP_NAMES = ['Choose Occasion', 'Pick Your Style', 'Customize Design', 'Write Your Message', 'Add Finishing Touches', 'Preview & Send'];

const occasions = [
  { id: 'wedding', name: 'Wedding', icon: Heart, gradient: 'from-pink-100 to-rose-100' },
  { id: 'baby', name: 'Baby', icon: Baby, gradient: 'from-blue-100 to-cyan-100' },
  { id: 'graduation', name: 'Graduation', icon: GraduationCap, gradient: 'from-yellow-100 to-amber-100' },
  { id: 'birthday', name: 'Birthday', icon: Cake, gradient: 'from-purple-100 to-pink-100' },
  { id: 'general', name: 'General Thank You', icon: Gift, gradient: 'from-orange-100 to-yellow-100' },
  { id: 'memorial', name: 'Memorial', icon: Flower2, gradient: 'from-gray-100 to-slate-100' },
  { id: 'charity', name: 'Charity', icon: HandHeart, gradient: 'from-green-100 to-emerald-100' }
];

export default function CreateCardStep1() {
  const navigate = useNavigate();
  const { cardData, updateCardData, setCurrentStep } = useCardWizard();

  const handleOccasionSelect = (occasionId: string) => {
    updateCardData({ occasion: occasionId });
    setCurrentStep(2);
    navigate('/create-card/step2');
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <ProgressBar currentStep={1} totalSteps={6} stepNames={STEP_NAMES} />
        <BreadcrumbNav currentStep={1} steps={STEPS} />
        
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Let's make something beautiful together
          </motion.h1>
          <motion.p 
            className="text-lg text-white/90 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Choose the occasion for your thank you card
          </motion.p>

          {/* Benefits Callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <Card className="bg-white/95 backdrop-blur-sm border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Heart className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div className="text-left">
                    <h4 className="font-semibold text-primary mb-2 text-lg">
                      Your Thank You, Reimagined
                    </h4>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      Traditional thank you cards cost $3-8 each (card + stamp + time). Instead of that expense, 
                      send a beautiful digital card and donate that money to charity - turning your gratitude into greater good.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {occasions.map((occasion, index) => {
            const Icon = occasion.icon;
            return (
              <motion.div
                key={occasion.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-all hover:scale-105 hover:shadow-xl ${
                    cardData.occasion === occasion.id ? 'ring-4 ring-primary' : ''
                  }`}
                  onClick={() => handleOccasionSelect(occasion.id)}
                >
                  <CardContent className="p-8">
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${occasion.gradient} flex items-center justify-center`}>
                      <Icon className="w-10 h-10 text-gray-700" />
                    </div>
                    <h3 className="text-xl font-semibold text-center">{occasion.name}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-white/70">Step 1 of 5</p>
        </div>
      </div>
    </div>
  );
}

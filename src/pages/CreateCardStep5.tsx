import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardWizard } from '@/contexts/CardWizardContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mail, Clock, Link2, Heart, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { InteractiveCardViewer } from '@/components/CardDesigner/InteractiveCardViewer';

interface Charity {
  id: string;
  name: string;
  description: string;
  impact_message: string;
  logo_url: string;
}

export default function CreateCardStep5() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cardData, updateCardData, resetWizard } = useCardWizard();
  const [charities, setCharities] = useState<Charity[]>([]);
  const [selectedCharity, setSelectedCharity] = useState<Charity | null>(null);
  const [donationAmount, setDonationAmount] = useState(10);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [template, setTemplate] = useState<any>(null);

  const printingSavings = 4.25;

  useEffect(() => {
    loadCharities();
    loadTemplate();
  }, []);

  const loadCharities = async () => {
    const { data, error } = await supabase
      .from('charities')
      .select('*');

    if (!error && data) {
      setCharities(data);
      if (data.length > 0) {
        setSelectedCharity(data[0]);
      }
    }
  };

  const loadTemplate = async () => {
    if (!cardData.templateId) return;

    const { data } = await supabase
      .from('card_templates')
      .select('*')
      .eq('id', cardData.templateId)
      .single();

    if (data) {
      setTemplate(data);
    }
  };

  const handleSendNow = async () => {
    if (!recipientEmail || !recipientName) {
      toast.error('Please enter recipient details');
      return;
    }

    setSending(true);

    try {
      // Save card with all details
      const { data: savedCard, error: cardError } = await supabase
        .from('user_cards')
        .insert({
          user_id: user?.id,
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
          sent_at: new Date().toISOString()
        })
        .select()
        .single();

      if (cardError) throw cardError;

      // Create transaction record
      if (donationAmount > 0 && selectedCharity) {
        await supabase
          .from('transactions')
          .insert({
            user_card_id: savedCard.id,
            amount: donationAmount,
            charity_id: selectedCharity.id,
            status: 'completed'
          });
      }

      // Trigger celebration
      toast.success('Your gratitude has been sent! You just spread kindness — and made a difference.', {
        duration: 5000
      });
      
      // Reset wizard and navigate
      setTimeout(() => {
        resetWizard();
        navigate('/dashboard');
      }, 2000);
    } catch (error: any) {
      console.error('Send error:', error);
      toast.error(error.message || 'Failed to send card');
    } finally {
      setSending(false);
    }
  };

  const handleSchedule = () => {
    toast.info('Schedule feature coming soon!');
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/card/${cardData.templateId}`;
    navigator.clipboard.writeText(link);
    toast.success('Share link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Preview & Send
          </motion.h1>
          <p className="text-white/90">Your beautiful card is ready!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Preview */}
          <div>
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Card Preview</h3>
                {template && (
                  <div
                    onClick={() => setShowPreview(true)}
                    className="cursor-pointer aspect-[3/4] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <img
                      src={template.preview_image}
                      alt="Card preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => setShowPreview(true)}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  View Interactive Experience
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right: Send Options & Donation */}
          <div className="space-y-6">
            {/* Recipient Details */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">Recipient Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="recipientName">Name</Label>
                  <Input
                    id="recipientName"
                    placeholder="Jane Smith"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipientEmail">Email</Label>
                  <Input
                    id="recipientEmail"
                    type="email"
                    placeholder="jane@example.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Donation Section */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Turn Gratitude into Giving</h3>
                  <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                    <Heart className="w-4 h-4" fill="currentColor" />
                    <span>
                      You saved ${printingSavings.toFixed(2)} by going digital
                    </span>
                  </div>
                </div>

                {/* Charity Selection */}
                <div className="space-y-2">
                  <Label>Choose a Charity</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {charities.map((charity) => (
                      <div
                        key={charity.id}
                        onClick={() => setSelectedCharity(charity)}
                        className={`cursor-pointer p-3 rounded-lg border-2 transition-all ${
                          selectedCharity?.id === charity.id
                            ? 'border-primary ring-2 ring-primary bg-primary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={charity.logo_url}
                            alt={charity.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold">{charity.name}</h4>
                            <p className="text-xs text-muted-foreground">{charity.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Donation Amount */}
                {selectedCharity && (
                  <div className="space-y-3">
                    <Label>Donation Amount: ${donationAmount}</Label>
                    <Slider
                      value={[donationAmount]}
                      onValueChange={(value) => setDonationAmount(value[0])}
                      min={0}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <p className="text-sm text-muted-foreground">
                      {selectedCharity.impact_message}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Send Actions */}
            <div className="space-y-3">
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={handleSendNow}
                disabled={sending}
              >
                <Mail className="w-4 h-4 mr-2" />
                {sending ? 'Sending...' : 'Send Now ✉️'}
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={handleSchedule}
                  className="bg-white"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCopyLink}
                  className="bg-white"
                >
                  <Link2 className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </div>
          </div>
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
          
          <p className="text-sm text-white/70">Step 5 of 5</p>
          
          <div className="w-20" /> {/* Spacer for alignment */}
        </div>

        {/* Interactive Preview Modal */}
        {showPreview && template && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="relative w-full max-w-6xl h-[90vh]">
              <button
                onClick={() => setShowPreview(false)}
                className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 text-2xl"
              >
                ✕
              </button>
              <InteractiveCardViewer
                template={template}
                photo={cardData.photoUrl ? { file: null as any, preview: cardData.photoUrl } : null}
                message={cardData.messageBody}
                recipientName={recipientName || 'Friend'}
                senderName={user?.email || 'Anonymous'}
                charityName={selectedCharity?.name}
                envelopeStyle={{
                  id: cardData.envelopeColor || 'cream',
                  name: 'Selected',
                  primaryColor: '#F5E6D3',
                  accentColor: '#D4A574',
                  textColor: '#8B6F47',
                  description: 'Your choice'
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

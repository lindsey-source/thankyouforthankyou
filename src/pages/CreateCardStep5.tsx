import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCardWizard } from '@/contexts/CardWizardContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { ProgressBar } from '@/components/CardDesigner/ProgressBar';
import { BreadcrumbNav } from '@/components/CardDesigner/BreadcrumbNav';

const STEPS = [
  { name: 'Occasion', path: '/create-card/step1' },
  { name: 'Style', path: '/create-card/step2' },
  { name: 'Customize', path: '/create-card/step3' },
  { name: 'Message', path: '/create-card/step4' },
  { name: 'Impact', path: '/create-card/impact' },
  { name: 'Touches', path: '/create-card/step5' },
  { name: 'Preview', path: '/create-card/step6' }
];

const STEP_NAMES = ['Choose Occasion', 'Pick Your Style', 'Customize Design', 'Write Your Message', 'Choose Your Cause', 'Add Finishing Touches', 'Preview & Send'];

const envelopeColors = [
  { id: 'cream', color: '#F5E6D3', name: 'Classic Cream' },
  { id: 'pink', color: '#FFF0F5', name: 'Blush Pink' },
  { id: 'blue', color: '#E8EDF4', name: 'Sky Blue' },
  { id: 'green', color: '#F8FBF8', name: 'Sage Green' }
];

const textures = [
  { 
    id: 'smooth', 
    name: 'Smooth',
    style: 'bg-gradient-to-br from-amber-50 to-orange-50'
  },
  { 
    id: 'linen', 
    name: 'Linen',
    style: 'bg-gradient-to-br from-gray-50 to-gray-100',
    pattern: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,.03) 2px, rgba(0,0,0,.03) 4px)'
  },
  { 
    id: 'watercolor', 
    name: 'Watercolor',
    style: 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
  }
];

const signatureStyles = [
  { id: 'none', name: 'No Signature' },
  { id: 'handwritten', name: 'Handwritten Script' },
  { id: 'typed', name: 'Typed Name' }
];

export default function CreateCardStep4() {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const { cardData, updateCardData, setCurrentStep } = useCardWizard();
  const [uploading, setUploading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [selectedEnvelope, setSelectedEnvelope] = useState(envelopeColors[0].id);
  const [selectedTexture, setSelectedTexture] = useState(textures[0].id);
  const [selectedSignature, setSelectedSignature] = useState(signatureStyles[0].id);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setUploading(true);
    
    try {
      const preview = URL.createObjectURL(file);
      setPhotoPreview(preview);

      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `card-photos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('card-photos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('card-photos')
        .getPublicUrl(filePath);

      updateCardData({ photoUrl: urlData.publicUrl });
      toast.success('Photo uploaded successfully!');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload photo');
      setPhotoPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    updateCardData({ photoUrl: null });
  };

  const handleNext = () => {
    updateCardData({
      envelopeColor: selectedEnvelope,
      texture: selectedTexture,
      signatureStyle: selectedSignature
    });
    setCurrentStep(6);
    navigate('/create-card/step6');
  };

  return (
    <div className="min-h-screen bg-gradient-hero p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <ProgressBar currentStep={6} totalSteps={7} stepNames={STEP_NAMES} />
        <BreadcrumbNav currentStep={6} steps={STEPS} />
        <div className="text-center mb-8">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Add finishing touches
          </motion.h1>
          <p className="text-white/90">Make your card uniquely yours</p>
        </div>

        <div className="space-y-6">
          {/* Photo Upload */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <Label className="text-lg font-semibold mb-4 block">Add a Photo (Optional)</Label>
              {!photoPreview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                    disabled={uploading}
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-sm text-muted-foreground mb-2">
                      {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    onClick={handleRemovePhoto}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Envelope Color */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <Label className="text-lg font-semibold mb-4 block">Envelope Color</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {envelopeColors.map((env) => (
                  <div
                    key={env.id}
                    onClick={() => setSelectedEnvelope(env.id)}
                    className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                      selectedEnvelope === env.id
                        ? 'border-primary ring-2 ring-primary'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className="w-full h-16 rounded-lg mb-2"
                      style={{ backgroundColor: env.color }}
                    />
                    <p className="text-sm font-medium text-center">{env.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Paper Texture */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <Label className="text-lg font-semibold mb-4 block">Paper Texture</Label>
              <div className="grid grid-cols-3 gap-4">
                {textures.map((texture) => (
                  <div
                    key={texture.id}
                    onClick={() => setSelectedTexture(texture.id)}
                    className={`cursor-pointer rounded-lg border-2 transition-all overflow-hidden ${
                      selectedTexture === texture.id
                        ? 'border-primary ring-2 ring-primary'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div 
                      className={`w-full h-24 ${texture.style}`}
                      style={texture.pattern ? { 
                        backgroundImage: texture.pattern 
                      } : undefined}
                    />
                    <div className="p-3 text-center bg-white">
                      <p className="font-medium text-sm">{texture.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Signature Style */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <Label className="text-lg font-semibold mb-4 block">Add My Signature</Label>
              <div className="grid grid-cols-3 gap-4">
                {signatureStyles.map((style) => (
                  <div
                    key={style.id}
                    onClick={() => setSelectedSignature(style.id)}
                    className={`cursor-pointer p-4 rounded-lg border-2 text-center transition-all ${
                      selectedSignature === style.id
                        ? 'border-primary ring-2 ring-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-medium">{style.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => navigate('/create-card/impact')}
            className="bg-white/95"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <p className="text-sm text-white/70">Step 6 of 7</p>
          
          <Button variant="hero" onClick={handleNext}>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

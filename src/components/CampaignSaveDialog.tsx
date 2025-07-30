import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { saveCampaign } from '@/lib/campaigns';
import { CreateCampaignData } from '@/types/campaign';

interface CampaignSaveDialogProps {
  cardDesign: CreateCampaignData['card_design'];
  onSaved?: (campaignId: string) => void;
  trigger?: React.ReactNode;
}

export function CampaignSaveDialog({ cardDesign, onSaved, trigger }: CampaignSaveDialogProps) {
  const [campaignName, setCampaignName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!campaignName.trim()) {
      toast({
        title: "Campaign name required",
        description: "Please enter a name for your campaign",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    try {
      const { data, error } = await saveCampaign({
        name: campaignName.trim(),
        card_design: cardDesign
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Campaign saved!",
        description: `"${campaignName}" has been saved successfully.`,
      });

      setCampaignName('');
      setIsOpen(false);
      
      if (onSaved && data) {
        onSaved(data.id);
      }
    } catch (error: any) {
      toast({
        title: "Failed to save campaign",
        description: error.message || "An error occurred while saving the campaign",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Save className="w-4 h-4" />
            Save Campaign
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save Campaign</DialogTitle>
          <DialogDescription>
            Give your campaign a name so you can find it later.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="campaign-name">Campaign Name</Label>
            <Input
              id="campaign-name"
              placeholder="Enter campaign name..."
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || !campaignName.trim()}
              className="gap-2"
            >
              {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Campaign
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
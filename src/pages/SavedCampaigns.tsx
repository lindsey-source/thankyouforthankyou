import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit3, Trash2, Calendar, Image, MessageSquare, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { getCampaigns, deleteCampaign } from '@/lib/campaigns';
import { Campaign } from '@/types/campaign';

export default function SavedCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const { data, error } = await getCampaigns();
      
      if (error) {
        throw error;
      }
      
      setCampaigns(data || []);
    } catch (error: any) {
      toast({
        title: "Failed to load campaigns",
        description: error.message || "An error occurred while loading your campaigns",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditCampaign = (campaign: Campaign) => {
    navigate('/card-design', { 
      state: { 
        initialDesign: {
          template: campaign.card_design.template,
          message: campaign.card_design.message,
          recipientName: campaign.card_design.recipientName,
          senderName: campaign.card_design.senderName,
          photo: campaign.card_design.uploadedImage ? {
            file: null,
            preview: campaign.card_design.uploadedImage
          } : null
        },
        campaignId: campaign.id,
        campaignName: campaign.name
      }
    });
  };

  const handleDeleteCampaign = async (campaignId: string) => {
    setDeleting(campaignId);
    
    try {
      const { error } = await deleteCampaign(campaignId);
      
      if (error) {
        throw error;
      }
      
      setCampaigns(prev => prev.filter(c => c.id !== campaignId));
      toast({
        title: "Campaign deleted",
        description: "The campaign has been deleted successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to delete campaign",
        description: error.message || "An error occurred while deleting the campaign",
        variant: "destructive",
      });
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Saved Campaigns</h1>
            <p className="text-white/80">Your saved thank you card campaigns</p>
          </div>
          
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Saved Campaigns</h1>
          <p className="text-white/80">Your saved thank you card campaigns</p>
        </div>

        {campaigns.length === 0 ? (
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">No saved campaigns</h3>
                  <p className="text-muted-foreground">
                    Create your first campaign to get started
                  </p>
                </div>
                <Button onClick={() => navigate('/card-design')} variant="hero">
                  Create Campaign
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="bg-white/95 backdrop-blur-sm hover:bg-white/100 transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {formatDate(campaign.created_at)}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Draft
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {campaign.card_design.uploadedImage && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Image className="w-4 h-4" />
                        Photo included
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MessageSquare className="w-4 h-4" />
                      Template: {campaign.card_design.template?.name || 'Custom'}
                    </div>
                    
                    {campaign.card_design.message && (
                      <div className="text-sm text-muted-foreground line-clamp-2">
                        "{campaign.card_design.message.substring(0, 100)}..."
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleEditCampaign(campaign)}
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          disabled={deleting === campaign.id}
                        >
                          {deleting === campaign.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Campaign</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{campaign.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteCampaign(campaign.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center">
          <Button onClick={() => navigate('/card-design')} variant="hero">
            Create New Campaign
          </Button>
        </div>
      </div>
    </div>
  );
}
export interface Campaign {
  id: string;
  name: string;
  card_design: {
    template: any;
    message: string;
    recipientName: string;
    senderName: string;
    uploadedImage?: string;
  };
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface CreateCampaignData {
  name: string;
  card_design: Campaign['card_design'];
}
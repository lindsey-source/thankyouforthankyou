import { supabase } from '@/integrations/supabase/client';
import { Campaign, CreateCampaignData } from '@/types/campaign';

export async function saveCampaign(campaignData: CreateCampaignData): Promise<{ data: Campaign | null, error: any }> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { data: null, error: { message: 'User not authenticated' } };
  }

  const { data, error } = await supabase
    .from('campaigns')
    .insert({
      name: campaignData.name,
      card_design: campaignData.card_design,
      user_id: user.id
    })
    .select()
    .single();

  return { data, error };
}

export async function getCampaigns(): Promise<{ data: Campaign[] | null, error: any }> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { data: null, error: { message: 'User not authenticated' } };
  }

  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return { data, error };
}

export async function updateCampaign(id: string, updates: Partial<CreateCampaignData>): Promise<{ data: Campaign | null, error: any }> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { data: null, error: { message: 'User not authenticated' } };
  }

  const { data, error } = await supabase
    .from('campaigns')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  return { data, error };
}

export async function deleteCampaign(id: string): Promise<{ error: any }> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: { message: 'User not authenticated' } };
  }

  const { error } = await supabase
    .from('campaigns')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  return { error };
}
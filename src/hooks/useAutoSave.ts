import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useAutoSave = (
  data: any,
  userId: string | undefined,
  cardId: string | null,
  onCardIdCreated?: (id: string) => void
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const lastSavedRef = useRef<string>('');

  useEffect(() => {
    if (!userId || !data) return;

    const dataString = JSON.stringify(data);
    
    // Don't save if data hasn't changed
    if (dataString === lastSavedRef.current) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for auto-save
    timeoutRef.current = setTimeout(async () => {
      try {
        if (cardId) {
          // Update existing card
          await supabase
            .from('user_cards')
            .update({
              ...data,
              user_id: userId
            })
            .eq('id', cardId);
        } else {
          // Create new card draft
          const { data: newCard, error } = await supabase
            .from('user_cards')
            .insert({
              ...data,
              user_id: userId
            })
            .select()
            .single();

          if (!error && newCard && onCardIdCreated) {
            onCardIdCreated(newCard.id);
          }
        }

        lastSavedRef.current = dataString;
      } catch (error) {
        console.error('Auto-save error:', error);
      }
    }, 10000); // 10 seconds

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, userId, cardId, onCardIdCreated]);
};

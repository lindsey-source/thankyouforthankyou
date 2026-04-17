-- Add category to charities so we can group them in the impact selector
ALTER TABLE public.charities
ADD COLUMN IF NOT EXISTS category TEXT;

CREATE INDEX IF NOT EXISTS idx_charities_category ON public.charities(category);
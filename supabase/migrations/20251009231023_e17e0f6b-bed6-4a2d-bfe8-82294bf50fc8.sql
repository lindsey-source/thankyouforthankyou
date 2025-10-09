-- Create profiles table for user data
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  profile_photo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create card_templates table
CREATE TABLE IF NOT EXISTS public.card_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  colors JSONB NOT NULL DEFAULT '{}',
  fonts JSONB NOT NULL DEFAULT '{}',
  layout_json JSONB NOT NULL DEFAULT '{}',
  preview_image TEXT,
  base_theme TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for templates (public read)
ALTER TABLE public.card_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view card templates"
  ON public.card_templates FOR SELECT
  USING (true);

-- Create charities table
CREATE TABLE IF NOT EXISTS public.charities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  description TEXT,
  impact_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for charities (public read)
ALTER TABLE public.charities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view charities"
  ON public.charities FOR SELECT
  USING (true);

-- Create user_cards table
CREATE TABLE IF NOT EXISTS public.user_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  template_id UUID REFERENCES public.card_templates(id),
  message_headline TEXT,
  message_body TEXT,
  closing TEXT,
  photo_url TEXT,
  color_palette JSONB DEFAULT '{}',
  font_choice TEXT,
  envelope_color TEXT,
  texture TEXT,
  signature_style TEXT,
  charity_id UUID REFERENCES public.charities(id),
  donation_amount DECIMAL(10,2) DEFAULT 0,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_cards ENABLE ROW LEVEL SECURITY;

-- User cards policies
CREATE POLICY "Users can view their own cards"
  ON public.user_cards FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own cards"
  ON public.user_cards FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cards"
  ON public.user_cards FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cards"
  ON public.user_cards FOR DELETE
  USING (auth.uid() = user_id);

-- Create transactions table
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_card_id UUID NOT NULL REFERENCES public.user_cards(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  charity_id UUID NOT NULL REFERENCES public.charities(id),
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Transactions policies
CREATE POLICY "Users can view their own transactions"
  ON public.transactions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_cards
      WHERE user_cards.id = transactions.user_card_id
      AND user_cards.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create transactions for their cards"
  ON public.transactions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_cards
      WHERE user_cards.id = transactions.user_card_id
      AND user_cards.user_id = auth.uid()
    )
  );

-- Create trigger for updated_at on user_cards
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_cards_updated_at
  BEFORE UPDATE ON public.user_cards
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'name',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert sample charities
INSERT INTO public.charities (name, description, impact_message, logo_url) VALUES
  ('Clean Water Initiative', 'Providing clean water access to communities in need', 'Your donation provides 10 people with clean water for a year', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400'),
  ('Education For All', 'Supporting education programs in underserved areas', 'Your donation funds school supplies for 5 children', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400'),
  ('Food Security Fund', 'Fighting hunger and food insecurity worldwide', 'Your donation provides 30 meals to families in need', 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=400'),
  ('Environmental Protection', 'Protecting natural habitats and wildlife', 'Your donation helps plant 20 trees', 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400');

-- Insert sample card templates
INSERT INTO public.card_templates (name, category, colors, fonts, layout_json, preview_image, base_theme) VALUES
  ('Classic Wedding', 'wedding', '{"primary": "#F5E6D3", "accent": "#D4A574"}', '{"heading": "Playfair Display", "body": "Lato"}', '{"layout": "split"}', '/src/assets/card-wedding-elegant.jpg', 'elegant'),
  ('Baby Joy', 'baby', '{"primary": "#FFF0F5", "accent": "#FFB6C1"}', '{"heading": "Quicksand", "body": "Open Sans"}', '{"layout": "full"}', '/src/assets/card-baby-arrival.jpg', 'playful'),
  ('Graduation Pride', 'graduation', '{"primary": "#FFF9E6", "accent": "#FFD700"}', '{"heading": "Montserrat", "body": "Roboto"}', '{"layout": "split"}', '/src/assets/card-graduation-rays.jpg', 'bold'),
  ('Birthday Celebration', 'birthday', '{"primary": "#FFF8F0", "accent": "#FF6B6B"}', '{"heading": "Pacifico", "body": "Nunito"}', '{"layout": "full"}', '/src/assets/card-birthday-modern.jpg', 'festive'),
  ('Heartfelt Thanks', 'general', '{"primary": "#FFF8F0", "accent": "#F4A460"}', '{"heading": "Merriweather", "body": "Open Sans"}', '{"layout": "split"}', '/src/assets/card-general-heart.jpg', 'warm'),
  ('In Memory', 'memorial', '{"primary": "#F8FBF8", "accent": "#9DB5A5"}', '{"heading": "EB Garamond", "body": "Crimson Text"}', '{"layout": "full"}', '/src/assets/card-memorial-nature.jpg', 'serene'),
  ('Giving Back', 'charity', '{"primary": "#FFF0F5", "accent": "#FF9B7A"}', '{"heading": "Raleway", "body": "Lato"}', '{"layout": "split"}', '/src/assets/card-charity-hands.jpg', 'hopeful');
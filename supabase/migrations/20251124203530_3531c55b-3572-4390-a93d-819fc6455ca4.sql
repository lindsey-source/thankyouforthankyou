-- Add "The Foundation" Collection
INSERT INTO card_templates (name, category, preview_image, colors, fonts, base_theme, layout_json)
VALUES 
(
  'The First Stone',
  'wedding',
  'card-wedding-first-stone.jpg',
  '{"primary": "#F5E6D3", "secondary": "#3D3D3D", "accent": "#C97D60", "text": "#3D3D3D", "background": "#F5E6D3"}'::jsonb,
  '{"heading": "Montserrat", "body": "Montserrat", "script": "Dancing Script"}'::jsonb,
  'minimalist-architectural',
  '{"frontText": "Building our future, together.", "bodyText": "Your generosity has laid a stone in the foundation of our new life. Thank you for helping us build our home and our future.", "animation": "line-draw"}'::jsonb
),
(
  'The Olive Branch',
  'wedding',
  'card-wedding-olive-branch.jpg',
  '{"primary": "#F5F5EA", "secondary": "#4A6B5C", "accent": "#D4AF37", "text": "#2C3E3A", "background": "#F5F5EA"}'::jsonb,
  '{"heading": "Playfair Display", "body": "Baskerville", "script": "Playfair Display"}'::jsonb,
  'classic-watercolor',
  '{"frontText": "With deep gratitude.", "bodyText": "Your gift was a beautiful gesture of support. We are so grateful to have you in our circle as we plant our roots.", "animation": "sway-shimmer"}'::jsonb
),
-- Add "The Ripple Effect" Collection
(
  'Gold Dust',
  'wedding',
  'card-wedding-gold-dust.jpg',
  '{"primary": "#1A3A52", "secondary": "#0F2537", "accent": "#D4AF37", "text": "#FFFFFF", "background": "#1A3A52"}'::jsonb,
  '{"heading": "Montserrat", "body": "Montserrat", "script": "Montserrat"}'::jsonb,
  'moody-luxe',
  '{"frontText": "Your kindness radiates.", "bodyText": "Thank you for adding your light to our wedding. Your generosity shines brightly in our home and in our hearts.", "animation": "sparkle-twinkle"}'::jsonb
),
(
  'Watercolor Bloom',
  'wedding',
  'card-wedding-watercolor-bloom.jpg',
  '{"primary": "#F4E4E4", "secondary": "#D4A5A5", "accent": "#9B7A9E", "text": "#2D2D2D", "background": "#F8F8F8"}'::jsonb,
  '{"heading": "Allura", "body": "Montserrat", "script": "Allura"}'::jsonb,
  'organic-bloom',
  '{"frontText": "You have helped us bloom.", "bodyText": "Thank you for watering the seeds of our new life together. Your thoughtful gift is something we will cherish as we grow.", "animation": "watercolor-bleed"}'::jsonb
),
-- Add "The Open Hand" Collection
(
  'Connected Lines',
  'wedding',
  'card-wedding-connected-lines.jpg',
  '{"primary": "#E8E3D6", "secondary": "#000000", "accent": "#8B7F6C", "text": "#000000", "background": "#E8E3D6"}'::jsonb,
  '{"heading": "Cormorant Garamond", "body": "Libre Baskerville", "script": "Cormorant Garamond"}'::jsonb,
  'editorial-line-art',
  '{"frontText": "Received with love.", "bodyText": "To give is to love, and to receive is to be loved. Thank you for loving us so well during this special chapter of our lives.", "animation": "continuous-line-draw"}'::jsonb
);
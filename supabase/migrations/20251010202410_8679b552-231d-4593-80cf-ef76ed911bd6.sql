-- Update wedding template preview images to use public folder paths
UPDATE card_templates 
SET preview_image = REPLACE(preview_image, '/src/assets/', '/')
WHERE category = 'wedding' AND preview_image LIKE '/src/assets/%';

-- Ensure all wedding templates have correct public paths
UPDATE card_templates 
SET preview_image = '/card-wedding-elegant.jpg'
WHERE name = 'Classic Wedding' AND category = 'wedding';

UPDATE card_templates 
SET preview_image = '/card-blush-botanical.jpg'
WHERE name = 'Blush Botanical' AND category = 'wedding';

UPDATE card_templates 
SET preview_image = '/card-eucalyptus-gold.jpg'
WHERE name = 'Eucalyptus Gold' AND category = 'wedding';

UPDATE card_templates 
SET preview_image = '/card-floral-pink.jpg'
WHERE name = 'Floral Pink' AND category = 'wedding';
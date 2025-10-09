-- Create storage bucket for card photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('card-photos', 'card-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload their own photos
CREATE POLICY "Users can upload their own photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'card-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to view their own photos
CREATE POLICY "Users can view their own photos"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'card-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow public access to photos (since they're shared in cards)
CREATE POLICY "Public can view photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'card-photos');
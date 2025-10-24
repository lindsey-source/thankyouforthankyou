-- Create RLS policies for card-photos bucket
CREATE POLICY "Authenticated users can upload to card-photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'card-photos');

CREATE POLICY "Anyone can view card-photos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'card-photos');

CREATE POLICY "Users can update their own card-photos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'card-photos')
WITH CHECK (bucket_id = 'card-photos');

CREATE POLICY "Users can delete their own card-photos"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'card-photos');
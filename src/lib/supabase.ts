import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://ctotkblctbsvophwmevd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0b3RrYmxjdGJzdm9waHdtZXZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MjAyNDksImV4cCI6MjA2OTM5NjI0OX0.B40BSo62vOQ1BJeJ40Vo2tF9J6uMVcsQv9iGqgTP_E0'
)
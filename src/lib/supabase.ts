import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://takgjzfjfistchktvrns.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRha2dqemZqZmlzdGNoa3R2cm5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4MTEwMTMsImV4cCI6MjA1MzM4NzAxM30.AXo-6hf5I3-eZ0YIp6s5-Ckv3IFxwCULzPFhGqQs-zI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
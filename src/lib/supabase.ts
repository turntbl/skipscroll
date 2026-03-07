import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for trend data
export interface Trend {
  id: string;
  name: string;
  hashtag: string;
  platform: 'tiktok' | 'twitter' | 'instagram' | 'youtube' | 'reddit' | 'google';
  volume: number;
  change_percent: number;
  description?: string;
  why_trending?: string;
  category?: string;
  created_at: string;
  updated_at: string;
}

export interface TrendSnapshot {
  id: string;
  trend_id: string;
  rank: number;
  volume: number;
  captured_at: string;
}

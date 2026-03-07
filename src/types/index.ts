export type Platform = 'tiktok' | 'twitter' | 'instagram' | 'youtube' | 'reddit' | 'google';

export interface Trend {
  id: string;
  hashtag: string;
  name?: string;
  platform: Platform;
  volume: number;
  change_percent: number;
  category?: string;
  description?: string;
  why_trending?: string;
  related_hashtags?: string[];
  peak_time?: string;
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

export interface PlatformStats {
  platform: Platform;
  total_trends: number;
  avg_volume: number;
  top_category: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

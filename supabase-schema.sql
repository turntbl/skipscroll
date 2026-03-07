-- TrendPulse Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name, slug, icon) VALUES
  ('Sports', 'sports', '⚽'),
  ('Entertainment', 'entertainment', '🎬'),
  ('Technology', 'technology', '💻'),
  ('Music', 'music', '🎵'),
  ('Politics', 'politics', '🏛️'),
  ('Business', 'business', '💼'),
  ('Health', 'health', '🏥'),
  ('Science', 'science', '🔬'),
  ('Gaming', 'gaming', '🎮'),
  ('Fashion', 'fashion', '👗'),
  ('Food', 'food', '🍕'),
  ('Travel', 'travel', '✈️'),
  ('Finance', 'finance', '💰'),
  ('Environment', 'environment', '🌍'),
  ('Other', 'other', '📌');

-- Trends table
CREATE TABLE trends (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hashtag TEXT NOT NULL,
  name TEXT,
  platform TEXT NOT NULL CHECK (platform IN ('tiktok', 'twitter', 'instagram', 'youtube', 'reddit', 'google')),
  volume BIGINT DEFAULT 0,
  change_percent DECIMAL(10, 2) DEFAULT 0,
  category_id UUID REFERENCES categories(id),
  description TEXT,
  why_trending TEXT,
  related_hashtags TEXT[],
  peak_time TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Unique constraint for hashtag + platform combo
  UNIQUE(hashtag, platform)
);

-- Index for faster queries
CREATE INDEX idx_trends_platform ON trends(platform);
CREATE INDEX idx_trends_category ON trends(category_id);
CREATE INDEX idx_trends_updated ON trends(updated_at DESC);
CREATE INDEX idx_trends_volume ON trends(volume DESC);
CREATE INDEX idx_trends_active ON trends(is_active) WHERE is_active = true;

-- Trend snapshots for historical tracking
CREATE TABLE trend_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trend_id UUID REFERENCES trends(id) ON DELETE CASCADE,
  rank INTEGER,
  volume BIGINT,
  captured_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_snapshots_trend ON trend_snapshots(trend_id);
CREATE INDEX idx_snapshots_time ON trend_snapshots(captured_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_trends_updated_at
  BEFORE UPDATE ON trends
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE trend_snapshots ENABLE ROW LEVEL SECURITY;

-- Public read access policies (anyone can read trends)
CREATE POLICY "Public read access for categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access for trends"
  ON trends FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public read access for snapshots"
  ON trend_snapshots FOR SELECT
  TO anon, authenticated
  USING (true);

-- Service role can insert/update (for scraper jobs)
CREATE POLICY "Service role can manage trends"
  ON trends FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can manage snapshots"
  ON trend_snapshots FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- View for trending now (active trends from last 24 hours, ranked by volume)
CREATE VIEW trending_now AS
SELECT
  t.*,
  c.name as category_name,
  c.icon as category_icon,
  ROW_NUMBER() OVER (PARTITION BY t.platform ORDER BY t.volume DESC) as platform_rank,
  ROW_NUMBER() OVER (ORDER BY t.volume DESC) as global_rank
FROM trends t
LEFT JOIN categories c ON t.category_id = c.id
WHERE t.is_active = true
  AND t.updated_at > NOW() - INTERVAL '24 hours'
ORDER BY t.volume DESC;

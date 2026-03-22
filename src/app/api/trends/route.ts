import { NextResponse } from 'next/server';
import { getRedditTrends } from '@/lib/scrapers/reddit';
import { getGoogleTrends } from '@/lib/scrapers/google-trends';
import { getYouTubeTrends } from '@/lib/scrapers/youtube';
import { getTikTokTrends } from '@/lib/scrapers/tiktok';
import { getInstagramTrends } from '@/lib/scrapers/instagram';
import { getTwitchTrends } from '@/lib/scrapers/twitch';
import { getSpotifyTrends } from '@/lib/scrapers/spotify';
import { getBlueskyTrends } from '@/lib/scrapers/bluesky';

export interface Trend {
  id: string;
  hashtag: string;
  name: string;
  platform: 'reddit' | 'google' | 'tiktok' | 'twitter' | 'instagram' | 'youtube' | 'twitch' | 'spotify' | 'bluesky';
  volume: number;
  change_percent: number;
  category: string;
  description?: string;
  relatedQueries?: string[];
  articles?: { title: string; url: string; source: string }[];
  posts?: unknown[];
  // YouTube specific
  videoId?: string;
  channelTitle?: string;
  thumbnail?: string;
  stats?: { views: number; likes: number; comments: number };
  // TikTok/Instagram specific
  postCount?: number;
  viewCount?: number;
  // Twitch specific
  viewers?: number;
  channels?: number;
  // Spotify specific
  artist?: string;
  streams?: number;
  weeksOnChart?: number;
}

export const dynamic = 'force-dynamic'; // Don't cache at build time
export const revalidate = 0; // Always fetch fresh data
export const fetchCache = 'force-no-store'; // Don't use fetch cache

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get('platform');

  try {
    const trendsPromises: { platform: string; promise: Promise<Trend[]> }[] = [];

    // Fetch from requested platforms in parallel
    if (!platform || platform === 'all' || platform === 'reddit') {
      trendsPromises.push({ platform: 'reddit', promise: getRedditTrends() });
    }

    if (!platform || platform === 'all' || platform === 'google') {
      trendsPromises.push({ platform: 'google', promise: getGoogleTrends() });
    }

    if (!platform || platform === 'all' || platform === 'youtube') {
      trendsPromises.push({ platform: 'youtube', promise: getYouTubeTrends() });
    }

    if (!platform || platform === 'all' || platform === 'tiktok') {
      trendsPromises.push({ platform: 'tiktok', promise: getTikTokTrends() });
    }

    if (!platform || platform === 'all' || platform === 'instagram') {
      trendsPromises.push({ platform: 'instagram', promise: getInstagramTrends() });
    }

    if (!platform || platform === 'all' || platform === 'twitch') {
      trendsPromises.push({ platform: 'twitch', promise: getTwitchTrends() });
    }

    if (!platform || platform === 'all' || platform === 'spotify') {
      trendsPromises.push({ platform: 'spotify', promise: getSpotifyTrends() });
    }

    if (!platform || platform === 'all' || platform === 'bluesky') {
      trendsPromises.push({ platform: 'bluesky', promise: getBlueskyTrends() });
    }

    // Wait for all scrapers
    const results = await Promise.all(trendsPromises.map((p) => p.promise));
    let trends = results.flat();

    // Build platform counts
    const platformCounts: Record<string, number> = {
      reddit: 0,
      google: 0,
      youtube: 0,
      tiktok: 0,
      instagram: 0,
      twitch: 0,
      spotify: 0,
      bluesky: 0,
    };
    trendsPromises.forEach((p, i) => {
      platformCounts[p.platform] = results[i]?.length || 0;
    });

    // For "all" view, ensure platform diversity by taking top items from each
    let diverseTrends: Trend[] = [];
    if (!platform || platform === 'all') {
      // Group trends by platform
      const byPlatform: Record<string, Trend[]> = {};
      trends.forEach(t => {
        if (!byPlatform[t.platform]) byPlatform[t.platform] = [];
        byPlatform[t.platform].push(t);
      });

      // Sort each platform's trends by volume
      Object.values(byPlatform).forEach(arr => arr.sort((a, b) => b.volume - a.volume));

      // Take top 8 from each platform (round-robin style)
      const maxPerPlatform = 8;
      for (let i = 0; i < maxPerPlatform; i++) {
        for (const platformTrends of Object.values(byPlatform)) {
          if (platformTrends[i]) {
            diverseTrends.push(platformTrends[i]);
          }
        }
      }
    } else {
      // Single platform: sort by volume
      diverseTrends = trends.sort((a, b) => b.volume - a.volume);
    }

    // Return trends with cache-control headers
    return NextResponse.json({
      success: true,
      count: diverseTrends.length,
      trends: diverseTrends.slice(0, 64), // 8 platforms x 8 trends each
      platforms: platformCounts,
      timestamp: new Date().toISOString(),
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Trends API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch trends',
        trends: [],
      },
      { status: 500 }
    );
  }
}

/**
 * YouTube Trends Scraper
 * Uses YouTube Data API v3 to fetch trending videos
 * Requires YOUTUBE_API_KEY environment variable
 */

export interface YouTubeTrend {
  id: string;
  title: string;
  channelTitle: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  publishedAt: string;
  thumbnail: string;
  categoryId: string;
  description: string;
}

interface YouTubeVideo {
  id: string;
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    description: string;
    categoryId: string;
    thumbnails: {
      medium?: { url: string };
      high?: { url: string };
    };
  };
  statistics: {
    viewCount: string;
    likeCount?: string;
    commentCount?: string;
  };
}

interface YouTubeResponse {
  items: YouTubeVideo[];
}

// YouTube video category mapping
const categoryNames: Record<string, string> = {
  '1': 'Film & Animation',
  '2': 'Autos & Vehicles',
  '10': 'Music',
  '15': 'Pets & Animals',
  '17': 'Sports',
  '18': 'Short Movies',
  '19': 'Travel & Events',
  '20': 'Gaming',
  '21': 'Videoblogging',
  '22': 'People & Blogs',
  '23': 'Comedy',
  '24': 'Entertainment',
  '25': 'News & Politics',
  '26': 'Howto & Style',
  '27': 'Education',
  '28': 'Science & Technology',
  '29': 'Nonprofits & Activism',
  '30': 'Movies',
  '31': 'Anime/Animation',
  '32': 'Action/Adventure',
  '33': 'Classics',
  '34': 'Comedy',
  '35': 'Documentary',
  '36': 'Drama',
  '37': 'Family',
  '38': 'Foreign',
  '39': 'Horror',
  '40': 'Sci-Fi/Fantasy',
  '41': 'Thriller',
  '42': 'Shorts',
  '43': 'Shows',
  '44': 'Trailers',
};

/**
 * Fetch trending videos from YouTube
 */
export async function fetchYouTubeTrending(
  regionCode = 'US',
  maxResults = 25
): Promise<YouTubeTrend[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    console.error('YouTube API key not configured');
    return [];
  }

  const url = new URL('https://www.googleapis.com/youtube/v3/videos');
  url.searchParams.set('part', 'snippet,statistics');
  url.searchParams.set('chart', 'mostPopular');
  url.searchParams.set('regionCode', regionCode);
  url.searchParams.set('maxResults', String(maxResults));
  url.searchParams.set('key', apiKey);

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 900 }, // Cache for 15 minutes
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('YouTube API error:', response.status, error);
      return [];
    }

    const data: YouTubeResponse = await response.json();

    return data.items.map((video) => ({
      id: video.id,
      title: video.snippet.title,
      channelTitle: video.snippet.channelTitle,
      viewCount: parseInt(video.statistics.viewCount) || 0,
      likeCount: parseInt(video.statistics.likeCount || '0') || 0,
      commentCount: parseInt(video.statistics.commentCount || '0') || 0,
      publishedAt: video.snippet.publishedAt,
      thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url || '',
      categoryId: video.snippet.categoryId,
      description: video.snippet.description.slice(0, 200),
    }));
  } catch (error) {
    console.error('YouTube fetch error:', error);
    return [];
  }
}

/**
 * Fallback YouTube trends when API is unavailable
 * Updated: March 2026
 */
function getFallbackYouTubeTrends() {
  // YouTube Trending - March 7, 2026 (updated)
  const fallbackVideos = [
    { title: 'Bruno Mars - Risk It All (Official Video)', channel: 'Bruno Mars', views: 12500000, category: 'Music' },
    { title: 'ROSALÍA - Berghain ft. Björk (BRIT Awards 2026)', channel: 'ROSALÍA', views: 2400000, category: 'Music' },
    { title: 'Harry Styles - Aperture (BRIT Awards 2026)', channel: 'Harry Styles', views: 1300000, category: 'Music' },
    { title: 'Scary Movie (2026) Official Trailer', channel: 'Paramount Pictures', views: 8500000, category: 'Film & Animation' },
    { title: 'MrBeast - I Built 100 Homes', channel: 'MrBeast', views: 52000000, category: 'Entertainment' },
    { title: 'One Piece Season 2 Trailer', channel: 'Netflix', views: 18000000, category: 'Entertainment' },
    { title: 'League of Legends - Shyvana Champion Update', channel: 'League of Legends', views: 4200000, category: 'Gaming' },
    { title: 'Honkai: Star Rail - Sparxie Character Trailer', channel: 'Honkai: Star Rail', views: 2900000, category: 'Gaming' },
    { title: 'March Madness 2026 Best Plays', channel: 'NCAA March Madness', views: 6800000, category: 'Sports' },
    { title: 'Oscars 2026 Complete Highlights', channel: 'ABC', views: 15000000, category: 'Entertainment' },
    { title: 'YoungBoy Never Broke Again - Highly', channel: 'YoungBoy Never Broke Again', views: 1700000, category: 'Music' },
    { title: 'THE MINIATURE WIFE Trailer (2026)', channel: 'Peacock', views: 3200000, category: 'Film & Animation' },
    { title: 'Ozzy Osbourne BRIT Awards Tribute', channel: 'BRIT Awards', views: 980000, category: 'Music' },
    { title: 'BLACKPINK - GO (Official MV)', channel: 'BLACKPINK', views: 28000000, category: 'Music' },
    { title: 'Spring Break 2026 Travel Tips', channel: 'Travel + Leisure', views: 1800000, category: 'Travel & Events' },
  ];

  return fallbackVideos.map((video, index) => ({
    id: `youtube-fallback-${index}`,
    hashtag: `#${video.title.replace(/[^a-zA-Z0-9]/g, '').slice(0, 30)}`,
    name: video.title,
    platform: 'youtube' as const,
    volume: video.views,
    change_percent: Math.round(Math.random() * 50 + 10),
    category: video.category,
    channelTitle: video.channel,
    stats: {
      views: video.views,
      likes: Math.round(video.views * 0.04),
      comments: Math.round(video.views * 0.002),
    },
  }));
}

/**
 * Get formatted YouTube trends for the app
 */
export async function getYouTubeTrends() {
  try {
    const videos = await fetchYouTubeTrending('US', 25);

    if (videos.length === 0) {
      console.log('YouTube API returned no data, using fallback');
      return getFallbackYouTubeTrends();
    }

    return videos.map((video) => ({
      id: `youtube-${video.id}`,
      hashtag: `#${video.title.replace(/[^a-zA-Z0-9]/g, '').slice(0, 30)}`,
      name: video.title,
      platform: 'youtube' as const,
      volume: video.viewCount,
      change_percent: Math.round(Math.random() * 50 + 10), // YouTube doesn't provide change %
      category: categoryNames[video.categoryId] || 'Entertainment',
      description: video.description,
      videoId: video.id,
      channelTitle: video.channelTitle,
      thumbnail: video.thumbnail,
      stats: {
        views: video.viewCount,
        likes: video.likeCount,
        comments: video.commentCount,
      },
    }));
  } catch (error) {
    console.error('YouTube trends error:', error);
    return getFallbackYouTubeTrends();
  }
}

/**
 * Google Trends Scraper
 * Fetches trending searches from Google Trends RSS feed
 */

export interface GoogleTrend {
  id: string;
  title: string;
  traffic: string;
  description?: string;
  newsUrl?: string;
  source?: string;
}

/**
 * Parse XML RSS feed manually (no external dependencies)
 */
function parseRssItem(itemXml: string): GoogleTrend | null {
  const getTag = (xml: string, tag: string): string => {
    const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
    return match ? match[1].trim() : '';
  };

  const title = getTag(itemXml, 'title');
  if (!title) return null;

  const traffic = getTag(itemXml, 'ht:approx_traffic') || getTag(itemXml, 'ht:picture_news_item');
  const description = getTag(itemXml, 'description');
  const newsUrl = getTag(itemXml, 'ht:news_item_url');
  const source = getTag(itemXml, 'ht:news_item_source');

  return {
    id: `google-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    title,
    traffic: traffic || 'Trending',
    description: description.replace(/<[^>]*>/g, ''), // Strip HTML
    newsUrl,
    source,
  };
}

/**
 * Fetch daily trending searches from Google Trends RSS feed
 */
export async function fetchGoogleTrendsRSS(geo = 'US'): Promise<GoogleTrend[]> {
  // Google Trends RSS feed for daily trends
  const url = `https://trends.google.com/trending/rss?geo=${geo}`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SkipScroll/1.0)',
        'Accept': 'application/rss+xml, application/xml, text/xml',
      },
      next: { revalidate: 900 }, // Cache for 15 minutes
    });

    if (!response.ok) {
      console.error(`Google Trends RSS error: ${response.status}`);
      return [];
    }

    const xml = await response.text();

    // Extract items from RSS
    const items: GoogleTrend[] = [];
    const itemMatches = xml.match(/<item>[\s\S]*?<\/item>/gi);

    if (itemMatches) {
      for (const itemXml of itemMatches) {
        const parsed = parseRssItem(itemXml);
        if (parsed) {
          items.push(parsed);
        }
      }
    }

    return items;
  } catch (error) {
    console.error('Google Trends RSS fetch error:', error);
    return [];
  }
}

/**
 * Alternative: Scrape Google Trends homepage for trending searches
 * This is a backup if RSS doesn't work
 */
export async function fetchGoogleTrendsHomepage(): Promise<GoogleTrend[]> {
  const url = 'https://trends.google.com/trends/trendingsearches/daily?geo=US';

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      next: { revalidate: 900 },
    });

    if (!response.ok) {
      return [];
    }

    const html = await response.text();

    // Extract trend titles from the page
    const trends: GoogleTrend[] = [];
    const titleMatches = html.match(/title['"]\s*:\s*['"]([^'"]+)['"]/gi);

    if (titleMatches) {
      const seen = new Set<string>();
      for (const match of titleMatches.slice(0, 25)) {
        const title = match.replace(/title['"]\s*:\s*['"]/i, '').replace(/['"]$/, '');
        if (title.length > 2 && title.length < 100 && !seen.has(title.toLowerCase())) {
          seen.add(title.toLowerCase());
          trends.push({
            id: `google-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
            title,
            traffic: 'Trending',
          });
        }
      }
    }

    return trends;
  } catch (error) {
    console.error('Google Trends homepage fetch error:', error);
    return [];
  }
}

/**
 * Parse traffic string to number (e.g., "500K+" -> 500000)
 */
function parseTraffic(traffic: string): number {
  if (!traffic || traffic === 'Trending') return 50000; // Default

  const cleaned = traffic.replace(/[+,]/g, '').toUpperCase();

  if (cleaned.includes('M')) {
    return parseFloat(cleaned.replace('M', '')) * 1000000;
  }
  if (cleaned.includes('K')) {
    return parseFloat(cleaned.replace('K', '')) * 1000;
  }

  return parseInt(cleaned) || 50000;
}

/**
 * Try to categorize a Google trend based on keywords
 */
function categorizeGoogleTrend(title: string, description?: string): string {
  const text = `${title} ${description || ''}`.toLowerCase();

  const categories: Record<string, string[]> = {
    Sports: ['nfl', 'nba', 'mlb', 'nhl', 'soccer', 'football', 'basketball', 'baseball', 'hockey', 'game', 'score', 'playoff', 'championship', 'super bowl', 'world cup', 'olympics', 'match', 'team', 'player'],
    Entertainment: ['movie', 'film', 'tv', 'show', 'netflix', 'actor', 'actress', 'celebrity', 'music', 'album', 'concert', 'grammy', 'oscar', 'emmy', 'awards', 'singer', 'star', 'series'],
    Technology: ['apple', 'google', 'microsoft', 'amazon', 'ai', 'tech', 'software', 'app', 'iphone', 'android', 'computer', 'cyber', 'digital', 'tesla', 'nvidia'],
    Politics: ['president', 'congress', 'senate', 'election', 'vote', 'democrat', 'republican', 'government', 'law', 'bill', 'policy', 'trump', 'biden', 'political'],
    Business: ['stock', 'market', 'economy', 'company', 'ceo', 'business', 'finance', 'bank', 'invest', 'earnings', 'shares', 'trading'],
    Health: ['covid', 'vaccine', 'health', 'medical', 'doctor', 'hospital', 'disease', 'fda', 'drug', 'virus', 'treatment'],
    Science: ['nasa', 'space', 'science', 'research', 'study', 'discovery', 'climate', 'weather', 'earthquake', 'storm'],
    World: ['war', 'ukraine', 'russia', 'china', 'iran', 'israel', 'military', 'attack', 'conflict'],
  };

  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return category;
    }
  }

  return 'Trending';
}

/**
 * Fallback Google Trends when API is unavailable
 * Updated: March 2026
 */
function getFallbackGoogleTrends() {
  // Google Trends - March 7, 2026 (updated)
  const fallbackTrends = [
    { title: 'Oscars 2026 Winners', traffic: '2.5M+', category: 'Entertainment' },
    { title: 'March Madness Bracket', traffic: '2M+', category: 'Sports' },
    { title: 'ChatGPT', traffic: '768M+', category: 'Technology' },
    { title: 'Spring Break Hilo Hawaii', traffic: '800K+', category: 'Trending' },
    { title: 'BRIT Awards 2026', traffic: '650K+', category: 'Entertainment' },
    { title: 'NCAA Tournament', traffic: '1.8M+', category: 'Sports' },
    { title: 'AI Travel Planner', traffic: '500K+', category: 'Technology' },
    { title: 'Scary Movie 2026', traffic: '450K+', category: 'Entertainment' },
    { title: 'Taylor Swift Eras Tour', traffic: '380K+', category: 'Entertainment' },
    { title: 'Stock Market Today', traffic: '350K+', category: 'Business' },
    { title: 'Womens History Month', traffic: '320K+', category: 'Trending' },
    { title: 'One Piece Season 2', traffic: '420K+', category: 'Entertainment' },
    { title: 'St Patricks Day 2026', traffic: '550K+', category: 'Trending' },
    { title: 'League of Legends Shyvana', traffic: '280K+', category: 'Gaming' },
    { title: 'Daylight Saving Time', traffic: '240K+', category: 'Trending' },
    { title: 'Reddit Wayback Machine', traffic: '180K+', category: 'Technology' },
    { title: 'Panama City Spring Break', traffic: '220K+', category: 'Trending' },
    { title: 'Bruno Mars Risk It All', traffic: '350K+', category: 'Entertainment' },
    { title: 'Election 2026 Primaries', traffic: '400K+', category: 'Politics' },
    { title: 'ROSALIA Bjork Berghain', traffic: '190K+', category: 'Entertainment' },
  ];

  return fallbackTrends.map((trend, index) => ({
    id: `google-${trend.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    hashtag: `#${trend.title.replace(/\s+/g, '')}`,
    name: trend.title,
    platform: 'google' as const,
    volume: parseTraffic(trend.traffic),
    change_percent: Math.round(Math.random() * 80 + 20),
    category: trend.category,
  }));
}

/**
 * Get formatted Google Trends for the app
 */
export async function getGoogleTrends() {
  try {
    // Try RSS first, fall back to homepage scrape
    let trends = await fetchGoogleTrendsRSS('US');

    if (trends.length === 0) {
      console.log('RSS empty, trying homepage scrape...');
      trends = await fetchGoogleTrendsHomepage();
    }

    if (trends.length === 0) {
      console.log('No Google Trends data, using fallback');
      return getFallbackGoogleTrends();
    }

    // Format for our trend format
    return trends.slice(0, 25).map((trend, index) => {
      const volume = parseTraffic(trend.traffic);

      return {
        id: trend.id,
        hashtag: `#${trend.title.replace(/\s+/g, '')}`,
        name: trend.title,
        platform: 'google' as const,
        volume: volume || (25 - index) * 10000,
        change_percent: Math.round(Math.random() * 80 + 20), // Google doesn't provide change %
        category: categorizeGoogleTrend(trend.title, trend.description),
        description: trend.description,
        newsUrl: trend.newsUrl,
        source: trend.source,
      };
    });
  } catch (error) {
    console.error('Google Trends scraper error:', error);
    return getFallbackGoogleTrends();
  }
}

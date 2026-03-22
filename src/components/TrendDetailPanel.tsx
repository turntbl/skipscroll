'use client';

import {
  TrendingUpIcon,
  ExternalLinkIcon,
  ChevronRightIcon,
  getPlatformIcon,
} from './icons';

interface RedditPost {
  id: string;
  title: string;
  subreddit: string;
  score: number;
  numComments: number;
  url: string;
  permalink: string;
  createdUtc: number;
}

interface Article {
  title: string;
  url: string;
  source: string;
}

interface Trend {
  id: string;
  hashtag: string;
  name: string;
  platform: string;
  volume: number;
  change_percent: number;
  category: string;
  description?: string;
  posts?: RedditPost[];
  articles?: Article[];
  relatedQueries?: string[];
  // YouTube specific
  videoId?: string;
  channelTitle?: string;
  thumbnail?: string;
  stats?: { views: number; likes: number; comments: number };
  // TikTok/Instagram specific
  postCount?: number;
  viewCount?: number;
  // Spotify specific
  artist?: string;
  streams?: number;
  weeksOnChart?: number;
  previewUrl?: string;
  albumArt?: string;
  spotifyUrl?: string;
  // Twitch specific
  viewers?: number;
  channels?: number;
}

interface TrendDetailPanelProps {
  trend: Trend | null;
  onClose: () => void;
}

const platformLinks: Record<string, (query: string) => string> = {
  reddit: (q) => `https://www.reddit.com/search/?q=${encodeURIComponent(q)}`,
  google: (q) => `https://trends.google.com/trends/explore?q=${encodeURIComponent(q)}`,
  twitter: (q) => `https://twitter.com/search?q=${encodeURIComponent(q)}`,
  tiktok: (q) => `https://www.tiktok.com/search?q=${encodeURIComponent(q)}`,
  youtube: (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
  instagram: (q) => `https://www.instagram.com/explore/tags/${encodeURIComponent(q.replace('#', ''))}/`,
  twitch: (q) => `https://www.twitch.tv/directory/game/${encodeURIComponent(q)}`,
  spotify: (q) => `https://open.spotify.com/search/${encodeURIComponent(q)}`,
  bluesky: (q) => `https://bsky.app/search?q=${encodeURIComponent(q)}`,
};

const platformColors: Record<string, string> = {
  reddit: '#ff4500',
  google: '#4285f4',
  twitter: '#000000',
  tiktok: '#00f2ea',
  youtube: '#ff0000',
  instagram: '#e4405f',
  twitch: '#9146ff',
  spotify: '#1db954',
  bluesky: '#0085ff',
};

const formatVolume = (vol: number) => {
  if (vol >= 1000000) return `${(vol / 1000000).toFixed(1)}M`;
  if (vol >= 1000) return `${(vol / 1000).toFixed(0)}K`;
  return vol.toString();
};

const getTimeAgo = (timestamp: number) => {
  const now = Date.now() / 1000;
  const diff = now - timestamp;

  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

export function TrendDetailPanel({ trend, onClose }: TrendDetailPanelProps) {
  if (!trend) return null;

  const platformColor = platformColors[trend.platform] || '#6366f1';
  const platformLink = platformLinks[trend.platform]?.(trend.name) || '#';

  const hasPosts = trend.posts && trend.posts.length > 0;
  const hasArticles = trend.articles && trend.articles.length > 0;
  const hasRelated = trend.relatedQueries && trend.relatedQueries.length > 0;
  const isYouTube = trend.platform === 'youtube' && trend.videoId;
  const isTikTok = trend.platform === 'tiktok';
  const isTwitch = trend.platform === 'twitch';
  const isSpotify = trend.platform === 'spotify';
  const isBluesky = trend.platform === 'bluesky';

  const copyHashtag = () => {
    navigator.clipboard.writeText(trend.hashtag);
  };

  // Generate "why trending" based on available data
  const getWhyTrending = () => {
    if (trend.platform === 'reddit' && hasPosts) {
      const topPost = trend.posts![0];
      return `Trending on r/${topPost.subreddit} with ${formatVolume(topPost.score)} upvotes. Multiple discussions happening across Reddit.`;
    }
    if (trend.platform === 'google' && trend.description) {
      return trend.description;
    }
    if (trend.platform === 'google' && hasArticles) {
      return `Featured in ${trend.articles!.length} news articles from sources like ${trend.articles![0].source}.`;
    }
    if (trend.platform === 'youtube' && trend.channelTitle) {
      return `Trending video from ${trend.channelTitle} with ${formatVolume(trend.stats?.views || trend.volume)} views.`;
    }
    if (trend.platform === 'tiktok') {
      const views = trend.viewCount || trend.volume;
      return `Popular TikTok hashtag with ${formatVolume(views)} views. Join the trend and create your own content!`;
    }
    if (trend.platform === 'twitch') {
      return `Currently one of the most watched categories on Twitch with ${formatVolume(trend.viewers || trend.volume)} concurrent viewers across ${formatVolume(trend.channels || 0)} channels.`;
    }
    if (trend.platform === 'spotify') {
      const weeks = trend.weeksOnChart || 0;
      return `Charting song${trend.artist ? ` by ${trend.artist}` : ''} with ${formatVolume(trend.streams || trend.volume)} streams${weeks > 0 ? `. ${weeks} weeks on chart.` : '.'}`;
    }
    if (trend.platform === 'bluesky') {
      return `Trending hashtag on Bluesky with ${formatVolume(trend.postCount || trend.volume)} posts. Join the conversation on the decentralized social network!`;
    }
    if (trend.platform === 'instagram') {
      return `Popular Instagram hashtag with ${formatVolume(trend.postCount || trend.volume)} posts. Use it to increase your reach!`;
    }
    return `This topic is generating significant engagement with ${formatVolume(trend.volume)} interactions across ${trend.platform}.`;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="panel-backdrop"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="detail-panel">
        {/* Header */}
        <div className="panel-header">
          <button className="panel-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div
            className="panel-platform-badge"
            style={{ backgroundColor: `${platformColor}15`, color: platformColor }}
          >
            {getPlatformIcon(trend.platform, 'w-4 h-4')}
            {trend.platform.charAt(0).toUpperCase() + trend.platform.slice(1)}
          </div>
        </div>

        {/* Content */}
        <div className="panel-content">
          {/* Title */}
          <h2 className="panel-title">{trend.name}</h2>
          <p className="panel-hashtag">{trend.hashtag}</p>

          {/* Stats */}
          <div className="panel-stats">
            <div className="panel-stat">
              <span className="panel-stat-value">{formatVolume(trend.volume)}</span>
              <span className="panel-stat-label">Engagement</span>
            </div>
            <div className="panel-stat">
              <span className="panel-stat-value" style={{ color: trend.change_percent >= 0 ? '#10b981' : '#ef4444' }}>
                {trend.change_percent >= 0 ? '+' : ''}{trend.change_percent}%
              </span>
              <span className="panel-stat-label">Change</span>
            </div>
            <div className="panel-stat">
              <span className="panel-stat-value">
                {hasPosts ? trend.posts!.length : hasArticles ? trend.articles!.length : '-'}
              </span>
              <span className="panel-stat-label">{hasPosts ? 'Posts' : 'Articles'}</span>
            </div>
          </div>

          {/* Category */}
          <div className="panel-category">
            <span className="panel-category-label">Category</span>
            <span className="panel-category-value">{trend.category}</span>
          </div>

          {/* Sponsored Ad */}
          <div className="panel-ad">
            <div className="panel-ad-label">SPONSORED</div>
            <div className="panel-ad-content">
              <p className="panel-ad-title">Trending tools for creators</p>
              <p className="panel-ad-text">Grow your audience with insights powered by real-time trend data.</p>
              <a href="#" className="panel-ad-cta">Learn More</a>
            </div>
          </div>

          {/* Why Trending */}
          <div className="panel-section">
            <h3 className="panel-section-title">
              <TrendingUpIcon className="w-4 h-4" />
              Why it&apos;s trending
            </h3>
            <p className="panel-section-text">{getWhyTrending()}</p>
          </div>

          {/* YouTube Video */}
          {isYouTube && trend.thumbnail && (
            <div className="panel-section">
              <h3 className="panel-section-title">Trending Video</h3>
              <a
                href={`https://www.youtube.com/watch?v=${trend.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="panel-video-card"
              >
                <img
                  src={trend.thumbnail}
                  alt={trend.name}
                  className="panel-video-thumbnail"
                />
                <div className="panel-video-overlay">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </a>
              {trend.channelTitle && (
                <p className="panel-video-channel">{trend.channelTitle}</p>
              )}
              {trend.stats && (
                <div className="panel-video-stats">
                  <span>{formatVolume(trend.stats.views)} views</span>
                  <span>•</span>
                  <span>{formatVolume(trend.stats.likes)} likes</span>
                  <span>•</span>
                  <span>{formatVolume(trend.stats.comments)} comments</span>
                </div>
              )}
            </div>
          )}

          {/* Spotify Preview Player */}
          {isSpotify && trend.previewUrl && (
            <div className="panel-section">
              <h3 className="panel-section-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Preview Track
              </h3>
              {trend.albumArt && (
                <img
                  src={trend.albumArt}
                  alt={`${trend.name} album art`}
                  style={{
                    width: '100%',
                    maxWidth: '300px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                  }}
                />
              )}
              <audio
                controls
                style={{
                  width: '100%',
                  marginBottom: '12px',
                  borderRadius: '8px',
                }}
              >
                <source src={trend.previewUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <p className="panel-section-text" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                30-second preview • {trend.artist && `by ${trend.artist} • `}
                {trend.streams && `${formatVolume(trend.streams)} streams`}
                {trend.weeksOnChart && trend.weeksOnChart > 0 && ` • ${trend.weeksOnChart} weeks on chart`}
              </p>
              {trend.spotifyUrl && (
                <a
                  href={trend.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '12px',
                    padding: '10px 16px',
                    background: '#1db954',
                    color: 'white',
                    borderRadius: '24px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  Listen on Spotify
                </a>
              )}
            </div>
          )}

          {/* TikTok Stats */}
          {isTikTok && (
            <div className="panel-section">
              <h3 className="panel-section-title">TikTok Stats</h3>
              <div className="panel-tiktok-stats">
                {trend.viewCount && (
                  <div className="panel-tiktok-stat">
                    <span className="panel-tiktok-stat-value">{formatVolume(trend.viewCount)}</span>
                    <span className="panel-tiktok-stat-label">Views</span>
                  </div>
                )}
                {trend.postCount && (
                  <div className="panel-tiktok-stat">
                    <span className="panel-tiktok-stat-value">{formatVolume(trend.postCount)}</span>
                    <span className="panel-tiktok-stat-label">Posts</span>
                  </div>
                )}
              </div>
              <p className="panel-section-text" style={{ marginTop: '12px', fontSize: '13px' }}>
                Use this hashtag in your next TikTok to join the trend!
              </p>
            </div>
          )}

          {/* Twitch Stats */}
          {isTwitch && (
            <div className="panel-section">
              <h3 className="panel-section-title">Twitch Stats</h3>
              <div className="panel-tiktok-stats">
                {trend.viewers && (
                  <div className="panel-tiktok-stat">
                    <span className="panel-tiktok-stat-value" style={{ color: '#9146ff' }}>{formatVolume(trend.viewers)}</span>
                    <span className="panel-tiktok-stat-label">Viewers</span>
                  </div>
                )}
                {trend.channels && (
                  <div className="panel-tiktok-stat">
                    <span className="panel-tiktok-stat-value" style={{ color: '#9146ff' }}>{formatVolume(trend.channels)}</span>
                    <span className="panel-tiktok-stat-label">Channels</span>
                  </div>
                )}
              </div>
              <p className="panel-section-text" style={{ marginTop: '12px', fontSize: '13px' }}>
                Watch live streams of this game on Twitch!
              </p>
            </div>
          )}

          {/* Spotify Stats */}
          {isSpotify && (
            <div className="panel-section">
              <h3 className="panel-section-title">Spotify Stats</h3>
              <div className="panel-tiktok-stats">
                {trend.streams && (
                  <div className="panel-tiktok-stat">
                    <span className="panel-tiktok-stat-value" style={{ color: '#1db954' }}>{formatVolume(trend.streams)}</span>
                    <span className="panel-tiktok-stat-label">Streams</span>
                  </div>
                )}
                {trend.weeksOnChart && (
                  <div className="panel-tiktok-stat">
                    <span className="panel-tiktok-stat-value" style={{ color: '#1db954' }}>{trend.weeksOnChart}</span>
                    <span className="panel-tiktok-stat-label">Weeks on Chart</span>
                  </div>
                )}
              </div>
              {trend.artist && (
                <p className="panel-section-text" style={{ marginTop: '12px', fontSize: '13px' }}>
                  By {trend.artist}
                </p>
              )}
            </div>
          )}

          {/* Bluesky Stats */}
          {isBluesky && (
            <div className="panel-section">
              <h3 className="panel-section-title">Bluesky Stats</h3>
              <div className="panel-tiktok-stats">
                {trend.postCount && (
                  <div className="panel-tiktok-stat">
                    <span className="panel-tiktok-stat-value" style={{ color: '#0085ff' }}>{formatVolume(trend.postCount)}</span>
                    <span className="panel-tiktok-stat-label">Posts</span>
                  </div>
                )}
              </div>
              <p className="panel-section-text" style={{ marginTop: '12px', fontSize: '13px' }}>
                Join the conversation on Bluesky, the decentralized social network!
              </p>
            </div>
          )}

          {/* Reddit Posts */}
          {hasPosts && (
            <div className="panel-section">
              <h3 className="panel-section-title">Top Reddit Posts</h3>
              <div className="panel-posts">
                {trend.posts!.slice(0, 5).map((post) => (
                  <a
                    key={post.id}
                    href={post.permalink}
                    className="panel-post"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="panel-post-content">
                      <span className="panel-post-title">{post.title}</span>
                      <div className="panel-post-meta">
                        <span>r/{post.subreddit}</span>
                        <span>•</span>
                        <span>{post.score.toLocaleString()} pts</span>
                        <span>•</span>
                        <span>{post.numComments} comments</span>
                        <span>•</span>
                        <span>{getTimeAgo(post.createdUtc)}</span>
                      </div>
                    </div>
                    <ChevronRightIcon className="w-4 h-4 panel-post-arrow" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Google Articles */}
          {hasArticles && (
            <div className="panel-section">
              <h3 className="panel-section-title">Related News</h3>
              <div className="panel-posts">
                {trend.articles!.slice(0, 5).map((article, idx) => (
                  <a
                    key={idx}
                    href={article.url}
                    className="panel-post"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="panel-post-content">
                      <span className="panel-post-title">{article.title}</span>
                      <div className="panel-post-meta">
                        <span>{article.source}</span>
                      </div>
                    </div>
                    <ChevronRightIcon className="w-4 h-4 panel-post-arrow" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Related Queries (Google) */}
          {hasRelated && (
            <div className="panel-section">
              <h3 className="panel-section-title">Related Searches</h3>
              <div className="panel-hashtags">
                {trend.relatedQueries!.slice(0, 8).map((query) => (
                  <span key={query} className="panel-hashtag-chip">
                    {query}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* If no extra data, show placeholder */}
          {!hasPosts && !hasArticles && !hasRelated && (
            <div className="panel-section">
              <p className="panel-section-text" style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Click &quot;View on {trend.platform.charAt(0).toUpperCase() + trend.platform.slice(1)}&quot; below to explore more about this trend.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="panel-actions">
          <button className="panel-action-btn secondary" onClick={copyHashtag}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
            Copy Hashtag
          </button>
          <a
            href={platformLink}
            target="_blank"
            rel="noopener noreferrer"
            className="panel-action-btn primary"
            style={{ backgroundColor: platformColor }}
          >
            <ExternalLinkIcon className="w-4 h-4" />
            View on {trend.platform.charAt(0).toUpperCase() + trend.platform.slice(1)}
          </a>
        </div>
      </div>
    </>
  );
}

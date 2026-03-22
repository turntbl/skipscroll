'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  SkipIcon,
  GlobeIcon,
  TikTokIcon,
  XTwitterIcon,
  InstagramIcon,
  YouTubeIcon,
  RedditIcon,
  GoogleIcon,
  TwitchIcon,
  SpotifyIcon,
  BlueskyIcon,
  BlogIcon,
  FireIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  SearchIcon,
  MoreIcon,
  CloseIcon,
  getPlatformIcon,
} from '@/components/icons';
import { TrendDetailPanel } from '@/components/TrendDetailPanel';
import { DisplayAd, InFeedAd } from '@/components/AdSenseAd';

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
  platform: 'reddit' | 'google' | 'tiktok' | 'twitter' | 'instagram' | 'youtube' | 'twitch' | 'spotify' | 'bluesky';
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
  // Twitch specific
  viewers?: number;
  channels?: number;
}

const platforms = [
  { id: 'all', name: 'All Platforms', icon: GlobeIcon, color: '#6366f1' },
  { id: 'google', name: 'Google', icon: GoogleIcon, color: '#4285f4' },
  { id: 'reddit', name: 'Reddit', icon: RedditIcon, color: '#ff4500' },
  { id: 'youtube', name: 'YouTube', icon: YouTubeIcon, color: '#ff0000' },
  { id: 'tiktok', name: 'TikTok', icon: TikTokIcon, color: '#00f2ea' },
  { id: 'instagram', name: 'Instagram', icon: InstagramIcon, color: '#e4405f' },
  { id: 'twitch', name: 'Twitch', icon: TwitchIcon, color: '#9146ff' },
  { id: 'spotify', name: 'Spotify', icon: SpotifyIcon, color: '#1db954' },
  { id: 'bluesky', name: 'Bluesky', icon: BlueskyIcon, color: '#0085ff' },
  { id: 'twitter', name: 'X / Twitter', icon: XTwitterIcon, color: '#000000', disabled: true },
  { id: 'blog', name: 'Blog', icon: BlogIcon, color: '#6366f1', href: '/blog' },
];

const formatVolume = (vol: number) => {
  if (vol >= 1000000000) return `${(vol / 1000000000).toFixed(1)}B`;
  if (vol >= 1000000) return `${(vol / 1000000).toFixed(1)}M`;
  if (vol >= 1000) return `${(vol / 1000).toFixed(0)}K`;
  return vol.toString();
};

export default function Home() {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [trends, setTrends] = useState<Trend[]>([]);
  const [platformCounts, setPlatformCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobilePlatformPickerOpen, setMobilePlatformPickerOpen] = useState(false);
  const mainContentRef = useRef<HTMLElement>(null);

  const fetchTrends = async () => {
    setLoading(true);
    setError(null);

    try {
      const platformParam = selectedPlatform === 'all' ? '' : `?platform=${selectedPlatform}`;
      const response = await fetch(`/api/trends${platformParam}`);
      const data = await response.json();

      if (data.success) {
        setTrends(data.trends);
        setPlatformCounts(data.platforms || {});
        setLastUpdated(new Date(data.timestamp));
      } else {
        setError('Failed to fetch trends');
      }
    } catch (err) {
      setError('Failed to fetch trends');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
    // Scroll to top when platform changes
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo(0, 0);
    }
  }, [selectedPlatform]);

  const filteredTrends = trends.filter(trend => {
    if (searchQuery && !trend.hashtag.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !trend.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Group trends by platform for the spotlight view
  const trendsByPlatform = filteredTrends.reduce((acc, trend) => {
    if (!acc[trend.platform]) {
      acc[trend.platform] = [];
    }
    acc[trend.platform].push(trend);
    return acc;
  }, {} as Record<string, Trend[]>);

  // Get top movers (highest change_percent)
  const topMovers = [...filteredTrends]
    .sort((a, b) => b.change_percent - a.change_percent)
    .slice(0, 6);

  const formatLastUpdated = () => {
    if (!lastUpdated) return 'Loading...';
    const now = new Date();
    const diffMs = now.getTime() - lastUpdated.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;

    return lastUpdated.toLocaleTimeString();
  };

  const activePlatforms = platforms.filter(p =>
    p.id !== 'all' && p.id !== 'twitter' && trendsByPlatform[p.id]?.length > 0
  );

  // Mobile nav platforms (subset for bottom nav)
  const mobileNavPlatforms = [
    { id: 'all', name: 'All', icon: GlobeIcon },
    { id: 'tiktok', name: 'TikTok', icon: TikTokIcon },
    { id: 'instagram', name: 'Instagram', icon: InstagramIcon },
    { id: 'youtube', name: 'YouTube', icon: YouTubeIcon },
    { id: 'spotify', name: 'Spotify', icon: SpotifyIcon },
  ];

  return (
    <div className="app-layout">
      {/* Mobile Header */}
      <header className="mobile-header">
        <div className="logo">
          <SkipIcon className="logo-icon" />
          <span className="logo-text">SkipScroll</span>
        </div>
        <button className="mobile-search-btn" onClick={() => setMobileSearchOpen(true)}>
          <SearchIcon className="w-5 h-5" />
        </button>
      </header>

      {/* Mobile Search Overlay */}
      <div className={`mobile-search-overlay ${mobileSearchOpen ? 'active' : ''}`}>
        <div className="mobile-search-header">
          <div className="search-bar" style={{ margin: 0 }}>
            <SearchIcon className="search-icon" />
            <input
              type="text"
              placeholder="Search trends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
          <button className="mobile-search-close" onClick={() => setMobileSearchOpen(false)}>
            Done
          </button>
        </div>
        {searchQuery && (
          <div className="trend-list" style={{ background: 'var(--bg-primary)', borderRadius: '12px' }}>
            {filteredTrends.slice(0, 10).map((trend, index) => (
              <div
                key={trend.id}
                className="trend-item"
                onClick={() => {
                  setSelectedTrend(trend);
                  setMobileSearchOpen(false);
                }}
              >
                <span className="trend-rank">{index + 1}</span>
                <div className="trend-info">
                  <span className="trend-hashtag">{trend.name}</span>
                  <div className="trend-meta">
                    <span className="trend-platform-badge" style={{
                      backgroundColor: `${platforms.find(p => p.id === trend.platform)?.color}15`,
                      color: platforms.find(p => p.id === trend.platform)?.color,
                    }}>
                      {getPlatformIcon(trend.platform, 'w-3 h-3')}
                      {trend.platform}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-nav">
        {mobileNavPlatforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <button
              key={platform.id}
              className={`mobile-nav-item ${selectedPlatform === platform.id ? 'active' : ''}`}
              onClick={() => setSelectedPlatform(platform.id)}
            >
              <Icon />
              <span>{platform.name}</span>
            </button>
          );
        })}
        <button
          className={`mobile-nav-item ${mobilePlatformPickerOpen ? 'active' : ''}`}
          onClick={() => setMobilePlatformPickerOpen(true)}
        >
          <MoreIcon />
          <span>More</span>
        </button>
      </nav>

      {/* Mobile Platform Picker */}
      {mobilePlatformPickerOpen && (
        <>
          <div className="mobile-picker-backdrop" onClick={() => setMobilePlatformPickerOpen(false)} />
          <div className="mobile-platform-picker">
            <div className="mobile-picker-header">
              <h3>All Platforms</h3>
              <button className="mobile-picker-close" onClick={() => setMobilePlatformPickerOpen(false)}>
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="mobile-picker-grid">
              {platforms.filter(p => !('disabled' in p && p.disabled)).map((platform) => {
                const Icon = platform.icon;
                return (
                  <button
                    key={platform.id}
                    className={`mobile-picker-item ${selectedPlatform === platform.id ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedPlatform(platform.id);
                      setMobilePlatformPickerOpen(false);
                    }}
                    style={{ '--platform-color': platform.color } as React.CSSProperties}
                  >
                    <Icon className="w-6 h-6" />
                    <span>{platform.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Sidebar */}
      <aside className="sidebar">
        {/* Logo */}
        <div className="logo">
          <SkipIcon className="logo-icon" />
          <span className="logo-text">SkipScroll</span>
        </div>

        {/* Search */}
        <div style={{ padding: '16px 0 0' }}>
          <div className="search-bar">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              placeholder="Search trends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Platform Navigation */}
        <nav className="nav-section" style={{ flex: 1 }}>
          <div className="nav-label">Platforms</div>
          {platforms.map((platform) => {
            const Icon = platform.icon;
            const isDisabled = 'disabled' in platform && platform.disabled;
            const hasHref = 'href' in platform && platform.href;

            if (hasHref) {
              return (
                <a
                  key={platform.id}
                  href={platform.href}
                  className="nav-item"
                  style={{ textDecoration: 'none' }}
                >
                  <Icon className="nav-icon" />
                  <span>{platform.name}</span>
                </a>
              );
            }

            return (
              <button
                key={platform.id}
                className={`nav-item ${selectedPlatform === platform.id ? 'active' : ''}`}
                onClick={() => !isDisabled && setSelectedPlatform(platform.id)}
                disabled={isDisabled}
                style={isDisabled ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
                title={isDisabled ? 'Coming soon' : undefined}
              >
                <Icon className="nav-icon" />
                <span>{platform.name}</span>
                {isDisabled && (
                  <span style={{ fontSize: '10px', marginLeft: 'auto', color: 'var(--text-muted)' }}>Soon</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-light)', fontSize: '12px', color: 'var(--text-muted)' }}>
          <div style={{ marginBottom: '12px' }}>Updated every 15 min</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a href="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
              About
            </a>
            <a href="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
              Privacy Policy
            </a>
            <a href="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
              Terms of Service
            </a>
            <a href="/contact" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
              Contact
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content" ref={mainContentRef}>
        {/* Header Row: Last Updated + Ad */}
        <div className="header-row">
          <div className="status-card">
            <span className="status-label">Last updated:</span>
            <span className="status-value">{formatLastUpdated()}</span>
          </div>
          {/* AdSense Display Ad - Top of Page */}
          <DisplayAd
            adSlot="8859426664"
            className="sponsored-card"
            style={{ minHeight: '90px', width: '100%', maxWidth: '728px' }}
          />
        </div>

        {error && (
          <div style={{
            padding: '16px',
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '10px',
            marginBottom: '24px',
            color: '#dc2626',
            fontSize: '14px'
          }}>
            {error}. Please try again.
          </div>
        )}

        {/* Platform Spotlight Grid - Only show on "All Platforms" view */}
        {selectedPlatform === 'all' && !loading && (
          <section style={{ marginBottom: '32px' }}>
            <div className="section-header">
              <h2 className="section-title">
                <GlobeIcon className="w-5 h-5" style={{ color: '#6366f1' }} />
                Platform Spotlights
              </h2>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                {activePlatforms.length} platforms
              </span>
            </div>

            <div className="platform-spotlight-grid">
              {activePlatforms.map((platform) => {
                const platformTrends = trendsByPlatform[platform.id] || [];
                const topThree = platformTrends.slice(0, 3);
                const Icon = platform.icon;

                return (
                  <div
                    key={platform.id}
                    className="platform-spotlight-card"
                    onClick={() => setSelectedPlatform(platform.id)}
                    style={{ '--platform-color': platform.color } as React.CSSProperties}
                  >
                    <div className="spotlight-header">
                      <div className="spotlight-platform">
                        <Icon className="w-5 h-5" />
                        <span>{platform.name}</span>
                      </div>
                      <span className="spotlight-count">{platformCounts[platform.id] || platformTrends.length} trends</span>
                    </div>

                    <div className="spotlight-trends">
                      {topThree.map((trend, idx) => (
                        <div
                          key={trend.id}
                          className="spotlight-trend"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTrend(trend);
                          }}
                        >
                          <span className="spotlight-rank">{idx + 1}</span>
                          <span className="spotlight-name">{trend.name}</span>
                          <span className={`spotlight-change ${trend.change_percent >= 0 ? 'up' : 'down'}`}>
                            +{trend.change_percent}%
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="spotlight-footer">
                      <span>View all →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Loading state for spotlight */}
        {selectedPlatform === 'all' && loading && (
          <section style={{ marginBottom: '32px' }}>
            <div className="section-header">
              <h2 className="section-title">
                <GlobeIcon className="w-5 h-5" style={{ color: '#6366f1' }} />
                Platform Spotlights
              </h2>
            </div>
            <div className="platform-spotlight-grid">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="platform-spotlight-card" style={{ opacity: 0.5 }}>
                  <div className="spotlight-header">
                    <div style={{ height: '24px', width: '100px', background: 'var(--bg-tertiary)', borderRadius: '6px' }}></div>
                  </div>
                  <div className="spotlight-trends">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} style={{ height: '32px', background: 'var(--bg-tertiary)', borderRadius: '6px', marginBottom: '8px' }}></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Rising Fast Section */}
        {selectedPlatform === 'all' && !loading && topMovers.length > 0 && (
          <section style={{ marginBottom: '32px' }}>
            <div className="section-header">
              <h2 className="section-title">
                <FireIcon className="w-5 h-5" style={{ color: '#f59e0b' }} />
                Rising Fast
              </h2>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Biggest movers right now
              </span>
            </div>

            <div className="rising-grid">
              {topMovers.map((trend, index) => {
                const platform = platforms.find(p => p.id === trend.platform);
                return (
                  <div
                    key={trend.id}
                    className="rising-card"
                    onClick={() => setSelectedTrend(trend)}
                    style={{ '--platform-color': platform?.color } as React.CSSProperties}
                  >
                    <div className="rising-badge">
                      {getPlatformIcon(trend.platform, 'w-4 h-4')}
                    </div>
                    <div className="rising-content">
                      <span className="rising-name">{trend.name}</span>
                      <span className="rising-category">{trend.category}</span>
                    </div>
                    <div className="rising-change">
                      <TrendingUpIcon className="w-4 h-4" />
                      +{trend.change_percent}%
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Single Platform View - Featured + List */}
        {selectedPlatform !== 'all' && !loading && filteredTrends.length > 0 && (
          <>
            {/* Featured Card for Single Platform */}
            <section className="featured-section">
              <div className="section-header">
                <h2 className="section-title">
                  <FireIcon className="w-5 h-5" style={{ color: '#f59e0b' }} />
                  Top on {platforms.find(p => p.id === selectedPlatform)?.name}
                </h2>
              </div>
              <div
                className="featured-card"
                onClick={() => setSelectedTrend(filteredTrends[0])}
                style={{
                  cursor: 'pointer',
                  background: `linear-gradient(135deg, ${platforms.find(p => p.id === selectedPlatform)?.color} 0%, ${platforms.find(p => p.id === selectedPlatform)?.color}cc 100%)`
                }}
              >
                <span className="featured-rank">#1</span>
                <div className="featured-platform">
                  {getPlatformIcon(filteredTrends[0].platform, 'w-4 h-4')}
                  {filteredTrends[0].platform.charAt(0).toUpperCase() + filteredTrends[0].platform.slice(1)}
                </div>
                <h3 className="featured-hashtag">{filteredTrends[0].name || filteredTrends[0].hashtag}</h3>
                <p style={{ opacity: 0.9, fontSize: '15px' }}>{filteredTrends[0].category}</p>
                <div className="featured-stats">
                  <div className="featured-stat">
                    <span className="featured-stat-value">{formatVolume(filteredTrends[0].volume)}</span>
                    <span className="featured-stat-label">Engagement</span>
                  </div>
                  <div className="featured-stat">
                    <span className="featured-stat-value">+{filteredTrends[0].change_percent}%</span>
                    <span className="featured-stat-label">Trending</span>
                  </div>
                </div>
              </div>
            </section>

            {/* AdSense Display Ad - Platform View */}
            <DisplayAd
              adSlot="4812937691"
              className="platform-ad-card"
              style={{ minHeight: '250px', width: '100%', marginBottom: '32px' }}
            />
          </>
        )}

        {/* Quick Stats - Compact */}
        <div className="quick-stats-bar">
          <div className="quick-stat">
            <span className="quick-stat-value">{loading ? '...' : filteredTrends.length}</span>
            <span className="quick-stat-label">Trends</span>
          </div>
          <div className="quick-stat-divider"></div>
          <div className="quick-stat">
            <span className="quick-stat-value" style={{ color: '#6366f1' }}>
              {loading ? '...' : new Set(trends.map(t => t.platform)).size}
            </span>
            <span className="quick-stat-label">Platforms</span>
          </div>
          <div className="quick-stat-divider"></div>
          <div className="quick-stat">
            <span className="quick-stat-value" style={{ color: '#10b981' }}>
              {loading ? '...' : new Set(trends.map(t => t.category)).size}
            </span>
            <span className="quick-stat-label">Categories</span>
          </div>
          <div className="quick-stat-divider"></div>
          <div className="quick-stat">
            <span className="quick-stat-value" style={{ color: '#f59e0b' }}>
              {loading ? '...' : `+${Math.round(filteredTrends.reduce((acc, t) => acc + t.change_percent, 0) / filteredTrends.length || 0)}%`}
            </span>
            <span className="quick-stat-label">Avg Growth</span>
          </div>
        </div>

        {/* Trends List */}
        <section>
          <div className="section-header">
            <h2 className="section-title">
              <TrendingUpIcon className="w-5 h-5" style={{ color: '#10b981' }} />
              {selectedPlatform === 'all' ? 'All Trends' : `${platforms.find(p => p.id === selectedPlatform)?.name} Trends`}
            </h2>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              {filteredTrends.length} trends
            </span>
          </div>

          {loading ? (
            <div className="trend-list">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="trend-item" style={{ opacity: 0.5 }}>
                  <span className="trend-rank">{i + 1}</span>
                  <div className="trend-info">
                    <div style={{ height: '18px', width: '60%', background: 'var(--bg-tertiary)', borderRadius: '4px', marginBottom: '8px' }}></div>
                    <div style={{ height: '14px', width: '40%', background: 'var(--bg-tertiary)', borderRadius: '4px' }}></div>
                  </div>
                  <span className="trend-volume">...</span>
                  <span className="trend-change">...</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="trend-list">
              {filteredTrends.map((trend, index) => (
                <React.Fragment key={trend.id}>
                  <div
                    className="trend-item"
                    onClick={() => setSelectedTrend(trend)}
                  >
                    <span className="trend-rank">{index + 1}</span>
                    <div className="trend-info">
                      <span className="trend-hashtag">{trend.name || trend.hashtag}</span>
                      <div className="trend-meta">
                        <span
                          className="trend-platform-badge"
                          style={{
                            backgroundColor: `${platforms.find(p => p.id === trend.platform)?.color}15`,
                            color: platforms.find(p => p.id === trend.platform)?.color,
                          }}
                        >
                          {getPlatformIcon(trend.platform, 'w-3 h-3')}
                          {trend.platform}
                        </span>
                        <span>{trend.category}</span>
                      </div>
                    </div>
                    <span className="trend-volume">{formatVolume(trend.volume)}</span>
                    <span className={`trend-change ${trend.change_percent >= 0 ? 'up' : 'down'}`}>
                      {trend.change_percent >= 0 ? (
                        <TrendingUpIcon className="w-4 h-4" />
                      ) : (
                        <TrendingDownIcon className="w-4 h-4" />
                      )}
                      {Math.abs(trend.change_percent)}%
                    </span>
                  </div>
                  {/* AdSense Display Ad after positions 8, 16, 24 */}
                  {(index === 7 || index === 15 || index === 23) && (
                    <DisplayAd
                      adSlot={index === 7 ? '6592923220' : index === 15 ? '3415528299' : '2102446625'}
                      className="trend-list-ad"
                      style={{ minHeight: '100px', width: '100%', margin: '16px 0' }}
                    />
                  )}
                </React.Fragment>
              ))}
              {/* AdSense In-Feed Ad at end if list is short */}
              {filteredTrends.length > 0 && filteredTrends.length < 8 && (
                <DisplayAd
                  adSlot="5070423140"
                  className="trend-list-ad trend-list-ad-end"
                  style={{ minHeight: '100px', width: '100%', margin: '16px 0' }}
                />
              )}
            </div>
          )}

          {!loading && filteredTrends.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
              No trends found matching your criteria.
            </div>
          )}
        </section>

        {/* Footer Links */}
        <footer style={{
          marginTop: '48px',
          paddingTop: '24px',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center',
          fontSize: '13px',
          color: 'var(--text-muted)'
        }}>
          <a href="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>About</a>
          <span>•</span>
          <a href="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</a>
          <span>•</span>
          <a href="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</a>
          <span>•</span>
          <a href="/contact" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Contact</a>
        </footer>
      </main>

      {/* Trend Detail Panel */}
      <TrendDetailPanel
        trend={selectedTrend}
        onClose={() => setSelectedTrend(null)}
      />
    </div>
  );
}

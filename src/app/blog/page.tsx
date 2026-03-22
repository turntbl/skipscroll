'use client';

import Link from 'next/link';
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
} from '@/components/icons';

const blogPosts = [
  {
    slug: 'spotting-trends-before-they-peak',
    title: 'How to Spot Trending Topics Before They Peak: A Data-Driven Approach',
    excerpt: 'Master the art of early trend detection to create viral content, stay ahead of competitors, and maximize engagement when it matters most.',
    date: '2026-03-22',
    category: 'Strategy',
    readTime: '10 min read',
  },
  {
    slug: 'how-to-use-trending-data-for-content-creation',
    title: 'How to Use Trending Data for Content Creation: A Complete Guide',
    excerpt: 'Learn how to leverage real-time trending data to create viral content, boost engagement, and stay ahead of the curve on social media.',
    date: '2026-03-20',
    category: 'Content Strategy',
    readTime: '8 min read',
  },
  {
    slug: 'understanding-social-media-trends-2026',
    title: 'Understanding Social Media Trends in 2026: What You Need to Know',
    excerpt: 'Explore how social media trends have evolved, why they matter, and how to identify emerging trends before they go mainstream.',
    date: '2026-03-18',
    category: 'Social Media',
    readTime: '10 min read',
  },
  {
    slug: 'viral-content-science',
    title: 'The Science Behind Viral Content: Why Some Posts Explode and Others Don\'t',
    excerpt: 'Discover the psychological and algorithmic factors that determine whether content goes viral, backed by data and research.',
    date: '2026-03-15',
    category: 'Analysis',
    readTime: '12 min read',
  },
  {
    slug: 'platform-comparison-guide',
    title: 'TikTok vs Instagram vs YouTube: Which Platform is Right for Your Content?',
    excerpt: 'A comprehensive comparison of major social platforms, their trending algorithms, and how to choose the best one for your goals.',
    date: '2026-03-12',
    category: 'Platform Guide',
    readTime: '9 min read',
  },
  {
    slug: 'avoiding-social-media-burnout',
    title: 'Staying Informed Without the Burnout: A Guide to Healthy Social Media Consumption',
    excerpt: 'Learn strategies to stay updated on trends and news without falling into the trap of endless scrolling and information overload.',
    date: '2026-03-10',
    category: 'Wellness',
    readTime: '7 min read',
  },
];

const platforms = [
  { id: 'all', name: 'All Platforms', icon: GlobeIcon, color: '#6366f1', href: '/' },
  { id: 'google', name: 'Google', icon: GoogleIcon, color: '#4285F4', href: '/' },
  { id: 'reddit', name: 'Reddit', icon: RedditIcon, color: '#ff4500', href: '/' },
  { id: 'youtube', name: 'YouTube', icon: YouTubeIcon, color: '#ff0000', href: '/' },
  { id: 'tiktok', name: 'TikTok', icon: TikTokIcon, color: '#000000', href: '/' },
  { id: 'instagram', name: 'Instagram', icon: InstagramIcon, color: '#E4405F', href: '/' },
  { id: 'twitch', name: 'Twitch', icon: TwitchIcon, color: '#9146ff', href: '/' },
  { id: 'spotify', name: 'Spotify', icon: SpotifyIcon, color: '#1db954', href: '/' },
  { id: 'bluesky', name: 'Bluesky', icon: BlueskyIcon, color: '#0085ff', href: '/' },
  { id: 'twitter', name: 'X / Twitter', icon: XTwitterIcon, color: '#000000', disabled: true },
  { id: 'blog', name: 'Blog', icon: BlogIcon, color: '#6366f1', href: '/blog' },
];

export default function BlogPage() {
  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        {/* Logo */}
        <div className="logo">
          <SkipIcon className="logo-icon" />
          <span className="logo-text">SkipScroll</span>
        </div>

        {/* Platform Navigation */}
        <nav className="nav-section" style={{ flex: 1 }}>
          <div className="nav-label">Platforms</div>
          {platforms.map((platform) => {
            const Icon = platform.icon;
            const isDisabled = 'disabled' in platform && platform.disabled;
            const isActive = platform.id === 'blog';

            return (
              <a
                key={platform.id}
                href={platform.href || '/'}
                className={`nav-item ${isActive ? 'active' : ''}`}
                style={{
                  textDecoration: 'none',
                  opacity: isDisabled ? 0.5 : 1,
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  pointerEvents: isDisabled ? 'none' : 'auto'
                }}
                title={isDisabled ? 'Coming soon' : undefined}
              >
                <Icon className="nav-icon" />
                <span>{platform.name}</span>
                {isDisabled && (
                  <span style={{ fontSize: '10px', marginLeft: 'auto', color: 'var(--text-muted)' }}>Soon</span>
                )}
              </a>
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
      <main className="main-content" style={{ padding: '40px 20px', maxWidth: '900px' }}>
        <div style={{ textAlign: 'center', margin: '0 0 60px' }}>
          <h1 style={{ fontSize: '42px', fontWeight: '700', margin: '0 0 16px' }}>SkipScroll Blog</h1>
          <p style={{ fontSize: '18px', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Insights, strategies, and analysis to help you navigate the world of social media trends
          </p>
        </div>

        <div style={{ display: 'grid', gap: '32px' }}>
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: '12px',
                padding: '32px',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
                <span style={{
                  background: '#6366f115',
                  color: '#6366f1',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontWeight: '600'
                }}>
                  {post.category}
                </span>
                <span>•</span>
                <time>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  margin: '0 0 16px',
                  color: 'var(--text-primary)',
                  lineHeight: '1.3'
                }}>
                  {post.title}
                </h2>
              </Link>

              <p style={{
                fontSize: '16px',
                lineHeight: '1.7',
                color: 'var(--text-muted)',
                margin: '0 0 20px'
              }}>
                {post.excerpt}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#6366f1',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '15px',
                }}
              >
                Read full article →
              </Link>
            </article>
          ))}
        </div>

        <footer style={{
          marginTop: '80px',
          paddingTop: '40px',
          borderTop: '1px solid var(--border-light)',
          textAlign: 'center',
          fontSize: '14px',
          color: 'var(--text-muted)'
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <a href="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>About</a>
            <span>•</span>
            <a href="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</a>
            <span>•</span>
            <a href="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</a>
            <span>•</span>
            <a href="/contact" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Contact</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

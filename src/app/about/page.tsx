import Link from 'next/link';
import { SkipIcon } from '@/components/icons';

export const metadata = {
  title: 'About - SkipScroll',
  description: 'Learn about SkipScroll and our mission to help you stay informed without the endless scroll.',
};

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        <Link href="/" style={{ color: '#6366f1', textDecoration: 'none', fontSize: '14px' }}>
          ← Back to Home
        </Link>

        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          <SkipIcon className="logo-icon" style={{ width: '64px', height: '64px', margin: '0 auto' }} />
          <h1 style={{ fontSize: '36px', fontWeight: '700', margin: '16px 0' }}>About SkipScroll</h1>
          <p style={{ fontSize: '18px', color: 'var(--text-muted)' }}>
            Know what's trending without the scroll
          </p>
        </div>

        <div style={{ lineHeight: '1.8', fontSize: '15px' }}>
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Our Mission</h2>
            <p style={{ marginBottom: '16px' }}>
              In a world of endless scrolling and information overload, SkipScroll cuts through the noise to deliver what truly matters: what's trending right now.
            </p>
            <p style={{ marginBottom: '16px' }}>
              We believe staying informed shouldn't require hours of doom scrolling across multiple platforms. That's why we created SkipScroll—a single destination to see what's trending across TikTok, Instagram, YouTube, Reddit, Google, Spotify, Twitch, and Bluesky in seconds.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>What We Do</h2>
            <p style={{ marginBottom: '16px' }}>
              SkipScroll aggregates real-time trending data from the world's most popular platforms, giving you instant insights into:
            </p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li>Viral hashtags and topics</li>
              <li>Rising trends across social media</li>
              <li>Popular content by category</li>
              <li>Trending music and entertainment</li>
              <li>Breaking news and cultural moments</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              Our platform updates every 15 minutes, ensuring you're always connected to the cultural pulse without wasting hours on social media.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Why We Built This</h2>
            <p style={{ marginBottom: '16px' }}>
              Social media has become essential for staying connected and informed, but it comes with a cost: endless scrolling, algorithmic manipulation, and time wasted on content that doesn't truly matter to you.
            </p>
            <p style={{ marginBottom: '16px' }}>
              SkipScroll was built to solve this problem. We give you the power to:
            </p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li><strong>Save Time:</strong> Get the trending highlights in seconds, not hours</li>
              <li><strong>Stay Informed:</strong> Never miss important cultural moments</li>
              <li><strong>No Accounts Required:</strong> Access everything without signing up</li>
              <li><strong>Ad-Supported & Free:</strong> Always free to use</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Our Platforms</h2>
            <p style={{ marginBottom: '16px' }}>We track trends across:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
              <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <strong>TikTok</strong>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Viral videos & hashtags</p>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <strong>Instagram</strong>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Trending posts & reels</p>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <strong>YouTube</strong>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Popular videos</p>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <strong>Reddit</strong>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Hot discussions</p>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <strong>Google Trends</strong>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Search trends</p>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <strong>Spotify</strong>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Trending music</p>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <strong>Twitch</strong>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Live streaming trends</p>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
                <strong>Bluesky</strong>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Emerging social trends</p>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>How It Works</h2>
            <p style={{ marginBottom: '16px' }}>
              Our technology continuously monitors trending content across all supported platforms. Using advanced algorithms, we aggregate, categorize, and rank trends based on:
            </p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li>Engagement volume (views, likes, shares)</li>
              <li>Growth rate (how quickly it's trending)</li>
              <li>Platform-specific metrics</li>
              <li>Temporal relevance</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              All data is updated automatically every 15 minutes to ensure you're seeing the most current trends.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Privacy & Data</h2>
            <p style={{ marginBottom: '16px' }}>
              We respect your privacy. SkipScroll does not require accounts, does not collect personal information, and only uses cookies for analytics and advertising purposes. For more information, please read our <Link href="/privacy" style={{ color: '#6366f1' }}>Privacy Policy</Link>.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Get in Touch</h2>
            <p style={{ marginBottom: '16px' }}>
              Have feedback, questions, or suggestions? We'd love to hear from you.
            </p>
            <p>
              Visit our <Link href="/contact" style={{ color: '#6366f1' }}>Contact page</Link> to reach out.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

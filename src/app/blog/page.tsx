import Link from 'next/link';

export const metadata = {
  title: 'Blog - SkipScroll',
  description: 'Insights, tips, and analysis on social media trends, viral content, and staying informed in the digital age.',
};

const blogPosts = [
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

export default function BlogPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        <Link href="/" style={{ color: '#6366f1', textDecoration: 'none', fontSize: '14px' }}>
          ← Back to Home
        </Link>

        <div style={{ textAlign: 'center', margin: '40px 0 60px' }}>
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
          <p>Want to stay updated on social media trends?</p>
          <Link href="/" style={{ color: '#6366f1', fontWeight: '600' }}>
            Check out trending topics now →
          </Link>
        </footer>
      </div>
    </div>
  );
}

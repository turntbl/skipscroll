import Link from 'next/link';

export const metadata = {
  title: 'Contact - SkipScroll',
  description: 'Get in touch with the SkipScroll team.',
};

export default function ContactPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        <Link href="/" style={{ color: '#6366f1', textDecoration: 'none', fontSize: '14px' }}>
          ← Back to Home
        </Link>

        <h1 style={{ fontSize: '36px', fontWeight: '700', margin: '24px 0' }}>Contact Us</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '16px' }}>
          Have questions, feedback, or suggestions? We'd love to hear from you.
        </p>

        <div style={{ lineHeight: '1.8', fontSize: '15px' }}>
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Email Us</h2>
            <p style={{ marginBottom: '16px' }}>
              For general inquiries, feedback, or support:
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>General Inquiries:</strong>{' '}
              <a href="mailto:hello@skipscroll.com" style={{ color: '#6366f1' }}>
                hello@skipscroll.com
              </a>
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>Support:</strong>{' '}
              <a href="mailto:support@skipscroll.com" style={{ color: '#6366f1' }}>
                support@skipscroll.com
              </a>
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>Privacy Concerns:</strong>{' '}
              <a href="mailto:privacy@skipscroll.com" style={{ color: '#6366f1' }}>
                privacy@skipscroll.com
              </a>
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>Legal Matters:</strong>{' '}
              <a href="mailto:legal@skipscroll.com" style={{ color: '#6366f1' }}>
                legal@skipscroll.com
              </a>
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>Advertising & Partnerships:</strong>{' '}
              <a href="mailto:partnerships@skipscroll.com" style={{ color: '#6366f1' }}>
                partnerships@skipscroll.com
              </a>
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Response Time</h2>
            <p style={{ marginBottom: '16px' }}>
              We aim to respond to all inquiries within 2-3 business days. For urgent matters, please indicate "URGENT" in your email subject line.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Frequently Asked Questions</h2>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Do I need to create an account?</h3>
              <p style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>
                No! SkipScroll is completely free to use without any account required. Just visit the site and start exploring trends.
              </p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>How often is the data updated?</h3>
              <p style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>
                Our trending data is updated every 15 minutes to ensure you're always seeing the latest trends.
              </p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Can I request a specific platform be added?</h3>
              <p style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>
                Absolutely! Send us an email at <a href="mailto:hello@skipscroll.com" style={{ color: '#6366f1' }}>hello@skipscroll.com</a> with your suggestion.
              </p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>How do you make money?</h3>
              <p style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>
                SkipScroll is supported by advertising through Google AdSense and partnerships. We will always remain free to use.
              </p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Is my data being collected?</h3>
              <p style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>
                We only collect anonymous analytics data to improve the service. No personal information is collected. See our <Link href="/privacy" style={{ color: '#6366f1' }}>Privacy Policy</Link> for details.
              </p>
            </div>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Report an Issue</h2>
            <p style={{ marginBottom: '16px' }}>
              If you encounter any technical issues or bugs, please email us at{' '}
              <a href="mailto:support@skipscroll.com" style={{ color: '#6366f1' }}>
                support@skipscroll.com
              </a>{' '}
              with:
            </p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li>A description of the issue</li>
              <li>Your browser and device type</li>
              <li>Steps to reproduce the problem</li>
              <li>Screenshots if applicable</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Business Inquiries</h2>
            <p style={{ marginBottom: '16px' }}>
              Interested in advertising, partnerships, or data licensing? Contact us at{' '}
              <a href="mailto:partnerships@skipscroll.com" style={{ color: '#6366f1' }}>
                partnerships@skipscroll.com
              </a>
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Legal Notices</h2>
            <p style={{ marginBottom: '16px' }}>
              For copyright claims, trademark issues, or other legal matters, please contact{' '}
              <a href="mailto:legal@skipscroll.com" style={{ color: '#6366f1' }}>
                legal@skipscroll.com
              </a>
            </p>
            <p style={{ marginBottom: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
              Please include all relevant information and documentation with your inquiry.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

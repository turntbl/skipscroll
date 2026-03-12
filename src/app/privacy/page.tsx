import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - SkipScroll',
  description: 'Learn how SkipScroll collects, uses, and protects your information.',
};

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        <Link href="/" style={{ color: '#6366f1', textDecoration: 'none', fontSize: '14px' }}>
          ← Back to Home
        </Link>

        <h1 style={{ fontSize: '36px', fontWeight: '700', margin: '24px 0' }}>Privacy Policy</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div style={{ lineHeight: '1.8', fontSize: '15px' }}>
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Introduction</h2>
            <p style={{ marginBottom: '16px' }}>
              SkipScroll ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website skipscroll.com.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Information We Collect</h2>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginTop: '16px', marginBottom: '12px' }}>Automatically Collected Information</h3>
            <p style={{ marginBottom: '16px' }}>
              When you visit SkipScroll, we automatically collect certain information about your device, including:
            </p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>IP address</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              We collect this information using cookies and similar tracking technologies through Google Analytics and Google Tag Manager to understand how visitors use our site.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>How We Use Your Information</h2>
            <p style={{ marginBottom: '16px' }}>We use the collected information to:</p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li>Improve and optimize our website</li>
              <li>Analyze site usage and trends</li>
              <li>Deliver relevant advertisements through Google AdSense</li>
              <li>Monitor and prevent security issues</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Cookies and Tracking</h2>
            <p style={{ marginBottom: '16px' }}>
              We use cookies and similar tracking technologies to track activity on our website. Cookies are small data files stored on your device. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.
            </p>
            <p style={{ marginBottom: '16px' }}>
              We use the following types of cookies:
            </p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website (Google Analytics)</li>
              <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements (Google AdSense)</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Third-Party Services</h2>
            <p style={{ marginBottom: '16px' }}>We use the following third-party services:</p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li><strong>Google Analytics:</strong> To analyze website traffic and usage</li>
              <li><strong>Google Tag Manager:</strong> To manage tracking codes</li>
              <li><strong>Google AdSense:</strong> To display advertisements</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              These third parties have their own privacy policies. We recommend reviewing their policies for more information about their practices.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Data Sharing</h2>
            <p style={{ marginBottom: '16px' }}>
              We do not sell, trade, or rent your personal information to third parties. We may share aggregated demographic information not linked to any personally identifiable information with our partners and advertisers.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Your Rights</h2>
            <p style={{ marginBottom: '16px' }}>You have the right to:</p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of certain data collection (via browser settings)</li>
              <li>Disable cookies through your browser settings</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Children's Privacy</h2>
            <p style={{ marginBottom: '16px' }}>
              SkipScroll is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Changes to This Privacy Policy</h2>
            <p style={{ marginBottom: '16px' }}>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Contact Us</h2>
            <p style={{ marginBottom: '16px' }}>
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p style={{ marginBottom: '8px' }}>
              Email: <a href="mailto:account@skipscroll.com" style={{ color: '#6366f1' }}>account@skipscroll.com</a>
            </p>
            <p>
              Or visit our <Link href="/contact" style={{ color: '#6366f1' }}>Contact page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

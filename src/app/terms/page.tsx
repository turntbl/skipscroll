import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service - SkipScroll',
  description: 'Terms and conditions for using SkipScroll.',
};

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        <Link href="/" style={{ color: '#6366f1', textDecoration: 'none', fontSize: '14px' }}>
          ← Back to Home
        </Link>

        <h1 style={{ fontSize: '36px', fontWeight: '700', margin: '24px 0' }}>Terms of Service</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div style={{ lineHeight: '1.8', fontSize: '15px' }}>
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Agreement to Terms</h2>
            <p style={{ marginBottom: '16px' }}>
              By accessing or using SkipScroll ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Description of Service</h2>
            <p style={{ marginBottom: '16px' }}>
              SkipScroll is a trend aggregation platform that provides users with real-time trending information from various social media platforms including TikTok, Instagram, YouTube, Reddit, Google Trends, Spotify, Twitch, and Bluesky.
            </p>
            <p style={{ marginBottom: '16px' }}>
              The Service is provided free of charge and is supported by advertising. We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Use License</h2>
            <p style={{ marginBottom: '16px' }}>
              Permission is granted to temporarily access the Service for personal, non-commercial viewing only. This license does not include:
            </p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li>Modifying or copying Service materials</li>
              <li>Using materials for commercial purposes</li>
              <li>Attempting to reverse engineer any software contained on SkipScroll</li>
              <li>Removing copyright or proprietary notations</li>
              <li>Transferring materials to another person or mirroring materials on another server</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Acceptable Use</h2>
            <p style={{ marginBottom: '16px' }}>You agree not to:</p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li>Use the Service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to the Service or related systems</li>
              <li>Use automated systems (bots, scrapers) to access the Service</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Transmit viruses, malware, or any harmful code</li>
              <li>Impersonate any person or entity</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Third-Party Content</h2>
            <p style={{ marginBottom: '16px' }}>
              SkipScroll aggregates trending data from third-party platforms. We do not own, control, or endorse the content displayed from these platforms. The trends and data shown are automatically collected and may not reflect the views or opinions of SkipScroll.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Links to third-party websites or content are provided for convenience only. We are not responsible for the content, accuracy, or practices of linked websites.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Intellectual Property</h2>
            <p style={{ marginBottom: '16px' }}>
              The Service and its original content, features, and functionality are owned by SkipScroll and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Trend data and content from third-party platforms remain the property of their respective owners.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Disclaimer</h2>
            <p style={{ marginBottom: '16px' }}>
              The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied, including but not limited to:
            </p>
            <ul style={{ marginLeft: '24px', marginBottom: '16px' }}>
              <li>Accuracy, reliability, or completeness of trend data</li>
              <li>Uninterrupted or error-free operation</li>
              <li>Fitness for a particular purpose</li>
              <li>Non-infringement</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              We do not warrant that the Service will meet your requirements or that defects will be corrected.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Limitation of Liability</h2>
            <p style={{ marginBottom: '16px' }}>
              In no event shall SkipScroll, its directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the Service.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Advertising</h2>
            <p style={{ marginBottom: '16px' }}>
              The Service displays advertisements through Google AdSense and other advertising partners. We are not responsible for the content of advertisements displayed on our platform.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Changes to Terms</h2>
            <p style={{ marginBottom: '16px' }}>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Service. Your continued use of the Service after changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Governing Law</h2>
            <p style={{ marginBottom: '16px' }}>
              These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Contact Us</h2>
            <p style={{ marginBottom: '16px' }}>
              If you have any questions about these Terms, please contact us:
            </p>
            <p style={{ marginBottom: '8px' }}>
              Email: <a href="mailto:legal@skipscroll.com" style={{ color: '#6366f1' }}>legal@skipscroll.com</a>
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

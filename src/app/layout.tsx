import type { Metadata, Viewport } from 'next';
import { GoogleTagManager, GoogleTagManagerNoScript } from '@/components/GoogleTagManager';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { GoogleAdSense } from '@/components/GoogleAdSense';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'SkipScroll - Know What\'s Trending Without the Scroll',
  description: 'See what\'s trending across TikTok, X, Instagram, YouTube, Reddit, and Google in seconds. No accounts. No doom scrolling. Just trends.',
  keywords: ['trending', 'hashtags', 'tiktok trends', 'twitter trends', 'social media trends', 'viral', 'what\'s trending', 'skip scroll'],
  openGraph: {
    title: 'SkipScroll',
    description: 'Know what\'s trending without the scroll.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || '';
  const gaId = process.env.NEXT_PUBLIC_GA_ID || '';
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-9923155979879148';

  return (
    <html lang="en">
      <head>
        <GoogleTagManager gtmId={gtmId} />
        <GoogleAnalytics gaId={gaId} />
        <GoogleAdSense publisherId={adsenseId} />
      </head>
      <body>
        <GoogleTagManagerNoScript gtmId={gtmId} />
        {children}
      </body>
    </html>
  );
}

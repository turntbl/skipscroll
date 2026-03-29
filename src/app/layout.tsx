import type { Metadata, Viewport } from 'next';
import { GoogleTagManager, GoogleTagManagerNoScript } from '@/components/GoogleTagManager';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { GoogleAdSense } from '@/components/GoogleAdSense';
import { OrganizationSchema, WebsiteSchema } from '@/components/StructuredData';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://skipscroll.com'),
  title: {
    default: 'SkipScroll - Know What\'s Trending Without the Scroll',
    template: '%s | SkipScroll',
  },
  description: 'See what\'s trending across TikTok, X, Instagram, YouTube, Reddit, Google, Spotify, Twitch, and Bluesky in seconds. No accounts. No doom scrolling. Just trends.',
  keywords: ['trending', 'trends', 'hashtags', 'tiktok trends', 'twitter trends', 'x trends', 'instagram trends', 'youtube trends', 'reddit trends', 'google trends', 'spotify trends', 'bluesky trends', 'social media trends', 'viral content', 'what\'s trending', 'trending topics', 'trending hashtags', 'social media analytics', 'trend tracking'],
  authors: [{ name: 'SkipScroll Team' }],
  creator: 'SkipScroll',
  publisher: 'SkipScroll',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://skipscroll.com',
    siteName: 'SkipScroll',
    title: 'SkipScroll - Know What\'s Trending Without the Scroll',
    description: 'See what\'s trending across TikTok, X, Instagram, YouTube, Reddit, Google, Spotify, Twitch, and Bluesky in seconds. No accounts needed.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SkipScroll - Track trends across all major social platforms',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkipScroll - Know What\'s Trending Without the Scroll',
    description: 'See what\'s trending across TikTok, X, Instagram, YouTube, Reddit, Google, Spotify, Twitch, and Bluesky in seconds.',
    images: ['/og-image.png'],
    creator: '@skipscroll',
    site: '@skipscroll',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://skipscroll.com',
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
        <OrganizationSchema />
        <WebsiteSchema />
      </head>
      <body>
        <GoogleTagManagerNoScript gtmId={gtmId} />
        {children}
      </body>
    </html>
  );
}

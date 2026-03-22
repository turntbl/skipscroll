'use client';

import { useEffect } from 'react';

interface AdSenseAdProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal' | 'autorelaxed';
  adLayout?: string;
  adLayoutKey?: string;
  fullWidthResponsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Reusable AdSense Ad Component
 *
 * Usage:
 * <AdSenseAd adSlot="1234567890" adFormat="auto" />
 *
 * Ad Formats:
 * - auto: Responsive display ad (recommended)
 * - fluid: Native in-feed ad
 * - rectangle: 300x250 rectangle
 * - horizontal: Leaderboard/banner
 * - vertical: Skyscraper
 */
export function AdSenseAd({
  adSlot,
  adFormat = 'auto',
  adLayout,
  adLayoutKey,
  fullWidthResponsive = true,
  className = '',
  style = {},
}: AdSenseAdProps) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-9923155979879148';

  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`} style={{ minWidth: '250px', ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={publisherId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-ad-layout-key={adLayoutKey}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  );
}

/**
 * In-Feed Native Ad (blends with content list)
 */
export function InFeedAd({ adSlot, className }: { adSlot: string; className?: string }) {
  return (
    <AdSenseAd
      adSlot={adSlot}
      adFormat="fluid"
      adLayout="in-article"
      className={className}
    />
  );
}

/**
 * Display Ad (banner/rectangle)
 */
export function DisplayAd({ adSlot, className, style }: { adSlot: string; className?: string; style?: React.CSSProperties }) {
  return (
    <AdSenseAd
      adSlot={adSlot}
      adFormat="auto"
      className={className}
      style={style}
      fullWidthResponsive={true}
    />
  );
}

/**
 * Multiplex Ad (multiple native ads in a grid)
 */
export function MultiplexAd({ adSlot, className }: { adSlot: string; className?: string }) {
  return (
    <AdSenseAd
      adSlot={adSlot}
      adFormat="autorelaxed"
      className={className}
    />
  );
}

import Script from 'next/script';

interface StructuredDataProps {
  data: object;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization Schema
export function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SkipScroll',
    url: 'https://skipscroll.com',
    logo: 'https://skipscroll.com/icon.png',
    description: 'Track what\'s trending across TikTok, Instagram, YouTube, Reddit, Google, Spotify, Twitch, and Bluesky in real-time.',
    sameAs: [
      'https://twitter.com/skipscroll',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'account@skipscroll.com',
      contactType: 'Customer Service',
    },
  };

  return <StructuredData data={data} />;
}

// Website Schema
export function WebsiteSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SkipScroll',
    url: 'https://skipscroll.com',
    description: 'Know what\'s trending without the scroll. Track real-time trends across all major social media platforms.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://skipscroll.com/?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return <StructuredData data={data} />;
}

// Blog Article Schema
export interface BlogArticleData {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author: string;
  url: string;
  image?: string;
}

export function BlogArticleSchema({
  headline,
  description,
  datePublished,
  dateModified,
  author,
  url,
  image,
}: BlogArticleData) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    image: image || 'https://skipscroll.com/og-image.png',
    datePublished,
    dateModified,
    author: {
      '@type': 'Organization',
      name: author,
      url: 'https://skipscroll.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SkipScroll',
      logo: {
        '@type': 'ImageObject',
        url: 'https://skipscroll.com/icon.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return <StructuredData data={data} />;
}

// Breadcrumb Schema
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <StructuredData data={data} />;
}

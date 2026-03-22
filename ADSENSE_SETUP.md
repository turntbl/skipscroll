# Google AdSense Setup Guide for SkipScroll

Your site is now optimized with strategic ad placements! Follow this guide to get your ad slots and go live.

## Current Ad Placements (6 Strategic Positions)

### 1. **Header Display Ad**
- **Location:** Top of main content, next to "Last Updated"
- **Format:** Responsive display ad
- **Best for:** Desktop leaderboard (728x90) or mobile banner
- **Placeholder Slot ID:** `1234567890` ← Replace with your real slot

### 2. **Platform View Display Ad**
- **Location:** Below featured card on single platform view
- **Format:** Responsive display ad (rectangle/banner)
- **Best for:** 300x250 rectangle or larger
- **Placeholder Slot ID:** `2345678901` ← Replace with your real slot

### 3-5. **In-Feed Ads** (3 positions)
- **Location:** Within trend list after positions 8, 16, and 24
- **Format:** Native in-feed ads (blends with trends)
- **Best for:** Matches your trend card style
- **Placeholder Slot IDs:**
  - Position 8: `3456789012` ← Replace
  - Position 16: `4567890123` ← Replace
  - Position 24: `5678901234` ← Replace

### 6. **End-of-List In-Feed Ad**
- **Location:** Bottom of trend list (if fewer than 8 trends)
- **Format:** Native in-feed ad
- **Placeholder Slot ID:** `6789012345` ← Replace

### 7. **Detail Panel Display Ad**
- **Location:** Inside trend detail sidebar
- **Format:** Responsive display ad
- **Best for:** 300x250 rectangle
- **Placeholder Slot ID:** `7890123456` ← Replace

---

## Step 1: Enable Auto Ads in AdSense Dashboard

1. Go to [Google AdSense](https://www.google.com/adsense)
2. Click **Ads** → **By site**
3. Find **skipscroll.com**
4. Toggle **Auto ads** to **ON**
5. Click the chart icon to customize:
   - ✅ Enable **Display ads**
   - ✅ Enable **In-feed ads**
   - ✅ Enable **Anchor ads** (mobile sticky)
   - ❌ Disable **Vignette ads** (too intrusive)

## Step 2: Create Ad Units (Optional but Recommended)

For better control and tracking, create specific ad units:

### Create Display Ad Units

1. Go to **Ads** → **By ad unit** → **Display ads**
2. Click **New ad unit**
3. Create these ad units:

**Header Ad:**
- Name: `SkipScroll - Header`
- Ad type: Display
- Size: Responsive
- Click **Create**
- Copy the **Ad slot ID** (data-ad-slot value)

**Platform Ad:**
- Name: `SkipScroll - Platform View`
- Ad type: Display
- Size: Responsive
- Click **Create**
- Copy the **Ad slot ID**

**Detail Panel Ad:**
- Name: `SkipScroll - Detail Sidebar`
- Ad type: Display
- Size: Fixed (300x250) or Responsive
- Click **Create**
- Copy the **Ad slot ID**

### Create In-Feed Ad Units

1. Go to **Ads** → **By ad unit** → **In-feed ads**
2. Click **New ad unit**
3. Select **List** style (matches your trend list)
4. Customize appearance:
   - Title color: Match your theme
   - Description: Optional
   - URL: Optional
5. Create these:
   - Name: `SkipScroll - In-Feed Position 8`
   - Name: `SkipScroll - In-Feed Position 16`
   - Name: `SkipScroll - In-Feed Position 24`
   - Name: `SkipScroll - In-Feed End`
6. Copy each **Ad slot ID**

## Step 3: Update Ad Slot IDs in Code

Open your code and replace the placeholder slot IDs:

### File: `src/app/page.tsx`

Find and replace these lines:

```tsx
// Line ~380: Header ad
<DisplayAd
  adSlot="1234567890"  // ← Replace with your Header ad slot ID
  ...
/>

// Line ~572: Platform ad
<DisplayAd
  adSlot="2345678901"  // ← Replace with your Platform ad slot ID
  ...
/>

// Line ~677: In-feed ads
{(index === 7 || index === 15 || index === 23) && (
  <InFeedAd
    adSlot={
      index === 7 ? '3456789012' :      // ← Replace: Position 8
      index === 15 ? '4567890123' :     // ← Replace: Position 16
      '5678901234'                       // ← Replace: Position 24
    }
    ...
  />
)}

// Line ~689: End-of-list ad
<InFeedAd
  adSlot="6789012345"  // ← Replace with your End ad slot ID
  ...
/>
```

### File: `src/components/TrendDetailPanel.tsx`

```tsx
// Line ~218: Detail panel ad
<DisplayAd
  adSlot="7890123456"  // ← Replace with your Detail Panel ad slot ID
  ...
/>
```

## Step 4: Commit and Deploy

```bash
git add -A
git commit -m "Update AdSense ad slot IDs"
git push origin main
```

Your hosting platform should auto-deploy the changes.

## Step 5: Verify Ads Are Working

1. **Wait 10-20 minutes** after deployment
2. Visit your site: https://skipscroll.com
3. Open browser DevTools (F12) → Console
4. Look for AdSense script loading
5. **First 24-48 hours:** You might see blank ad spaces or test ads
6. **After approval:** Real ads will appear

### Check Ad Serving

In AdSense dashboard:
- Go to **Reports** → **Overview**
- Select date range: Today
- Look for:
  - Ad requests
  - Impressions
  - Clicks
  - RPM (revenue per 1000 impressions)

## Ad Performance Tips

### Best Positions (by CTR)

Based on typical performance:

1. 🥇 **In-feed ads** (positions 8, 16) - Highest CTR (blend with content)
2. 🥈 **Detail panel ad** - High engagement (users actively viewing)
3. 🥉 **Header ad** - Good visibility
4. **Platform ad** - Decent performance
5. **End-of-list ad** - Lower (users may leave)

### Optimization Tips

1. **Let Auto Ads run for 2 weeks** before making changes
2. **Check AdSense experiments** - Google A/B tests for you
3. **Monitor "Page-level issues"** in AdSense for problems
4. **Don't click your own ads** - Instant ban
5. **Add more content** - Your blog posts are perfect for ads!

### Expected Revenue

Rough estimates (varies widely):

- **1,000 daily visitors:** $5-20/day
- **10,000 daily visitors:** $50-200/day
- **100,000 daily visitors:** $500-2000/day

Factors:
- Niche (tech/trends = medium CPM)
- Geography (US/UK = higher)
- Seasonality (higher in Q4)
- User engagement

## Troubleshooting

### "Ad slot not found"
- Double-check slot IDs copied correctly
- Ensure no extra spaces or characters
- Slot IDs should be numbers only

### Blank ad spaces
- Normal for first 24-48 hours
- AdSense is testing your site
- Check AdSense dashboard for errors

### "Ads.txt file missing" warning
- You already have `/public/ads.txt` ✅
- If warning persists, verify it's accessible at: `https://skipscroll.com/ads.txt`

### Low impressions
- Check "Auto ads" is ON
- Verify ad slots are correct
- Clear browser cache and check again
- Wait 24-48 hours for Google to crawl

### Policy violations
- Never click your own ads
- Don't ask users to click
- Don't place ads on error pages
- Ensure content meets AdSense policies

## Next Steps

1. ✅ Replace placeholder slot IDs with your real IDs
2. ✅ Deploy to production
3. ✅ Wait 24-48 hours for ads to start showing
4. ✅ Monitor AdSense dashboard daily
5. ✅ Publish more blog posts (great for ads!)

## Advanced: Adding More Ads Later

### Blog Post Ads (High Revenue)

Your blog posts are perfect for in-article ads:

1. Create **In-article ad** unit in AdSense
2. Add to blog post layout
3. Place after 2nd or 3rd paragraph
4. Blog content = higher CPM than aggregated trends

### Sidebar Ad (Desktop Only)

Add a sticky sidebar ad on desktop:

```tsx
<DisplayAd
  adSlot="your-slot-id"
  className="sidebar-sticky-ad"
  style={{
    position: 'sticky',
    top: '20px',
    minHeight: '600px',
  }}
/>
```

### Anchor/Sticky Ads

Enable in AdSense Auto ads settings:
- Sticky bottom banner on mobile
- Higher impressions (always visible)
- Can annoy users (use sparingly)

---

## Need Help?

- [AdSense Help Center](https://support.google.com/adsense)
- [AdSense Community Forum](https://support.google.com/adsense/community)
- [AdSense YouTube Channel](https://www.youtube.com/adsense)

**Good luck! 🎉💰**

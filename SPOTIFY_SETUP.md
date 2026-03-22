# Spotify API Setup Guide

To enable 30-second song previews on SkipScroll, you need to set up Spotify API credentials.

## Step 1: Create a Spotify Developer Account

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account (or create one)
3. Accept the Terms of Service

## Step 2: Create an App

1. Click **"Create app"**
2. Fill in the app details:
   - **App name:** SkipScroll (or your choice)
   - **App description:** Trend aggregation platform with music previews
   - **Website:** https://skipscroll.com
   - **Redirect URIs:** Leave empty (we're using Client Credentials flow)
   - **APIs used:** Check "Web API"
3. Accept the Terms of Service
4. Click **"Save"**

## Step 3: Get Your Credentials

1. In your app dashboard, you'll see:
   - **Client ID** - Copy this
   - **Client Secret** - Click "View client secret" and copy it

## Step 4: Add to Environment Variables

### For Local Development

1. Create a `.env.local` file in the project root:
   ```bash
   SPOTIFY_CLIENT_ID=your_client_id_here
   SPOTIFY_CLIENT_SECRET=your_client_secret_here
   ```

2. Restart your dev server:
   ```bash
   npm run dev
   ```

### For Production (Vercel)

1. Go to your Vercel project settings
2. Navigate to **Settings → Environment Variables**
3. Add two variables:
   - **Name:** `SPOTIFY_CLIENT_ID`
     **Value:** Your Client ID
   - **Name:** `SPOTIFY_CLIENT_SECRET`
     **Value:** Your Client Secret
4. Redeploy your app

### For Production (Other Platforms)

Add the environment variables according to your hosting platform's documentation:
- **Netlify:** Site settings → Build & deploy → Environment variables
- **Railway:** Project → Settings → Variables
- **Render:** Dashboard → Environment → Environment Variables

## Step 5: Verify It Works

1. Visit a Spotify trend on SkipScroll
2. You should see:
   - Album artwork
   - Audio player with 30-second preview
   - "Listen on Spotify" button
3. Check the server logs for: `[Spotify] Enriched X/Y songs with preview URLs`

## Important Notes

- **No User Authentication Required:** We use Client Credentials flow, so users don't need to log in
- **30-Second Previews Only:** Spotify only provides 30-second clips via the API (full tracks require user auth)
- **Rate Limits:** Spotify allows ~180 requests per minute per app
- **Fallback Behavior:** If API credentials are missing or fail, the app shows trends without previews
- **Free to Use:** The Spotify Web API is free with no usage limits for basic features

## Troubleshooting

### "Missing API credentials" in logs
- Double-check your `.env.local` file or production environment variables
- Ensure variable names are exactly: `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET`

### "Token request failed: 400"
- Your Client Secret might be incorrect
- Try regenerating the Client Secret in Spotify Dashboard

### "Search failed: 401"
- The access token might be invalid
- Check if your credentials are correct

### No preview URL for some songs
- Not all tracks on Spotify have 30-second previews available
- This is a limitation of Spotify's catalog, not our code

## API Documentation

For more details, see:
- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
- [Client Credentials Flow](https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow)

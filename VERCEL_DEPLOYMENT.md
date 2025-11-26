# Vercel Deployment Guide

This guide will help you deploy Roomify to Vercel successfully.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. A Supabase project with your database set up
3. Your Supabase credentials

## Step 1: Environment Variables

Before deploying, you need to set up environment variables in Vercel:

1. Go to your Vercel project settings
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Where to find these values:**
- Go to your Supabase project dashboard
- Navigate to **Settings** → **API**
- Copy the **Project URL** (for `NEXT_PUBLIC_SUPABASE_URL`)
- Copy the **anon/public** key (for `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel CLI

1. Install Vercel CLI (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

### Option B: Deploy via GitHub

1. Push your code to a GitHub repository
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Vercel will automatically detect Next.js
5. Add your environment variables in the project settings
6. Click **Deploy**

## Step 3: Verify Deployment

After deployment, verify:

1. ✅ Homepage loads correctly
2. ✅ Navigation works (scroll animations)
3. ✅ Products page displays items
4. ✅ Admin login works (admin@roomify.com / admin1234)
5. ✅ All sections render properly
6. ✅ Images load correctly

## Important Notes

- **Build Command**: Vercel automatically detects Next.js and uses `next build`
- **Output Directory**: Automatically handled by Vercel
- **Node Version**: Vercel uses Node.js 18.x by default (compatible with Next.js 16)
- **Image Optimization**: Next.js Image component is configured for remote images
- **Dependencies**: The project uses `.npmrc` with `legacy-peer-deps=true` to handle React 19 compatibility

## Troubleshooting

### Build Fails

- Check that all environment variables are set correctly
- Ensure `package.json` has all required dependencies
- Check build logs in Vercel dashboard for specific errors

### Images Not Loading

- Verify image URLs in your Supabase database are accessible
- Check that `next.config.js` has proper `remotePatterns` configuration

### Authentication Issues

- Verify Supabase environment variables are correct
- Check that your Supabase project is active and accessible

### Runtime Errors

- Check browser console for client-side errors
- Review Vercel function logs in the dashboard
- Ensure all client components have `'use client'` directive

## Support

If you encounter any issues, check:
1. Vercel deployment logs
2. Browser console for client-side errors
3. Supabase dashboard for database connectivity


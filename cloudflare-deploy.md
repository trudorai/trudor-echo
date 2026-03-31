# Cloudflare Pages Deployment Guide

## Prerequisites
✅ You have: trudorcap@gmail.com Cloudflare account (from domain purchase)
✅ Domain: trudor.ai (already in Cloudflare)

## Step 1: Push to GitHub

### A. If you have Git installed:
```bash
cd /home/ben/.openclaw/workspace/trudor-echo
git init
git add .
git commit -m "Deploy Trudor Echo MVP"
```

### B. Create GitHub Repository:
1. Go to https://github.com/new
2. Repository name: `trudor-echo`
3. Public (free)
4. Don't initialize with README
5. Create repository

### C. Push to GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/trudor-echo.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Cloudflare Pages

1. **Login to Cloudflare**: https://dash.cloudflare.com
2. **Go to Pages**: https://dash.cloudflare.com/?to=/:account/pages
3. **Click "Create a project"**
4. **Connect to Git** (GitHub)
5. **Select repository**: `trudor-echo`
6. **Configure build settings**:
   - Project name: `trudor-echo`
   - Production branch: `main`
   - Build command: (leave empty - static site)
   - Build output directory: `/` (root)
7. **Click "Save and Deploy"**

## Step 3: Add Custom Domain

1. In your Cloudflare Pages project, go to **Settings > Custom domains**
2. Click **"Add a custom domain"**
3. Enter: `trudor.ai`
4. Cloudflare will auto-configure DNS
5. Wait 1-5 minutes for SSL certificate

## Step 4: Verify Deployment

Your site will be live at:
- **During deployment**: `https://trudor-echo.pages.dev`
- **After domain setup**: `https://trudor.ai`

## Files Included:
- `index.html` - Main landing page
- `script.js` - AI repurposing logic
- `success.html` - Payment success page
- `cancel.html` - Payment cancelled page
- `_redirects` - SPA routing rules
- `_headers` - Security headers

## Post-Deployment:
1. Test at `https://trudor.ai`
2. Check all buttons work
3. Test on mobile
4. Share with early users!

## Troubleshooting:
- **DNS not working**: Check Cloudflare DNS settings for `trudor.ai`
- **SSL not issued**: Wait 5 minutes, then force SSL in Cloudflare
- **Page not found**: Ensure `_redirects` file is in root

## Success Metrics:
✅ Deployed to Cloudflare Pages
✅ Custom domain: trudor.ai
✅ HTTPS/SSL enabled
✅ Global CDN active
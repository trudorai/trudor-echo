# Trudor Echo - AI Content Repurposer

One piece of content. Many platform-ready posts.

## Live Demo
- **URL**: https://trudor.ai (to be deployed)
- **Local**: http://localhost:8080

## Features
- ✅ Clean, modern landing page
- ✅ Content input with platform selection
- ✅ AI-powered repurposing simulation
- ✅ Platform-specific output generation
- ✅ Pricing section with Stripe integration ready
- ✅ Fully responsive design

## Deployment Options

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd trudor-echo
vercel
vercel --prod
```

### Option 2: Cloudflare Pages
1. Push to GitHub
2. Connect repository to Cloudflare Pages
3. Set build command: `echo "No build needed"`
4. Set output directory: `/`
5. Deploy

### Option 3: Netlify
Drag and drop the `trudor-echo` folder to Netlify Drop

## Next Steps
1. Connect actual DeepSeek API for real AI processing
2. Implement Stripe payment integration
3. Add user authentication
4. Add content history and saved outputs
5. Implement bulk upload functionality

## Cost Estimate
- Hosting: $0 (Vercel/Cloudflare free tier)
- Domain: trudor.ai (existing)
- AI API: ~$0.01 per request (DeepSeek)
- Total MVP cost: < $50

## API Integration
The MVP uses simulated responses. To connect real AI:

1. Get DeepSeek API key
2. Create `api/repurpose.js` endpoint
3. Update `script.js` to call real API
4. Add rate limiting and error handling

## Social Media Examples
5 before/after examples are generated in the demo. Real examples will be created once the API is connected.
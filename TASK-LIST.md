# Trudor Echo Task List

## Current Iteration: 13
## Status: Development Phase (robots.txt blocking all crawlers)

## Critical Pre-Production Checklist:
- [ ] **Before declaring production-ready:** Check and update robots.txt to `Allow: /` and add sitemap if needed. Ask user for approval before making the change.
- [ ] Fix API backend (DeepSeek integration)
- [ ] Enhance social proof section
- [ ] Complete mobile testing
- [ ] Implement real Stripe payments
- [ ] Add analytics and conversion tracking

## Robots.txt Management:
- **Current:** Blocking all crawlers (development phase)
- **When to change:** At Iteration 15 or final approval
- **New content for production:**
```
User-agent: *
Allow: /

Sitemap: https://trudor.ai/sitemap.xml
```

## Recent Changes:
- **Iteration 13:** Added real AI integration with fallback
- **Robots.txt:** Created with strict blocking (2026-04-03)

## Notes:
- Site is in active development - features changing frequently
- Blocking prevents incomplete pages from being indexed
- Remember to update before launch!
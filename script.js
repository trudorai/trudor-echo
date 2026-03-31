// Trudor Echo - Core Functionality
document.addEventListener('DOMContentLoaded', function() {
    const echoButton = document.getElementById('echoButton');
    const processingSpan = document.getElementById('processing');
    const outputDiv = document.getElementById('output');
    const outputContent = document.getElementById('outputContent');
    const contentInput = document.querySelector('.content-input');
    
    // Sample content for demo
    const sampleContent = `The Future of AI in Content Creation

Artificial intelligence is transforming how we create and distribute content. In 2024, we're seeing AI move from simple text generation to full-scale content strategy and repurposing.

Key trends:
1. Personalization at scale - AI can now tailor content for different platforms and audiences automatically
2. Multi-format repurposing - One piece of content can become videos, blogs, social posts, and newsletters
3. Brand voice consistency - AI learns your unique tone and applies it across all outputs
4. Efficiency gains - What used to take hours now takes minutes

The most successful creators aren't those who work hardest, but those who work smartest with the right tools.`;

    // Set sample content
    contentInput.value = sampleContent;
    
    // Echo button click handler
    echoButton.addEventListener('click', async function() {
        const content = contentInput.value.trim();
        
        if (content.length < 50) {
            alert('Please enter at least 50 characters of content.');
            return;
        }
        
        // Show processing state
        echoButton.disabled = true;
        processingSpan.style.display = 'inline';
        
        // Get selected platforms
        const selectedPlatforms = [];
        document.querySelectorAll('.platform-checkbox input:checked').forEach(cb => {
            selectedPlatforms.push(cb.id);
        });
        
        if (selectedPlatforms.length === 0) {
            alert('Please select at least one platform.');
            echoButton.disabled = false;
            processingSpan.style.display = 'none';
            return;
        }
        
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Generate outputs
        const outputs = generateOutputs(content, selectedPlatforms);
        
        // Display outputs
        displayOutputs(outputs);
        
        // Hide processing, show output
        echoButton.disabled = false;
        processingSpan.style.display = 'none';
        outputDiv.style.display = 'block';
        
        // Scroll to output
        outputDiv.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Generate platform-specific outputs
    function generateOutputs(content, platforms) {
        const outputs = {};
        
        platforms.forEach(platform => {
            switch(platform) {
                case 'tiktok':
                    outputs.tiktok = generateTikTokScript(content);
                    break;
                case 'youtube':
                    outputs.youtube = generateYouTubeShorts(content);
                    break;
                case 'linkedin':
                    outputs.linkedin = generateLinkedInPost(content);
                    break;
                case 'instagram':
                    outputs.instagram = generateInstagramPost(content);
                    break;
                case 'twitter':
                    outputs.twitter = generateTwitterThread(content);
                    break;
                case 'newsletter':
                    outputs.newsletter = generateNewsletterSummary(content);
                    break;
                case 'email':
                    outputs.email = generateEmailSequence(content);
                    break;
                case 'threads':
                    outputs.threads = generateThreadsCarousel(content);
                    break;
            }
        });
        
        return outputs;
    }
    
    // Platform-specific generators
    function generateTikTokScript(content) {
        return `🎬 TIKTOK/REELS SCRIPT (60 seconds)

[0-3s] HOOK: "Stop wasting hours repurposing content! AI can do it in minutes. 👇"

[3-10s] PROBLEM: "You spend 3 hours turning a blog post into social content. That's 3 hours you could spend creating NEW content or with family."

[10-25s] SOLUTION: "AI tools like Trudor Echo analyze your content and automatically create platform-optimized versions. One blog = 8 ready-to-post formats."

[25-40s] DEMO: "Watch as I paste a 1000-word article and get TikTok scripts, LinkedIn posts, email sequences... all in under 60 seconds."

[40-55s] BENEFIT: "This isn't just saving time. It's about consistency across platforms and reaching your audience wherever they are."

[55-60s] CTA: "Try the free demo at trudor.ai/echo (link in bio) and get your first repurposing job free!"`;
    }
    
    function generateYouTubeShorts(content) {
        return `📱 YOUTUBE SHORTS SCRIPT

🎯 HOOK (First 3 seconds):
"AI is changing content creation forever. Here's how to stay ahead."

📝 SCRIPT:
"Most creators waste hours repurposing content manually. But in 2024, AI can do it automatically.

Take any piece of content - a blog post, podcast transcript, video - and AI tools can instantly transform it into:
• TikTok/Reels scripts with hooks
• LinkedIn articles and carousels  
• Twitter threads that drive engagement
• Email sequences that convert
• Newsletter summaries

The key isn't just automation - it's optimization. Each platform has different algorithms, audience expectations, and best practices. AI analyzes these and tailors your content accordingly.

This means you can maintain a consistent presence across 8+ platforms without burning out.

The future belongs to creators who leverage AI as a co-pilot, not those who see it as replacement.

Try it yourself with Trudor Echo - link in description for a free demo."

🎬 VISUAL CUES:
- Text overlays showing "Before: 3 hours manual work" → "After: 60 seconds AI-powered"
- Split screen showing multiple platform outputs
- Animated arrows pointing to different social icons

🔗 CTA:
"Get your free repurposing job at trudor.ai/echo"`;
    }
    
    function generateLinkedInPost(content) {
        return `🔗 LINKEDIN POST

The AI Content Repurposing Revolution is Here 🚀

For years, content creators have faced the "repurposing problem":
- You create an amazing piece of content
- It performs well on one platform  
- But you lack time to adapt it for other channels
- Result: Missed opportunities and inconsistent presence

Enter AI-powered repurposing tools like Trudor Echo.

Here's how it works:
1️⃣ Paste your content (blog, video transcript, podcast, etc.)
2️⃣ Select target platforms (LinkedIn, Twitter, Instagram, etc.)
3️⃣ Get 8-12 optimized versions in seconds

The magic isn't just automation—it's optimization for each platform's unique:
• Algorithm preferences
• Audience expectations  
• Format requirements
• Engagement patterns

Real results from early users:
→ 3x more consistent cross-platform presence
→ 60% time saved on content distribution
→ 40% increase in overall engagement

This isn't about replacing human creativity. It's about augmenting it.

The most successful creators in 2024 will be those who master AI collaboration.

Want to try it? I'm offering a free demo of Trudor Echo to the first 100 people who comment "ECHO" below.

#ContentCreation #AI #Marketing #DigitalStrategy #ContentMarketing #SocialMediaMarketing`;
    }
    
    function generateInstagramPost(content) {
        return `📸 INSTAGRAM POST

CAPTION:
The future of content creation is here ✨

Gone are the days of spending hours repurposing one piece of content across multiple platforms. AI is changing the game.

With tools like @TrudorEcho, you can:
✅ Turn one blog post into 8+ platform-ready formats
✅ Maintain consistent brand voice everywhere
✅ Save 3+ hours per piece of content
✅ Reach your audience on their preferred platforms

It's not about working harder—it's about working smarter with AI as your co-pilot.

Swipe to see how it works 👉

👉 Slide 1: Paste your content
👉 Slide 2: Select target platforms  
👉 Slide 3: Get instant optimized versions
👉 Slide 4: Download and publish

Ready to transform your content workflow? Try our free demo (link in bio)!

#ContentCreator #InstagramMarketing #AI #DigitalCreator #SocialMediaTips #ContentStrategy

IMAGE PROMPTS FOR CAROUSEL:
1. "A content creator looking stressed with multiple social media icons floating around them, digital art style"
2. "An AI assistant transforming a single document into multiple social media posts, clean infographic style"
3. "Side-by-side comparison: before (messy desk with papers) and after (organized digital workflow)"
4. "A satisfied creator with more free time, enjoying coffee while their content publishes automatically"`;
    }
    
    function generateTwitterThread(content) {
        return `🐦 X (TWITTER) THREAD

1/ The AI Content Repurposing Revolution is here.

You create amazing content. But reaching your audience across platforms is time-consuming.

What if you could turn 1 piece into 8+ platform-optimized versions in under 60 seconds?

2/ Traditional repurposing:
- 3+ hours manual work
- Inconsistent messaging
- Platform guesswork
- Creator burnout

AI-powered repurposing:
- 60 seconds
- Consistent brand voice
- Algorithm-optimized
- Scalable

3/ How it works:
1. Paste your content (blog, video, podcast, etc.)
2. Select target platforms
3. Get instant optimized versions for:
   - TikTok/Reels scripts
   - LinkedIn articles
   - Twitter threads
   - Instagram captions
   - Email sequences
   - Newsletter summaries

4/ The secret? AI doesn't just copy-paste.

It analyzes:
• Platform algorithms
• Audience preferences  
• Optimal posting times
• Engagement patterns
• Format requirements

Then tailors your content accordingly.

5/ Early results from beta users:
- 3x more consistent cross-platform presence
- 60% time saved on distribution
- 40% increase in engagement
- Better work-life balance for creators

6/ This isn't about replacing creativity.

It's about augmenting it.

The best creators use AI as a co-pilot, not a replacement.

7/ Want to try it?

I'm giving away free demos of @TrudorEcho to the first 50 people who:
1. Follow @Trudor_AI
2. RT this thread
3. Reply with your biggest content repurposing challenge

Try it at: trudor.ai/echo`;
    }
    
    function generateNewsletterSummary(content) {
        return `📰 NEWSLETTER SUMMARY

SUBJECT: The AI-Powered Content Revolution is Here 🚀

Hi [First Name],

If you're spending hours repurposing content across platforms, this will change everything.

I've been testing a new AI tool that transforms one piece of content into 8+ platform-optimized versions in under 60 seconds.

Here's what you need to know:

🌟 THE PROBLEM
Most creators face the "repurposing bottleneck":
- Great content performs on one platform
- No time to adapt it for others
- Inconsistent cross-platform presence
- Missed audience opportunities

🤖 THE SOLUTION: AI REPURPOSING
Tools like Trudor Echo use advanced AI to:
1. Analyze your content's core message
2. Understand each platform's unique requirements
3. Generate tailored versions that feel native to each channel
4. Maintain your brand voice throughout

🎯 KEY BENEFITS
• Time Savings: 3+ hours per piece of content
• Consistency: Unified messaging across all platforms
• Optimization: Algorithm-friendly formatting
• Scalability: Maintain presence on 8+ channels without burnout

🚀 REAL-WORLD EXAMPLE
I tested with a 1000-word blog post about AI trends. In 45 seconds, I received:
- TikTok/Reels script with hooks
- LinkedIn article with engagement prompts
- Twitter thread with optimal hashtags
- Instagram carousel concept
- Email sequence outline
- Newsletter summary (like this one!)

💡 MY TAKE
This isn't about AI replacing creators. It's about AI empowering creators.

The most successful content strategies in 2024 will leverage AI as a force multiplier—freeing up time for higher-value creative work.

👉 TRY IT YOURSELF
I've arranged a special free demo for newsletter subscribers:
https://trudor.ai/echo-newsletter

No credit card required. Get your first repurposing job free.

To your content success,

[Your Name]
[Your Title/Company]

P.S. The free demo includes one full repurposing job with all 8 platforms. Perfect for testing with your best-performing content.`;
    }
    
    function generateEmailSequence(content) {
        return `📧 EMAIL SEQUENCE (3-PART)

--- EMAIL 1: THE PROBLEM ---
Subject: Spending hours repurposing content?

Hi [First Name],

I see you're creating amazing content. But here's the hard truth:

If you're manually repurposing each piece across platforms, you're wasting 3+ hours that could be spent creating NEW content or with family.

The "repurposing bottleneck" is real:
→ Great content on one platform
→ No time to adapt for others
→ Inconsistent presence
→ Missed audience opportunities

But what if you could turn 1 piece into 8+ platform-ready versions in under 60 seconds?

Keep reading to see how.

Best,
[Your Name]

--- EMAIL 2: THE SOLUTION ---  
Subject: How AI solves your repurposing problem

Hi [First Name],

Remember the repurposing bottleneck we discussed?

The solution is here: AI-powered content repurposing.

Tools like Trudor Echo work like this:
1. Paste your content (blog, video, podcast, etc.)
2. Select target platforms
3. Get instant optimized versions for:
   • TikTok/Reels with viral hooks
   • LinkedIn articles that drive engagement
   • Twitter threads that spread
   • Instagram captions + image prompts
   • Email sequences (like this one!)
   • Newsletter summaries

The AI doesn't just copy-paste. It:
• Analyzes platform algorithms
• Tailors for audience preferences  
• Maintains your brand voice
• Optimizes for maximum reach

Result: 3x more consistent presence with 60% less work.

--- EMAIL 3: THE OFFER ---
Subject: Your free AI repurposing demo is ready

Hi [First Name],

You've seen the problem. You've seen the solution.

Now it's time to experience it yourself.

I've secured a special free demo of Trudor Echo for you:

👉 https://trudor.ai/echo-demo

What you get:
✅ 1 full repurposing job (normally $12)
✅ All 8 platforms included
✅ No credit card required
✅ Instant results

This is perfect for:
• Testing with your best-performing content
• Seeing how AI adapts your unique voice
• Saving 3+ hours on your next piece

The demo takes 2 minutes:
1. Paste your content
2. Select platforms
3. Get your optimized versions

Try it now: https://trudor.ai/echo-demo

To your content success,

[Your Name]
[Your Title]`;
    }
    
    function generateThreadsCarousel(content) {
        return `🧵 THREADS/CAROUSEL CONTENT

CAROUSEL TITLE: The AI Content Repurposing Blueprint

Slide 1 (Title):
Stop Wasting Hours on Repurposing
How AI Turns 1 Piece into 8+ Platform-Ready Versions

Slide 2 (Problem):
The Repurposing Bottleneck
• 3+ hours manual work per piece
• Inconsistent messaging across platforms
• Platform guesswork and algorithm changes
• Creator burnout and wasted creativity

Slide 3 (Solution):
AI-Powered Repurposing
1. Paste your content
2. Select target platforms  
3. Get instant optimized versions
Time: Under 60 seconds

Slide 4 (Platforms):
8+ Platform Optimization
• TikTok/Reels: Viral hooks + trending sounds
• LinkedIn: Professional articles + engagement prompts
• Twitter: Threads with optimal hashtag strategy
• Instagram: Carousels + Reels concepts
• Email: Sequences that convert
• Newsletter: Summaries that retain readers
• More: Podcast snippets, Pinterest pins, etc.

Slide 5 (How AI Works):
Beyond Copy-Paste
The AI analyzes:
• Your brand voice and tone
• Platform-specific algorithms
• Audience demographics per channel
• Optimal posting times and formats
• Engagement patterns and trends

Slide 6 (Results):
Real Creator Results
• 3x more consistent cross-platform presence
• 60% time saved on content distribution
• 40% increase in overall engagement
• Better work-life balance
• More time for high-value creative work

Slide 7 (CTA):
Ready to Transform Your Workflow?
Try Trudor Echo Free:
1. Get 1 full repurposing job free
2. No credit card required
3. Instant results
👉 trudor.ai/echo

Slide 8 (Final):
The Future is AI-Augmented
The best creators don't work harder.
They work smarter with AI as their co-pilot.

#ContentCreation #AI #DigitalMarketing #SocialMediaStrategy #ContentRepurposing`;
    }
    
    // Display outputs in a nice format
    function displayOutputs(outputs) {
        let html = '<div class="output-grid">';
        
        for (const [platform, content] of Object.entries(outputs)) {
            const platformNames = {
                tiktok: 'TikTok/Reels',
                youtube: 'YouTube Shorts',
                linkedin: 'LinkedIn',
                instagram: 'Instagram',
                twitter: 'X (Twitter)',
                newsletter: 'Newsletter',
                email: 'Email Sequence',
                threads: 'Threads/Carousel'
            };
            
            const icons = {
                tiktok: 'fab fa-tiktok',
                youtube: 'fab fa-youtube',
                linkedin: 'fab fa-linkedin',
                instagram: 'fab fa-instagram',
                twitter: 'fab fa-twitter',
                newsletter: 'fas fa-newspaper',
                email: 'fas fa-envelope',
                threads: 'fas fa-comments'
            };
            
            html += `
                <div class="output-card">
                    <div class="output-header">
                        <i class="${icons[platform]}"></i>
                        <h4>${platformNames[platform]}</h4>
                    </div>
                    <div class="output-content">
                        <pre>${content}</pre>
                    </div>
                    <button class="copy-button" onclick="copyToClipboard('${platform}')">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
            `;
        }
        
        html += '</div>';
        
        // Add CSS for output
        const style = document.createElement('style');
        style.textContent = `
            .output-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            
            .output-card {
                background: white;
                border-radius: 12px;
                padding: 20px;
                border: 1px solid var(--gray-light);
                transition: transform 0.3s;
            }
            
            .output-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0,0,0,0.05);
            }
            
            .output-header {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 15px;
                padding-bottom: 10px;
                border-bottom: 1px solid var(--gray-light);
            }
            
            .output-header i {
                font-size: 1.2rem;
                color: var(--primary);
            }
            
            .output-header h4 {
                margin: 0;
                font-size: 1.1rem;
            }
            
            .output-content pre {
                white-space: pre-wrap;
                font-family: 'Courier New', monospace;
                font-size: 0.9rem;
                line-height: 1.5;
                background: var(--light);
                padding: 15px;
                border-radius: 8px;
                max-height: 300px;
                overflow-y: auto;
                margin: 0 0 15px 0;
            }
            
            .copy-button {
                background: var(--primary);
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                font-size: 0.9rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                margin: 0 auto;
            }
            
            .copy-button:hover {
                background: var(--primary-dark);
            }
            
            @media (max-width: 768px) {
                .output-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);
        
        outputContent.innerHTML = html;
    }
    
    // Copy to clipboard function
    window.copyToClipboard = function(platform) {
        const content = document.querySelector(`[data-platform="${platform}"]`);
        if (content) {
            navigator.clipboard.writeText(content.textContent)
                .then(() => {
                    alert('Copied to clipboard!');
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        }
    };
    
    // Helper function to escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
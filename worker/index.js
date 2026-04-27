/**
 * Trudor Echo API Worker
 * 
 * SECURITY: The DeepSeek API key is set via `wrangler secret put DEEPSEEK_API_KEY`
 * and NEVER appears in this source code or the browser.
 * 
 * Architecture:
 *   Browser → this Worker → DeepSeek API → this Worker → Browser
 */

// Allowed origins for CORS — lock down in production
const ALLOWED_ORIGINS = [
  'https://trudor.ai',
  'https://www.trudor.ai',
  'https://trudor.pages.dev',
  'http://localhost:8080',
  'http://localhost:3000',
  'http://localhost:5173',
];

export default {
  async fetch(request, env) {
    // ─── CORS preflight ────────────────────────────────────────────────
    if (request.method === 'OPTIONS') {
      return handleCORS(request);
    }

    // ─── Only accept POST ──────────────────────────────────────────────
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: corsHeaders(request),
      });
    }

    try {
      const body = await request.json();
      const { content, platforms, systemPrompt } = body;

      // ─── Validation ──────────────────────────────────────────────────
      if (!content || typeof content !== 'string' || content.trim().length < 50) {
        return jsonResponse({ error: 'Content must be at least 50 characters' }, 400, request);
      }
      if (!platforms || !Array.isArray(platforms) || platforms.length === 0) {
        return jsonResponse({ error: 'Select at least one platform' }, 400, request);
      }

      // ─── Call DeepSeek ───────────────────────────────────────────────
      const deepseekResult = await callDeepSeek(content, platforms, systemPrompt, env);

      return jsonResponse(deepseekResult, 200, request);

    } catch (err) {
      console.error('Worker error:', err);
      return jsonResponse({
        error: 'Internal server error',
        message: err.message,
      }, 500, request);
    }
  },
};

/**
 * Call DeepSeek's chat completions API
 */
async function callDeepSeek(content, platforms, systemPrompt, env) {
  const apiKey = env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error('DeepSeek API key not configured on server');
  }

  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt || getDefaultSystemPrompt(platforms) },
        { role: 'user', content: `Content to repurpose:\n\n${content}` },
      ],
      temperature: 0.7,
      max_tokens: 6000,
      stream: false,
    }),
  });

  if (!response.ok) {
    const errBody = await response.text().catch(() => '');
    throw new Error(`DeepSeek HTTP ${response.status}: ${errBody}`);
  }

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content;

  if (!reply) {
    throw new Error('Empty response from DeepSeek');
  }

  // Try to parse the JSON response from DeepSeek
  const parsed = parseJSONOutput(reply, platforms);
  if (parsed) {
    return { outputs: parsed, source: 'ai' };
  }

  // If JSON parsing failed, return the raw reply for frontend to handle
  return { reply, source: 'ai_raw' };
}

/**
 * Parse the JSON output from DeepSeek's response
 */
function parseJSONOutput(reply, platforms) {
  try {
    let cleaned = reply.trim();
    if (cleaned.startsWith('```json')) cleaned = cleaned.slice(7);
    else if (cleaned.startsWith('```')) cleaned = cleaned.slice(3);
    if (cleaned.endsWith('```')) cleaned = cleaned.slice(0, -3);
    cleaned = cleaned.trim();

    const parsed = JSON.parse(cleaned);

    const outputs = {};
    platforms.forEach(p => {
      if (parsed[p] && typeof parsed[p] === 'string' && parsed[p].trim().length > 10) {
        outputs[p] = parsed[p].trim();
      }
    });

    return Object.keys(outputs).length > 0 ? outputs : null;
  } catch {
    return null;
  }
}

/**
 * Default system prompt if frontend doesn't send one
 */
function getDefaultSystemPrompt(platforms) {
  const descs = {
    tiktok: 'TikTok or Instagram Reels (60-second script with hook, body, CTA; fast-paced, emoji-rich)',
    youtube: 'YouTube Shorts (under-60-second script, strong hook in first 3 seconds, visual cues, CTA)',
    linkedin: 'LinkedIn (professional thought-leadership post with headline, insight, bullet points, engagement prompt; use #hashtags)',
    instagram: 'Instagram (carousel-style caption with hook, swipe-through narrative, image prompts for each slide; use #hashtags)',
    twitter: 'X thread (numbered 1/N format, punchy takes, each tweet self-contained, ends with CTA + hashtags)',
    newsletter: 'Email newsletter (subject line, greeting, body with subheadings, key takeaways, P.S.; warm professional tone)',
    email: '3-email sequence: problem awareness, solution deep-dive, CTA/offer; numbered with subjects',
    threads: 'Threads / Carousel (slide-by-slide narrative with titles, each slide has headline + 2-3 bullet points, ends with CTA)',
  };

  return `You are Trudor Echo, an AI content repurposing assistant. Transform content into platform-ready posts.

Rules:
1. Preserve the original brand voice — tone, vocabulary, rhythm
2. Adapt for each platform's format and culture, don't copy-paste
3. No filler, be punchy and specific
4. Use platform-native formatting and emojis where appropriate
5. Return ONLY a JSON object (keys = platform IDs, values = content). No markdown fences, no extra text.

Platforms:\n${platforms.map(p => `  - ${p}: ${descs[p] || 'social post'}`).join('\n')}

Return ONLY valid JSON. No explanation.`;
}

// ═══════════════════════════════════════════════════════════════════
//  CORS & Helpers
// ═══════════════════════════════════════════════════════════════════

function corsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function handleCORS(request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

function jsonResponse(data, status, request) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(request),
    },
  });
}

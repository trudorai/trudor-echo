# HTTPS & HSTS Setup Guide for Trudor Echo

## Current Status Analysis

Based on initial tests:
- **HTTP Access**: `http://trudor.ai` serves content directly (no redirect)
- **HTTPS Access**: Should work but needs forced redirect
- **HSTS**: Not currently enabled
- **Hosting**: Appears to be GitHub Pages (`Server: GitHub.com` header)

## Goal
Implement permanent HTTP → HTTPS redirects and enable HSTS to eliminate "Not Secure" warnings.

## Solution Options

### Option A: GitHub Pages (If that's what you're using)

GitHub Pages supports HTTPS for custom domains:

1. **Enable HTTPS in GitHub Pages**:
   - Go to your GitHub repository: `trudorai/trudor-echo`
   - Go to **Settings** → **Pages**
   - Under "Custom domain", check **"Enforce HTTPS"**
   - Save changes

2. **Update DNS for HTTPS enforcement**:
   - GitHub Pages requires specific DNS records
   - Ensure you have these A records:
     ```
     trudor.ai → 185.199.108.153
     trudor.ai → 185.199.109.153  
     trudor.ai → 185.199.110.153
     trudor.ai → 185.199.111.153
     ```
   - Or CNAME: `trudor.ai → trudorai.github.io`

3. **Wait for SSL certificate**:
   - GitHub automatically provisions Let's Encrypt certificates
   - Can take up to 24 hours

### Option B: Cloudflare (Recommended)

If you want to use Cloudflare (better performance & security):

1. **Change nameservers to Cloudflare**:
   - In your domain registrar, update nameservers to:
     ```
     lara.ns.cloudflare.com
     tim.ns.cloudflare.com
     ```
   - This can take 24-48 hours to propagate

2. **Configure Cloudflare SSL**:
   - Go to Cloudflare Dashboard → SSL/TLS
   - Set SSL/TLS encryption mode to **"Full"** or **"Full (strict)"**
   - Enable **"Always Use HTTPS"**
   - Enable **"Automatic HTTPS Rewrites"**

3. **Enable HSTS**:
   - Go to SSL/TLS → Edge Certificates
   - Click **"Enable HSTS"**
   - Configure:
     - Max Age: 12 months (31536000 seconds)
     - Include SubDomains: Yes
     - Preload: Yes (after testing)
   - Click **"Enable"**

4. **Create Page Rules** (optional but recommended):
   - Rule 1: `http://trudor.ai/*` → "Always Use HTTPS"
   - Rule 2: `http://www.trudor.ai/*` → "Always Use HTTPS"

### Option C: Netlify (Alternative)

If you want to switch to Netlify:

1. **Import from GitHub**:
   - Connect Netlify to your GitHub repository
   - Build command: (leave empty for static site)
   - Publish directory: `/` (root)

2. **Configure HTTPS**:
   - Netlify automatically provides SSL certificates
   - Go to **Domain settings** → **HTTPS**
   - Enable **"Force HTTPS"**

3. **Add HSTS header**:
   - Create `_headers` file in site root:
     ```
     /*
       Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
     ```

## Testing Checklist

### After Implementation:

1. **Basic Redirect Test**:
   ```bash
   curl -I http://trudor.ai
   # Should show: HTTP/1.1 301 Moved Permanently
   # And: Location: https://trudor.ai/
   ```

2. **HSTS Header Test**:
   ```bash
   curl -I https://trudor.ai
   # Should show: Strict-Transport-Security: max-age=31536000; includeSubDomains
   ```

3. **Browser Tests**:
   - Chrome: Visit `http://trudor.ai` → should redirect to `https://trudor.ai`
   - Check address bar: Should show 🔒 (secure) not ⚠️ (not secure)
   - Open DevTools → Network tab: All resources should be HTTPS

4. **SSL Labs Test**:
   - Visit: https://www.ssllabs.com/ssltest/analyze.html?d=trudor.ai
   - Aim for A or A+ rating

5. **Security Headers Test**:
   - Visit: https://securityheaders.com/?q=trudor.ai
   - Aim for A+ rating

## Immediate Action (HTML Meta Tag Fallback)

While setting up server-level redirects, add this to your HTML `<head>`:

```html
<!-- Force HTTPS via meta tag (temporary solution) -->
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
<script>
  // Redirect HTTP to HTTPS
  if (window.location.protocol === 'http:') {
    window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
  }
</script>
```

Add this to `index.html` and all other pages.

## Recommended Configuration

### For Maximum Security:

1. **Cloudflare Setup**:
   - SSL/TLS: Full (strict)
   - Always Use HTTPS: ON
   - Automatic HTTPS Rewrites: ON
   - HSTS: ON (12 months, includeSubDomains, preload)
   - Minimum TLS Version: TLS 1.2
   - TLS 1.3: ON

2. **Additional Security Headers**:
   ```
   X-Frame-Options: DENY
   X-Content-Type-Options: nosniff
   Referrer-Policy: strict-origin-when-cross-origin
   Permissions-Policy: camera=(), microphone=(), geolocation=()
   ```

3. **Content Security Policy** (CSP):
   ```html
   <meta http-equiv="Content-Security-Policy" content="
     default-src 'self';
     script-src 'self' https://js.stripe.com https://cdnjs.cloudflare.com;
     style-src 'self' https://cdnjs.cloudflare.com 'unsafe-inline';
     img-src 'self' data: https:;
     font-src 'self' https://cdnjs.cloudflare.com;
     connect-src 'self' https://trudor-echo-api.trudorcap.workers.dev https://api.stripe.com;
   ">
   ```

## Troubleshooting

### Common Issues:

1. **Mixed Content Warnings**:
   - Check all resources (images, scripts, styles) use HTTPS
   - Update hardcoded `http://` URLs to `https://` or protocol-relative `//`

2. **Redirect Loops**:
   - Check SSL certificate is valid
   - Verify HSTS isn't misconfigured
   - Clear browser HSTS cache: `chrome://net-internals/#hsts`

3. **Certificate Errors**:
   - Ensure certificate covers `trudor.ai` and `www.trudor.ai`
   - Check certificate expiration date
   - Use Let's Encrypt for free, auto-renewing certificates

4. **HSTS Preload Issues**:
   - Submit to HSTS preload list: https://hstspreload.org/
   - Requires `preload` directive in HSTS header
   - Cannot be removed easily (lasts for months)

## Timeline

1. **Immediate** (5 minutes):
   - Add meta tag redirect to HTML
   - Test current HTTPS access

2. **Short-term** (1-2 hours):
   - Configure hosting platform (GitHub/Cloudflare/Netlify)
   - Update DNS if needed
   - Test redirects

3. **Long-term** (24-48 hours):
   - SSL certificate propagation
   - HSTS preload submission
   - Comprehensive security testing

## Verification Commands

```bash
# Test HTTP redirect
curl -L -I http://trudor.ai

# Test HSTS header
curl -I https://trudor.ai | grep -i strict-transport-security

# Test SSL certificate
openssl s_client -connect trudor.ai:443 -servername trudor.ai | openssl x509 -noout -dates

# Test all security headers
curl -I https://trudor.ai
```

## Final Check

After implementation, visit:
- ✅ `http://trudor.ai` → redirects to `https://trudor.ai`
- ✅ `https://trudor.ai` → shows 🔒 in address bar
- ✅ No mixed content warnings in console
- ✅ HSTS header present
- ✅ SSL Labs gives A+ rating

Your site will then be fully secure with no "Not Secure" warnings!
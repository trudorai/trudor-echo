# Stripe Integration for Trudor Echo

## Test Mode Setup

### 1. Get Stripe Test Keys
1. Sign up at https://stripe.com
2. Go to Developers → API Keys
3. Copy:
   - Publishable key (pk_test_...)
   - Secret key (sk_test_...)

### 2. Add to Environment
Create `.env` file:
```env
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### 3. HTML Integration
Add to `index.html` head:
```html
<script src="https://js.stripe.com/v3/"></script>
```

### 4. Payment Button Code
Replace pricing section buttons with:

```html
<button class="cta-button" id="checkout-button-12" data-price-id="price_test_123">
    Buy Now - $12
</button>

<script>
    const stripe = Stripe('pk_test_...');
    
    document.querySelectorAll('[id^="checkout-button-"]').forEach(button => {
        button.addEventListener('click', function() {
            const priceId = this.dataset.priceId;
            
            stripe.redirectToCheckout({
                lineItems: [{ price: priceId, quantity: 1 }],
                mode: 'payment',
                successUrl: 'https://trudor.ai/success',
                cancelUrl: 'https://trudor.ai/cancel',
            });
        });
    });
</script>
```

## Price IDs for Test Mode

Create these in Stripe Dashboard:

### One-Time Payment ($12)
- Price ID: `price_test_onetime_12`
- Type: One-time
- Amount: $12.00

### Monthly Subscription ($29)
- Price ID: `price_test_monthly_29`
- Type: Recurring (monthly)
- Amount: $29.00

## Webhook Setup (Optional for MVP)

For handling payment success:
```javascript
// Create webhook endpoint at /api/webhook
app.post('/api/webhook', (req, res) => {
    const event = req.body;
    
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            // Grant user access
            break;
    }
    
    res.json({received: true});
});
```

## MVP Implementation Priority

### Phase 1 (Day 1):
1. Add Stripe.js to page
2. Create test payment buttons
3. Redirect to success/cancel pages

### Phase 2 (Day 2):
1. Create simple backend to handle webhooks
2. Store user purchases
3. Implement access control

### Phase 3 (Post-MVP):
1. User accounts
2. Purchase history
3. Invoice management
4. Refund handling

## Cost
- Stripe: 2.9% + $0.30 per transaction
- No monthly fees for basic usage
- Test mode: Completely free

## Testing
Use these test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Authentication required: `4000 0025 0000 3155`

Expiry: Any future date
CVC: Any 3 digits
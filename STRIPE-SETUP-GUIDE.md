# Stripe Setup Guide for Trudor Echo

## Step 1: Create Stripe Account
1. Go to https://stripe.com and sign up
2. Complete the onboarding process
3. Go to Developers → API Keys

## Step 2: Get Your API Keys
Copy these from Stripe Dashboard:
- **Publishable Key**: `pk_test_...` (starts with pk_test)
- **Secret Key**: `sk_test_...` (starts with sk_test) - Keep this secret!

## Step 3: Update the HTML File
In `index.html`, replace the placeholder key:
```javascript
// Line ~2020 in index.html
const stripe = Stripe('pk_test_YOUR_KEY_HERE'); // ← Replace with your actual key
```

## Step 4: Create Products in Stripe
In Stripe Dashboard → Products:
1. **Create Product**: "Trudor Echo - One-Time Job"
   - Price: $12.00
   - Type: One-time
   - Copy the Price ID (looks like `price_1P...`)

2. **Create Product**: "Trudor Echo - Pro Monthly"
   - Price: $29.00
   - Type: Recurring (monthly)
   - Copy the Price ID

## Step 5: Update Price IDs in HTML
In `index.html`, update these lines:
```javascript
// Line ~2026 - For $12 one-time payment
stripe.redirectToCheckout({
    lineItems: [{ price: 'price_test_onetime_12', quantity: 1 }], // ← Replace with your actual Price ID
    // ...
});

// Line ~2040 - For $29 monthly subscription
stripe.redirectToCheckout({
    lineItems: [{ price: 'price_test_monthly_29', quantity: 1 }], // ← Replace with your actual Price ID
    // ...
});
```

## Step 6: Test the Payment Flow
Use these test cards in Stripe:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Any future expiry date (e.g., 12/34)
- Any 3-digit CVC

## Step 7: Go Live (When Ready)
1. In Stripe Dashboard, switch from Test to Live mode
2. Get your live API keys
3. Update the HTML with live keys
4. Update success/cancel URLs to your production domain

## Important Notes

### Security
- Never commit your secret key to GitHub
- The frontend only uses the publishable key (safe to expose)
- For production, consider adding a backend to handle webhooks

### Customization
You can customize:
- Success/Cancel page URLs
- Button styles in CSS
- Product names and prices in Stripe Dashboard

### Testing Environment
- Test mode is completely free
- No real money is processed
- Test webhooks available in Stripe Dashboard

## Troubleshooting

### Buttons Don't Work
1. Check browser console for errors (F12 → Console)
2. Verify Stripe.js is loaded (check Network tab)
3. Ensure your publishable key is correct

### Payment Fails
1. Use test card `4242 4242 4242 4242`
2. Check Stripe Dashboard for error logs
3. Verify Price IDs match your Stripe products

### Success/Cancel Pages Not Loading
1. Ensure `success.html` and `cancel.html` are in the same directory
2. Check that URLs are correct in the JavaScript

## Next Steps (Optional)
1. Add user accounts to track purchases
2. Implement webhooks for post-payment processing
3. Add analytics to track conversions
4. Create admin dashboard to view sales

## Support
- Stripe Documentation: https://stripe.com/docs
- For issues: Check browser console errors first
- Contact: [Your support email]
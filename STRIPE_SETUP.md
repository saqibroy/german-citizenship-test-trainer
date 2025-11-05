# 💳 Stripe Setup Guide

## Overview

Stripe will handle all payment processing for Premium and Lifetime subscriptions.

---

## 🚀 Quick Setup (4 Steps)

### Step 1: Create Stripe Account

1. Go to: https://stripe.com/
2. Click **"Start now"** or **"Sign up"**
3. Enter your email and create password
4. Fill in business information:
   - Business name: `German Citizenship Test Trainer` (or your name)
   - Country: Germany (or your country)
   - Business type: Individual (or Company if you have one)
5. Verify your email

---

### Step 2: Activate Test Mode

**Important:** Start in **Test Mode** to avoid real charges!

1. Login to Stripe Dashboard: https://dashboard.stripe.com/
2. Look at top-right corner - ensure **"Test mode"** toggle is ON (shows "Viewing test data")
3. You'll see a banner saying "Test mode" - this is good!

In test mode:
- No real money is processed
- You can use test card numbers
- Perfect for development and testing

---

### Step 3: Create Products & Prices

#### Product 1: Premium Monthly

1. Go to: https://dashboard.stripe.com/test/products
2. Click **"Add product"**
3. Fill in:
   - **Name**: `Premium Monthly`
   - **Description**: `Unlimited access to all features - Monthly subscription`
   - **Image**: (optional - can upload app icon later)
4. Under "Pricing":
   - **Pricing model**: Select `Standard pricing`
   - **Price**: `9.99`
   - **Currency**: `EUR` (or USD)
   - **Billing period**: Select `Recurring`
   - **Interval**: `Monthly`
5. Click **"Save product"**
6. **IMPORTANT**: Copy the **Price ID** (starts with `price_...`)
   - It's shown under the price you just created
   - Example: `price_1A2B3C4D5E6F7G8H9I0J`
7. Paste into `.env`:
   ```bash
   VITE_STRIPE_PRICE_ID_MONTHLY=price_YOUR_ACTUAL_ID_HERE
   ```

#### Product 2: Lifetime Access

1. Click **"Add product"** again
2. Fill in:
   - **Name**: `Lifetime Access`
   - **Description**: `One-time payment for lifetime access to all features`
3. Under "Pricing":
   - **Pricing model**: Select `Standard pricing`
   - **Price**: `49.99`
   - **Currency**: `EUR` (or USD)
   - **Billing period**: Select `One time`
4. Click **"Save product"**
5. **IMPORTANT**: Copy the **Price ID** (starts with `price_...`)
6. Paste into `.env`:
   ```bash
   VITE_STRIPE_PRICE_ID_LIFETIME=price_YOUR_ACTUAL_ID_HERE
   ```

---

### Step 4: Get Your API Keys

1. Go to: https://dashboard.stripe.com/test/apikeys
2. You'll see two keys:
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (starts with `sk_test_...`) - Keep this SECRET!

3. Copy the **Publishable key**
4. Paste into `.env`:
   ```bash
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_ACTUAL_KEY_HERE
   ```

⚠️ **NEVER** commit the Secret key to your code or `.env` file in the frontend!
The Secret key will be used later in Cloud Functions (backend).

---

## 🧪 Test Cards for Development

Use these test card numbers in **Test Mode**:

### Successful Payments:
- **Card number**: `4242 4242 4242 4242`
- **Expiry**: Any future date (e.g., `12/34`)
- **CVC**: Any 3 digits (e.g., `123`)
- **ZIP**: Any 5 digits (e.g., `12345`)

### Failed Payments (for testing errors):
- **Card declined**: `4000 0000 0000 0002`
- **Insufficient funds**: `4000 0000 0000 9995`

More test cards: https://stripe.com/docs/testing

---

## 🔧 Configure Customer Portal (Subscription Management)

This allows customers to manage their subscriptions (cancel, update payment, etc.)

1. Go to: https://dashboard.stripe.com/test/settings/billing/portal
2. Click **"Activate test mode"** (if not already active)
3. Under "Functionality":
   - ✅ Enable "Cancel subscriptions"
   - ✅ Enable "Update payment method"
   - ✅ Enable "Subscription history"
4. Click **"Save changes"**

---

## 📊 Your .env File Should Look Like:

```bash
# Stripe Configuration (Test Mode)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51A2B3C...
VITE_STRIPE_PRICE_ID_MONTHLY=price_1A2B3C...
VITE_STRIPE_PRICE_ID_LIFETIME=price_1D4E5F...
```

---

## ⚙️ Backend Setup (Required for Checkout)

**Important:** Stripe checkout requires a backend to create checkout sessions securely.

You'll need to implement one of these:

### Option A: Firebase Cloud Functions (Recommended)

Create a Cloud Function to handle checkout sessions:

```bash
# Initialize Firebase Functions
firebase init functions

# Then we'll create the Stripe checkout function
```

We'll implement this in the next phase!

### Option B: Use Stripe Payment Links (Quick Alternative)

For quick testing without backend:

1. Go to: https://dashboard.stripe.com/test/payment-links
2. Create payment links for each product
3. Use these links directly in your upgrade page

---

## 🚀 Going Live (Production Mode)

When ready to accept real payments:

### 1. Activate Your Account
- Complete business verification in Stripe Dashboard
- Provide tax information
- Connect bank account for payouts

### 2. Switch to Production Mode
1. Toggle **"Test mode"** OFF in Stripe Dashboard
2. Create the SAME products again (Premium Monthly, Lifetime) in **Live mode**
3. Get **Live API keys** from: https://dashboard.stripe.com/apikeys
4. Update `.env.production`:
   ```bash
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
   VITE_STRIPE_PRICE_ID_MONTHLY=price_LIVE_MONTHLY_ID
   VITE_STRIPE_PRICE_ID_LIFETIME=price_LIVE_LIFETIME_ID
   ```

### 3. Set Up Webhooks (in Cloud Functions)
- Required to handle subscription events (renewals, cancellations, etc.)

---

## 📈 Monitor Your Stripe Account

### Key Dashboards:
- **Payments**: https://dashboard.stripe.com/test/payments
- **Customers**: https://dashboard.stripe.com/test/customers
- **Subscriptions**: https://dashboard.stripe.com/test/subscriptions
- **Revenue**: https://dashboard.stripe.com/test/revenue

---

## ✅ Verification Checklist

- [ ] Stripe account created
- [ ] Test mode is active
- [ ] Premium Monthly product created
- [ ] Lifetime Access product created
- [ ] Both Price IDs copied to `.env`
- [ ] Publishable key copied to `.env`
- [ ] Customer Portal activated
- [ ] Tested with test card number

---

## 🆘 Troubleshooting

### "Invalid API key"
→ Make sure you copied the **Publishable key** (pk_test_...) not the Secret key

### "Price not found"
→ Verify you're in Test mode and copied the correct Price ID

### Test payments not working
→ Use test card `4242 4242 4242 4242` with any future date and CVC

### Can't find Price ID
→ Go to Products → Click on product → Price ID is shown under the price

---

## 🎯 Next Steps

After Stripe setup:

1. ✅ Test the upgrade page UI (will show alert for now)
2. ✅ Implement Firebase Cloud Functions for checkout
3. ✅ Test full payment flow with test cards
4. ✅ Set up webhooks for subscription events
5. ✅ Move to production when ready

---

## 🔗 Useful Links

- Stripe Dashboard: https://dashboard.stripe.com/
- Stripe Documentation: https://stripe.com/docs
- Test Cards: https://stripe.com/docs/testing
- Integration Builder: https://stripe.com/docs/checkout/quickstart

---

**Need help?** Check [Stripe Docs](https://stripe.com/docs) or contact Stripe support (they're very helpful!).

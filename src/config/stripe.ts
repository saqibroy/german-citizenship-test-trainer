import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const PRICING = {
  free: {
    name: 'Free',
    price: 0,
    features: [
      '10 questions per day',
      'Basic training mode',
      'Local progress tracking',
      'Basic quiz mode'
    ],
    limits: {
      questionsPerDay: 10,
      quizzesPerDay: 1
    }
  },
  premium: {
    name: 'Premium',
    price: 9.99,
    priceId: import.meta.env.VITE_STRIPE_PRICE_ID_MONTHLY,
    interval: 'month',
    features: [
      'Unlimited questions',
      'Full SRS algorithm',
      'Cross-device sync',
      'Grammar lessons',
      'Vocabulary training',
      'Performance analytics',
      'Priority support',
      'Offline mode'
    ],
    limits: {
      questionsPerDay: Infinity,
      quizzesPerDay: Infinity
    }
  },
  lifetime: {
    name: 'Lifetime',
    price: 49.99,
    priceId: import.meta.env.VITE_STRIPE_PRICE_ID_LIFETIME,
    interval: 'once',
    features: [
      'All premium features',
      'One-time payment',
      'Lifetime access',
      'Free future updates'
    ],
    limits: {
      questionsPerDay: Infinity,
      quizzesPerDay: Infinity
    }
  }
};

export default stripePromise;

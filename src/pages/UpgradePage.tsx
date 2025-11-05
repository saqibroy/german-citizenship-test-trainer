import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PRICING } from '../config/stripe';
import { Check, Crown, Zap, ArrowLeft, Loader } from 'lucide-react';

interface UpgradePageProps {
  onNavigate: (page: string) => void;
}

const UpgradePage: React.FC<UpgradePageProps> = ({ onNavigate }) => {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleUpgrade = async (priceId: string, planName: string) => {
    setLoading(planName);

    try {
      // TODO: Implement Stripe checkout
      // This requires a backend endpoint to create a checkout session
      console.log('Upgrading to:', planName, priceId);
      
      // For now, show an alert
      alert('Stripe checkout will be implemented in the backend. Price ID: ' + priceId);
    } catch (error) {
      console.error('Error upgrading:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const currentTier = userProfile?.subscription || 'free';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <button
          onClick={() => onNavigate('home')}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600">
            Unlock your full potential with Premium
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <div className="text-4xl font-bold text-gray-900 mb-1">€0</div>
              <p className="text-gray-600">Forever</p>
            </div>

            <ul className="space-y-4 mb-8">
              {PRICING.free.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>

            {currentTier === 'free' ? (
              <button
                disabled
                className="w-full py-3 rounded-lg bg-gray-100 text-gray-400 font-semibold cursor-not-allowed"
              >
                Current Plan
              </button>
            ) : (
              <button
                onClick={() => onNavigate('home')}
                className="w-full py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50"
              >
                Downgrade
              </button>
            )}
          </div>

          {/* Premium Plan */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-500 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </div>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <Crown className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium</h3>
              <div className="text-4xl font-bold text-gray-900 mb-1">
                €{PRICING.premium.price}
              </div>
              <p className="text-gray-600">per month</p>
            </div>

            <ul className="space-y-4 mb-8">
              {PRICING.premium.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            {currentTier === 'premium' ? (
              <button
                disabled
                className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold cursor-not-allowed opacity-50"
              >
                Current Plan
              </button>
            ) : (
              <button
                onClick={() => handleUpgrade(PRICING.premium.priceId, 'premium')}
                disabled={loading === 'premium'}
                className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading === 'premium' ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Upgrade to Premium'
                )}
              </button>
            )}
          </div>

          {/* Lifetime Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-purple-200">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Lifetime</h3>
              <div className="text-4xl font-bold text-gray-900 mb-1">
                €{PRICING.lifetime.price}
              </div>
              <p className="text-gray-600">one-time</p>
            </div>

            <ul className="space-y-4 mb-8">
              {PRICING.lifetime.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            {currentTier === 'lifetime' ? (
              <button
                disabled
                className="w-full py-3 rounded-lg bg-purple-500 text-white font-semibold cursor-not-allowed opacity-50"
              >
                Current Plan
              </button>
            ) : (
              <button
                onClick={() => handleUpgrade(PRICING.lifetime.priceId, 'lifetime')}
                disabled={loading === 'lifetime'}
                className="w-full py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading === 'lifetime' ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Get Lifetime Access'
                )}
              </button>
            )}
          </div>
        </div>

        {/* Features Comparison */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What's Included
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">300+</div>
              <p className="text-gray-600">Official Test Questions</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <p className="text-gray-600">Access Anytime</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <p className="text-gray-600">Pass Guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;

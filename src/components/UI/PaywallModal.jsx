import React, { useState } from 'react';
import { X, Zap } from 'lucide-react';
import Button from './Button';

export default function PaywallModal({ isOpen, onClose, remainingDesigns }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    setIsLoading(true);
    // TODO: Integrate Stripe here
    // For now, just redirect to Stripe checkout
    window.location.href = 'https://stripe.com/checkout/...';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Designs Limit Reached</h2>
            <p className="text-gray-600 text-sm mt-1">
              You've used your 3 free designs
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Features comparison */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-gray-600 text-sm">
                <span className="line-through">Unlimited designs</span>
              </span>
              <span className="ml-auto text-gray-400 text-sm">🔒 Free</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-900 font-medium text-sm flex items-center">
                <Zap size={16} className="text-yellow-500 mr-2" />
                Unlimited designs
              </span>
              <span className="ml-auto text-yellow-600 font-semibold text-sm">✓ Premium</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-900 font-medium text-sm">
                Priority processing
              </span>
              <span className="ml-auto text-yellow-600 font-semibold text-sm">✓ Premium</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-900 font-medium text-sm">
                High-res downloads
              </span>
              <span className="ml-auto text-yellow-600 font-semibold text-sm">✓ Premium</span>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-4 mb-6">
          <p className="text-2xl font-bold text-gray-900">
            $4.99<span className="text-base text-gray-600">/month</span>
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Cancel anytime, first month $0.99
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleUpgrade}
            loading={isLoading}
            className="w-full"
          >
            Get Unlimited Designs
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full"
          >
            Maybe Later
          </Button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          By upgrading, you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy</a>
        </p>
      </div>
    </div>
  );
}

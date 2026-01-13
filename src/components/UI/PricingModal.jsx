import React, { useState } from 'react';
import { X, Check, AlertCircle } from 'lucide-react';
import Button from './Button';

const PricingModal = ({ isOpen, onClose, showUpgradePrompt = false }) => {
  const [enableFreeTrial, setEnableFreeTrial] = useState(false);

  const plans = [
    {
      name: 'Weekly Access',
      price: '$13.99',
      period: 'per week',
      badge: null,
    },
    {
      name: 'Yearly Access',
      price: '$54.99',
      period: 'per year',
      badge: 'BEST OFFER',
      pricePerWeek: '$1.06 per week',
      popular: true,
    },
  ];

  const features = [
    'Faster Rendering',
    'Ad-free Experience',
    'Unlimited Design Renders',
  ];

  const designImages = [
    'https://plugins-media.makeupar.com/smb/blog/post/2025-04-17/16a55a2d-0d4f-4569-9e3a-1912c745d716.jpg',
    'https://landformai.lovable.app/lovable-uploads/a721117f-574f-42b3-895b-6b9d57c3a404.png',
    'https://blog.pincel.app/wp-content/uploads/2023/10/change-house-exterior-on-photo-online-1.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? designImages.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev === designImages.length - 1 ? 0 : prev + 1
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-gradient-to-b from-gray-900 to-black w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl p-6 max-h-[95vh] overflow-y-auto text-white">
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Upgrade Prompt Alert */}
        {showUpgradePrompt && (
          <div className="mb-6 bg-red-500/20 border border-red-500/50 rounded-2xl p-4 flex gap-3">
            <AlertCircle size={24} className="text-red-400 flex-shrink-0" />
            <div>
              <p className="font-bold text-red-200">Free Tier Limit Reached</p>
              <p className="text-sm text-red-100 mt-1">You've used all 3 free designs. Upgrade to Premium for unlimited renders!</p>
            </div>
          </div>
        )}

        {/* Image Carousel */}
        <div className="mb-6 relative">
          <div className="relative overflow-hidden rounded-3xl aspect-square">
            <img
              src={designImages[currentImageIndex]}
              alt="Design showcase"
              className="w-full h-full object-cover"
            />

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
            >
              ←
            </button>
            <button
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
            >
              →
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-3">
            {designImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentImageIndex ? 'bg-red-500 w-6' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-8">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <Check size={20} className="text-red-500 flex-shrink-0" />
              <span className="text-gray-100">{feature}</span>
            </div>
          ))}
        </div>

        {/* Free Trial Toggle */}
        <div className="bg-gray-800 rounded-2xl p-4 mb-6 flex items-center justify-between">
          <span className="text-sm font-semibold">Enable free trial</span>
          <button
            onClick={() => setEnableFreeTrial(!enableFreeTrial)}
            className={`w-12 h-7 rounded-full transition-colors relative ${
              enableFreeTrial ? 'bg-red-500' : 'bg-gray-600'
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                enableFreeTrial ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Pricing Plans */}
        <div className="space-y-3 mb-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl p-5 transition-all cursor-pointer ${
                plan.popular
                  ? 'bg-gradient-to-r from-red-600 to-red-700 border-2 border-red-500 shadow-2xl'
                  : 'bg-gray-800 border border-gray-700 hover:border-gray-600'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 right-6 bg-red-500 px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{plan.name}</h3>
                  <p className="text-sm opacity-80">{plan.period}</p>
                  {plan.pricePerWeek && (
                    <p className="text-xs opacity-70 mt-1">{plan.pricePerWeek}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black">{plan.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <Button
          variant="primary"
          size="lg"
          className="w-full mb-4 flex items-center justify-center gap-2"
        >
          Continue
          <span>→</span>
        </Button>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 space-y-2">
          <p>
            <span className="hover:text-gray-300 cursor-pointer">Terms</span>
            {' '} • {' '}
            <span className="hover:text-gray-300 cursor-pointer">Privacy</span>
          </p>
          <p
            onClick={() => setEnableFreeTrial(false)}
            className="cursor-pointer hover:text-gray-300"
          >
            Cancel Anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;

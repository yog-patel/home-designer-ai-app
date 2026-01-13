import React, { useState, useEffect } from 'react';
import { Copy, Zap, Settings, HelpCircle, RotateCcw } from 'lucide-react';
import Button from '../components/UI/Button';
import PricingModal from '../components/UI/PricingModal';
import { getUserId, getLocalUsageData, getRemainingDesigns, isPremium, clearUserData } from '../lib/userStorage';

const ProfilePage = () => {
  const [userId, setUserId] = useState('');
  const [usageData, setUsageData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  useEffect(() => {
    const id = getUserId();
    setUserId(id);
    setUsageData(getLocalUsageData());
  }, []);

  const handleCopyUserId = () => {
    navigator.clipboard.writeText(userId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetData = () => {
    if (window.confirm('This will clear your user ID and usage data. Continue?')) {
      clearUserData();
      window.location.reload();
    }
  };

  const remainingDesigns = getRemainingDesigns();
  const isUserPremium = isPremium();

  return (
    <div className="pb-24 bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6">
        <h1 className="text-2xl font-black text-gray-900 max-w-3xl mx-auto">Profile</h1>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto p-4 sm:p-6">
        {/* User Card */}
        <div className={`rounded-3xl p-6 text-white mb-8 ${isUserPremium ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 'bg-gradient-to-br from-primary to-red-700'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-3xl">{isUserPremium ? '✨' : '🎨'}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {isUserPremium ? 'Premium Member' : 'Free User'}
                </h2>
                <p className="text-white/80 text-sm">
                  {isUserPremium ? 'Unlimited designs' : `${remainingDesigns} free designs left`}
                </p>
              </div>
            </div>
            {isUserPremium && <Zap size={28} className="text-white" />}
          </div>
          {!isUserPremium && (
            <Button 
              variant="secondary" 
              size="md" 
              className="w-full"
              onClick={() => setShowPricing(true)}
            >
              Upgrade to Premium
            </Button>
          )}
        </div>

        {/* User ID Section */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-8">
          <p className="text-xs text-gray-600 mb-2">Your User ID</p>
          <div className="flex items-center gap-2 break-all">
            <code className="text-sm font-mono text-gray-900 flex-1">{userId.substring(0, 20)}...</code>
            <button
              onClick={handleCopyUserId}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
              title="Copy user ID"
            >
              <Copy size={16} className="text-gray-600" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This ID is unique to your device and saved locally
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-blue-50 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-blue-600">{usageData?.designs_generated || 0}</p>
            <p className="text-xs text-gray-600 mt-1">Designs Created</p>
          </div>
          <div className={`rounded-2xl p-4 text-center ${isUserPremium ? 'bg-yellow-50' : 'bg-red-50'}`}>
            <p className={`text-3xl font-black ${isUserPremium ? 'text-yellow-600' : 'text-red-600'}`}>
              {isUserPremium ? '∞' : remainingDesigns}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {isUserPremium ? 'Remaining' : 'Free Left'}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-8">
          <h3 className="font-semibold text-gray-900 mb-3">Account Status</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Free Tier Designs</span>
              <span className="text-gray-900 font-medium">{usageData?.designs_generated || 0} / 3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Account Type</span>
              <span className={`font-medium ${isUserPremium ? 'text-yellow-600' : 'text-gray-900'}`}>
                {isUserPremium ? 'Premium' : 'Free'}
              </span>
            </div>
            <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-2 text-xs text-blue-800">
              💡 Designs are stored locally on your device. They don't sync across devices.
            </div>
          </div>
        </div>

        {/* Settings Menu */}
        <div className="space-y-2 mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase px-1 mb-2">Settings</h3>
          
          <button className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
            <Settings size={20} className="text-primary flex-shrink-0" />
            <div className="text-left flex-1">
              <p className="font-medium text-gray-900">Preferences</p>
              <p className="text-xs text-gray-600">App settings & privacy</p>
            </div>
          </button>

          <button className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
            <HelpCircle size={20} className="text-primary flex-shrink-0" />
            <div className="text-left flex-1">
              <p className="font-medium text-gray-900">Help & Support</p>
              <p className="text-xs text-gray-600">FAQs and troubleshooting</p>
            </div>
          </button>

          <button 
            onClick={handleResetData}
            className="w-full flex items-center gap-3 p-4 bg-red-50 hover:bg-red-100 rounded-2xl transition-colors"
          >
            <RotateCcw size={20} className="text-red-600 flex-shrink-0" />
            <div className="text-left flex-1">
              <p className="font-medium text-red-900">Reset Data</p>
              <p className="text-xs text-red-700">Clear user ID & designs</p>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 pb-4">
          <p>home.ai v1.0</p>
          <p className="mt-2">
            <a href="#" className="underline hover:text-gray-700">Terms</a> · 
            <a href="#" className="underline hover:text-gray-700"> Privacy</a>
          </p>
        </div>
      </div>

      {/* Pricing Modal */}
      <PricingModal isOpen={showPricing} onClose={() => setShowPricing(false)} />
    </div>
  );
};

export default ProfilePage;

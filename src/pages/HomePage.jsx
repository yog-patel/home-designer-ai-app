import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab, setShowPro } from '../store/slices/uiSlice';
import { setDesignType } from '../store/slices/designSlice';
import { Sparkles, Crown } from 'lucide-react';
import Button from '../components/UI/Button';
import FeatureCard from '../components/UI/FeatureCard';
import PricingModal from '../components/UI/PricingModal';

const HomePage = () => {
  const dispatch = useDispatch();
  const showPro = useSelector((state) => state.ui.showPro);

  const handleDesignSelect = (designType) => {
    dispatch(setDesignType(designType));
    dispatch(setActiveTab('create'));
  };

  const features = [
    {
      title: 'Interior Design',
      subtitle: 'Upload a pic, choose a style, let AI design the room!',
      imageUrl: 'https://plugins-media.makeupar.com/smb/blog/post/2025-04-17/16a55a2d-0d4f-4569-9e3a-1912c745d716.jpg',
      onAction: () => handleDesignSelect('interior'),
    },
    {
      title: 'Exterior Design',
      subtitle: 'Snap your home, pick a vibe, let AI craft the facade!',
      imageUrl: 'https://blog.pincel.app/wp-content/uploads/2023/10/change-house-exterior-on-photo-online-1.jpg',
      onAction: () => handleDesignSelect('exterior'),
    },
    {
      title: 'Garden Design',
      subtitle: 'Choose a style and give your garden a whole new vibe with AI!',
      imageUrl: 'https://landformai.lovable.app/lovable-uploads/a721117f-574f-42b3-895b-6b9d57c3a404.png',
      onAction: () => handleDesignSelect('garden'),
    },
    {
      title: 'Paint Change',
      subtitle: 'Transform your walls with new colors and finishes!',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      onAction: () => handleDesignSelect('paint'),
    },
  ];

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-red-50 to-white border-b border-gray-200 p-4 sm:p-6 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900">home.ai</h1>
            {/* <p className="text-sm text-gray-600 mt-1">✨ AI-Powered Interior Design</p> */}
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => dispatch(setShowPro(!showPro))}
            className="flex items-center gap-1"
          >
            <Crown size={16} />
            <span>PRO</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-8 sm:px-6 max-w-3xl mx-auto">
        {/* Welcome Section */}
        {/* <div className="mb-8">
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
            <div className="flex items-start gap-3">
              <Sparkles size={32} className="flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Transform Your Space</h2>
                <p className="text-red-100 text-sm sm:text-base mb-4">
                  Upload a photo and let AI reimagine your room with different styles, colors, and designs instantly.
                </p>
                <Button
                  variant="secondary"
                  onClick={() => dispatch(setActiveTab('create'))}
                  className="bg-white text-red-600 hover:bg-gray-50"
                >
                  Start Creating
                </Button>
              </div>
            </div>
          </div>
        </div> */}

        {/* Features Grid */}
        <div className="space-y-6">
          {/* <h3 className="text-lg font-bold text-gray-900">Choose Your Design Tool</h3> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <FeatureCard
                key={idx}
                title={feature.title}
                subtitle={feature.subtitle}
                imageUrl={feature.imageUrl}
                onAction={feature.onAction}
              />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-gray-50 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-gray-900">How It Works</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold">1</div>
              <p><span className="font-semibold">Upload</span> a photo of your space</p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold">2</div>
              <p><span className="font-semibold">Choose</span> a design style or enter custom prompt</p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold">3</div>
              <p><span className="font-semibold">Select</span> a color palette</p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold">4</div>
              <p><span className="font-semibold">Generate</span> your AI-designed room in seconds</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Modal */}
      <PricingModal isOpen={showPro} onClose={() => dispatch(setShowPro(false))} />
    </div>
  );
};

export default HomePage;

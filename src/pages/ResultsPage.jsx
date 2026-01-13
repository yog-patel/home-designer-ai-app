import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetDesign } from '../store/slices/designSlice';
import { addToGallery } from '../store/slices/gallerySlice';
import { setActiveTab, setCurrentStep } from '../store/slices/uiSlice';
import { Share2, RotateCcw, Heart, ArrowLeft, Check, Zap } from 'lucide-react';
import Button from '../components/UI/Button';
import { getRemainingDesigns, isPremium } from '../lib/userStorage';

const ResultsPage = () => {
  const dispatch = useDispatch();
  const { originalImage, generatedImage, selectedStyle, selectedRoom, selectedPalette } =
    useSelector((state) => state.design);
  const [isSaved, setIsSaved] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const remainingDesigns = getRemainingDesigns();
  const isUserPremium = isPremium();

  // Handle both string (legacy) and object (new database) formats
  const imageUrl = typeof generatedImage === 'string' 
    ? generatedImage 
    : generatedImage?.imageUrl;

  if (!imageUrl) {
    return (
      <div className="flex items-center justify-center h-screen text-center">
        <div>
          <p className="text-gray-600">No design generated yet</p>
          <Button
            className="mt-4"
            onClick={() => dispatch(setActiveTab('create'))}
          >
            Start Creating
          </Button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    dispatch(
      addToGallery({
        originalImage,
        generatedImage: typeof generatedImage === 'string' ? generatedImage : generatedImage?.imageUrl,
        room: selectedRoom,
        style: selectedStyle,
        palette: selectedPalette,
      })
    );
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleShare = async () => {
    setIsSharing(true);
    // TODO: Implement share functionality
    setTimeout(() => setIsSharing(false), 1000);
  };

  const handleRegenerate = () => {
    dispatch(setCurrentStep(2));
    dispatch(setActiveTab('create'));
  };

  const handleReset = () => {
    dispatch(resetDesign());
    dispatch(setCurrentStep(0));
    dispatch(setActiveTab('create'));
  };

  return (
    <div className="pb-24 bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 p-4 sm:p-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => dispatch(setActiveTab('home'))}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={24} className="text-gray-900" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Your Design</h1>
          </div>
          {!isUserPremium && (
            <div className="flex items-center gap-2 px-3 py-2 bg-red-50 rounded-full">
              <span className="text-sm font-medium text-gray-900">
                {remainingDesigns} designs left
              </span>
            </div>
          )}
          {isUserPremium && (
            <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 rounded-full">
              <Zap size={16} className="text-yellow-600" />
              <span className="text-sm font-medium text-yellow-900">Premium</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-8 sm:px-6 max-w-3xl mx-auto">
        {/* Comparison Toggle */}
        <div className="mb-6 flex gap-2">
          <Button
            variant={!showComparison ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setShowComparison(false)}
          >
            Result
          </Button>
          <Button
            variant={showComparison ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setShowComparison(true)}
          >
            Before & After
          </Button>
        </div>

        {/* Result Image */}
        {!showComparison ? (
          <div className="space-y-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={imageUrl}
                alt="Generated Design"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Design Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-gray-900">Design Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Room</span>
                  <span className="font-semibold text-gray-900">
                    {selectedRoom || 'Not specified'}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Style</span>
                  <span className="font-semibold text-gray-900">
                    {selectedStyle || 'Not specified'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Palette</span>
                  <span className="font-semibold text-gray-900">
                    {selectedPalette || 'Not specified'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Before and After Comparison */
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-lg relative">
              <img
                src={originalImage}
                alt="Original"
                className="w-full h-auto object-cover"
              />
              <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Before
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg relative">
              <img
                src={imageUrl}
                alt="Generated"
                className="w-full h-auto object-cover"
              />
              <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                After
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <Button
            variant="primary"
            size="lg"
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2"
          >
            {isSaved ? (
              <>
                <Check size={20} />
                Saved to Gallery
              </>
            ) : (
              <>
                <Heart size={20} />
                Save to Gallery
              </>
            )}
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={handleShare}
            disabled={isSharing}
            className="w-full flex items-center justify-center gap-2"
          >
            <Share2 size={20} />
            Share Design
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={handleRegenerate}
              className="flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} />
              Regenerate
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleReset}
              className="flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              New Design
            </Button>
          </div>
        </div>

        {/* Pro Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-4 text-sm text-blue-900">
          <p className="font-semibold mb-2">💡 Pro Tips:</p>
          <ul className="space-y-1 text-xs">
            <li>• Try different color palettes to explore more options</li>
            <li>• Use the regenerate button to refine your design</li>
            <li>• Save your favorites to build inspiration boards</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;

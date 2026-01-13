import React from 'react';
import { Share2, Download, RotateCcw, X } from 'lucide-react';
import Button from '../UI/Button';

const ResultPreview = ({ generatedImage, originalImage, selectedRoom, selectedStyle, selectedPalette, onCreateAnother, onClose }) => {
  const imageUrl = typeof generatedImage === 'string' 
    ? generatedImage 
    : generatedImage?.imageUrl;

  if (!imageUrl) return null;

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `design-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Room Design',
          text: `Check out my new room design!`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Result Image */}
        <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
          <img
            src={imageUrl}
            alt="Generated Design"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Comparison */}
        <div className="space-y-4 mb-6">
          <h3 className="font-bold text-lg text-gray-900">Before & After</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg overflow-hidden border-2 border-gray-200">
              <img
                src={originalImage}
                alt="Original"
                className="w-full h-32 object-cover"
              />
              <p className="text-xs font-semibold text-gray-600 text-center py-2">Before</p>
            </div>
            <div className="rounded-lg overflow-hidden border-2 border-red-200">
              <img
                src={imageUrl}
                alt="Generated"
                className="w-full h-32 object-cover"
              />
              <p className="text-xs font-semibold text-red-600 text-center py-2">After</p>
            </div>
          </div>
        </div>

        {/* Design Details */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-3">
          <h3 className="font-bold text-gray-900">Design Details</h3>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <p className="text-gray-600 text-xs">Room</p>
              <p className="font-semibold text-gray-900">{selectedRoom || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-600 text-xs">Style</p>
              <p className="font-semibold text-gray-900">{selectedStyle || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-600 text-xs">Palette</p>
              <p className="font-semibold text-gray-900">{selectedPalette || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleDownload}
              className="flex items-center justify-center gap-2"
            >
              <Download size={20} />
              Download
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleShare}
              className="flex items-center justify-center gap-2"
            >
              <Share2 size={20} />
              Share
            </Button>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={onCreateAnother}
            className="w-full flex items-center justify-center gap-2"
          >
            <RotateCcw size={20} />
            Create Another
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultPreview;

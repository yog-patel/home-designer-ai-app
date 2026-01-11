import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setOriginalImage,
  setSelectedRoom,
  setSelectedStyle,
  setCustomPrompt,
  setSelectedPalette,
  setIsLoading,
  setGeneratedImage,
} from '../store/slices/designSlice';
import { setCurrentStep, setActiveTab } from '../store/slices/uiSlice';
import { ChevronLeft, X, Sparkles, ChevronRight } from 'lucide-react';
import ImageUpload from '../components/UI/ImageUpload';
import PaletteCard from '../components/UI/PaletteCard';
import Button from '../components/UI/Button';
import { ROOM_TYPES, PREDEFINED_STYLES, COLOR_PALETTES } from '../constants/design';

const CreatePage = () => {
  const dispatch = useDispatch();
  const {
    originalImage,
    selectedRoom,
    selectedStyle,
    customPrompt,
    selectedPalette,
    isLoading,
  } = useSelector((state) => state.design);
  const currentStep = useSelector((state) => state.ui.currentStep);

  const [customPromptInput, setCustomPromptInput] = useState(customPrompt);

  const steps = [
    { title: 'Add a Photo', id: 'photo' },
    { title: 'Choose Room', id: 'room' },
    { title: 'Select Style', id: 'style' },
    { title: 'Pick Colors', id: 'colors' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      dispatch(setCurrentStep(currentStep + 1));
    } else {
      handleGenerate();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      dispatch(setCurrentStep(currentStep - 1));
    } else {
      dispatch(setActiveTab('home'));
    }
  };

  const handleGenerate = async () => {
    dispatch(setIsLoading(true));
    // TODO: Call Replicate API with SDXL-ControlNet
    setTimeout(() => {
      dispatch(setGeneratedImage('generated-image-placeholder'));
      dispatch(setIsLoading(false));
    }, 2000);
  };

  const isStepComplete = (step) => {
    switch (step) {
      case 0: return originalImage;
      case 1: return selectedRoom;
      case 2: return selectedStyle;
      case 3: return selectedPalette;
      default: return false;
    }
  };

  const isCurrentStepValid = isStepComplete(currentStep);

  return (
    <div className="pb-24 bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 p-4 sm:p-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft size={24} className="text-gray-900" />
            </button>
            <div>
              <p className="text-sm font-semibold text-red-500">
                Step {currentStep + 1} of {steps.length}
              </p>
              <h2 className="text-lg font-bold text-gray-900">
                {steps[currentStep].title}
              </h2>
            </div>
          </div>
          <button
            onClick={() => dispatch(setActiveTab('home'))}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-900" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 max-w-3xl mx-auto">
          <div className="flex gap-2">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  idx <= currentStep ? 'bg-red-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-8 sm:px-6 max-w-3xl mx-auto">
        {/* Step 0: Upload Photo */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <ImageUpload
              onImageSelect={(img) => dispatch(setOriginalImage(img))}
              preview={originalImage}
            />
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-sm text-blue-900">
              <p className="font-semibold mb-2">💡 Tip:</p>
              <p>Upload a clear, well-lit photo of your room. Make sure the entire room is visible for best AI results.</p>
            </div>
          </div>
        )}

        {/* Step 1: Choose Room */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              {ROOM_TYPES.map((room) => (
                <button
                  key={room.id}
                  onClick={() => dispatch(setSelectedRoom(room.id))}
                  className={`p-4 rounded-xl font-semibold transition-all duration-200 border-2 ${
                    selectedRoom === room.id
                      ? 'bg-red-500 text-white border-red-500 scale-105'
                      : 'bg-gray-50 text-gray-900 border-gray-200 hover:border-red-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{room.icon}</div>
                  <div className="text-sm">{room.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Style */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PREDEFINED_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => {
                    dispatch(setSelectedStyle(style.id));
                    if (style.id !== 'custom' && style.prompt) {
                      dispatch(setCustomPrompt(style.prompt));
                    }
                  }}
                  className={`p-4 rounded-2xl transition-all duration-200 border-2 flex flex-col items-center gap-2 ${
                    selectedStyle === style.id
                      ? 'bg-red-50 border-red-500 scale-105'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl">{style.icon}</div>
                  <div className="text-center">
                    <p className={`font-bold text-sm ${selectedStyle === style.id ? 'text-red-600' : 'text-gray-900'}`}>
                      {style.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{style.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Prompt Input */}
            {selectedStyle === 'custom' && (
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-900">
                  Describe Your Design
                </label>
                <textarea
                  value={customPromptInput}
                  onChange={(e) => setCustomPromptInput(e.target.value)}
                  onBlur={() => dispatch(setCustomPrompt(customPromptInput))}
                  placeholder="E.g., Modern minimalist with warm wood tones, large windows, and plants..."
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-red-500 focus:outline-none resize-none"
                  rows="4"
                />
                <p className="text-xs text-gray-500">Be specific about colors, materials, and style preferences</p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Choose Colors */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {COLOR_PALETTES.map((palette) => (
                <PaletteCard
                  key={palette.id}
                  palette={palette}
                  isSelected={selectedPalette === palette.id}
                  onClick={() => dispatch(setSelectedPalette(palette.id))}
                />
              ))}
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-gray-900">Your Design</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Type</span>
                  <span className="font-semibold text-gray-900">
                    {ROOM_TYPES.find((r) => r.id === selectedRoom)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Style</span>
                  <span className="font-semibold text-gray-900">
                    {PREDEFINED_STYLES.find((s) => s.id === selectedStyle)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Palette</span>
                  <span className="font-semibold text-gray-900">
                    {COLOR_PALETTES.find((p) => p.id === selectedPalette)?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Buttons */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-200 p-4 sm:p-6">
        <div className="max-w-3xl mx-auto flex gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrev}
          >
            Back
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleNext}
            disabled={!isCurrentStepValid}
            isLoading={isLoading && currentStep === 3}
            className="flex-1 flex items-center justify-center gap-2"
          >
            {currentStep === steps.length - 1 ? (
              <>
                <Sparkles size={20} />
                Generate Design
              </>
            ) : (
              <>
                Continue
                <ChevronRight size={20} />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;

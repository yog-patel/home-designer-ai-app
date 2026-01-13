import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDesignType,
  setOriginalImage,
  setSelectedRoom,
  setSelectedStyle,
  setCustomPrompt,
  setSelectedPalette,
  setIsLoading,
  setGeneratedImage,
  setError,
  resetDesign,
} from '../store/slices/designSlice';
import { setCurrentStep, setActiveTab } from '../store/slices/uiSlice';
import { ChevronLeft, X, Sparkles, ChevronRight } from 'lucide-react';
import ImageUpload from '../components/UI/ImageUpload';
import PaletteCard from '../components/UI/PaletteCard';
import Button from '../components/UI/Button';
import PricingModal from '../components/UI/PricingModal';
import ResultPreview from '../components/CreatePage/ResultPreview';
import { DESIGN_TYPE_OPTIONS, PREDEFINED_STYLES, EXTERIOR_STYLES, COLOR_PALETTES, PAINT_COLORS } from '../constants/design';
import { supabase } from '../lib/supabase';
import { getUserId, getLocalUsageData, setLocalUsageData, getRemainingDesigns, isPremium } from '../lib/userStorage';

const CreatePage = () => {
  const dispatch = useDispatch();
  const {
    designType,
    originalImage,
    selectedRoom,
    selectedStyle,
    customPrompt,
    selectedPalette,
    isLoading,
    generatedImage,
  } = useSelector((state) => state.design);
  const currentStep = useSelector((state) => state.ui.currentStep);

  const [customPromptInput, setCustomPromptInput] = useState(customPrompt);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [remainingDesigns, setRemainingDesigns] = useState(getRemainingDesigns());
  const [showResult, setShowResult] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  // Get room options based on design type
  const roomOptions = designType ? DESIGN_TYPE_OPTIONS[designType] || [] : [];

  // Determine which steps to show based on design type
  const needsStyle = designType && !['paint', 'garden'].includes(designType);
  
  const steps = [
    { title: 'Add a Photo', id: 'photo' },
    { title: 'Choose Room', id: 'room' },
    ...(designType === 'paint' 
      ? [{ title: 'Select Color', id: 'color' }]
      : needsStyle 
        ? [{ title: 'Select Style', id: 'style' }, { title: 'Pick Colors', id: 'colors' }]
        : [{ title: 'Pick Colors', id: 'colors' }]
    ),
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

    try {
      const userId = getUserId();
      console.log('Starting generation for user:', userId);

      // Step 1: Check usage via Supabase Edge Function
      let allowed = true;
      try {
        const checkResponse = await supabase.functions.invoke('check-usage', {
          body: { userId, action: 'check' },
        });

        console.log('Check usage response:', checkResponse);
        
        // Handle both success (data.allowed) and error (402 status) cases
        if (checkResponse.error) {
          // If there's an error, check if it's a 402 (payment required / usage limit)
          const errorMsg = checkResponse.error?.message || '';
          const is402 = errorMsg.includes('402') || checkResponse.error?.status === 402;
          
          if (is402) {
            console.log('Free tier limit reached (402 error), showing pricing modal');
            setShowPricing(true);
            dispatch(setIsLoading(false));
            return;
          }
          // For other errors, log and continue (fallback to localStorage)
          console.error('Edge function error:', checkResponse.error);
          allowed = getRemainingDesigns() > 0;
        } else {
          allowed = checkResponse.data?.allowed ?? true;
        }
      } catch (checkError) {
        console.error('Edge function exception:', checkError);
        // Fallback to localStorage check
        allowed = getRemainingDesigns() > 0;
      }

      // Check if user has hit free tier limit (fallback check)
      if (!allowed) {
        console.log('Free tier limit reached (localStorage check), showing pricing modal');
        setShowPricing(true);
        dispatch(setIsLoading(false));
        return;
      }

      // Step 2: Upload image to Supabase Storage
      let imageUrl = originalImage;
      
      if (originalImage.startsWith('data:')) {
        // Convert base64 to blob
        const response = await fetch(originalImage);
        const blob = await response.blob();
        const fileName = `designs/${userId}/${Date.now()}.jpg`;
        
        const { data: uploadData, error: uploadError } = await supabase
          .storage
          .from('room-images')
          .upload(fileName, blob);

        if (uploadError) {
          throw new Error(`Failed to upload image: ${uploadError.message}`);
        }

        // Get public URL
        const { data: publicUrlData } = supabase
          .storage
          .from('room-images')
          .getPublicUrl(fileName);

        imageUrl = publicUrlData.publicUrl;
      }

      // Step 3: Build the AI prompt
      let finalPrompt = customPrompt;
      
      if (designType === 'paint') {
        // For paint designs, create detailed prompt with color name
        const roomName = roomOptions.find(r => r.id === selectedRoom)?.name || selectedRoom;
        const colorObj = PAINT_COLORS.find(c => c.id === selectedColor);
        const colorName = colorObj?.name || 'white';
        finalPrompt = `Professional interior design: Paint the walls of this ${roomName} with a beautiful ${colorName} color. The walls should be entirely covered in this paint color. The paint should be applied evenly and professionally. Keep the rest of the room visible and properly lit. High quality, realistic rendering.`;
      } else if (selectedStyle && selectedStyle !== 'custom') {
        // For exterior and interior designs with predefined styles
        const styleList = designType === 'exterior' ? EXTERIOR_STYLES : PREDEFINED_STYLES;
        const style = styleList.find(s => s.id === selectedStyle);
        finalPrompt = style?.prompt || finalPrompt;
      }

      // Add color palette to the prompt for non-paint designs
      if (designType !== 'paint' && selectedPalette) {
        const palette = COLOR_PALETTES.find(p => p.id === selectedPalette);
        if (palette && palette.colors) {
          // Include the palette colors explicitly in the prompt
          const colorHexes = palette.colors.join(', ');
          finalPrompt += `. Use a ${palette.name} color scheme with these specific colors: ${colorHexes}. Ensure the design prominently features these colors throughout. The color palette should be a key design element.`;
        }
      }

      // Step 4: Call generate-design Edge Function
      const generateResponse = await supabase.functions.invoke(
        'generate-design',
        {
          body: {
            userId: userId,
            imageUrl: imageUrl,
            prompt: finalPrompt,
            roomType: selectedRoom,
            style: selectedStyle,
            palette: selectedPalette,
            negativePrompt: 'blurry, distorted, ugly, low quality',
          },
        }
      );

      if (generateResponse.error) {
        throw new Error(generateResponse.error.message || 'Failed to generate design');
      }

      if (!generateResponse.data?.imageUrl) {
        throw new Error('Failed to generate image - no URL returned');
      }

      // Step 5: Increment usage counter
      const incrementResponse = await supabase.functions.invoke(
        'check-usage',
        {
          body: { userId, action: 'increment' },
        }
      );

      // Update local cache
      setLocalUsageData({
        designs_generated: incrementResponse.data.designs_generated,
        is_premium: isPremium(),
        premium_expires_at: getLocalUsageData()?.premium_expires_at,
      });

      setRemainingDesigns(incrementResponse.data.remaining);

      // Save design data and display image
      dispatch(setGeneratedImage({
        imageUrl: generateResponse.data.imageUrl,
        designId: generateResponse.data.designId,
        roomType: selectedRoom,
        style: selectedStyle,
        palette: selectedPalette,
        prompt: finalPrompt,
      }));

      // Show result preview
      setShowResult(true);
    } catch (error) {
      console.error('Generation error:', error);
      
      // Check if error is due to usage limit
      const errorMsg = error?.message || JSON.stringify(error);
      if (errorMsg.includes('402') || errorMsg.includes('free_tier') || errorMsg.includes('Payment Required')) {
        console.log('Showing pricing modal due to usage limit');
        setShowPricing(true);
      } else {
        dispatch(setError(errorMsg || 'Failed to generate design'));
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const isStepComplete = (step) => {
    if (step === 0) return originalImage;
    if (step === 1) return selectedRoom;
    
    // Get the actual step index based on current steps
    const stepId = steps[step]?.id;
    
    if (designType === 'paint') {
      // For paint: step 2 is color selection
      if (step === 2) return selectedColor;
      if (step === 3) return false; // no step 3 for paint
    } else if (needsStyle) {
      // For interior/exterior: step 2 is style, step 3 is colors
      if (step === 2) return selectedStyle;
      if (step === 3) return selectedPalette;
    } else {
      // For garden/floor: step 2 is colors
      if (step === 2) return selectedPalette;
    }
    
    return false;
  };

  const isCurrentStepValid = isStepComplete(currentStep);

  const handleCreateAnother = () => {
    setShowResult(false);
    dispatch(resetDesign());
    dispatch(setCurrentStep(0));
  };

  return (
    <div className="pb-40 bg-white">
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
      <div className="px-4 py-8 sm:px-6 max-w-3xl mx-auto ">
        {/* Step 0: Upload Photo */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <ImageUpload
              onImageSelect={(img) => dispatch(setOriginalImage(img))}
              preview={originalImage}
            />
            {/* <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-sm text-blue-900">
              <p className="font-semibold mb-2">💡 Tip:</p>
              <p>Upload a clear, well-lit photo of your room. Make sure the entire room is visible for best AI results.</p>
            </div> */}
          </div>
        )}

        {/* Step 1: Choose Room */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              {roomOptions.map((room) => (
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

        {/* Step 2: Select Style (for Interior/Exterior) or Select Color (for Paint) */}
        {currentStep === 2 && (
          <div className="space-y-6">
            {designType === 'paint' ? (
              // Paint Color Selection
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PAINT_COLORS.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`p-4 rounded-2xl transition-all duration-200 border-2 flex flex-col items-center gap-3 ${
                      selectedColor === color.id
                        ? 'border-red-500 scale-105'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div
                      className="w-12 h-12 rounded-lg border-2 border-gray-300"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="text-center">
                      <p className={`font-bold text-sm ${selectedColor === color.id ? 'text-red-600' : 'text-gray-900'}`}>
                        {color.name}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : needsStyle ? (
              // Style Selection (for Interior/Exterior)
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(designType === 'exterior' ? EXTERIOR_STYLES : PREDEFINED_STYLES).map((style) => (
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

              /* Custom Prompt Input */
            ) : null}

            {selectedStyle === 'custom' && needsStyle && (
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

        {/* Step 3 or Final: Choose Colors (for garden/floor) or Summary (for paint) */}
        {currentStep === steps.length - 1 && currentStep >= 2 && (
          <div className="space-y-6">
            {designType !== 'paint' && (
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
            )}

            {/* Summary */}
            <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-gray-900">Your Design</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Area Type</span>
                  <span className="font-semibold text-gray-900">
                    {roomOptions.find((r) => r.id === selectedRoom)?.name}
                  </span>
                </div>
                {needsStyle && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Style</span>
                    <span className="font-semibold text-gray-900">
                      {PREDEFINED_STYLES.find((s) => s.id === selectedStyle)?.name}
                    </span>
                  </div>
                )}
                {designType === 'paint' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Paint Color</span>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded border border-gray-300"
                        style={{ backgroundColor: PAINT_COLORS.find(c => c.id === selectedColor)?.hex || '#FFFFFF' }}
                      />
                      <span className="font-semibold text-gray-900">
                        {PAINT_COLORS.find((c) => c.id === selectedColor)?.name || 'White'}
                      </span>
                    </div>
                  </div>
                )}
                {designType !== 'paint' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Palette</span>
                    <span className="font-semibold text-gray-900">
                      {COLOR_PALETTES.find((p) => p.id === selectedPalette)?.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Buttons */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-200 p-4 sm:p-6">
        <div className="max-w-3xl mx-auto flex gap-3 w-full">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrev}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleNext}
            disabled={!isCurrentStepValid}
            isLoading={isLoading && currentStep === 3}
            className="flex-1"
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

      {/* Paywall Modal - Replaced with Pricing Modal */}
      <PricingModal
        isOpen={showPricing}
        onClose={() => setShowPricing(false)}
        showUpgradePrompt={true}
      />

      {/* Result Preview Modal */}
      {showResult && generatedImage && (
        <ResultPreview
          generatedImage={generatedImage}
          originalImage={originalImage}
          selectedRoom={selectedRoom}
          selectedStyle={selectedStyle}
          selectedPalette={selectedPalette}
          onCreateAnother={handleCreateAnother}
          onClose={() => setShowResult(false)}
        />
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-sm mx-4 shadow-2xl">
            <div className="flex flex-col items-center gap-6">
              {/* Spinner */}
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-red-500 border-r-red-500 animate-spin"></div>
              </div>
              
              {/* Loading Text */}
              <div className="text-center space-y-2">
                <p className="text-lg font-bold text-gray-900">Generating Your Design</p>
                <p className="text-sm text-gray-600">This may take 30-60 seconds...</p>
              </div>

              {/* Loading Bar */}
              <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                <div className="bg-red-500 h-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePage;

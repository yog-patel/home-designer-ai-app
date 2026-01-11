import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  originalImage: null,
  generatedImage: null,
  selectedRoom: null,
  selectedStyle: null,
  customPrompt: '',
  selectedPalette: null,
  isLoading: false,
  error: null,
};

export const designSlice = createSlice({
  name: 'design',
  initialState,
  reducers: {
    setOriginalImage: (state, action) => {
      state.originalImage = action.payload;
    },
    setGeneratedImage: (state, action) => {
      state.generatedImage = action.payload;
    },
    setSelectedRoom: (state, action) => {
      state.selectedRoom = action.payload;
    },
    setSelectedStyle: (state, action) => {
      state.selectedStyle = action.payload;
    },
    setCustomPrompt: (state, action) => {
      state.customPrompt = action.payload;
    },
    setSelectedPalette: (state, action) => {
      state.selectedPalette = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetDesign: (state) => {
      return initialState;
    },
  },
});

export const {
  setOriginalImage,
  setGeneratedImage,
  setSelectedRoom,
  setSelectedStyle,
  setCustomPrompt,
  setSelectedPalette,
  setIsLoading,
  setError,
  resetDesign,
} = designSlice.actions;

export default designSlice.reducer;

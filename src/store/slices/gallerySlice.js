import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  savedDesigns: [],
};

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    addToGallery: (state, action) => {
      state.savedDesigns.push({
        id: Date.now(),
        originalImage: action.payload.originalImage,
        generatedImage: action.payload.generatedImage,
        room: action.payload.room,
        style: action.payload.style,
        palette: action.payload.palette,
        timestamp: new Date().toISOString(),
      });
    },
    removeFromGallery: (state, action) => {
      state.savedDesigns = state.savedDesigns.filter(
        (design) => design.id !== action.payload
      );
    },
    clearGallery: (state) => {
      state.savedDesigns = [];
    },
  },
});

export const { addToGallery, removeFromGallery, clearGallery } =
  gallerySlice.actions;
export default gallerySlice.reducer;

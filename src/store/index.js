import { configureStore } from '@reduxjs/toolkit';
import designReducer from './slices/designSlice';
import uiReducer from './slices/uiSlice';
import galleryReducer from './slices/gallerySlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    design: designReducer,
    ui: uiReducer,
    gallery: galleryReducer,
    auth: authReducer,
  },
});

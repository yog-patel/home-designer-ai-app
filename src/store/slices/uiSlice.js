import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTab: 'home',
  showPro: false,
  currentStep: 0,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setShowPro: (state, action) => {
      state.showPro = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    resetUI: (state) => {
      return initialState;
    },
  },
});

export const { setActiveTab, setShowPro, setCurrentStep, resetUI } = uiSlice.actions;
export default uiSlice.reducer;

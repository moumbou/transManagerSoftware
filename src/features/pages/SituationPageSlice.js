import { createSlice } from "@reduxjs/toolkit";

const situationSlice = createSlice({
  name: "situations",
  initialState: {
    value: [],
    currentValue: [],
    camionInfo: null,
    camionArray: [],
  },
  reducers: {
    setSituationsValue: (state, action) => {
      state.value = action.payload;
    },
    setCurrentValue: (state, action) => {
      state.currentValue = action.payload;
    },
    setCamionInfo: (state, action) => {
      state.camionInfo = action.payload;
    },
    setCamionArray: (state, action) => {
      state.camionArray = action.payload;
    },
    resetCamionInfo: (state) => {
      state.camionInfo = null;
    },
  },
});

export const {
  resetCamionInfo,
  setCamionInfo,
  setCurrentValue,
  setSituationsValue,
  setCamionArray,
} = situationSlice.actions;

export const selectCamionArray = (state) => state.situations.camionArray;
export const selectSituationsValue = (state) => state.situations.value;
export const selectCurrentValue = (state) => state.situations.currentValue;
export const selectCamionInfo = (state) => state.situations.camionInfo;

export default situationSlice.reducer;

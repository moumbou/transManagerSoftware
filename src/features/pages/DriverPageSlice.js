import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  currentValue: [],
  affiliationCamion: null,
};

export const driverSlice = createSlice({
  name: "drivers",
  initialState,
  reducers: {
    setDrivers: (state, action) => {
      state.value = action.payload;
    },
    setAffiliationCamion: (state, action) => {
      state.affiliationCamion = action.payload;
    },
    resetAffiliationCamio: (state) => {
      state.affiliationCamion = null;
    },
    setCurrentDrivers: (state, action) => {
      state.currentValue = action.payload;
    },
  },
});

export const {
  setDrivers,
  setAffiliationCamion,
  resetAffiliationCamio,
  setCurrentDrivers,
} = driverSlice.actions;

export const selectDrivers = (state) => state.drivers.value;
export const selectAffiliationCamion = (state) =>
  state.drivers.affiliationCamion;
export const selectCurrentDrivers = (state) => state.drivers.currentValue;

export default driverSlice.reducer;

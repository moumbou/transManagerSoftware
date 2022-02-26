const { createSlice } = require("@reduxjs/toolkit");

const truckPageSlice = createSlice({
  name: "trucks",
  initialState: {
    value: [],
    currentValue: [],
    affilier: null,
  },
  reducers: {
    setTrucks: (state, action) => {
      state.value = action.payload;
    },
    resetTruck: (state) => {
      state.value = [];
    },
    setAffilier: (state, action) => {
      state.affilier = action.payload;
    },
    resetAffilier: (state) => {
      state.affilier = null;
    },
    setCurrentTrucks: (state, action) => {
      state.currentValue = action.payload;
    },
  },
});

export const {
  resetTruck,
  setTrucks,
  setAffilier,
  resetAffilier,
  setCurrentTrucks,
} = truckPageSlice.actions;
export const selectTrucks = (state) => state.trucks.value;
export const selectAffilier = (state) => state.trucks.affilier;
export const selectCurrentTrucks = (state) => state.trucks.currentValue;
export default truckPageSlice.reducer;

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  target: null,
  info: null,
};

const OpperationsSlice = createSlice({
  name: "opperations",
  initialState,
  reducers: {
    setTarget: (state, action) => {
      state.target = action.payload;
    },
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    resetOpperation: (state) => {
      state.info = null 
      state.target = null
    },
  },
});

export const { setInfo, setTarget, resetOpperation } = OpperationsSlice.actions;

export const selectTarget = (state) => state.opperations.target;
export const selectInfo = (state) => state.opperations.info;

export default OpperationsSlice.reducer;

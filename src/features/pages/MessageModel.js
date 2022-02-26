import { createSlice } from "@reduxjs/toolkit";

const MessageModelSlice = createSlice({
  name: "messages",
  initialState: {
    target: "",
    info: "",
  },
  reducers: {
    setTargetMessage: (state, action) => {
      state.target = action.payload;
    },
    setInfoMessage: (state, action) => {
      state.info = action.payload;
    },
    resetMessage: (state) => {
        state.info = ''
        state.target = ''
    }
  },
});

export const { setInfoMessage, setTargetMessage, resetMessage } = MessageModelSlice.actions;
export const selectTargetMessage = (state) => state.messages.target;
export const selectInfoMessage = (state) => state.messages.info;
export default MessageModelSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  date: null,
};

const dateSlice = createSlice({
  name: "dateS",
  initialState,
  reducers: {
    dateData(state, action) {
      state.data = action.payload;
    },
  },
});
export const { dateData } = dateSlice.actions;
export default dateSlice.reducer;

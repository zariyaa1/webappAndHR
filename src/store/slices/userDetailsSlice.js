import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    userDetails(state, action) {
      state.data = action.payload;
    },
  },
});
export const { userDetails } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;

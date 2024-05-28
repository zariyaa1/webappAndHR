import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  answers: null,
};

const answerSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    answersData(state, action) {
      state.answers = action.payload;
    },
  },
});
export const { answersData } = answerSlice.actions;
export default answerSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedCourseDetails: null,
};

const courseDetailsSlice = createSlice({
  name: "courseDetail",
  initialState,
  reducers: {
    selectCourseDetails: (state, action) => {
      state.selectedCourseDetails = action.payload;
    },
  },
});

export const { selectCourseDetails } = courseDetailsSlice.actions;
export default courseDetailsSlice.reducer;

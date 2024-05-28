import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../services/axios";

const initialState = {
  data: null,
};

export const fetchCategory = createAsyncThunk("fetchCategory", async () => {
  try {
    const url = `content-service/apis/category`;
    const response = await axios.get(url);
    const data = response?.data?.data;
    return data;
  } catch (err) {
    console.error("Error fetching category:", err);
    throw err;
  }
});

const CategorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.pending, (state, action) => {
      console.log("Pending State");
    });
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchCategory.rejected, (state, action) => {
      console.log("Rejected State");
    });
  },
});
export default CategorySlice.reducer;

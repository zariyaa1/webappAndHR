import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./slices/categorySlice";
import UserReducer from "./slices/userSlice";
import CourseDetailReducer from "./slices/courseDetailSlice";
import AnswersReducer from "./slices/answerSlice";
import DateReducer from "./slices/dateSlice";
import UserDetailsReducer from "./slices/userDetailsSlice";
const store = configureStore({
  reducer: {
    category: CategoryReducer,
    user: UserReducer,
    courseDetail: CourseDetailReducer,
    answers: AnswersReducer,
    userDetails: UserDetailsReducer,
    dateS: DateReducer,
  },
});
export default store;

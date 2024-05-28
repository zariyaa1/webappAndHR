import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Challenges = lazy(() => import("./pages/Challenges/index"));
const Community = lazy(() => import("./pages/Community/index"));
const AddPost = lazy(() => import("./pages/Community/AddPost/index"));
const ViewPost = lazy(() => import("./pages/Community/ViewPost/index"));
const UserViewPost = lazy(() => import("./pages/Community/ViewUserPost/index"));
const Courses = lazy(() => import("./pages/Courses/index"));
const Dailies = lazy(() => import("./pages/Dailies/index"));
const HealingTools = lazy(() => import("./pages/HealingTools/index"));
const PageNotFound = lazy(() => import("./pages/PageNotFound/index"));
const Login = lazy(() => import("./pages/Authentication/Login/Index"));
const Otp = lazy(() => import("./pages/Authentication/Otp/Index"));
const Preferences = lazy(() => import("./pages/Preferences/index"));
const Question1 = lazy(() => import("./pages/Questionnare/index"));
const Question2 = lazy(() => import("./pages/Questionnare2/index"));
const Question3 = lazy(() => import("./pages/Questionnare3/index"));
const Question4 = lazy(() => import("./pages/Questionnare4/index"));
const Home = lazy(() => import("./pages/Home/index"));
const CourseDetails = lazy(() =>
  import("./pages/Courses/CoursesDetails/index")
);
const DailiesDetails = lazy(() =>
  import("./pages/Dailies/DailiesDetails/index")
);
const HealingDetails = lazy(() =>
  import("./pages/HealingTools/HealingDetails/index")
);
const MoodInsights = lazy(() => import("./pages/MoodInsights/index"));
const Blogs = lazy(() => import("./pages/Blogs/index"));
const AppointmentDetials = lazy(() =>
  import("./pages/Appointment/Details/index")
);
const AppointmentTimings = lazy(() =>
  import("./pages/Appointment/Timings/index")
);
const AppointmentConfirmation = lazy(() =>
  import("./pages/Appointment/Confirm/index")
);
const MyAppointment = lazy(() =>
  import("./pages/Appointment/MyAppointment/index")
);
const Admin = lazy(() => import("./pages/Admin/index"));
const AdminSurvey = lazy(() => import("./pages/Admin/Surveys/index"));
const CourseContent = lazy(() => import("./pages/Courses/CourseContent/index"));
const DailiesContent = lazy(() =>
  import("./pages/Dailies/DailiesContent/index")
);
const HealingContent = lazy(() =>
  import("./pages/HealingTools/HealingContent/index")
);
const MainRouter = createBrowserRouter([
  {
    path: "",
    element: <Home />,
  },
  {
    path: "/dashboard/admin",
    element: <Admin />,
  },
  {
    path: "/dashboard/surveys",
    element: <AdminSurvey />,
  },
  {
    path: "/appointment/:Eid?/:type?",
    element: <AppointmentDetials />,
  },
  {
    path: "/myAppointment",
    element: <MyAppointment />,
  },
  {
    path: "/appointment/details/timings/:Eid?",
    element: <AppointmentTimings />,
  },
  {
    path: "/appointment/confirmation",
    element: <AppointmentConfirmation />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/otp",
    element: <Otp />,
  },

  { path: "/challenges", element: <Challenges /> },
  {
    path: "/community",
    element: <Community />,
  },
  {
    path: "/community/addPost",
    element: <AddPost />,
  },
  {
    path: "/community/viewPost/:Id?",
    element: <ViewPost />,
  },
  {
    path: "/community/viewPost/user",
    element: <UserViewPost />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/courses/:courseId",
    element: <CourseDetails />,
  },
  {
    path: "/courses/content/:courseId/:index",
    element: <CourseContent />,
  },
  {
    path: "/dailies",
    element: <Dailies />,
  },
  { path: "/dailies/:detailsId", element: <DailiesDetails /> },
  {
    path: "/dailies/content/:detailsId/",
    element: <DailiesContent />,
  },
  {
    path: "/healingtools",
    element: <HealingTools />,
  },
  {
    path: "/healingtools/:healingId",
    element: <HealingDetails />,
  },
  {
    path: "/healingtools/content/:healingId",
    element: <HealingContent />,
  },
  {
    path: "onboarding/details",
    element: <Preferences />,
  },

  { path: "/onboarding/questionnare/1", element: <Question1 /> },
  {
    path: "/onboarding/questionnare/2",
    element: <Question2 />,
  },
  {
    path: "/onboarding/questionnare/3",
    element: <Question3 />,
  },
  {
    path: "/onboarding/questionnare/4",
    element: <Question4 />,
  },
  { path: "/moods/insights", element: <MoodInsights /> },
  { path: "/blogs", element: <Blogs /> },

  { path: "*", element: <PageNotFound /> },
]);
export default MainRouter;

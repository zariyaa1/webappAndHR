import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { userData } from "../store/slices/userSlice";
import { useEffect } from "react";

const PrivateRoutes = () => {
  const user = useSelector((state) => state?.user);
  let value = true;
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     dispatch(userData({ isAuthenticated: "true" }));
  //   }
  // }, [user?.value?.isAuthenticated]);

  // return user?.value?.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  return value ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;

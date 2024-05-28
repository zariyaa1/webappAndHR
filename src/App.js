import { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import Routes from "./Routes";
import Loading from "./utilities/Loading";
import { getUser } from "./services/User";
import { useDispatch } from "react-redux";
import { userDetails } from "./store/slices/userDetailsSlice";
import { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   getUser()
  //     .then((res) => {
  //       console.log(res?.data);
  //       dispatch(userDetails(res?.data));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <>
      <Toaster />
      <Suspense
        fallback={
          <div className="flex min-h-screen justify-center items-center">
            <Loading />
          </div>
        }
      >
        <RouterProvider router={Routes} />
      </Suspense>
    </>
  );
}

export default App;

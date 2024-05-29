import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import { DateRangeContext } from "./store/context";
import { useState } from "react";
// need to change the place for DateRangeContext

const CustomProvider = ({ children }) => {

  const [state, setState] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  return (<>
    <DateRangeContext.Provider value={[state, setState]} >
      {children}
    </DateRangeContext.Provider>

  </>)
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <CustomProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </CustomProvider>
  </Provider>
);



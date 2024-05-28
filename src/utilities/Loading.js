import React from "react";
import logo from "../assets/images/Logo.png";
import { styled } from "@mui/material/styles";

const Div = styled("div")({
  margin: "auto",

  height: "100vh",
  width: "100vw",

  background: "rgba(194, 71, 138, 0.7)",
});
const Loading = () => {
  return <Div></Div>;
};

export default Loading;

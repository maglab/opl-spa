import React from "react";
import { Outlet } from "react-router-dom";
import { grey } from "@mui/material/colors";

import DefaultMargin from "./defaultMargin";
import Footer from "./footer";
import Header from "./header";

export default function Layout() {
  return (
    <>
      <Header />
      <DefaultMargin bgcolor={grey[100]}>
        <Outlet />
      </DefaultMargin>
      <Footer />
    </>
  );
}

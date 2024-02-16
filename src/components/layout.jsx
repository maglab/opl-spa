import React from "react";
import { Outlet } from "react-router-dom";
import DefaultMargin from "./defaultMargin";
import Footer from "./footer";
import Header from "./header";

export default function Layout() {
  return (
    <>
      <Header />
      <DefaultMargin>
        <Outlet />
      </DefaultMargin>
      <Footer />
    </>
  );
}

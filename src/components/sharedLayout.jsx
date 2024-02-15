import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";

export default function SharedLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

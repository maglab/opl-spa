import "./RootQuestion.css";

import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { Nav2 } from "../../components/UI/Nav/Nav";
import Footer from "./Footer/Footer";
import { generalActions } from "../../state/generalStateSlice";
import useViewWidth from "../../utils/hooks/useViewWidth";

function OpenProblems() {
  const { viewWidth, isMobile } = useViewWidth();
  return (
    <div className="flex flex-col">
      <div className="nav h-3/12">
        <Nav2 />
      </div>
      <main
        className={`w-full min-h-screen max-h-max${
          viewWidth > 450 ? "px-8" : "px-2"
        } py-6 pb-4`}
      >
        <Outlet />
      </main>
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

export default OpenProblems;

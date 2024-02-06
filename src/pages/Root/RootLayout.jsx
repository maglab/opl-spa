import { Nav2 } from "../../components/UI/Nav/Nav";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import useViewWidth from "../../utils/hooks/useViewWidth";
function RootLayout() {
  const { isMobile } = useViewWidth();
  return (
    <div className="flex flex-col items-center bg-bg-grey">
      <div className="nav min-h-3/12 w-full ">
        <Nav2 />
      </div>
      <main
        className={`max-w-6xl w-full min-h-[80vh] max-h-max${
          isMobile ? "px-8" : null
        }  pb-4`}
      >
        <Outlet />
      </main>
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
export default RootLayout;

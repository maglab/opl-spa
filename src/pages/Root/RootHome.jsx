import { Outlet } from "react-router-dom";
import { Nav2 } from "../../components/UI/Nav/Nav";
import Hero from "../Home/Hero/Hero";
import Footer from "./Footer/Footer";
import useViewWidth from "../../utils/hooks/useViewWidth";
function RootHome() {
  const { isMobile } = useViewWidth();
  return (
    <div className="flex flex-col items-center bg-bg-grey">
      <div className="nav h-fit w-full">
        <Nav2 />
      </div>
      <section
        className={`w-full ${
          isMobile ? "h-fit" : "h-[80dvh] "
        }flex justify-center`}
      >
        <Hero />
      </section>
      <main className="w-full flex justify-center">
        <Outlet />
      </main>
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
export default RootHome;

import { Outlet } from "react-router-dom";
import { Nav2 } from "../../components/UI/Nav/Nav";
import Hero from "../Home/Hero/Hero";
import Footer from "./Footer/Footer";
import useViewWidth from "../../utils/hooks/useViewWidth";
import bg from "../../assets/svg/wave-haikei.svg";

function RootHome() {
  const bgImport = { backgroundImage: `url(${bg})` };
  const { isMobile } = useViewWidth();
  return (
    <div className="flex flex-col items-center bg-bg-grey">
      <div className="nav h-fit w-full">
        <Nav2 />
      </div>
      <section className="bg-no-repeat bg-cover bg-bottom  w-full h-[80dvh] flex justify-center ">
        <Hero />
      </section>
      <div className="w-full flex justify-center">
        <main className="w-full">
          <Outlet />
        </main>
      </div>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
export default RootHome;

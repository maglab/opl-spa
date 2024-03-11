import heroImage from "../../../assets/images/question2.png";
import useViewWidth from "../../../utils/hooks/useViewWidth";
function Hero() {
  const { isMobile } = useViewWidth();
  return (
    <div
      className={`max-w-7xl flex ${
        isMobile ? "flex-col" : "flex-row"
      } justify-between items-center`}
    >
      <div className="title w-full">
        <h1 className="sm:text-2xl md:text-5xl font-semibold text-center">
          <span className="text-theme-blue">Open Problems</span> in Longevity
          Science
        </h1>
        <div className="w-full flex flex-col justify-center items-center py-6">
          <p className="font-general text-base md:text-lg py-4 ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
            reiciendis nesciunt commodi veniam alias! Minima, quasi pariatur
            enim asperiores nostrum nisi quaerat repellat perspiciatis harum
            libero nulla facere deserunt voluptas?
          </p>
          <div
            className={`buttons items-center flex pt-4 ${
              isMobile ? "flex-col space-y-6" : "flex-row space-x-8"
            } py-4`}
          >
            <button className="bg-theme-blue text-white p-2">
              Open Problems
            </button>
            <button className="border-2 border-theme-blue text-theme-blue p-2">
              About us
            </button>
          </div>
        </div>
      </div>
      <div className="hero-image h-1/2  md:h-fit">
        <img
          className="w-full object-scale-down"
          src={heroImage}
          alt="Hero Image"
        />
      </div>
    </div>
  );
}

export default Hero;

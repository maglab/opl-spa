import heroImage from "../../../assets/images/question2.png";

function Hero() {
  return (
    <div className="max-w-6xl flex flex-row justify-between items-center">
      <div className="title w-full">
        <h1 className="text-5xl font-semibold text-center">
          <span className="text-theme-blue">Open Problems</span> in Longevity
          Science
        </h1>
        <div className="w-full flex flex-col justify-center items-center py-4">
          <p className="font-general text-baase md:text-lg ">
            {/* A compilation of open questions and challenges in longevity science,
            driven by researchers in the field.  */}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
            reiciendis nesciunt commodi veniam alias! Minima, quasi pariatur
            enim asperiores nostrum nisi quaerat repellat perspiciatis harum
            libero nulla facere deserunt voluptas?
          </p>
          <div className="buttons items-center flex flex-row space-x-8 py-4">
            <button className="bg-theme-blue text-white p-4">
              {" "}
              Open Problems{" "}
            </button>
            <button className="border-2 border-theme-blue text-theme-blue p-2">
              {" "}
              About us{" "}
            </button>
          </div>
        </div>
      </div>
      <div className="hero-image">
        <img src={heroImage} />
      </div>
    </div>
  );
}

export default Hero;

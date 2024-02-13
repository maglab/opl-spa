import bhamLogo from "../../../assets/images/bham-logo.png";
import rejuvenomicsLogo from "../../../assets/images/rejuvenomics-logo.png";

function ImagesFooterComponent() {
  return (
    <div className="flex flex-row w-full justify-center h-2/12 ">
      <img src={bhamLogo} alt="" className="object-scale-down w-3/12 h-2/12" />
      <img src={rejuvenomicsLogo} className="object-scale-down w-3/12" />
    </div>
  );
}

export default ImagesFooterComponent;

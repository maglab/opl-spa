import { useState } from "react";
import withRipple from "../../../../utils/hoc/withRipple";
function SideNavButton({ children, classNames, onClick }) {
  const [isActive, setActive] = useState(false);
  const onClickHandler = () => {
    setActive((prev) => !prev);
    onClick && onClick({ isActive, setActive }); //Addditional onClick from the parent with optional argument for its active state
  };
  return (
    <button
      onClick={onClickHandler}
      className={`w-full bg-opacity-80 py-2 transition-colors duration-300 hover:bg-gray-200 ${
        isActive ? "bg-gray-200" : null
      } ${classNames}`}
    >
      {children}
    </button>
  );
}

export default withRipple(SideNavButton);

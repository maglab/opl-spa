import XSvg from "../../../../components/UI/Icons/X";
import withSVG from "../../../../utils/hoc/withSVG";

const defaultProps = {
  h: 4,
  w: 4,
};
//Create the icon and adjust the size with default props
const XIcon = withSVG(XSvg, defaultProps);

function SelectedButton({ value, children, classNames, onClick }) {
  const defaultOnClick = (e) => {
    e.preventDefault();
  };
  return (
    <button
      value={value ? value : null}
      className={`flex flex-row justify-between ${classNames && classNames}`}
      onClick={onClick ? onClick : defaultOnClick}
    >
      {children}
      <XIcon />
    </button>
  );
}

export default SelectedButton;

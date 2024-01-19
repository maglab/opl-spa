import withRipple from "../../../../utils/hoc/withRipple";
function ButtonComponent() {
  return (
    <button className="w-full text-base font-semibold p-3 border border-theme-blue rounded-md bg-theme-blue-light">
      {" "}
      MORE{" "}
    </button>
  );
}

const MoreButton = withRipple(ButtonComponent);

export default MoreButton;

import ReactDOM from "react-dom";

function Modal({
  open,
  close,
  height,
  width,
  children,
  positionClasses,
  overlayClasses,
}) {
  const closeHandler = close;
  if (!open) return;

  const defaultPositionClasses =
    "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ";
  const defaultOverlay = " bg-black opacity-70";
  return ReactDOM.createPortal(
    <>
      <div
        className={`overlay z-1000 fixed inset-0 ${
          overlayClasses ? overlayClasses : defaultOverlay
        }`}
        onClick={closeHandler}
      ></div>
      <div
        className={`z-2000 fixed ${
          positionClasses ? positionClasses : defaultPositionClasses
        } -translate-y-1/2 animate-fadein bg-white p-10 ${
          height ? "h-" + height : "h-max"
        } ${width ? "w-" + width : "w-max"}`}
      >
        {children}
      </div>
    </>,
    document.getElementById("root"),
  );
}

export default Modal;

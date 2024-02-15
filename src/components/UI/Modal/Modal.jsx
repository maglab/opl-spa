import ReactDOM from "react-dom";
import { Modal, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { generalActions } from "../../../state/generalStateSlice";
function ModalT({
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
          overlayClasses || defaultOverlay
        }`}
        onClick={closeHandler}
      />
      <div
        className={`z-2000 fixed ${
          positionClasses || defaultPositionClasses
        } -translate-y-1/2 animate-fadein bg-white p-10 ${
          height ? `h-${height}` : "h-max"
        } ${width ? `w-${width}` : "w-max"}`}
      >
        {children}
      </div>
    </>,
    document.getElementById("root"),
  );
}

export function SubmissionModal({ title, response }) {
  const modalOpen = useSelector((state) => state.general.modal.isOpen);
  const dispatch = useDispatch();
  const closeHandler = () => {
    dispatch(generalActions.toggleModal({ bool: false }));
  };
  return (
    <Modal
      open={modalOpen}
      onClose={closeHandler}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white max-h-[250px] max-w-[350px] w-full h-full p-4 flex flex-col justify-center gap-y-6 items-center ">
        <div className="modal-text w-full">
          <h1
            id="modal-title"
            className="text-center font-general text-lg md:text-2xl py-2"
          >
            {title}
          </h1>
          <p
            id="modal-description"
            className="text-center font-general text-sm md:text-base"
          >
            {response}
          </p>
        </div>
        <div className="modal-buttons">
          <Button onClick={closeHandler}>Exit</Button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalT;

import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../../../state/Question/questionFormSlice";

function ModalContent(props) {
  const annotations = ["description", "species", "citations"];
  const details = props.questionDetails;
  const modalClose = props.close;
  const viewWidthState = useSelector((state) => state.question.viewWidth);
  const dispatch = useDispatch();

  const openFormHandler = () => {
    modalClose();
    dispatch(formActions.toggleFormOpen());
  };

  return (
    <div className="h-full flex flex-col justify-evenly">
      <div className="header">
        <h1 className="text-xl font-bold md:text-2xl text-center p-4">
          {details.title}
        </h1>
        <p className="text-center py-2">Note: Under development</p>
      </div>

      <div className="details">
        {annotations.map((annot) => {
          return (
            <div className={`${annot}`}>
              <h3 className=" text-base md:text-lg first-letter:capitalize py-2 underline">
                {annot}:
              </h3>
            </div>
          );
        })}
      </div>
      <div className="buttons m-auto p-2 flex flex-col">
        <Button
          onClick={modalClose}
          size={viewWidthState < 450 ? "small" : "medium"}
        >
          Exit
        </Button>
        <Button
          onClick={openFormHandler}
          size={viewWidthState < 450 ? "small" : "medium"}
        >
          {" "}
          Submit a subquestion{" "}
        </Button>
      </div>
    </div>
  );
}

export default ModalContent;

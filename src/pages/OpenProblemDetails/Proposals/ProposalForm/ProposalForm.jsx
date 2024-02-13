import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import validation from "../../functions/validation";
import submit from "../../functions/submit";
import TextInput from "./TextInput";
import SourcesInput from "./Sources/SourcesInput";
import ContactInformation from "./ContactInformation";
import { detailsActions } from "../../../../state/Details/detailsSlice";
import Modal from "../../../../components/UI/Modal/Modal";
import SubmissionModalContent from "../../../../components/UI/Modal/SubmissionModalContent";

function ProposalForm() {
  const formValues = useSelector((state) => state.details.submission);
  const dispatch = useDispatch();
  // Submitting submission details for solution
  const onClickHandler = (e) => {
    e.preventDefault();
    validation(formValues)
      .then((errors) => {
        if (errors.length === 0) {
          submit(formValues, dispatch);
          dispatch(detailsActions.clearFormValues());
        } else {
          dispatch(detailsActions.toggleModalOpen());
          dispatch(
            detailsActions.setSubmitState({
              title: "Unsuccessful submission",
              message: errors.join("\n"),
              status: "failed",
            }),
          );
        }
      })
      .catch((error) => {
        console.error("Error during validation:", error);
        dispatch(detailsActions.toggleModalOpen());
        dispatch(
          detailsActions.setSubmitState({
            title: "Unsuccessful submission",
            message: "An unexpected error occurred during validation.",
            status: "failed",
          }),
        );
      });
  };

  // Set open problem id in form state on load
  const { data } = useLoaderData();
  const openProblemId = data.problem_id;
  useEffect(() => {
    dispatch(detailsActions.setOpenProblem({ id: openProblemId }));
  }, []);

  // State for modal to display successful and unsuccessful submission
  const modalState = useSelector((state) => state.details.modal);

  // Submit status state
  const submitStatus = useSelector((state) => state.details.submitStatus);

  // Onclick handler for modal to exit modal
  const onClickHandlerModal = () => {
    dispatch(detailsActions.toggleModalClose());
  };

  return (
    <div className="proposal-form flex flex-col px-2 py-2 ">
      <h1 className="title m-auto pb-4 text-lg font-semibold text-theme-blue">
        Your solution
      </h1>
      <form>
        <div className="text-input py-2">
          <TextInput />
        </div>

        <hr />
        <div className="sources-information">
          <SourcesInput />
        </div>
        <div className="contact-info">
          <ContactInformation />
        </div>
        <div className="submit-btn flex justify-center px-6 py-2 pb-4">
          <Button onClick={onClickHandler} variant="contained">
            Post your solution
          </Button>
        </div>
      </form>
      {modalState && (
        <Modal open={modalState}>
          <SubmissionModalContent
            submitStatus={submitStatus}
            close={onClickHandlerModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default ProposalForm;

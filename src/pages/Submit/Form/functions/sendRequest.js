import { formActions } from "../../../../state/Question/questionFormSlice";
import apiProblems from "../../../../api/apiProblems";

//Send request to the database using formData
const sendRequest = async (formDetailsState, dispatch) => {
  const data = {
    title: formDetailsState.title,
    description: formDetailsState.description,
    parent_problem:
      formDetailsState.parentTitle === "Submit as a root problem"
        ? null
        : formDetailsState.parentId,
    references: JSON.stringify({ ...formDetailsState.references }),
    first_name: formDetailsState.firstName,
    last_name: formDetailsState.lastName,
    email: formDetailsState.email,
    organisation: formDetailsState.organisation,
  };

  try {
    const response = await apiProblems.postProblem({ data });
    if (response.status === 201) {
      //Creates a success status
      dispatch(
        formActions.setSubmitStatus({
          status: "success",
          title: "Submitted",
          message: "Question information was submitted successfully.",
        }),
      );
      //Toggle modal to display success status
      dispatch(formActions.toggleModalOpen());
    }
  } catch (error) {
    dispatch(formActions.toggleModalOpen());
    dispatch(
      formActions.setSubmitStatus({
        status: "failed",
        title: "Unsuccessful submission",
        message: error.message,
      }),
    );
  }
};

export default sendRequest;

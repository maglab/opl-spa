import { formValidationActions } from "../../../../state/Question/formValidationSlice";

const validateForm = (dispatch, formDetailsState, validationState) => {
  dispatch(formValidationActions.checkTitle({ title: formDetailsState.title }));
  dispatch(
    formValidationActions.checkDescription({
      description: formDetailsState.description,
    }),
  );
  dispatch(formValidationActions.checkEmail({ email: formDetailsState.email }));
  if (!formDetailsState.email.trim()) {
    return new Promise((resolve, reject) => {
      validationState.title &&
      validationState.description &&
      validationState.references
        ? resolve()
        : reject();
    });
  }
  return new Promise((resolve, reject) => {
    validationState.title &&
    validationState.email &&
    validationState.description
      ? resolve()
      : reject();
  });
};

export default validateForm;

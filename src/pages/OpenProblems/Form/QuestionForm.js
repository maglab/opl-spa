import { Form } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { Button } from "@mui/material";
import { formActions } from "../../../state/Question/questionFormSlice";
import FormContent from "./FormContent";
import ModalT from "../../../components/UI/Modal/Modal";
import validateForm from "./functions/validateForm";
import ReCAPTCHA from "react-google-recaptcha";
import apiProblems from "../../../api/apiProblems";
import sendRequest from "./functions/sendRequest";
import { Stack } from "@mui/system";

function QuestionForm() {
  // States for recaptcha
  const captchaRef = useRef(null);
  const dispatch = useDispatch();
  const formDetailsState = useSelector((state) => state.form.formDetails);
  const formStatus = useSelector((state) => state.form.submitStatus);
  const formModalState = useSelector((state) => state.form.submitModalOpen);
  const validationState = useSelector((state) => state.validation);

  // //Scroll to element on load;
  const ref = useRef(null);
  const scrollTo = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollTo();
  }, []);

  //Submission modal
  const onSubmitModalClose = () => {
    dispatch(formActions.toggleModalClose());
  };

  //Form submission handler - submits to database in the submitted questions database
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();
    if (!token) {
      dispatch(formActions.toggleModalOpen());
      dispatch(
        formActions.setSubmitStatus({
          status: "failed",
          title: "Incomplete submission",
          message: "Please complete recaptcha.",
        })
      );
    } else {
      const validToken = await apiProblems.verifyToken({ token });
      const successResponse = validToken.data;
      const success = JSON.parse(successResponse).success;
      if (success) {
        console.log(formDetailsState);
        validateForm(dispatch, formDetailsState, validationState)
          .then(() => sendRequest(formDetailsState, dispatch))
          .catch(() => {
            dispatch(formActions.toggleModalOpen());
            dispatch(
              formActions.setSubmitStatus({
                status: "failed",
                title: "Incomplete submission",
                message:
                  "Please enter required fields (title and description) and ensure that you have entered a valid email address and valid references.",
              })
            );
          });
      } else {
        dispatch(formActions.toggleModalOpen());
        dispatch(
          formActions.setSubmitStatus({
            status: "failed",
            title: "Failed Recaptcha",
            message: "Failed recaptcha test.",
          })
        );
      }
    }
  };
  //Exit button handler
  const exitButtonHandler = () => {
    dispatch(formActions.toggleModalClose());
    dispatch(formActions.resetForm({ exit: true }));
  };

  return (
    <div className="form items-center">
      <h1
        ref={ref}
        className="form-title text-center text-xl font-bold md:text-2xl"
      >
        Submit an open problem
      </h1>
      <p className="py-4 text-sm md:text-base">
        If you believe that a problem you are submitting falls under one of our
        existing problems, please select it as an associated open problem. If
        not, select "Submit as a root problem".
      </p>
      <Form
        className="flex w-full flex-col items-center text-center text-sm md:text-base"
        onSubmit={onSubmitHandler}
      >
        <FormContent />
        <ReCAPTCHA
          className="recaptcha"
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
          ref={captchaRef}
        />
        <Stack display="flex" direction="row" spacing={2} padding={2}>
          <Button onClick={exitButtonHandler} variant="outlined">
            Exit
          </Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>

        {formModalState && (
          <ModalT
            open={formModalState}
            close={onSubmitModalClose}
            height={350}
            width={350}
          >
            <div className="p-2">
              <h1 className="text-center text-lg font-bold md:text-2xl">
                {formStatus.title}
              </h1>
              <p className="text-md pt-4 md:text-lg">{formStatus.message}</p>
              <div className="flex flex-row justify-center p-2">
                <Button onClick={onSubmitModalClose}>Exit</Button>
              </div>
            </div>
          </ModalT>
        )}
      </Form>
    </div>
  );
}

export default QuestionForm;

import { Form, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { Button } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";

import { formActions } from "../../../state/Question/questionFormSlice";
import { generalActions } from "../../../state/generalStateSlice";
import FormContent from "./FormContent";
import Modal from "../../../components/UI/Modal/Modal";
import validateForm from "./functions/validateForm";
import apiProblems from "../../../api/apiProblems";
import sendRequest from "./functions/sendRequest";
import { RECAPTCHA_SITE_KEY } from "../../../config";

function QuestionForm() {
  // States for recaptcha
  const captchaRef = useRef(null);
  const dispatch = useDispatch();
  const formDetailsState = useSelector((state) => state.form.formDetails);
  const formStatus = useSelector((state) => state.form.submitStatus);
  const formModalState = useSelector((state) => state.general.modal.isOpen);
  const validationState = useSelector((state) => state.validation);
  const navigate = useNavigate();

  // //Scroll to element on load;
  const ref = useRef(null);
  const scrollTo = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollTo();
  }, []);

  // Submission modal
  const onSubmitModalClose = () => {
    dispatch(generalActions.toggleModal({ bool: false }));
  };

  // Form submission handler - submits to database in the submitted questions database
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();
    if (!token) {
      dispatch(generalActions.toggleModal({ bool: true }));
      dispatch(
        generalActions.setModalContent({
          content: {
            status: "failed",
            title: "Incomplete submission",
            message: "Please complete recaptcha.",
          },
        }),
      );
    } else {
      const validToken = await apiProblems.verifyToken({ token });
      const successResponse = validToken.data;
      const { success } = JSON.parse(successResponse);
      if (success) {
        validateForm(dispatch, formDetailsState, validationState)
          .then(() => sendRequest(formDetailsState, dispatch))
          .catch(() => {
            dispatch(generalActions.toggleModal({ bool: true }));
            dispatch(
              formActions.setSubmitStatus({
                status: "failed",
                title: "Incomplete submission",
                message:
                  "Please enter required fields (title and description) and ensure that you have entered a valid email address and valid references.",
              }),
            );
          });
      } else {
        dispatch(generalActions.toggleModal({ bool: true }));
        dispatch(
          formActions.setSubmitStatus({
            status: "failed",
            title: "Failed Recaptcha",
            message: "Failed recaptcha test.",
          }),
        );
      }
    }
  };
  // Exit button handler
  const exitButtonHandler = () => {
    dispatch(formActions.resetForm({ exit: true }));
    navigate("/open-problems");
  };

  return (
    <div className="form items-center bg-white py-4">
      <Form
        className="flex w-full flex-col items-center text-center text-sm md:text-base"
        onSubmit={onSubmitHandler}
      >
        <FormContent />
        <ReCAPTCHA
          className="recaptcha py-4"
          sitekey={RECAPTCHA_SITE_KEY}
          ref={captchaRef}
        />
        <div className="buttons">
          <Button type="submit"> Submit </Button>
          <Button onClick={exitButtonHandler}>Exit</Button>
        </div>

        {formModalState && (
          <Modal
            open={formModalState}
            close={onSubmitModalClose}
            height={350}
            width={350}
          >
            <div className="">
              <h1 className="text-center text-lg font-bold md:text-2xl">
                {formStatus.title}
              </h1>
              <p className="text-md pt-4 md:text-lg">{formStatus.message}</p>
              <div className="flex flex-row justify-center">
                <Button onClick={onSubmitModalClose}>Exit</Button>
              </div>
            </div>
          </Modal>
        )}
      </Form>
    </div>
  );
}

export default QuestionForm;

import TextArea from "./Inputs/TextArea";
import TextInput from "./Inputs/TextInput";
import Select from "./Inputs/Select";
import ReferencesInput from "./Inputs/ReferencesInput";
import ContactForm from "./ContactInformationForm";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../../../state/Question/questionFormSlice";
function FormContent() {
  const openProblems = useSelector((state) => state.question.allProblems);
  const dispatch = useDispatch();
  const clearFormHandler = () => {
    dispatch(formActions.resetForm({ exit: false }));
  };
  return (
    <div className="question-inputs w-full">
      <Select openProblems={openProblems} id="parent-question" />
      <TextInput
        id="title"
        label="required"
        labelText="Title:"
        required="required"
        openProblems={openProblems}
      />
      <TextArea
        id="description"
        label="Please add a description to your problem for clarity"
        labelText="Description:"
        name="description"
        rows={4}
      />
      <ReferencesInput />
      <div className="contact-information w-full pt-4 text-center">
        <hr />
        <ContactForm />
      </div>
      <button
        onClick={clearFormHandler}
        className="py-4 text-sm text-theme-blue underline md:text-base"
      >
        Clear Form
      </button>
    </div>
  );
}

export default FormContent;

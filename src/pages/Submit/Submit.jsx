import QuestionForm from "./Form/QuestionForm";
function SubmitPage() {
  return (
    <>
      <div className="header items-center">
        <h1 className="form-title text-center text-xl font-bold md:text-2xl">
          Submit an open problem
        </h1>
        <p className="pt-4 text-sm md:text-base ">
          If you believe that a problem you are submitting falls under one of
          our existing problems, please select it as an associated open problem.
          If not, select "Submit as a root problem".
        </p>
        <hr className="pb-6" />
      </div>
      <QuestionForm />
    </>
  );
}
export default SubmitPage;

import QuestionForm from "./Form/QuestionForm";

function QuestionGuidance() {
  return (
    <div className="guidance bg-theme-blue-light border border-theme-blue p-10 pt-4">
      <h1 className="py-2 font semibold text-center font-general font-semibold text-lg md:text-xl">
        {" "}
        Writing a good open problem
      </h1>
      <div className="guidance-description font-general ">
        <p className="underline">
          All open problems are welcome but we recommend following these
          guidelines:
        </p>
        <li className="">
          Does the question address a specific aspect of ageing, avoiding being
          overly broad?
        </li>
        <li>
          Is the context or background of the question adequately defined?
        </li>
        <li>
          Is the nature of the inquiry clear (quantitative, qualitative,
          predictive, comparative, etc.)?
        </li>
        <li>
          Is the question relevant to current trends and challenges in the
          field?
        </li>
      </div>
    </div>
  );
}

function SubmitPage() {
  return (
    <>
      <div className="header items-center">
        <h1 className="form-title text-center text-xl font-bold md:text-2xl pb-4 pt-10">
          Submit an open problem
        </h1>
        <QuestionGuidance />
        <hr className="pb-6" />
      </div>
      <div className="pb-6">
        <QuestionForm />
      </div>
    </>
  );
}
export default SubmitPage;

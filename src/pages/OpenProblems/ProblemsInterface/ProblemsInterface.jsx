import { useSelector } from "react-redux";
import { useState } from "react";
import QuestionList from "./List/QuestionList";
import QuestionForm from "../Form/QuestionForm";
import SortingInputs from "./Sorting/SortingInputs";
function ProblemsInterface() {
  const formState = useSelector((state) => state.form);
  const [paginationNumber, setPaginationNumber] = useState(1); //Default to 1 for api
  const nextPage = useSelector((state) => state.question.nextPage);

  return (
    <div className="flex flex-col">
      {!formState.submitFormOpen && (
        <div className="sort-problems flex flex-row items-center justify-center px-4 pt-2">
          <SortingInputs />
        </div>
      )}

      <div className="questions-container px-4 py-2">
        {formState.submitFormOpen ? (
          <QuestionForm
            parent={
              formState.chosenParent
                ? formState.formDetails.parentTitle
                : "None"
            }
          />
        ) : (
          <>
            <QuestionList paginationNumber={paginationNumber} />
            {nextPage && (
              <div className="pagination-buttons flex justify-center pt-10">
                <button> Show more</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProblemsInterface;

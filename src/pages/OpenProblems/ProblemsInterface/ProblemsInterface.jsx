import { useSelector } from "react-redux";
import { useState } from "react";
import QuestionList from "./List/QuestionList";
import QuestionForm from "../Form/QuestionForm";
import SortingInputs from "./Sorting/SortingInputs";

/**
 * Wrapper component for the interface of the open problems list.
 * @returns - Open Problems Interface Component
 */
function ProblemsInterface() {
  const formState = useSelector((state) => state.form);
  const nextPage = useSelector((state) => state.question.nextPage);
  // We track the loading state for the
  const [loading, setLoading] = useState(true);

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
            <QuestionList loading={loading} setLoading={setLoading} />
            {nextPage &&
              !loading(
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

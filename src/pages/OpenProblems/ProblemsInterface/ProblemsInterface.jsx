import { useState } from "react";
import { useSelector } from "react-redux";

import MoreButton from "./Buttons/MoreButton";
import QuestionList from "./List/QuestionList";
import SortingInputs from "./Sorting/SortingInputs";
/**
 * Wrapper component for the interface of the open problems list.
 * @returns - Open Problems Interface Component
 */
function ProblemsInterface() {
  const nextPage = useSelector((state) => state.question.nextPage);
  // We track the loading state
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col">
      <div className="sort-problems flex flex-row items-center justify-center px-4 pt-2">
        <SortingInputs />
      </div>
      <div className="questions-container px-4 py-2">
        <>
          <QuestionList loading={loading} setLoading={setLoading} />
          {!loading && nextPage && (
            <div className="w-full pagination-bttn flex justify-center pt-5">
              <MoreButton />
            </div>
          )}
        </>
      </div>
    </div>
  );
}

export default ProblemsInterface;

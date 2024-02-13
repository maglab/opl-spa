import React, { useState } from "react";
import { useSelector } from "react-redux";

import ItemComponent from "./ItemComponent/ItemComponent";
import Spinner from "../../../../components/UI/Loading/Spinner";
import useFiltersEffect from "../../../../utils/hooks/useFiltersEffect";
import useSearchEffect from "../../../../utils/hooks/useSearchEffect";

/**
 * Loading sectrion to be used by the main Question List component. Is shown when open problems are loading.
 * @returns {React.Component}
 */
function LoadingSection() {
  return (
    <div className="w-full h-full flex items-center justify-center translate-y-1/2">
      <Spinner />
    </div>
  );
}

/**
 * Error sectrion to be used by the main Question List component for rendering error messages
 * @returns {React.Component}
 */
function ErrorDisplay() {
  return (
    <div>
      <p className="text-2xl"> {error.message}</p>
    </div>
  );
}

/**
 * List section that renders list of any set of open problems.
 * @param {Array} param0 openProblems - Array of open problems usually from api.
 * @returns {React.Component}
 */
function ListSection({ openProblems }) {
  if (!openProblems || openProblems.length === 0) {
    return (
      <div className="py-4">
        <p className="text-center font-semibold">
          No Open Problems matching this query.
        </p>
      </div>
    );
  }

  return (
    <ul className="problem-list space-y-1">
      {openProblems.map((item) => (
        <ItemComponent key={item.problem_id} openProblem={item} />
      ))}
    </ul>
  );
}

/**
 * Open Problems list main component.
 * @param {*} param0 -  isLoading - state value
 * @param {function} param1 - setLoading - hook function of useState of the parent component
 * @returns - List of all open problems sorted by pagination and annotations.
 */
export default function QuestionList({ loading, setLoading }) {
  const problemsArray = useSelector((state) => state.question.allProblems);
  // displatedProblems for fuzzy search - however this will be soon removed
  const displayedProblems = useSelector(
    (state) => state.question.filteredResults,
  );
  const filters = useSelector((state) => state.question.filters);
  const searchQuery = useSelector((state) => state.question.searchQuery);
  const selectedSorting = useSelector(
    (state) => state.question.filters.sorting,
  );
  const filtersOn = useSelector((state) => state.question.filterOpen);
  const [error, setError] = useState(false);

  // Use effect runs in order specified so we should check if filters have been applied and then send request based on filters and sorting
  useFiltersEffect({
    filters,
    filtersOn,
    selectedSorting,
    setLoading,
    setError,
  });
  // Finally we sort the list based on the query string. NOTE: TEMPORARY
  useSearchEffect(searchQuery);

  if (error) {
    return <ErrorDisplay />;
  }

  if (loading) {
    return <LoadingSection />;
  }
  if (displayedProblems) {
    return <ListSection openProblems={displayedProblems} />;
  }

  if (filtersOn || selectedSorting) {
    return <ListSection openProblems={problemsArray} />;
  }
}

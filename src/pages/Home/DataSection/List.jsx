import { HashLink } from "react-router-hash-link";
/**
 * List component for rendering open problems. Used for now by the Home component.
 * @param {Array} openProblems - Array containg open problem data.
 * @param {Boolean} error - Boolean value for error state.
 * @param {Boolean} loading - Boolean value for loading state.
 * @returns {React.Component}
 */
function List({ openProblems, error }) {
  if (error) {
    return <p>Unable to load data. {error.message}</p>;
  }
  return (
    <ul className="text-white font-general text-base md:text-lg py-2">
      {openProblems &&
        openProblems.map((problem) => (
          <li key={problem.problem_id} className="hover:underline">
            <HashLink
              to={`open-problems/${problem.problem_id}#title${problem.problem_id}`}
            >
              {problem.title}
            </HashLink>
          </li>
        ))}
    </ul>
  );
}

export default List;

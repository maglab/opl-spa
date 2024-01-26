import Spinner from "../../../components/UI/Loading/Spinner";
/**
 * List component for rendering open problems. Used for now by the Home component.
 * @param {Array} openProblems - Array containg open problem data.
 * @param {Boolean} error - Boolean value for error state.
 * @param {Boolean} loading - Boolean value for loading state.
 * @returns {React.Component}
 */
function List({ openProblems, error, loading }) {
  if (error) {
    return <p>Unable to load data. {error.message}</p>;
  }
  return (
    <ul>
      {openProblems && openProblems.map((problem) => <li>{problem.title}</li>)}
    </ul>
  );
}

export default List;

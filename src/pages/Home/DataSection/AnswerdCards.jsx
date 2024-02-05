import OpenProblemCard from "../../../components/UI/Card/OpenProblemCard";
import CardSkeleton from "../../../components/UI/Loading/CardSkeleton";
function AnsweredCard({ solutions, error, loading }) {
  if (loading) {
    return (
      <div className="w-full flex flex-row justify-evenly">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }
  return (
    <div className="w-full">
      <ul className="flex flex-row justify-evenly">
        {solutions &&
          solutions.slice(0, 2).map((solution) => (
            <li className="px-6">
              {" "}
              <OpenProblemCard
                title={solution.open_problem_title}
                description={solution.full_text}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default AnsweredCard;

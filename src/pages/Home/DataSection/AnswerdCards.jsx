import OpenProblemCard from "../../../components/UI/Card/OpenProblemCard";
import CardSkeleton from "../../../components/UI/Loading/CardSkeleton";
import useViewWidth from "../../../utils/hooks/useViewWidth";
function AnsweredCard({ solutions, error, loading }) {
  const { isMobile } = useViewWidth();
  if (loading) {
    return (
      <div className="w-full flex flex-row justify-evenly">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }
  return (
    <div className="w-full flex ">
      <ul
        className={`inline-grid ${
          isMobile ? "grid-cols-1" : "grid-cols-3"
        }  gap-4`}
      >
        {solutions &&
          solutions.slice(0, 3).map((solution) => (
            <li className="">
              <OpenProblemCard
                title={solution.open_problem_title}
                description={solution.full_text}
                classNames={"h-[250px] overflow-hidden text-ellipsis"}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default AnsweredCard;

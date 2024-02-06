import OpenProblemCard from "../../../components/UI/Card/OpenProblemCard";
import CardSkeleton from "../../../components/UI/Loading/CardSkeleton";
import useViewWidth from "../../../utils/hooks/useViewWidth";

function ResponsiveContainer({ children }) {
  const { isMobile } = useViewWidth();

  return (
    <ul
      className={`inline-grid ${
        isMobile ? "grid-cols-1" : "grid-cols-3"
      } gap-4 `}
    >
      {children}
    </ul>
  );
}

function AnsweredCard({ solutions, error, loading }) {
  if (loading) {
    return (
      <div className="w-full flex">
        <ResponsiveContainer>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </ResponsiveContainer>
      </div>
    );
  }
  return (
    <div className="w-full flex ">
      <ResponsiveContainer>
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
      </ResponsiveContainer>
    </div>
  );
}

export default AnsweredCard;

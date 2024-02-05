import useGetApi from "../../utils/hooks/useApi";
import apiProblems from "../../api/apiProblems";
import apiSubmissions from "../../api/apiSubmissions";
import List from "./DataSection/List";
import AnsweredCard from "./DataSection/AnswerdCards";
import Resources from "./DataSection/Resources";
import CardSkeleton from "../../components/UI/Loading/CardSkeleton";

/**
 * Helper function. Return apiFunction call with optional sorting. To be called by the Home component.
 * @param {String} sorting - The sorting query parameter for the API.
 * @returns {Function} - Returns
 */
const getProblemsData = async (sorting) => {
  return apiProblems.getProblems({
    queryParams: {
      sorting,
      page_size: "6",
    },
  });
};

function Home() {
  const { apiData: latest, error: errorLatest } = useGetApi(
    getProblemsData,
    "latest",
    []
  );

  const {
    apiData: solutions,
    loadingSolutions,
    errorSolutions,
  } = useGetApi(apiSubmissions.getAllSubmissions, null, []);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full py-8 flex justify-center bg-theme-blue-shade">
        <div className="flex flex-col justify-between items-center gap-y-8 max-w-7xl w-full">
          <section className="latest items-center py-6 border-b border-white w-full">
            <h1 className="text-3xl text-white font-general underline underline-offset-2">
              {" "}
              Latest Open Problems
            </h1>

            <List openProblems={latest.results} error={errorLatest} />
          </section>
          <section className="solutions w-full py-6">
            <h1 className="text-3xl text-white font-general underline underline-offset-2 py-6">
              {" "}
              Solutions
            </h1>
            <AnsweredCard
              solutions={solutions.results}
              error={errorSolutions}
              loading={loadingSolutions}
            />
          </section>
          {/* <section className="Resources flex flex-row justify-evenly py-8 w-full">
            <Resources />
          </section> */}
        </div>
      </div>
      <div className="resources w-full bg-theme-blue-shade items-center flex justify-center">
        <section className="resources items-center max-w-7xl w-full">
          <Resources />
        </section>
      </div>
    </div>
  );
}

export default Home;

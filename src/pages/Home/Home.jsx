import useGetApi from "../../utils/hooks/useApi";
import apiProblems from "../../api/apiProblems";

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
  //Get the last 6 problems
  const {
    isLoadingLatest: isLoading,
    apiDataLatest: apiData,
    errorLatest: error,
  } = useGetApi(getProblemsData("latest"));
  const { isLoadingSolutions, apiDataSolutions, errorSolutions } = useGetApi(
    getProblemsData("answered")
  );
  return (
    <>
      <div className="data bg-inherit items-center">
        <div className="flex flex-row justify-center">
          <section className="latest">
            <p>The latest approved and submitted open problems.</p>
          </section>
          <section className="solutions"></section>
        </div>
      </div>
    </>
  );
}

export default Home;

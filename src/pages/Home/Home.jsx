import useGetApi from "../../utils/hooks/useApi";
import apiProblems from "../../api/apiProblems";
import List from "./DataSection/List";
import checkSVG from "../../assets/svg/check.svg?react";
import withSVG from "../../utils/hoc/withSVG";

const checkLogo = withSVG(checkSVG);

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
  const {
    apiData: latest,
    isLoading: loadingLatest,
    error: errorLatest,
  } = useGetApi(getProblemsData, "latest", []);

  const {
    apiData: answered,
    isLoading: loadingAnswered,
    error: errorAnswered,
  } = useGetApi(getProblemsData, "answered", []);

  return (
    <>
      <div className="data bg-inherit items-center w-full py-4">
        <div className="flex flex-col justify-center items-center">
          <section className="solutions items-center">
            <h1 className="text-3xl text-white text-center font-general">
              {" "}
              Suggested Solutions
            </h1>
            <checkLogo />
            {/* <List
              openProblems={answered.results}
              loading={loadingAnswered}
              error={errorAnswered}
            /> */}
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;

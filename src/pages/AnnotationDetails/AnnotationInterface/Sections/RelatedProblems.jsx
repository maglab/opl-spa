import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import apiAnnotations from "../../../../api/apiAnnotations";
import InterfaceTemplate from "../../../../components/Template/InterfaceTemplate";

function RelatedProblems(props) {
  const category = useSelector((state) => state.annotation.annotation);
  const { title, id } = props.annotationData;

  // State for getting API data; I have a hook for this, but it's being difficult to implement here
  const [apiData, setApiData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for getting the number of open problems for the annotation
  const [openProblemsLength, setOpenProblemsLength] = useState(0);

  // Only making the API call when params is not null (i.e., id is available)
  useEffect(() => {
    if (id && category) {
      async function getApiData() {
        try {
          const response = await apiAnnotations.getProblemsForAnnotation({
            annotation: category,
            annotationId: id,
          });
          const { data } = response;
          setApiData(data);
          setOpenProblemsLength(data.length);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
      getApiData();
    }
  }, [id, category]);

  return (
    <InterfaceTemplate title="Related Problems">
      <p className="py-2 text-sm underline md:text-base">
        {openProblemsLength} Open Problems relating to {category} : {title}
      </p>

      <hr className="border-theme-blue py-2" />

      {isLoading && !error && !apiData ? (
        <p className="py-2 text-sm">Loading...</p>
      ) : apiData ? (
        <ul className="list-disc px-4">
          {apiData.map((item) => (
            <HashLink
              smooth
              to={`/open-problems/${item.open_problem.problem_id}#title`}
            >
              <li className="py-2 text-sm font-semibold hover:text-theme-blue hover:underline md:text-base">
                {" "}
                {item.open_problem.title}
              </li>
            </HashLink>
          ))}
        </ul>
      ) : (
        <p className="py-2 text-sm">No related problems found</p>
      )}
    </InterfaceTemplate>
  );
}

export default RelatedProblems;

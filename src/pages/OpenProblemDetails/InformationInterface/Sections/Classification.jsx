import InterfaceTemplate from "../../../../components/Template/InterfaceTemplate";
import { useLoaderData } from "react-router-dom";
import ClassificationComponent from "./ClassificationComponents/ClassificationComponent";
import getAnnotations from "../../functions/getAnnotations";
import { useEffect, useState } from "react";
import setUserName from "../../functions/setUserName";

function TableRow({ children }) {
  return <tr className="odd:bg-gray-200 even:bg-white">{children}</tr>;
}

const CLASSIFICATION_COMPONENTS = [
  { title: "Subjects", annotation: "subject" },
  { title: "Species", annotation: "species" },
  { title: "Genes", annotation: "gene" },
  { title: "Compounds", annotation: "compound" },
];

const fetchAnnotationData = async (components, problemId) => {
  const fetchedData = await getAnnotations(
    components.map((item) => item.annotation),
    problemId
  );
  return components.map((component) => {
    const matchingAnnotation = fetchedData.find(
      (annotation) => annotation.annotation === component.annotation
    );
    return {
      ...component,
      status: matchingAnnotation?.status,
      data: matchingAnnotation?.data,
    };
  });
};

function Classification() {
  const { data } = useLoaderData();
  const openProblemId = data.problem_id;
  const contactParams = {
    firstName: data.contact?.first_name,
    lastName: data.contact?.last_name,
  }; //For now no contact
  const userName = setUserName(contactParams) ?? "-";

  const [annotationData, setAnnotationData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const annotations = await fetchAnnotationData(
          CLASSIFICATION_COMPONENTS,
          openProblemId
        );
        setAnnotationData(annotations);
      } catch (err) {
        setError(err.message);
      }
    })();
  }, [openProblemId]);

  if (error) {
    return (
      <InterfaceTemplate>
        <p>Unable to load section: {error}</p>
      </InterfaceTemplate>
    );
  }

  return (
    <InterfaceTemplate title="Classification">
      <div className="classification-table py-2">
        <table className="border-1 w-full border p-2 text-left">
          <tbody>
            <TableRow>
              <th className="pl-4">ID</th>
              <td className="pl-4">{openProblemId}</td>
            </TableRow>
            {annotationData?.map((component) => (
              <TableRow key={component.annotation}>
                <th className="pl-4">{component.title}</th>
                <td className="pl-4">
                  <ClassificationComponent
                    problemId={openProblemId}
                    annotationData={component}
                  />
                </td>
              </TableRow>
            ))}
            <TableRow>
              <th className="pl-4">Submitted by:</th>
              <td className="pl-4">{userName}</td>
            </TableRow>
          </tbody>
        </table>
      </div>
    </InterfaceTemplate>
  );
}

export default Classification;

import { HashLink } from "react-router-hash-link";
import extractAnnotationInformation from "../../../../../utils/functions/extractAnnotationInformation";
function ClassificationComponent({ annotationData }) {
  const { annotation: category, status, data } = annotationData;
  let content;

  if (status === 200 && data && data.length > 0) {
    const annotationInformation = data.map((item) =>
      extractAnnotationInformation(item[category], category),
    );
    content = annotationInformation.map((annotation) => (
      <li
        className="underline hover:font-semibold hover:text-theme-blue"
        key={annotation.id}
      >
        <HashLink to={`/annotation/${category}/${annotation.id}`}>
          {annotation.title}
        </HashLink>
      </li>
    ));
  } else if (status === 204 || !data || data.length === 0) {
    content = <li> - </li>;
  } else {
    content = <li>Error has occurred: {data.error}</li>; // Assuming 'data.error' contains the error message
  }

  return (
    <div className="classification-data">
      <ul>{content}</ul>
    </div>
  );
}

export default ClassificationComponent;

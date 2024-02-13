import { useLoaderData } from "react-router-dom";
import RelatedProblems from "./Sections/RelatedProblems";
import RelatedReferences from "./Sections/RelatedReferences";

function AnnotationInterface(props) {
  const { data: annotationData } = useLoaderData();

  return (
    <>
      {props.children}
      <RelatedProblems annotationData={annotationData} />
      <RelatedReferences annotationData={annotationData} />
    </>
  );
}

export default AnnotationInterface;

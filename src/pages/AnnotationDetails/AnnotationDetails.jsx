import { useLoaderData, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AnnotationInterface from "./AnnotationInterface/AnnotationInterface";
import dispatchAnnotationDetails from "./functions/dispatchAnnotationDetails";
import AnnotationHeader from "./Header/AnnotationHeader";
import BackButton from "../../components/UI/Buttons/BackButton";

function AnnotationDetails() {
  const dispatch = useDispatch();
  const { category } = useParams();
  const data = useLoaderData();
  const annotationData = data.data;

  useEffect(() => {
    if (annotationData) {
      dispatchAnnotationDetails(dispatch, category, annotationData);
    }
  }, [annotationData]);
  return (
    <div>
      <hr className="border-theme-blue" />
      <BackButton />
      <AnnotationHeader />
      <section className="annotation-interface">
        <AnnotationInterface />
      </section>
    </div>
  );
}

export default AnnotationDetails;

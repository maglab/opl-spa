import { useLoaderData } from "react-router-dom";

function AnnotationHeader() {
  const { data } = useLoaderData();

  return (
    <div className="title flex flex-row pt-8 underline">
      <h1 className="text-lg font-semibold capitalize md:text-2xl">
        {data.title}
      </h1>
    </div>
  );
}

export default AnnotationHeader;

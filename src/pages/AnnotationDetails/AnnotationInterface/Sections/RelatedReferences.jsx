import { useSelector } from "react-redux";
import { useState } from "react";
import InterfaceTemplate from "../../../../components/Template/InterfaceTemplate";
import useGetApi from "../../../../utils/hooks/useApi";

function RelatedReferences(props) {
  const annotation = useSelector((state) => state.annotation.annotation);
  const { title, id } = props.annotationData;

  // State for number of references
  const [referencesLength, setReferencesLength] = useState(0);

  return (
    <InterfaceTemplate title="References">
      <div className="py-2">
        <p className="py-2 text-sm md:text-base">
          All the references submitted for Open Problems tagged under: {title}
        </p>
        <p className="text-sm underline md:text-base">
          {referencesLength} References
        </p>
      </div>

      <hr className="border-theme-blue py-2" />
    </InterfaceTemplate>
  );
}

export default RelatedReferences;

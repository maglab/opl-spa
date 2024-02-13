import { useEffect, useState } from "react";
import InterfaceTemplate from "../../../../components/Template/InterfaceTemplate";
import apiReferences from "../../../../api/apiReferences";
// import { useState } from "react";
function References(props) {
  const { id } = props;
  const [references, setReferences] = useState(null);

  useEffect(() => {
    const getReferences = async () => {
      try {
        const { data } = await apiReferences.getReferenceForProblem({
          openProblemId: id,
        });
        setReferences(data);
      } catch (error) {
        setReferences(null);
      }
    };
    getReferences();
  }, [id]);

  return (
    <InterfaceTemplate title="References">
      <div className="references-list pt-2">
        <ul className="list-disc">
          {references ? (
            references.map((ref) => (
              <li key={ref.reference.ref_id} className="py-2">
                {ref.reference.full_citation}
              </li>
            ))
          ) : (
            <p className="text-sm font-semibold md:text-base">None</p>
          )}
        </ul>
      </div>
    </InterfaceTemplate>
  );
}

export default References;

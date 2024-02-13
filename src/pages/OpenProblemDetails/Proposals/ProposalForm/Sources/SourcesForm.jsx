import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { detailsActions } from "../../../../../state/Details/detailsSlice";
import apiReferences from "../../../../../api/apiReferences";

function SourcesForm(props) {
  const { id } = props;
  const dispatch = useDispatch();

  // Local state for singular input
  const [selected, setSelected] = useState("DOI");
  const [input, setInput] = useState("");
  const [refData, setRefData] = useState("");

  const removeHandler = (e) => {
    e.preventDefault();
    dispatch(detailsActions.removeReference({ id }));
  };

  const onChangeHandlerType = (e) => {
    const { value } = e.target;
    setSelected(value);
    setInput("");
    dispatch(detailsActions.setReference({ id, type: selected, value: input }));
  };

  const onChangeHandlerInput = (e) => {
    const { value } = e.target;
    setInput(value);
    dispatch(detailsActions.setReference({ id, type: selected, value }));
  };

  const verifyHandler = async () => {
    const type = selected;
    const value = input;
    const params = { type, value };
    try {
      const { data } = await apiReferences.verifyReference(params);
      setRefData(`${data.title} (${data.year})`);
    } catch (error) {
      setRefData("");
    }
  };

  // Debounce the input
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (input.length === 0) {
        setRefData("");
      } else {
        verifyHandler(); // Automatically trigger verification after delay
      }
    }, 1000); // Adjust the timeout as needed

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [input]);

  return (
    <>
      <div key={id} className="references flex flex-row py-2">
        <select
          onChange={onChangeHandlerType}
          key={`${id}sel`}
          name="type"
          className="mr-4 border border-theme-blue px-4"
          value={selected}
        >
          <option key={`${id}opt2`} value="DOI">
            DOI
          </option>
          <option key={`${id}opt1`} value="PMID">
            PUBMED ID
          </option>
        </select>
        <input
          onChange={onChangeHandlerInput}
          key={`${id}inp`}
          type="text"
          className="reference-input w-full border border-theme-blue px-2"
          value={input}
          maxLength={selected === "DOI" ? 100 : 8}
        />
        <button
          key={`${id}btn`}
          onClick={removeHandler}
          className="pl-2 text-sm text-theme-blue underline"
        >
          Remove
        </button>
      </div>
      <div className="verify-reference py-2">
        <p className="">{refData}</p>
      </div>
    </>
  );
}

export default SourcesForm;

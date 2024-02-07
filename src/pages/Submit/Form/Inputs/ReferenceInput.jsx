import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useField } from "formik";

import { formActions } from "../../../../state/Question/questionFormSlice";
import validateReferences from "../functions/validateReferences";
import { TextAreaNoChangeHandler } from "../../../../components/UI/Inputs/TextArea";
import apiReferences from "../../../../api/apiReferences";
import useViewWidth from "../../../../utils/hooks/useViewWidth";

/**
 * Helper function. Validates prefix of a string using regex.
 * @param {String} reference - String of input reference in DOI/PMID format. All DOIs/PMIDS need to be prefixed like this doi:XXXXXXXX
 * @returns {boolean}
 */
const validPrefixes = (reference) => {
  const prefixRegex = /^(doi|pmid):/i;
  return prefixRegex.test(reference);
};

/**
 * Validation component handles input validation logic. Only validates correct prefix and pmid/doi value through regex.
 * @param {String} inputValue - DOI/PMID references to be validated.
 * @param {Function} onValidationComplete - Callback function to be called when validation is complete
 * @returns {React.JSX}
 */
function ValidationComponent({ inputValue, onValidationComplete }) {
  const [invalidReferences, setInvalidReferences] = useState([]);
  const [validReferences, setValidReferences] = useState([]);
  const [invalidPrefixes, setInvalidPrefixes] = useState([]);
  const dispatch = useDispatch();

  //Timed validation. First check for invalid prefixes, when there is none we then validate the references.
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (inputValue.trim().length === 0) return;
      const splitReferences = inputValue
        .split(",")
        .map((reference) => reference.trim().toLowerCase())
        .filter((reference) => reference !== "");

      setInvalidPrefixes(
        splitReferences.filter((reference) => !validPrefixes(reference))
      );
      //All working as expected until here

      //Validate each reference if there are no invalid prefixed references, save valid references
      if (invalidPrefixes.length == 0) {
        const { valid, invalid } = await validateReferences(splitReferences); //Linter is saying no effect but validateReferences returns a promise.
        setValidReferences(valid);
        setInvalidReferences(invalid);
        if (invalid.length === 0) {
          // Store in redux for now
          dispatch(formActions.setReferences({ references: valid }));
        }
      }
      // Invoke the onValidationComplete callback with the validation result
      onValidationComplete(
        invalidReferences.length === 0 && invalidPrefixes.length === 0
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [
    inputValue,
    dispatch,
    invalidReferences,
    invalidPrefixes,
    validReferences,
  ]);

  if (inputValue.trim().length > 0) {
    return (
      <div className="validation-box">
        {invalidPrefixes.length > 0 ? (
          <>
            {" "}
            <p className="text-rose-600"> Incorrect prefix format:</p>
            <ul className="list-disc">
              {invalidPrefixes.map((ref) => (
                <li>{ref}</li>
              ))}
            </ul>
          </>
        ) : null}
        {invalidReferences.length > 0 ? (
          <>
            <p className="text-rose-600">Incorrect DOI/PMID format</p>
            <ul className="list-disc">
              {invalidReferences.map((ref) => (
                <li key={ref}>{ref}</li>
              ))}
            </ul>
          </>
        ) : null}
        {invalidReferences.length === 0 &&
        !invalidPrefixes &&
        validReferences.length > 0 ? (
          <p> Valid DOI/PMID formats.</p>
        ) : null}
      </div>
    );
  }
}

/**
 *  Reference List component handles rendering of references - both invalid and valid
 * @param {[String]} references - Array of references to be rendered
 * @returns
 */
function ReferenceList({ classNames, references }) {
  // Render the list of valid and invalid references here
  return (
    <ul className={`${classNames}`}>
      {references.map((reference) => (
        <li className="text-sm md:text-base">
          {reference.title} {reference.year}
        </li>
      ))}
    </ul>
  );
}

/**
 * Text area for references for submitting open problems. Validates inputted DOIs and PMIDs and then uses API to search existance of articles.
 * @returns {React.Component}
 */
function ReferenceInput({ id, name, label, placeHolder, type }) {
  // Remember that the validation component stores references in redux store when input values are valid.
  const referencesState = useSelector(
    (state) => state.form.formDetails.references
  );
  const [field, meta] = useField(name);
  const { value } = meta; //Might need to track value
  const { isMobile } = useViewWidth();

  const [convertedReferences, setConvertedReferences] = useState([]);
  const [unconvertedReferences, setUnconvertedReferences] = useState([]); //Not used for now
  //State for input DOI/PMIDS prefixes set by validation component
  const [referencesIsValid, setReferencesIsValid] = useState(true);

  //Use effect for retrieving reference data from API. Should only be called when there are no invalid prefixes.
  useEffect(() => {
    if (value.trim().length === 0) setReferencesIsValid(true);
    if (!referencesIsValid) {
      setConvertedReferences([]);
      setUnconvertedReferences([]);
    }
    async function getReferenceDetails() {
      const response = await apiReferences.verifyReferences({
        references: referencesState,
      });
      const references = response.data;
      setConvertedReferences(references.verified_references);
      setUnconvertedReferences(references.unconverted_references);
    }
    getReferenceDetails();

    // Update state and dispatch actions here
  }, [value]);

  // Callback to handle validation completion in the parent component
  const handleValidationComplete = (isValid) => {
    setReferencesIsValid(isValid); // Used in the validation component to indicate that all DOIs/PMIDs have been validated or if all DOIs/PMIDs are valid
  };

  return (
    <>
      <ValidationComponent
        inputValue={value}
        onValidationComplete={handleValidationComplete}
      />

      <div
        className={`grid py-4 items-center ${
          isMobile ? "grid-cols-1" : "grid-cols-[20%_80%]"
        } text-center font-general`}
      >
        <label className="font-semibold" htmlFor={id}>
          {label}
        </label>
        <textarea
          rows={2}
          name={name}
          type={type}
          placeHolder={placeHolder}
          {...field}
          className="text-input h-fit-content h-auto w-full rounded-md border border-slate-500 bg-bg-grey p-2"
        />
      </div>
      <ReferenceList references={convertedReferences} />
      {/* {unconvertedReferences.length > 0 && (
        <>
          <p> Unconverted References:</p>
          <ReferenceList references={unconvertedReferences} />
        </>
      )} */}
    </>
  );
}

export default ReferenceInput;

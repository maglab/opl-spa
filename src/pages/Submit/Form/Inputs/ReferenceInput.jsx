import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useField } from "formik";

import { formActions } from "../../../../state/Question/questionFormSlice";
import validateReferences from "../functions/validateReferences";
import { TextAreaNoChangeHandler } from "../../../../components/UI/Inputs/TextArea";
import apiReferences from "../../../../api/apiReferences";
import useViewWidth from "../../../../utils/hooks/useViewWidth";

function regexTest(inputValue, validCallback, invalidCallback) {
  const doiRegex = /^(doi:|DOI:)?10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i;
  const pubmedIDPattern = /^(pmid:|PMID:)?\d+$/;

  if (doiRegex.test(inputValue) || pubmedIDPattern.test(inputValue)) {
    validCallback((previous) => [...previous, inputValue]);
  } else {
    return invalidCallback((previous) => [...previous, inputValue]);
  }
}

/**
 * Validation component handles input validation logic. Only validates correct prefix and pmid/doi value through regex.
 * @param {String} inputValue - DOI/PMID references to be validated.
 * @param {Boolean} touched - Boolean to determine whether the references input has been touched
 * @returns {React.JSX}
 */
function ValidationComponent({ inputValue, touched }) {
  const [validReferences, setValidReferences] = useState([]);
  const [invalidReferences, setInvalidReferences] = useState([]);
  useEffect(() => {
    if (inputValue.trim() === 0) return;
    const splitInputValues = inputValue.trim(" ").split(",");
    splitInputValues.forEach((inputValue) =>
      regexTest(inputValue, setValidReferences, setInvalidReferences)
    );
    console.log(validReferences, invalidReferences);
  }, [inputValue]);
  return <div></div>;
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
  //Tracking input values
  const [field, meta] = useField(name, type);
  const { value } = meta;
  //Tracking view width
  const { isMobile } = useViewWidth();
  // States for tracking valid and invalid references

  return (
    <>
      <ValidationComponent
        inputValue={value}
        // onValidationComplete={handleValidationComplete}
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
      {/* <ReferenceList /> */}
    </>
  );
}

export default ReferenceInput;

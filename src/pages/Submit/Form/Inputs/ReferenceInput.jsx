import React, { useEffect, useState } from "react";
import { useField } from "formik";

import useViewWidth from "../../../../utils/hooks/useViewWidth";
import apiReferences from "../../../../api/apiReferences";

/**
 * Regex test for DOI and PMID strings.
 * @param {String} inputValue - PMID or DOI string.
 * @returns {Boolean} True or false depending whether regex test passed.
 */
function regexTest(inputValue) {
  const doiRegex =
    /^(doi:|DOI:)(https:\/\/doi.org\/)?10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i;
  const pubmedIDPattern = /^(pmid:|PMID:)\d+$/;

  if (doiRegex.test(inputValue) || pubmedIDPattern.test(inputValue)) {
    return true;
  } else {
    return false;
  }
}

/**
 * Formats inputted DOIs and PMIDs suitable for api call to verify
 * @param {Array} - Array of DOIs and PMIDs.
 * @returns {Array} - Array of objects containing type of reference and its value.
 */
function formatReferences(inputValues) {
  const formattedRefs = [];
  for (const val of inputValues) {
    const split = val.split(":");
    const type = split[0];
    const value = split[1];
    formattedRefs.push({ type: type, value: value });
  }
  return formattedRefs;
}

/**
 * Validation component handles input validation logic. Only validates correct prefix and pmid/doi value through regex.
 * @param {String} inputValue - DOI/PMID references to be validated.
 * @param {Object} validUseState - useState value and setState function for input values that pass regex.
 * @param {Object} invalidUseState - useState value and setState function for input values that don't pass regex.
 * @returns {React.JSX}
 */
function ValidationComponent({ inputValue, validUseState, invalidUseState }) {
  //Unpack useState return values
  const { validReferences, setValidReferences } = validUseState;
  const { invalidReferences, setInvalidReferences } = invalidUseState;
  useEffect(() => {
    if (inputValue.trim() === 0) return;
    const splitInputValues = inputValue
      .trim(" ")
      .split(",")
      .filter((value) => value !== "");
    const passedTests = splitInputValues.filter((split) => regexTest(split));
    const failedTests = splitInputValues.filter((split) => !regexTest(split));
    setValidReferences(passedTests);
    setInvalidReferences(failedTests);
  }, [inputValue]);
  return (
    <div>
      <p className="text-center">
        DOI/PMID values must be prefixed with DOI: or PMID:
      </p>
      {invalidReferences.length > 0 && (
        <>
          <h3 className="text-center text-red-600">
            Incorrectly formatted references:
          </h3>
          <ul className="text-red-600">
            {invalidReferences.map((ref) => (
              <li key={ref}>{ref}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

/**
 *  Reference List component handles rendering of references - both invalid and valid
 * @param {[String]} references - Array of references to be rendered
 * @returns
 */
function ReferenceList({ classNames, references, error }) {
  const {
    verified_references: verifiedReferences,
    unverified_references: unverifiedReferences,
  } = references;
  // Render the list of valid and invalid references here
  if (error) {
    return (
      <div>
        <p>Error retrieving references: {error.message} </p>
      </div>
    );
  }
  return (
    <div className={`${classNames}`}>
      <div className="verified-refs flex flex-col">
        {verifiedReferences.length > 0 && (
          <p className="text-center"> Retrieved references: </p>
        )}
        <ul className="text-sm">
          {verifiedReferences.map((reference) => (
            <li>{reference.citation}</li>
          ))}
        </ul>
      </div>
      <div className="unverified-refs flex flex-col">
        {unverifiedReferences.length > 0 && (
          <p>Unable to retrieve reference information for:</p>
        )}
        <ul>
          {unverifiedReferences.map((reference) => (
            <li>
              {reference.type}:{reference.value} - {reference.error}
            </li>
          ))}
        </ul>
      </div>
    </div>
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
  const [validReferences, setValidReferences] = useState([]);
  const [invalidReferences, setInvalidReferences] = useState([]);

  //Set the default value to the response to the API. Assume an empty response on start.
  const INITIAL_STATE = { verified_references: [], unverified_references: [] };
  const [retrievedReferences, setRetrievedReferences] = useState(INITIAL_STATE);
  const [error, setError] = useState(false);

  useEffect(() => {
    setRetrievedReferences(INITIAL_STATE);
    if (invalidReferences.length > 0) return;
    const delayDebounceFunction = setTimeout(async () => {
      const formattedReferences = formatReferences(validReferences);
      try {
        const { data } = await apiReferences.verifyReferences({
          references: formattedReferences,
        });
        setRetrievedReferences(data);
        console.log(retrievedReferences);
      } catch (error) {
        setError(error);
      }
    });

    return () => clearTimeout(delayDebounceFunction);
  }, [value]);

  return (
    <>
      <div
        className={`grid py-4 items-center ${
          isMobile ? "grid-cols-1" : "grid-cols-[20%_80%]"
        } text-center font-general`}
      >
        <label className="font-semibold" htmlFor={id}>
          {label}
        </label>
        <div>
          <ValidationComponent
            inputValue={value}
            validUseState={{ validReferences, setValidReferences }}
            invalidUseState={{ invalidReferences, setInvalidReferences }}
          />
          <textarea
            rows={2}
            name={name}
            type={type}
            placeholder={placeHolder}
            {...field}
            className="text-input h-fit-content h-auto w-full rounded-md border border-slate-500 bg-bg-grey p-2"
          />
          <ReferenceList
            references={retrievedReferences}
            error={error}
            classNames="flex justify-center text-center"
          />
        </div>
      </div>
    </>
  );
}

export default ReferenceInput;

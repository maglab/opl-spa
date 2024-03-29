import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../../../../state/Question/questionFormSlice";
import { formValidationActions } from "../../../../state/Question/formValidationSlice";
import handleValidation from "../functions/validateReferences";
import { TextAreaNoChangeHandler } from "../../../../components/UI/Inputs/TextArea";
import apiReferences from "../../../../api/apiReferences";

function ReferencesInput() {
  const dispatch = useDispatch();
  // Extracting state values using selectors
  const referencesState = useSelector(
    (state) => state.form.formDetails.references
  );
  const inputReferences = useSelector(
    (state) => state.form.formDetails.referencesTextArea
  );
  const isMobileState = useSelector((state) => state.question.isMobile);

  // Local state management for various validations and UI interactions
  const [isValidating, setIsValidating] = useState(false);
  const [invalidReferences, setInvalidReferences] = useState([]);
  const [convertedReferences, setConvertedReferences] = useState([]);
  const [unconvertedReferences, setUnconvertedReferences] = useState([]);
  const [invalidPrefixes, setInvalidPrefixes] = useState(false);
  const [referencesIsValid, setReferencesIsValid] = useState(true);
  const [allValid, setAllValid] = useState(false);

  // Utility function to check if a reference has a valid prefix
  const validPrefixes = (reference) => {
    const prefixRegex = /^(doi|pmid):/i;
    return prefixRegex.test(reference);
  };

  // Handler that gets triggered on text area changes
  const onChangeHandler = (e) => {
    const inputValue = e.target.value;
    // Updating the global state
    dispatch(formActions.setInputReferences({ value: inputValue }));
    // Resetting previous validation states
    setInvalidReferences([]);
    setInvalidPrefixes(false);
    setIsValidating(true);
    dispatch(formActions.setReferences({ references: [] }));
    setUnconvertedReferences([]);

    if (isValidating) {
      clearTimeout(isValidating);
    }

    const newTimer = setTimeout(async () => {
      const splitReferences = inputValue
        .split(",")
        .map((reference) => reference.trim().toLowerCase())
        .filter((reference) => reference !== "");

      const invalidPrefixesArr = splitReferences.filter(
        (reference) => !validPrefixes(reference)
      );

      setInvalidPrefixes(invalidPrefixesArr.length > 0);

      if (!invalidPrefixes) {
        try {
          const { valid, invalid } = await handleValidation(
            splitReferences,
            invalidPrefixes
          );
          if (invalid.length === 0) {
            setReferencesIsValid(true);
            dispatch(formActions.setReferences({ references: valid }));
          } else {
            setInvalidReferences(invalid);
            setReferencesIsValid(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
      setIsValidating(false);
    }, 1000);

    setIsValidating(newTimer);
  };

  // Effect to handle reference validation upon user input or data changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (inputReferences.trim().length === 0) {
        dispatch(formValidationActions.checkReferences({ validStatus: true }));
      }
      if (!referencesIsValid) return;

      async function getReferenceDetails() {
        try {
          const response = await apiReferences.verifyReferences({
            references: referencesState,
          });

          const referenceArr = [];
          const unverifiedReferenceArr = [];
          const { data } = response;
          const { verified_references, unverified_references } = data;

          for (const reference of verified_references) {
            const referenceString = `${reference.title} (${reference.year})`;
            referenceArr.push(referenceString);
          }

          for (const reference of unverified_references) {
            const referenceString = `${reference.title} (${reference.year})`;
            unverifiedReferenceArr.push(referenceString);
          }

          setConvertedReferences(referenceArr);
          setUnconvertedReferences(unverifiedReferenceArr);
        } catch (error) {
          console.log(error);
        }
      }
      getReferenceDetails();

      dispatch(
        formActions.setValidReferences({ validReferences: convertedReferences })
      );

      setAllValid(
        (invalidReferences.length === 0 &&
          !invalidPrefixes &&
          unconvertedReferences.length === 0) ||
          referencesState.length === 0
      );

      if (allValid) {
        dispatch(
          formValidationActions.checkReferences({ validStatus: allValid })
        );
        console.log(referencesState);
      }
    }, 1000);

    return function () {
      clearTimeout(timeout);
    };
  }, [referencesState, referencesIsValid, invalidReferences]);

  // Determine if there are any invalid references
  const isInvalid =
    invalidReferences.length > 0 ||
    invalidPrefixes ||
    unconvertedReferences.length > 0;

  return (
    <>
      {isInvalid && (
        <p>Incorrect DOI/PMID format or incorrect prefix format.</p>
      )}
      <div
        className={`flex w-full ${
          isMobileState ? "flex-col" : "flex-row"
        } items-center py-[1.5rem] text-center`}
      >
        <label
          htmlFor=""
          className={`inline-block font-semibold ${
            isMobileState ? "w-full" : "w-1/5"
          }`}
        >
          References:
        </label>

        <TextAreaNoChangeHandler
          className={`h-fit-content h-auto ${
            isMobileState ? "w-full" : "w-4/5"
          } rounded border ${
            invalidReferences.length > 0 || invalidPrefixes
              ? "border-rose-600 focus:border-rose-600 focus:outline-rose-600"
              : "border-slate-500 focus:border-slate-50"
          } bg-bg-grey p-2 `}
          placeHolder="Comma-separated DOIs or PMIDs. Enter each DOI or PMID with the prefix 'DOI:' or 'PMID:' respectively."
          value={inputReferences}
          onChange={onChangeHandler}
        />
      </div>
      <div className="converted-references flex flex-col py-2 text-red-600">
        {isInvalid && (
          <>
            <p>
              Invalid DOIs or PMIDS - Incorrect format or cannot fetch reference
            </p>
            <ul className="invalid-prefix py-2">
              {invalidReferences.map((ref, index) => (
                <li key={index}> {ref} </li>
              ))}
              {unconvertedReferences.map((ref, index) => (
                <li key={index}> {ref} </li>
              ))}
            </ul>
          </>
        )}

        {convertedReferences.length > 0 && (
          <>
            <p className="text-black underline ">Converted references:</p>
            <ul className="converted-references text-black">
              {convertedReferences.map((ref, index) => (
                <li key={index}> {ref} </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export default ReferencesInput;

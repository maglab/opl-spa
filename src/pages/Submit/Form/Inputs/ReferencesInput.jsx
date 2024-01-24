import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formActions } from "../../../../state/Question/questionFormSlice";
import { formValidationActions } from "../../../../state/Question/formValidationSlice";
import validateReferences from "../functions/validateReferences";
import { TextAreaNoChangeHandler } from "../../../../components/UI/Inputs/TextArea";
import apiReferences from "../../../../api/apiReferences";
import Spinner from "../../../../components/UI/Loading/Spinner";

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
 * Validation component handles input validation logic.
 * @param {String} inputValue - DOI/PMID references to be validated.
 * @param {Function} onValidationComplete - Callback function to be called when validation is complete
 * @param {Function} setIsValidating - useState function to set the state whether component is validating or not.
 * @returns {React.JSX}
 */
function ValidationComponent({
  inputValue,
  onValidationComplete,
  setIsValidating,
}) {
  const [invalidReferences, setInvalidReferences] = useState([]);
  const [invalidPrefixes, setInvalidPrefixes] = useState(false);
  const dispatch = useDispatch();

  //Timed validation. First check for invalid prefixes, when there is none we then validate the references.
  useEffect(() => {
    setIsValidating(true);
    const timer = setTimeout(async () => {
      const splitReferences = inputValue.split(",").map((reference) =>
        reference
          .trim()
          .toLowerCase()
          .filter((reference) => reference !== "")
      );

      const invalidPrefixesArr = splitReferences.filter(
        (reference) => !validPrefixes(reference)
      );

      if (invalidPrefixes.length == 0) {
        const { valid, invalid } = validateReferences(splitReferences);
        if (invalid.length === 0) {
          //Store in redux??
          dispatch(formActions.setReferences({ references: valid }));
        } else {
          setInvalidReferences(true);
        }
      }
      setInvalidPrefixes(invalidPrefixesArr.length > 0);
      setIsValidating(false);
      // Invoke the onValidationComplete callback with the validation result
      onValidationComplete(invalidReferences.length === 0 && !invalidPrefixes);
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    inputValue,
    setIsValidating,
    dispatch,
    invalidReferences,
    invalidPrefixes,
    onValidationComplete,
  ]);

  return (
    <div className="validation-box">
      {invalidPrefixes.length > 0 && (
        <p className="text-rose-600"> Incorrect prefix format</p>
      )}
      {invalidReferences && (
        <p className="text-rose-600">Incorrect DOI/PMID format</p>
      )}
      {!invalidReferences && invalidPrefixes.length === 0 && (
        <p> Valid DOI/PMID formats.</p>
      )}
    </div>
  );
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
        <li>{reference}</li>
      ))}
    </ul>
  );
}

function ReferencesInput() {
  const dispatch = useDispatch();
  const referencesState = useSelector(
    (state) => state.form.formDetails.references
  );
  const inputReferences = useSelector(
    (state) => state.form.formDetails.referencesTextArea
  );
  const isMobileState = useSelector((state) => state.question.isMobile);

  const [isValidating, setIsValidating] = useState(false);
  const [convertedReferences, setConvertedReferences] = useState([]);
  const [unconvertedReferences, setUnconvertedReferences] = useState([]);
  //State for input DOI/PMIDS set by validation component
  const [referencesIsValid, setReferencesIsValid] = useState(true);

  const onChangeHandler = (e) => {
    const inputValue = e.target.value;
    dispatch(formActions.setInputReferences({ value: inputValue }));
  };

  useEffect(() => {
    if (inputReferences.trim().length === 0) {
      dispatch(formValidationActions.checkReferences({ validStatus: true }));
    }
    if (!referencesIsValid) return;

    async function getReferenceDetails() {
      const response = await apiReferences.verifyReferences({
        references: referencesState,
      });
      const references = response.data;
      setConvertedReferences(references.verifiedReferences);
      setUnconvertedReferences(references.u);
    }
    getReferenceDetails();

    // Update state and dispatch actions here
  }, [referencesState, referencesIsValid, dispatch, inputReferences]);

  // Callback to handle validation completion in the parent component
  const handleValidationComplete = (isValid) => {
    setIsValidating(true);
    setReferencesIsValid(isValid);
  };

  return (
    <>
      <ValidationComponent
        inputValue={inputReferences}
        onValidationComplete={handleValidationComplete}
        setIsValidating={setIsValidating}
      />

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
            !referencesIsValid
              ? "border-rose-600 focus:border-rose-600 focus:outline-rose-600"
              : "border-slate-500 focus:border-slate-50"
          } bg-bg-grey p-2 `}
          placeHolder="Comma-separated DOIs or PMIDs. Enter each DOI or PMID with the prefix 'DOI:' or 'PMID:' respectively."
          value={inputReferences}
          onChange={onChangeHandler}
        />
      </div>
      <ReferenceList references={convertedReferences} />
    </>
  );
}

export default ReferencesInput;

// function ReferencesInput() {
//   const dispatch = useDispatch();
//   // Extracting state values using selectors
//   const referencesState = useSelector(
//     (state) => state.form.formDetails.references
//   );
//   const inputReferences = useSelector(
//     (state) => state.form.formDetails.referencesTextArea
//   );
//   const isMobileState = useSelector((state) => state.question.isMobile);

//   // Local state management for various validations and UI interactions
//   const [isValidating, setIsValidating] = useState(false);
//   const [invalidReferences, setInvalidReferences] = useState([]);
//   const [convertedReferences, setConvertedReferences] = useState([]);
//   const [unconvertedReferences, setUnconvertedReferences] = useState([]);
//   const [invalidPrefixes, setInvalidPrefixes] = useState(false);
//   const [referencesIsValid, setReferencesIsValid] = useState(true);
//   const [allValid, setAllValid] = useState(false);

//   // Utility function to check if a reference has a valid prefix
//   const validPrefixes = (reference) => {
//     const prefixRegex = /^(doi|pmid):/i;
//     return prefixRegex.test(reference);
//   };

//   // Handler that gets triggered on text area changes
//   const onChangeHandler = (e) => {
//     const inputValue = e.target.value;
//     // Updating the global state
//     dispatch(formActions.setInputReferences({ value: inputValue }));
//     // Resetting previous validation states
//     setInvalidReferences([]);
//     setInvalidPrefixes(false);
//     setIsValidating(true);
//     dispatch(formActions.setReferences({ references: [] }));
//     setUnconvertedReferences([]);

//     if (isValidating) {
//       clearTimeout(isValidating);
//     }

//     const newTimer = setTimeout(async () => {
//       const splitReferences = inputValue
//         .split(",")
//         .map((reference) => reference.trim().toLowerCase())
//         .filter((reference) => reference !== "");

//       const invalidPrefixesArr = splitReferences.filter(
//         (reference) => !validPrefixes(reference)
//       );

//       setInvalidPrefixes(invalidPrefixesArr.length > 0);

//       if (!invalidPrefixes) {
//         try {
//           const { valid, invalid } = await handleValidation(
//             splitReferences,
//             invalidPrefixes
//           );
//           if (invalid.length === 0) {
//             setReferencesIsValid(true);
//             dispatch(formActions.setReferences({ references: valid }));
//           } else {
//             setInvalidReferences(invalid);
//             setReferencesIsValid(false);
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       }
//       setIsValidating(false);
//     }, 1000);

//     setIsValidating(newTimer);
//   };

//   // Effect to handle reference validation upon user input or data changes
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       if (inputReferences.trim().length === 0) {
//         dispatch(formValidationActions.checkReferences({ validStatus: true }));
//       }
//       if (!referencesIsValid) return;

//       async function getReferenceDetails() {
//         try {
//           const response = await apiReferences.verifyReferences({
//             references: referencesState,
//           });

//           const referenceArr = [];
//           const unverifiedReferenceArr = [];
//           const { data } = response;
//           const { verified_references, unverified_references } = data;

//           for (const reference of verified_references) {
//             const referenceString = `${reference.title} (${reference.year})`;
//             referenceArr.push(referenceString);
//           }

//           for (const reference of unverified_references) {
//             const referenceString = `${reference.title} (${reference.year})`;
//             unverifiedReferenceArr.push(referenceString);
//           }

//           setConvertedReferences(referenceArr);
//           setUnconvertedReferences(unverifiedReferenceArr);
//         } catch (error) {
//           console.log(error);
//         }
//       }
//       getReferenceDetails();

//       dispatch(
//         formActions.setValidReferences({ validReferences: convertedReferences })
//       );

//       setAllValid(
//         (invalidReferences.length === 0 &&
//           !invalidPrefixes &&
//           unconvertedReferences.length === 0) ||
//           referencesState.length === 0
//       );

//       if (allValid) {
//         dispatch(
//           formValidationActions.checkReferences({ validStatus: allValid })
//         );
//         console.log(referencesState);
//       }
//     }, 1000);

//     return function () {
//       clearTimeout(timeout);
//     };
//   }, [
//     referencesState,
//     referencesIsValid,
//     invalidReferences,
//     allValid,
//     convertedReferences,
//     dispatch,
//     inputReferences,
//   ]);

//   // Determine if there are any invalid references
//   const isInvalid =
//     invalidReferences.length > 0 ||
//     invalidPrefixes ||
//     unconvertedReferences.length > 0;

//   return (
//     <>
//       {isInvalid && (
//         <p>Incorrect DOI/PMID format or incorrect prefix format.</p>
//       )}
//       <div
//         className={`flex w-full ${
//           isMobileState ? "flex-col" : "flex-row"
//         } items-center py-[1.5rem] text-center`}
//       >
//         <label
//           htmlFor=""
//           className={`inline-block font-semibold ${
//             isMobileState ? "w-full" : "w-1/5"
//           }`}
//         >
//           References:
//         </label>

//         <TextAreaNoChangeHandler
//           className={`h-fit-content h-auto ${
//             isMobileState ? "w-full" : "w-4/5"
//           } rounded border ${
//             invalidReferences.length > 0 || invalidPrefixes
//               ? "border-rose-600 focus:border-rose-600 focus:outline-rose-600"
//               : "border-slate-500 focus:border-slate-50"
//           } bg-bg-grey p-2 `}
//           placeHolder="Comma-separated DOIs or PMIDs. Enter each DOI or PMID with the prefix 'DOI:' or 'PMID:' respectively."
//           value={inputReferences}
//           onChange={onChangeHandler}
//         />
//       </div>
//       <div className="converted-references flex flex-col py-2 text-red-600">
//         {isInvalid && (
//           <>
//             <p>
//               Invalid DOIs or PMIDS - Incorrect format or cannot fetch reference
//             </p>
//             <ul className="invalid-prefix py-2">
//               {invalidReferences.map((ref, index) => (
//                 <li key={index}> {ref} </li>
//               ))}
//               {unconvertedReferences.map((ref, index) => (
//                 <li key={index}> {ref} </li>
//               ))}
//             </ul>
//           </>
//         )}

//         {convertedReferences.length > 0 && (
//           <>
//             <p className="text-black underline ">Converted references:</p>
//             <ul className="converted-references text-black">
//               {convertedReferences.map((ref, index) => (
//                 <li key={index}> {ref} </li>
//               ))}
//             </ul>
//           </>
//         )}
//       </div>
//     </>
//   );
// }

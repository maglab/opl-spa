import { useField } from "formik";
import React, { useEffect, useState } from "react";

import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import apiReferences from "../../../../api/apiReferences";
import { InputWithFormLabelMultiline } from "../../../../components/UI/Inputs/TextArea";
import useViewWidth from "../../../../utils/hooks/useViewWidth";
import regexTest from "../functions/referenceRegex";

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

const validationBoxStyles = {
  textAlign: "center",
};
const listItemTypography = {
  color: "error",
};
const listStyles = {
  paddingTop: 0,
  paddingBottom: 0,
  textAlign: "center",
};
const listItemStyle = {
  width: "full",
  display: "list-item",
  paddingLeft: 0,
  paddingTop: 0, // Override top padding
  paddingBottom: 0, // Override bottom padding
  textAlign: "center",
};
/**
 * Validation component handles input validation logic. Only validates correct prefix and pmid/doi value through regex.
 * @param {String} inputValue - DOI/PMID references to be validated.
 * @param {Object} validUseState - useState value and setState function for input values that pass regex.
 * @param {Object} invalidUseState - useState value and setState function for input values that don't pass regex.
 * @returns {React.JSX}
 */
function ValidationComponent({ inputValue, validUseState, invalidUseState }) {
  //Unpack useState return values
  const { setValidReferences } = validUseState;
  const { invalidReferences, setInvalidReferences } = invalidUseState;
  useEffect(() => {
    if (inputValue.trim(" ").length === 0) {
      setValidReferences([]);
      setInvalidReferences([]);
    }
    const splitInputValues = inputValue
      .trim("")
      .split(/\s*,\s*/)
      .filter(Boolean);
    const passedTests = [];
    const failedTests = [];

    splitInputValues.forEach((value) => {
      if (regexTest(value)) {
        passedTests.push(value);
      } else {
        failedTests.push(value);
      }
    });
    setValidReferences(passedTests);
    setInvalidReferences(failedTests);
  }, [inputValue]);
  return (
    <Box className="validation-box" sx={validationBoxStyles}>
      <Typography variant="subtitle1">
        DOI/PMID values must be prefixed with DOI: or PMID.
      </Typography>
      {invalidReferences.length > 0 && (
        <>
          <Typography color="error">
            Incorrectly formatted references:
          </Typography>
          <List className="list" sx={listStyles}>
            {invalidReferences.map((reference) => (
              <ListItem
                key={reference}
                className="list-item"
                sx={listItemStyle}
              >
                <ListItemText
                  primaryTypographyProps={listItemTypography}
                  primary={reference}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
}

/**
 *  Reference List component handles rendering of references - both invalid and valid
 * @param {[String]} references - Array of references to be rendered
 * @returns
 */
function ReferenceList({ references, error }) {
  const {
    verified_references: verifiedReferences,
    unverified_references: unverifiedReferences,
  } = references;
  // Render the list of valid and invalid references here
  if (error) {
    return (
      <Box>
        <Typography variant="subtitle1" color="error">
          Error retrieving references: {error.message}
        </Typography>
      </Box>
    );
  }
  return (
    <Box>
      <Box className="verified-refs">
        {verifiedReferences.length > 0 && (
          <Typography variant="body1">Retrieved references:</Typography>
        )}
        {
          <List>
            {verifiedReferences.map((reference) => (
              <ListItem key={reference.title}>{reference.citation}</ListItem>
            ))}
          </List>
        }
      </Box>
      <Box className="unverified-refs">
        {unverifiedReferences.length > 0 && (
          <Typography variant="body1">
            Unable to retrieve reference information for:
          </Typography>
        )}
        <List>
          {unverifiedReferences.map((reference) => (
            <ListItem key={reference.title}>{reference.citation}</ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

const boxStyles = {
  width: "100%",
};

/**
 * Text area for references for submitting open problems. Validates inputted DOIs and PMIDs and then uses API to search existance of articles.
 * @returns {React.Component}
 */
function ReferenceInput({ id, name, placeHolder, type }) {
  //Tracking input values
  const [field, meta] = useField(name, type);
  const { value } = meta;
  //Tracking view width
  const { isMobile } = useViewWidth();
  // States for tracking valid and invalid references
  const [validReferences, setValidReferences] = useState([]);
  const [invalidReferences, setInvalidReferences] = useState([]);

  //Set the default value to mirror the response to the API. Assume an empty response on start.
  const INITIAL_STATE = { verified_references: [], unverified_references: [] };
  const [retrievedReferences, setRetrievedReferences] = useState(INITIAL_STATE);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (invalidReferences.length > 0) return;
    const delayDebounceFunction = setTimeout(async () => {
      const formattedReferences = formatReferences(validReferences);
      try {
        const { data } = await apiReferences.verifyReferences({
          references: formattedReferences,
        });
        setRetrievedReferences(data);
      } catch (error) {
        setError(error);
      }
    }, 1200);

    return () => clearTimeout(delayDebounceFunction);
  }, [value.split(",").length]);

  return (
    <Box sx={boxStyles}>
      <InputWithFormLabelMultiline
        id={id}
        label="References (comma separated DOI/PMID)"
        name={name}
        field={field}
        meta={meta}
        placeHolder={placeHolder}
      />
      <ValidationComponent
        inputValue={value}
        validUseState={{ validReferences, setValidReferences }}
        invalidUseState={{ invalidReferences, setInvalidReferences }}
      />
      <ReferenceList
        references={retrievedReferences}
        error={error}
        classNames="flex justify-center text-center"
      />
    </Box>
  );
}

export default ReferenceInput;

import { Button } from "@mui/material";
import { FieldArray, useField } from "formik";
import React from "react";
import REFERENCE_TYPE_KEYS from "../../constants/referenceTypes";
import newRandomId from "../../utilities/randomId";
import StandardSection from "../common/standardSection";
import StandardStack from "../common/standardStack";
import ReferenceItem from "./referenceItem";

export default function ReferencesSection() {
  const [field] = useField("references");

  return (
    <StandardSection header="References">
      <FieldArray name="references">
        {({ push, remove }) => (
          <StandardStack minor direction="column">
            {field.value.map((reference, index) => (
              <ReferenceItem key={reference.id} index={index} remove={remove} />
            ))}
            <Button
              variant="outlined"
              onClick={() =>
                push({
                  id: newRandomId(),
                  type: REFERENCE_TYPE_KEYS.doi,
                  value: "",
                })
              }
            >
              Add Reference
            </Button>
          </StandardStack>
        )}
      </FieldArray>
    </StandardSection>
  );
}

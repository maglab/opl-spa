import { Button } from "@mui/material";
import { FieldArray, useField } from "formik";
import React from "react";
import newRandomId from "../../utilities/randomId";
import HeaderContent from "../common/headerContent";
import StandardStack from "../common/standardStack";
import ReferenceItem from "./referenceItem";

export default function ReferenceSection() {
  const [field] = useField("references");

  return (
    <HeaderContent header="References">
      <FieldArray name="references">
        {({ push, remove }) => (
          <StandardStack minor direction="column">
            {field.value.map((reference, index) => (
              <ReferenceItem key={reference.id} index={index} remove={remove} />
            ))}
            <Button
              variant="outlined"
              onClick={() =>
                push({ id: newRandomId(), type: "DOI", value: "" })
              }
            >
              Add Reference
            </Button>
          </StandardStack>
        )}
      </FieldArray>
    </HeaderContent>
  );
}

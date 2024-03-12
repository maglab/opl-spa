import { Button, Stack, Typography } from "@mui/material";
import { FieldArray, useField } from "formik";
import React from "react";
import newRandomId from "../../utilities/randomId";
import ReferenceItem from "./referenceItem";

export default function ReferenceSection() {
  const [field] = useField("references");

  return (
    <Stack spacing={4}>
      <Typography variant="h5" textAlign="center">
        References
      </Typography>
      <FieldArray name="references">
        {({ push, remove }) => (
          <Stack direction="column" spacing={2}>
            {field.value.map((reference, index) => (
              <ReferenceItem key={reference.id} index={index} remove={remove} />
            ))}
            <Stack alignItems="center">
              <Button
                variant="outlined"
                onClick={() =>
                  push({ id: newRandomId(), type: "DOI", value: "" })
                }
              >
                Add Reference
              </Button>
            </Stack>
          </Stack>
        )}
      </FieldArray>
    </Stack>
  );
}

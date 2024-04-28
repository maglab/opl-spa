import React from "react";
import FormManagedTextField from "../common/formManagedTextField";
import StandardSection from "../common/standardSection";
import StandardStack from "../common/standardStack";
import DuplicatedReminder from "./duplicatedReminder";

export default function DetailsSection() {
  return (
    <StandardSection header="Problem">
      <StandardStack minor>
        <FormManagedTextField
          name="title"
          label="Title"
          size="small"
          multiline
          required
        />
        <DuplicatedReminder />
        <FormManagedTextField
          name="description"
          label="Description"
          required
          multiline
          minRows={6}
        />
      </StandardStack>
    </StandardSection>
  );
}

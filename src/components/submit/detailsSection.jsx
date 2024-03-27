import React from "react";
import FormManagedTextField from "../common/formManagedTextField";
import HeaderContent from "../common/headerContent";
import StandardStack from "../common/standardStack";
import DuplicatedReminder from "./duplicatedReminder";

export default function DetailsSection() {
  return (
    <HeaderContent header="Details">
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
    </HeaderContent>
  );
}

import { Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";
import StandardStack from "../common/standardStack";

import contactKeys from "../../constants/userKeys";
import {
  formatFullName,
  setDate,
} from "../../utils/functions/dataManipulation";

function PostMetaData({ postData }) {
  const {
    created_at: date = null,
    first_name: firstName,
    last_name: lastName,
  } = postData;
  const dateString = date ? setDate(date) : null;
  const fullName = formatFullName(firstName, lastName);
  return (
    <StandardStack alignItems="flex-end">
      <StandardStack
        width="fit-content"
        bgcolor={blue[50]}
        padding={0.5}
        spacing={0.5}
      >
        <Typography variant="body2"> Posted {dateString}</Typography>
        <Typography variant="body2" color="primary.light">
          {fullName}
        </Typography>
      </StandardStack>
    </StandardStack>
  );
}

export function UserInformation({ contact }) {
  const firstName = contact ? contact[contactKeys.firstName] ?? "" : "";
  const lastName = contact ? contact[contactKeys.lastName] ?? "" : "";

  const fullName = formatFullName(firstName, lastName);

  return (
    <StandardStack alignItems="flex-end">
      <StandardStack bgcolor={blue[50]} padding={0.5} spacing={0.5}>
        <Typography variant="body2" color="primary.light">
          {fullName}
        </Typography>
      </StandardStack>
    </StandardStack>
  );
}

export default PostMetaData;

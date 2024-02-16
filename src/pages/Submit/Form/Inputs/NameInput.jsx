import { Box } from "@mui/material";
import { useField } from "formik";

import { InputWithFormLabel } from "../../../../components/UI/Inputs/TextInput";

const nameBoxStyles = {
  display: "flex",
  flexDirection: "row",
  justifyItems: "evenly",
  gap: "1rem",
  width: "100%",
};

/**
 * Custom formik input for first name and last name.
 * @param {String} classNames - Additional classnames for tailwind css styling. Mainly for setting margin and padding.
 * @returns {React.Component}
 */

function NameInput() {
  const [fieldFirst, metaFirst] = useField("firstName", "text");
  const [fieldLast, metaLast] = useField("lastName", "text");
  return (
    <Box>
      <Box className="name-box" sx={nameBoxStyles}>
        <InputWithFormLabel
          name="first_name"
          label="First name"
          field={fieldFirst}
          meta={metaFirst}
        />
        <InputWithFormLabel
          name="last_name"
          label="Last name"
          field={fieldLast}
          meta={metaLast}
        />
      </Box>
    </Box>
  );
}

export default NameInput;

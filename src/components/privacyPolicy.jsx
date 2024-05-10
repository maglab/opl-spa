import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
// eslint-disable-next-line import/no-unresolved
import privacyPolicy from "../assets/privacyPolicy.html?raw";

function PrivacyPolicy() {
  const [htmlContent, setHtmlContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (privacyPolicy) {
      const sanitizedContent = DOMPurify.sanitize(privacyPolicy);
      setHtmlContent(sanitizedContent);
      setLoading(false);
    } else {
      setErrorMessage("Unable to fetch privacy policy.");
    }
  }, [setHtmlContent]);

  return (
    <Stack className="privacy-policy">
      {errorMessage && <Typography> {errorMessage}</Typography>}
      {loading ? (
        <Typography>Loading privacy policy...</Typography>
      ) : (
        // We sanitise the HTML so disable linter warning
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      )}
    </Stack>
  );
}

export default PrivacyPolicy;

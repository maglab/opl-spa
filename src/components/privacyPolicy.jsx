import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";

function PrivacyPolicy() {
  const [htmlContent, setHtmlContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/privacyPolicy.html")
      .then((response) => response.text())
      .then((data) => {
        const sanitizedContent = DOMPurify.sanitize(data);
        setHtmlContent(sanitizedContent);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setLoading(false);
      });
  }, []);

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

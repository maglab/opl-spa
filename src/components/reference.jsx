import { Typography } from "@mui/material";
import Cite from "citation-js";
import DOMPurify from "dompurify";
import ReactHtmlParser from "html-react-parser";
import React from "react";
import { useAsync } from "react-use";

export default function Reference({ doi }) {
  const state = useAsync(async () => {
    const citation = await Cite.async(doi);
    const html = citation.format("bibliography", {
      format: "html",
      template: "apa",
      lang: "en-US",
    });
    const purified = DOMPurify.sanitize(html);
    return purified;
  }, []);

  if (state.error) {
    return (
      <Typography variant="subtitle2" fontStyle="italic">
        Error fetching information of citation
      </Typography>
    );
  }

  if (state.value) {
    return (
      <Typography variant="subtitle2">
        {ReactHtmlParser(state.value)}
      </Typography>
    );
  }
}

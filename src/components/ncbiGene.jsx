import { Typography } from "@mui/material";
import React from "react";
import { useGetNcbiGenes } from "../queries/ncbi";
import StandardStack from "./common/standardStack";

export default function NcbiGene({ geneId }) {
  const state = useGetNcbiGenes([geneId]);

  if (state.data) {
    const data = state.data[0];

    return (
      <StandardStack minor direction="row" alignItems="center">
        <StandardStack alignItems="flex-start">
          <Typography variant="subtitle2">{data.gene_id}</Typography>
          <Typography fontWeight="bold">
            {`[${data.symbol}] ${data.description}`}
          </Typography>
          <Typography fontStyle="italic">{data.taxname}</Typography>
        </StandardStack>
      </StandardStack>
    );
  }
}

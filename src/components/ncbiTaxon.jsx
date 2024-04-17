import { CircularProgress, Typography } from "@mui/material";
import Image from "mui-image";
import React from "react";
import { useGetNcbiTaxons } from "../queries/ncbi";
import StandardStack from "./common/standardStack";

const levels = [
  "Kingdom",
  "Phylum",
  "Class",
  "Order",
  "Family",
  "Genus",
  "Species",
];

function Hierarchy({ ids }) {
  const state = useGetNcbiTaxons(ids);

  if (state.data) {
    return (
      <Typography whiteSpace="pre" variant="caption">
        {levels
          .map((level) => ({
            level,
            taxon: state.data.find((t) => t.rank === level.toUpperCase()),
          }))
          .map((item, idx) =>
            item.taxon ? (
              <React.Fragment key={item.level}>
                {`${idx === 0 ? "" : "\n"}${"    ".repeat(idx)}${item.level} `}
                <Typography
                  component="span"
                  variant="inherit"
                  fontStyle="italic"
                  fontWeight="bold"
                >
                  {item.taxon.organism_name}
                </Typography>
              </React.Fragment>
            ) : undefined
          )}
      </Typography>
    );
  }

  return <CircularProgress />;
}

export default function NcbiTaxon({ taxonomyId }) {
  const state = useGetNcbiTaxons([taxonomyId]);

  if (state.data) {
    const data = state.data[0];

    return (
      <StandardStack minor direction="row" alignItems="center">
        <StandardStack alignItems="flex-start">
          <Typography variant="subtitle2">{data.tax_id}</Typography>
          <Typography fontWeight="bold" fontStyle="italic">
            {data.organism_name}
          </Typography>
        </StandardStack>
        <Image
          height={120}
          width={120}
          fit="contain"
          src={`https://api.ncbi.nlm.nih.gov/datasets/v2alpha/taxonomy/taxon/${data.tax_id}/image`}
        />
        <Hierarchy ids={[...data.lineage, data.tax_id]} />
      </StandardStack>
    );
  }
}

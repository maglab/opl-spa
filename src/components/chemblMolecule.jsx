import { Chip, CircularProgress, Typography } from "@mui/material";
import Image from "mui-image";
import React from "react";
import { useGetChemblMolecule } from "../queries/chembl";
import StandardStack from "./common/standardStack";

function getStatusChipStyle(phase) {
  switch (phase) {
    case "4.0":
      return {
        color: "#43a047",
        text: "Approved",
      };
    case "3.0":
      return {
        color: "#ffeb3b",
        text: "Phase 3",
      };
    case "2.0":
      return {
        color: "#ff9800",
        text: "Phase 3",
      };
    case "1.0":
      return {
        color: "#f44336",
        text: "Phase 1",
      };
    case "0.5":
      return {
        color: "#9e9e9e",
        text: "Early Phase 1",
      };
    case "-1.0":
      return {
        color: "#ffffff",
        text: "Phase Unknown",
      };
    case null:
      return {
        color: "#ffffff",
        text: "Preclinical",
      };
    default:
      return {
        color: undefined,
        text: "Unknown",
      };
  }
}

export default function ChemblMolecule({ chemblId }) {
  const state = useGetChemblMolecule(chemblId);

  if (state.isPending) {
    return <CircularProgress />;
  }

  if (state.data) {
    const { data } = state.data;
    const statusChipStyle = getStatusChipStyle(data.max_phase);

    return (
      <StandardStack minor direction="row" alignItems="center">
        <StandardStack alignItems="flex-start">
          <Typography variant="subtitle2">{data.molecule_chembl_id}</Typography>
          {data.pref_name ? (
            <Typography fontWeight="bold">{data.pref_name}</Typography>
          ) : (
            <Typography fontStyle="italic" fontWeight="bold">
              Name Undefined
            </Typography>
          )}
          <Chip
            sx={{ bgcolor: statusChipStyle.color }}
            label={statusChipStyle.text}
          />
        </StandardStack>
        <Image
          height={120}
          width={120}
          fit="contain"
          src={`https://www.ebi.ac.uk/chembl/api/data/image/${chemblId}.svg`}
        />
      </StandardStack>
    );
  }
}

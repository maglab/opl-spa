import { Link } from "@mui/material";
import React from "react";
import {
  COMPOUND_DATA_KEYS,
  GENE_DATA_KEYS,
  SPECIES_DATA_KEYS,
} from "../../constants/annotationDataKeys";
import SECTION_KEYS from "../../constants/problemDetailsSectionKeys";
import ChemblMolecule from "../chemblMolecule";
import NumberedList from "../common/numberedList";
import Referenceable from "../common/referenceable";
import StandardSection from "../common/standardSection";
import NcbiGene from "../ncbiGene";
import NcbiTaxon from "../ncbiTaxon";

export default function Annotations({
  genes,
  compounds,
  species,
  addScroller,
}) {
  const compoundItems = compounds
    .filter((compound) => compound[COMPOUND_DATA_KEYS.chemblId]) // Keep only compounds with a chembl_id for now
    .map((compound) => compound[COMPOUND_DATA_KEYS.chemblId]);
  const geneItems = genes
    .filter((gene) => gene[GENE_DATA_KEYS.entrezId])
    .map((gene) => gene[GENE_DATA_KEYS.entrezId]);
  const speciesItems = species
    .filter((species_entry) => species_entry[SPECIES_DATA_KEYS.ncbiTaxonId])
    .map((species_entry) => species_entry[SPECIES_DATA_KEYS.ncbiTaxonId]);

  return (
    <StandardSection header="Annotations">
      <Referenceable
        ref={(el) => addScroller(SECTION_KEYS.compoundAnnotations, el)}
      >
        <NumberedList
          header="Compounds"
          items={compoundItems.map((chemblId) => ({
            key: chemblId,
            item: <ChemblMolecule chemblId={chemblId} />,
            component: Link,
            href: `https://www.ebi.ac.uk/chembl/compound_report_card/${chemblId}`,
          }))}
        />
      </Referenceable>
      <Referenceable
        ref={(el) => addScroller(SECTION_KEYS.taxonAnnotations, el)}
      >
        <NumberedList
          header="Taxon"
          items={speciesItems.map((id) => ({
            key: id,
            item: <NcbiTaxon taxonomyId={id} />,
            component: Link,
            href: `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=${id}`,
          }))}
        />
      </Referenceable>
      <Referenceable
        ref={(el) => addScroller(SECTION_KEYS.geneAnnotations, el)}
      >
        <NumberedList
          header="Gene"
          items={geneItems.map((id) => ({
            key: id,
            item: <NcbiGene geneId={id} />,
            component: Link,
            href: `https://www.ncbi.nlm.nih.gov/gene/${id}`,
          }))}
        />
      </Referenceable>
    </StandardSection>
  );
}

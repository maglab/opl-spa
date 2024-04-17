import { Link } from "@mui/material";
import React from "react";
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
  return (
    <StandardSection header="Annotations">
      <Referenceable
        ref={(el) => addScroller(SECTION_KEYS.compoundAnnotations, el)}
      >
        <NumberedList
          header="Compound"
          items={[
            "CHEMBL1370561",
            "CHEMBL4297583",
            // "CHEMBL542103",
            // "CHEMBL2107027",
            // "CHEMBL4297667",
            // "CHEMBL1255939",
            // "CHEMBL6300",
          ].map((id) => ({
            key: id,
            item: <ChemblMolecule chemblId={id} />,
            component: Link,
            href: `https://www.ebi.ac.uk/chembl/compound_report_card/${id}`,
          }))}
        />
      </Referenceable>
      <Referenceable
        ref={(el) => addScroller(SECTION_KEYS.taxonAnnotations, el)}
      >
        <NumberedList
          header="Taxon"
          items={["10116", "9606"].map((id) => ({
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
          items={["348", "2690"].map((id) => ({
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

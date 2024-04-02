import { Link } from "@mui/material";
import React from "react";
import SECTION_KEYS from "../../constants/problemDetailsSectionKeys";
import NumberedList from "../common/numberedList";
import Referenceable from "../common/referenceable";
import StandardCard from "../common/standardCard";
import Reference from "../reference";

export default function References({ references, addScroller }) {
  return (
    <Referenceable ref={(el) => addScroller(SECTION_KEYS.references, el)}>
      <StandardCard header="References">
        <NumberedList
          items={references.map((reference) => ({
            key: reference.id,
            item: <Reference doi={reference.doi} />,
            component: Link,
            href: `https://doi.org/${reference.doi}`,
          }))}
        />
      </StandardCard>
    </Referenceable>
  );
}

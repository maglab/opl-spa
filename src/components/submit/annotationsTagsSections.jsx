import { TabContext, TabList } from "@mui/lab";
import {
  Autocomplete,
  Chip,
  Grid,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import { useField } from "formik";
import { matchSorter } from "match-sorter";
import React, { useState } from "react";

import displayText from "../../assets/descriptions/submitTagsAnnotations.json";
import {
  COMPOUND_DATA_KEYS,
  GENE_DATA_KEYS,
  SPECIES_DATA_KEYS,
  TAGS_DATA_KEYS,
} from "../../constants/annotationDataKeys";
import useGetAnnotationEntries from "../../queries/annotations";
import StandardGrid from "../common/standardGrid";
import StandardSection from "../common/standardSection";
import StandardStack from "../common/standardStack";
import TabPanel from "../common/tabPanel";

function TagChip({ label, getTagProps, index }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Chip variant="outlined" label={label} {...getTagProps({ index })} />;
}

function CustomAutocomplete({
  id,
  data,
  isPending,
  name,
  placeholder,
  label,
  filterAutocompleteOptions,
  getOptionLabelFn,
  valueKey,
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, helpers] = useField(name);
  const renderTags = (value, getTagProps) =>
    value.map((option, index) => (
      <TagChip
        key={getOptionLabelFn(option)}
        label={getOptionLabelFn(option)}
        getTagProps={getTagProps}
        index={index}
      />
    ));
  const renderInput = (params) => (
    <TextField
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...params}
      variant="outlined"
      label={label}
      placeholder={placeholder}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      value={field.value}
      onBlur={() => helpers.setTouched(true)}
    />
  );
  const onChangeHandler = (newValue) => {
    helpers.setValue(
      newValue.map((value) =>
        typeof value === "object" ? value : { [valueKey]: value }
      )
    );
  };

  return (
    <Autocomplete
      multiple
      id={id}
      options={data}
      getOptionLabel={getOptionLabelFn}
      freeSolo
      loading={isPending}
      renderTags={renderTags}
      renderInput={renderInput}
      filterOptions={filterAutocompleteOptions}
      onChange={(_, newValue) => onChangeHandler(newValue)}
    />
  );
}

function Compounds() {
  const { data, isPending } = useGetAnnotationEntries("compound");
  const compounds = data?.data || [];

  const filterAutocompleteOptions = (options, { inputValue }) =>
    matchSorter(options, inputValue, {
      keys: [
        COMPOUND_DATA_KEYS.name,
        COMPOUND_DATA_KEYS.chemblId,
        COMPOUND_DATA_KEYS.pubchemId,
      ],
    });

  const getOptionLabelFn = (option) =>
    option[COMPOUND_DATA_KEYS.name] || option;

  return (
    <CustomAutocomplete
      id="compound"
      name="compounds"
      data={compounds}
      isPending={isPending}
      placeholder="Drug/compound name, CHEMBL id or PubChem id"
      label="Add drugs/compounds"
      filterAutocompleteOptions={filterAutocompleteOptions}
      getOptionLabelFn={getOptionLabelFn}
      valueKey={COMPOUND_DATA_KEYS.name}
    />
  );
}

function Species() {
  const { data, isPending } = useGetAnnotationEntries("species");
  const species = data?.data || [];
  const filterAutocompleteOptions = (options, { inputValue }) =>
    matchSorter(options, inputValue, {
      keys: [SPECIES_DATA_KEYS.genus, SPECIES_DATA_KEYS.species],
    });
  const getOptionLabelFn = (option) => option[SPECIES_DATA_KEYS.name] || option;

  return (
    <CustomAutocomplete
      id="species"
      name="species"
      data={species}
      isPending={isPending}
      placeholder="Genus and species"
      label="Add species"
      filterAutocompleteOptions={filterAutocompleteOptions}
      getOptionLabelFn={getOptionLabelFn}
      valueKey={SPECIES_DATA_KEYS.name}
    />
  );
}

function Genes() {
  const { data, isPending } = useGetAnnotationEntries("gene");
  const genes = data?.data || [];
  const getOptionLabelFn = (option) =>
    `${option[GENE_DATA_KEYS.symbol]} : ${option[GENE_DATA_KEYS.name]}` ||
    option;
  const filterAutocompleteOptions = (options, { inputValue }) =>
    matchSorter(options, inputValue, {
      keys: [GENE_DATA_KEYS.name, GENE_DATA_KEYS.symbol],
    });
  return (
    <CustomAutocomplete
      id="gene"
      name="genes"
      data={genes}
      isPending={isPending}
      placeholder="Gene name or HGNC symbol"
      label="Add genes"
      filterAutocompleteOptions={filterAutocompleteOptions}
      getOptionLabelFn={getOptionLabelFn}
      valueKey={GENE_DATA_KEYS.symbol}
    />
  );
}

function Tags() {
  const { data, isSuccess, isPending } = useGetAnnotationEntries("tag");
  const tags = isSuccess ? data.data : [];
  const filterAutocompleteOptions = (options, { inputValue }) =>
    matchSorter(options, inputValue, {
      keys: [TAGS_DATA_KEYS.title],
    });
  const getOptionLabelFn = (option) => option[TAGS_DATA_KEYS.title] || option;
  return (
    <CustomAutocomplete
      id="tag"
      name="tags"
      data={tags}
      isPending={isPending}
      placeholder="Topic title"
      label="Add tags"
      filterAutocompleteOptions={filterAutocompleteOptions}
      getOptionLabelFn={getOptionLabelFn}
      valueKey={TAGS_DATA_KEYS.title}
    />
  );
}

function AnnotationPanel({
  tabValue,
  header,
  description,
  inputComponent,
  children,
}) {
  return (
    <TabPanel value={tabValue}>
      <StandardStack minor>
        <Typography variant="h6">{header}</Typography>
        <Typography variant="body1">{description}</Typography>
        {inputComponent}
        {children}
      </StandardStack>
    </TabPanel>
  );
}

function AnnotationTabs() {
  const [tabValue, setTabValue] = useState("tags");
  const handleChange = (e, tab) => {
    setTabValue(tab);
  };

  return (
    <TabContext value={tabValue}>
      <TabList
        onChange={handleChange}
        centered
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        {}
        <Tab
          label={<Typography variant="subtitle1">Tags</Typography>}
          value="tags"
        />
        <Tab
          label={<Typography variant="subtitle1">Compounds</Typography>}
          value="compounds"
        />
        <Tab
          label={<Typography variant="subtitle1">Species</Typography>}
          value="species"
        />
        <Tab
          label={<Typography variant="subtitle1">Genes</Typography>}
          value="genes"
        />
      </TabList>
      <AnnotationPanel
        tabValue="tags"
        header={displayText.tags.header}
        description={displayText.tags.description}
      >
        <Tags />
      </AnnotationPanel>
      <AnnotationPanel
        tabValue="compounds"
        header={displayText.compounds.header}
        description={displayText.compounds.description}
      >
        <Compounds />
      </AnnotationPanel>
      <AnnotationPanel
        tabValue="species"
        header={displayText.species.header}
        description={displayText.species.description}
      >
        <Species />
      </AnnotationPanel>
      <AnnotationPanel
        tabValue="genes"
        header={displayText.genes.header}
        description={displayText.genes.description}
      >
        <Genes />
      </AnnotationPanel>
    </TabContext>
  );
}

export default function TagsAnnotationsSection() {
  return (
    <StandardSection header="Tags and Annotations">
      <StandardGrid minor direction="column">
        <Grid item>
          <Typography variant="body">
            {displayText.sectionDescription}
          </Typography>
        </Grid>
        <Grid item>
          <AnnotationTabs />
        </Grid>
      </StandardGrid>
    </StandardSection>
  );
}

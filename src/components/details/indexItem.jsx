import { Button, Chip, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import useExtendedTheme from "../../theme/useExtendedTheme";
import Center from "../common/center";

function IndexItemDef(props, ref) {
  const { label, badgeLabel, decorator, onClick, pl } = props;
  const theme = useExtendedTheme();

  return (
    <Stack ref={ref}>
      <Button
        color="inherit"
        sx={{ minHeight: theme.spacing(6) }}
        onClick={onClick}
      >
        <Grid container direction="row" alignItems="center" px={1} pl={pl}>
          <Grid item xs="auto">
            <Typography variant="button">{label}</Typography>
          </Grid>
          {badgeLabel ? (
            <>
              <Grid item xs minWidth={theme.spacing(1)} />
              <Grid item xs="auto">
                <Chip label={badgeLabel} size="small" color="primary" />
              </Grid>
            </>
          ) : undefined}
          {decorator ? (
            <>
              <Grid item xs minWidth={theme.spacing(1)} />
              <Grid item xs="auto">
                <Center direction="column">{decorator}</Center>
              </Grid>
            </>
          ) : undefined}
        </Grid>
      </Button>
    </Stack>
  );
}

const IndexItem = React.forwardRef(IndexItemDef);
export default IndexItem;

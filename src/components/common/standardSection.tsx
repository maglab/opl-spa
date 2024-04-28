import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  ButtonBase,
  Collapse,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useExtendedTheme from "../../theme/useExtendedTheme";
import Center from "./center";
import StandardGrid from "./standardGrid";
import StandardStack from "./standardStack";

interface StandardCardProps {
  header?: string;
  children?: React.ReactNode;
}

export default function StandardSection({
  header,
  children, // children must be deconstructed here otherwise React will thinks you are iterating them and give you key error
}: StandardCardProps) {
  const theme = useExtendedTheme();
  const [open, setOpen] = useState(true);

  return (
    <Box>
      <Paper>
        <StandardStack>
          <ButtonBase onClick={() => setOpen(!open)}>
            <StandardGrid
              alignItems="center"
              py={theme.layout.minorSpacing / 2}
              px={theme.layout.minorSpacing}
            >
              <Grid item xs>
                {header ? (
                  <StandardStack sx={{ width: "100%" }}>
                    <Typography variant="h6" fontWeight="bold" textAlign="left">
                      {header}
                    </Typography>
                  </StandardStack>
                ) : undefined}
              </Grid>
              <Grid item xs="auto">
                <Center>{open ? <ExpandLess /> : <ExpandMore />}</Center>
              </Grid>
            </StandardGrid>
          </ButtonBase>
          <Collapse in={open}>
            <StandardStack>
              {header ? <Divider /> : undefined}
              <StandardStack minor p divider={<Divider />}>
                {children}
              </StandardStack>
            </StandardStack>
          </Collapse>
        </StandardStack>
      </Paper>
    </Box>
  );
}

StandardSection.defaultProps = {
  header: "",
  children: undefined,
};

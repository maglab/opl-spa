import { Box, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import useExtendedTheme from "../../theme/useExtendedTheme";
import StandardStack from "./standardStack";

interface StandardCardProps {
  header?: string;
  children?: React.ReactNode;
}

export default function StandardCard({
  header,
  children, // children must be deconstructed here otherwise React will thinks you are iterating them and give you key error
}: StandardCardProps) {
  const theme = useExtendedTheme();

  return (
    <Box>
      <Paper>
        <StandardStack>
          {header ? (
            <>
              <StandardStack
                p={theme.layout.minorSpacing / 2}
                pl={theme.layout.minorSpacing}
              >
                <Typography variant="h6" fontWeight="bold">
                  {header}
                </Typography>
              </StandardStack>
              <Divider />
            </>
          ) : undefined}
          <StandardStack minor p>
            {children}
          </StandardStack>
        </StandardStack>
      </Paper>
    </Box>
  );
}

StandardCard.defaultProps = {
  header: "",
  children: undefined,
};

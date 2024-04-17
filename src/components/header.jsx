import { useAuth0 } from "@auth0/auth0-react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  AppBar,
  Button,
  Grid,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import Image from "mui-image";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import logoSvg from "../assets/svg/OpenLongevityLogo.svg";
import DefaultMargin from "./common/defaultMargin";
import StandardGrid from "./common/standardGrid";
import StandardStack from "./common/standardStack";

function AccountButton() {
  const [anchorElement, setAnchorElement] = useState(null);
  const open = Boolean(anchorElement);
  const handleClick = (event) => {
    setAnchorElement(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElement(null);
  };

  const { user, logout } = useAuth0();
  const username = user.name;
  return (
    <StandardStack>
      <Button
        startIcon={<AccountCircleIcon />}
        onClick={handleClick}
        variant="outlined"
      >
        {username}
      </Button>
      <Menu
        MenuListProps={{
          "aria-labelledby": "basic-button",
          sx: { width: anchorElement && anchorElement.offsetWidth },
        }}
        anchorEl={anchorElement}
        open={open}
        onClose={handleClose}
        sx={{ width: "100%" }}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </StandardStack>
  );
}

export default function Header() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <AppBar position="static" sx={{ bgcolor: "common.white" }}>
      <DefaultMargin py={0.5}>
        <StandardGrid
          minor
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm>
            <StandardStack
              direction="row"
              justifyContent={{ xs: "center", sm: "left" }}
              alignItems="flex-end"
            >
              <Stack height="100%" justifyContent="center">
                <Link component={RouterLink} to="/">
                  <Image src={logoSvg} height={48} />
                </Link>
              </Stack>
              <Typography variant="caption">
                build: {import.meta.env.VITE_BUILD_VERSION}
              </Typography>
            </StandardStack>
          </Grid>
          <Grid item>
            <StandardGrid minor alignItems="center">
              <Grid item xs={0} sm />
              <Grid item>
                <StandardStack minor direction="row">
                  <Button
                    component={RouterLink}
                    to="/submit-guidelines"
                    variant="contained"
                  >
                    Submit
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/open-problems"
                    variant="contained"
                  >
                    Problems
                  </Button>
                  {isAuthenticated ? (
                    <AccountButton />
                  ) : (
                    <Button onClick={() => loginWithRedirect()}>
                      Login / Register
                    </Button>
                  )}
                </StandardStack>
              </Grid>
            </StandardGrid>
          </Grid>
        </StandardGrid>
      </DefaultMargin>
    </AppBar>
  );
}

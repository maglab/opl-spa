import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AppBar, Button, Grid, Link, Stack, Typography } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Image from "mui-image";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import logoSvg from "../assets/svg/OpenLongevityLogo.svg";
import { defaultProblemUrl } from "../queries/queryKeys";
import DefaultMargin from "./common/defaultMargin";
import StandardGrid from "./common/standardGrid";
import StandardStack from "./common/standardStack";

const BUTTON_OPTIONS = ["Problems", "Problem Categories"];
const ROUTES = [defaultProblemUrl, "/categories"];

function SplitButtonProblems() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
      >
        <Button component={RouterLink} to={ROUTES[selectedIndex]}>
          {BUTTON_OPTIONS[selectedIndex]}
        </Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            in={TransitionProps.in}
            onEnter={TransitionProps.onEnter}
            onExited={TransitionProps.onExited}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {BUTTON_OPTIONS.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2} // Example logic to disable an option
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

export default function Header() {
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
                  <SplitButtonProblems />
                  <Button component={RouterLink} to="/" variant="outlined">
                    Home
                  </Button>
                </StandardStack>
              </Grid>
            </StandardGrid>
          </Grid>
        </StandardGrid>
      </DefaultMargin>
    </AppBar>
  );
}

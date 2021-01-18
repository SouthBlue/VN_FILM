import React, { useState } from "react";
import AppRouter from "./AppRouter.js";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import ScrollTop from "../components/ScrollTop";
import IconButton from "@material-ui/core/IconButton";
import {WbSunny, NightsStay } from "@material-ui/icons";
import themeLight from "../styles/themeLight.js";
import themeDark from "../styles/themeDark.js";

const useStyles = makeStyles((theme) => ({
  toTop: {
    zIndex: 2,
    position: "fixed",
    bottom: theme.spacing(7),
    color: 'black',
    "&:hover, &.Mui-focusVisible": {
      transition: "0.3s",
      color: "#397BA6",
      backgroundColor: '#FF7A59',
    },
    [theme.breakpoints.up("xs")]: {
      right: "5%",
      backgroundColor: '#FF7A59',
    },
    [theme.breakpoints.up("lg")]: {
      right: theme.spacing(2),
    },
  },
}));
export const App = () => {
  const classes = useStyles();
  const [light, setLight] = useState(true);
  const handleClick = () => {
    setLight((e) => !light);
  };
  return (
    <ThemeProvider theme={light ? themeDark : themeLight}>
      <CssBaseline />
      <IconButton
        size="small"
        onClick={handleClick}
        className={classes.toTop}
        aria-label="to top"
        component="span"
      >
        {light ? <WbSunny/> : <NightsStay/> }
      </IconButton>
      <ScrollTop showBelow={10} />
      <AppRouter/>
    </ThemeProvider>
  );
};

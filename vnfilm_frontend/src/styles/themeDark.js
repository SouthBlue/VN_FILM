import { createMuiTheme } from "@material-ui/core/styles";

const themeDark = createMuiTheme({
  palette: {
    primary: {
      main: "#272727",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FF7A59",
    },
    text: {
      main: "#ffffff",
    },
    background: {
      default: "#575757",
    },
    default: {
      main: 'blue',
      light: 'blue',
      dark: 'blue',
      contrastText: "#ffffff",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
//#007ACC
export default themeDark;

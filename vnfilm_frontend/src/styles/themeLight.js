import { createMuiTheme } from "@material-ui/core/styles";

const themeLight = createMuiTheme({
  palette: {
    background: {
      default: "#e4f0e2",
    },
    primary: {
      main: "#008040",
    },
    secondary: {
      main: "#FF7A59",
    },
    text: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
export default themeLight;

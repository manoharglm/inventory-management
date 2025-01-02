import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#387C21",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
    text: {
      primary: "#ffffff",
      secondary: "#DAFD55",
    },
  },
});

export default theme;

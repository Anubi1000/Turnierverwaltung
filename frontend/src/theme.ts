"use client";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

// Source: #34a431

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: "#35a431",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});

export default theme;

import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import { STYLED_DEFAULT } from "./style/constant.style";

// A custom theme for this app
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#52ab98",
        },
        background: {
          default: "#fff",
          paper: STYLED_DEFAULT.backGroundColorCardLight,
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#2b6777",
        },
        background: {
          default: "#576574",
          paper: STYLED_DEFAULT.backGroundColorCardDark,
        },
      },
    },
  },
});

export default theme;

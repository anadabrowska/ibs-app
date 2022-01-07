import { createBreakpoints } from "@chakra-ui/theme-tools";
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  mobile: "25em",
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  config,
  colors: {
    black: "#16161D",
  },
  fonts,
  breakpoints,
});

export default theme;

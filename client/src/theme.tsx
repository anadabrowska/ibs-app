import { createBreakpoints, mode } from "@chakra-ui/theme-tools";
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const components = {
  Heading: {
    // setup light/dark mode component defaults
    baseStyle: (props: any) => ({
      color: mode("teal.600", "teal.400")(props),
    }),
  },
};

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  mobileS: "23em",
  mobile: "25em",
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  config,
  components,
  colors: {
    black: "#16161D",
  },
  fonts,
  breakpoints,
});

export default theme;

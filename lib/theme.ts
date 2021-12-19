import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  fonts: {
    body: "Inter",
    heading: "Roboto",
  },
  components: {
    Button: {
      variants: {
        primary: {
          bg: "blue.400",
          color: "white",
        },
      },
    },
  },
});

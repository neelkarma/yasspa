import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  fonts: {
    body: "Inter",
    heading: "Raleway",
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

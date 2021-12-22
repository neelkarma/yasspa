import { extendTheme, useColorModeValue } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
  fonts: {
    body: "Inter",
    heading: "Inter",
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

export const useCardColors = () =>
  useColorModeValue(
    {
      backgroundColor: "gray.100",
      borderColor: "gray.200",
    },
    {
      backgroundColor: "gray.700",
      borderColor: "gray.600",
    }
  );

export const useMutedTextColor = () =>
  useColorModeValue("gray.400", "gray.500");

export const useCardHoverColor = () =>
  useColorModeValue("gray.200", "gray.600");

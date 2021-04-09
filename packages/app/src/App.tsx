import "@fontsource/inter";
import "@fontsource/raleway";
import * as React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { SWRConfig } from "swr";
import Landing from "./landing";

export const App = () => (
  <SWRConfig
    value={{
      fetcher: (...args) => fetch(args).then((res) => res.json()),
    }}
  >
    <ChakraProvider
      theme={extendTheme({
        fonts: {
          body: "Inter",
          heading: "Raleway",
        },
      })}
    >
      <Landing />
    </ChakraProvider>
  </SWRConfig>
);

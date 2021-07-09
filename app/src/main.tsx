import "@fontsource/inter";
import "@fontsource/raleway";
import { ColorModeScript, ChakraProvider } from "@chakra-ui/react";
import { SWRConfig } from "swr";
import * as React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import theme from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <SWRConfig
      value={{ fetcher: (...args) => fetch(args).then((res) => res.json()) }}
    >
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById("root")
);

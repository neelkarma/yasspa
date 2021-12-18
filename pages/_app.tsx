import "@fontsource/inter";
import "@fontsource/roboto";
import "../styles.css";
import { SWRConfig } from "swr";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "lib/theme";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => (
  <SWRConfig
    value={{
      fetcher: (resource: string) => fetch(resource).then((res) => res.json()),
    }}
  >
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  </SWRConfig>
);
export default App;

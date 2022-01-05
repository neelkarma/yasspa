import "@fontsource/inter";
import "styles/globals.css";
import { SWRConfig } from "swr";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "lib/theme";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ErrorBoundary } from "components/errorboundary";

const App = ({ Component, pageProps }: AppProps) => (
  <ErrorBoundary>
    <SWRConfig
      value={{
        fetcher: (resource: string) =>
          fetch(resource).then((res) => res.json()),
      }}
    >
      <ChakraProvider theme={theme}>
        <Head>
          <title>YASSPA</title>
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </SWRConfig>
  </ErrorBoundary>
);
export default App;

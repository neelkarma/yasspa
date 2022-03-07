import { useState } from "react";
import {
  Box,
  VStack,
  Stack,
  Heading,
  HStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import useSWR from "swr";
import { Landing } from "components/landing";
import { Loading } from "components/loading";
import { Today } from "components/today";
import { Filter } from "components/filter";
import { DailyNotices } from "components/dailynotices";
import { AvatarMenu } from "components/menu";
import { Barcode } from "components/barcode";
import { SettingsContext } from "components/contexts";
import type { GetStaticProps, NextPage } from "next";
import { Links } from "components/links";

const Home: NextPage<{ version: { hash: string | null; date: string } }> = ({
  version,
}) => {
  const { data } = useSWR("/api/auth/status");
  const [filter, setFilter] = useState("");
  const [debug, setDebug] = useState(false);
  if (!data) return <Loading />;
  if (!data.authorized) return <Landing />;
  return (
    <SettingsContext.Provider value={{ debug }}>
      <Box p={5} h={{ lg: "100vh" }}>
        <Stack
          h={{ lg: "100%" }}
          spacing={7}
          direction={{ base: "column", lg: "row" }}
        >
          <Today />
          <VStack w={{ lg: "100%" }}>
            <HStack w="100%" mb={2}>
              <Filter onChange={setFilter} />
              <AvatarMenu toggleDebugChange={setDebug} version={version} />
            </HStack>
            <Grid
              templateRows="repeat(2, 1fr)"
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
              w="100%"
              h="100%"
              gap={5}
            >
              <GridItem colSpan={{ base: undefined, md: 2 }}>
                <VStack h="100%">
                  <Heading size="lg" textAlign="left" w="100%">
                    Daily Notices
                  </Heading>
                  <DailyNotices filter={filter} />
                </VStack>
              </GridItem>
              <GridItem>
                <VStack h="100%">
                  <Heading size="lg" textAlign="left" w="100%">
                    Barcode
                  </Heading>
                  <Barcode />
                </VStack>
              </GridItem>
              <GridItem>
                <VStack h="100%">
                  <Heading size="lg" textAlign="left" w="100%">
                    Links
                  </Heading>
                  <Links />
                </VStack>
              </GridItem>
            </Grid>
          </VStack>
        </Stack>
      </Box>
    </SettingsContext.Provider>
  );
};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      version: {
        hash: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ?? null,
        date: new Date().toISOString(),
      },
    },
  };
};

export default Home;

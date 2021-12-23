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
import { Today } from "components/today/today";
import { Filter } from "components/filter";
import { DailyNotices } from "components/dailynotices/dailynotices";
import { AvatarMenu } from "components/menu";
import { Barcode } from "components/barcode/barcode";
import { Profile } from "components/profile/profile";

import type { NextPage } from "next";
import { SettingsContext } from "components/settingscontext";

const Home: NextPage = () => {
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
              <AvatarMenu toggleDebugChange={setDebug} />
            </HStack>
            <Grid
              templateRows="repeat(2, 1fr)"
              templateColumns="repeate(2, 1fr)"
              w="100%"
              h="100%"
              gap={5}
            >
              <GridItem colSpan={2}>
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
                    Profile
                  </Heading>
                  <Profile />
                </VStack>
              </GridItem>
            </Grid>
          </VStack>
        </Stack>
      </Box>
    </SettingsContext.Provider>
  );
};

export default Home;

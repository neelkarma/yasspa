import type { NextPage } from "next";
import { Box, VStack, Stack, Heading } from "@chakra-ui/react";
import useSWR from "swr";
import Landing from "../components/landing";
import Loading from "../components/loading";
import Today from "../components/today";
import Filter from "../components/filter";
import DailyNotices from "../components/dailynotices";
import Head from "next/head";
import { useState } from "react";

const Home: NextPage = () => {
  const { data } = useSWR("/api/auth/status");
  const [filter, setFilter] = useState("");
  if (!data) return <Loading />;
  if (!data.authorized) return <Landing />;
  return (
    <Box p={5} h={{ md: undefined, lg: "100vh" }}>
      <Head>
        <title>YASSPA</title>
      </Head>
      <Stack
        h={{ md: undefined, lg: "100%" }}
        spacing={7}
        direction={{ md: "column", lg: "row" }}
      >
        <Today />
        <VStack w={{ md: undefined, lg: "100%" }}>
          <Filter onChange={setFilter} />
          <Heading size="lg" textAlign="left" w="100%" pt={3}>
            Daily Notices
          </Heading>
          <DailyNotices filter={filter} />
        </VStack>
      </Stack>
    </Box>
  );
};

export default Home;

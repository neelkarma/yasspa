import React from "react";
import { Box, VStack, Stack, Heading } from "@chakra-ui/react";
import useSWR from "swr";
import Landing from "./landing";
import Loading from "./loading";
import Today from "./today";
import Filter from "./filter";
import DailyNotices from "./dailynotices";
import { useState } from "react";

const App: React.FC<{}> = () => {
  const { data } = useSWR("/auth/status");
  const [filter, setFilter] = useState("");
  if (!data) return <Loading />;
  if (!data.authorized) return <Landing />;
  return (
    <Box p={5} h={{ md: undefined, lg: "100vh" }}>
      <Stack
        h={{ md: undefined, lg: "100%" }}
        spacing={7}
        direction={{ md: "column", lg: "row" }}
      >
        <Today />
        <VStack w={{ md: undefined, lg: "100%" }}>
          <Filter onChange={(input) => setFilter(input)} />
          <Heading size="lg" textAlign="left" w="100%" pt={3}>
            Daily Notices
          </Heading>
          <DailyNotices filter={filter} />
        </VStack>
      </Stack>
    </Box>
  );
};

export default App;

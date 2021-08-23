import React from "react";
import { Box, VStack, Stack } from "@chakra-ui/react";
import useSWR from "swr";
import Landing from "./landing";
import Loading from "./loading";
import Today from "./today";
import Filter from "./filter";
import DailyNotices from "./dailynotices";

const App: React.FC<{}> = () => {
  const { data } = useSWR("/auth/status");
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
          <Filter onChange={() => null} />
          <DailyNotices filter="change this sometime soon" />
        </VStack>
      </Stack>
    </Box>
  );
};

export default App;

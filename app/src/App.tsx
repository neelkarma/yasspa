import React, { useEffect } from "react";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import useSWR from "swr";
import Landing from "./landing";
import Loading from "./loading";
import Timetable from "./timetable";

const App: React.FC<{}> = () => {
  const { data } = useSWR("/auth/status");
  useEffect(() => console.log(data), [data]);
  if (!data) return <Loading />;
  if (!data.authorized) return <Landing />;
  return (
    <Box p={5} h="100vh">
      <Flex h="100%">
        <Timetable />
      </Flex>
    </Box>
  );
};

export default App;

import { Flex, Text, Spacer } from "@chakra-ui/react";
import type { Today } from "lib/clientFetchResources";

export const Break: React.FC<{
  data: Today;
  type: "Recess" | "Lunch";
}> = ({ data, type }) => {
  return (
    <PureBreak
      type={type}
      time={
        data.bells.find(
          (val) => val.bell === (type === "Recess" ? "Recess" : "Lunch 1")
        )!.time
      }
      isTimeChange={false} //TODO: Get this to work
    />
  );
};

export const PureBreak: React.FC<{
  type: "Recess" | "Lunch";
  time: string;
  isTimeChange?: boolean;
}> = ({ type, time, isTimeChange }) => {
  return (
    <Flex
      color="gray.400"
      fontSize="1.2rem"
      px={3}
      py={4}
      transitionDuration="100ms"
      transitionTimingFunction="ease-out"
      borderRadius={10}
      _hover={{ backgroundColor: "gray.600" }}
    >
      <Text>{type}</Text>
      <Spacer />
      <Text color={isTimeChange ? "blue.300" : undefined}>{time}</Text>
    </Flex>
  );
};

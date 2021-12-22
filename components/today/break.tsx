import { Flex, Text, Spacer } from "@chakra-ui/react";
import type { Today } from "lib/clientFetchResources";
import { useCardHoverColor, useMutedTextColor } from "lib/theme";

export const Break: React.FC<{
  data: Today;
  type: "R" | "MTL1" | "MTL2";
}> = ({ data, type }) => {
  return (
    <PureBreak
      display={
        {
          R: "Recess",
          MTL1: "Lunch 1",
          MTL2: "Lunch 2",
        }[type]
      }
      time={data.bells.find((val) => val.period === type)!.time}
      isTimeChange={false} //TODO: Get this to work
    />
  );
};

export const PureBreak: React.FC<{
  display: string;
  time: string;
  isTimeChange?: boolean;
}> = ({ display: type, time, isTimeChange }) => {
  const mutedTextColor = useMutedTextColor();
  const cardHoverColor = useCardHoverColor();
  return (
    <Flex
      w="100%"
      color={mutedTextColor}
      fontSize="1.2rem"
      px={3}
      py={4}
      transitionDuration="100ms"
      transitionTimingFunction="ease-out"
      borderRadius={10}
      _hover={{ backgroundColor: cardHoverColor }}
    >
      <Text>{type}</Text>
      <Spacer />
      <Text color={isTimeChange ? "blue.300" : undefined}>{time}</Text>
    </Flex>
  );
};

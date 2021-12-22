import {
  Flex,
  Box,
  Text,
  HStack,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import type { Today } from "lib/clientFetchResources";
import { useCardHoverColor, useMutedTextColor } from "lib/theme";

export const Period: React.FC<{
  data: Today;
  period: "1" | "2" | "3" | "4" | "5";
}> = ({ data, period }) => {
  return (
    <PurePeriod
      name={
        data.timetable.subjects[
          `${data.timetable.timetable.periods[period].year}${data.timetable.timetable.periods[period].title}`
        ].title
      }
      time={data.bells.find((val) => val.period === period.toString())!.time}
      teacher={data.timetable.timetable.periods[period].fullTeacher}
      room={data.timetable.timetable.periods[period].room}
      //TODO: Get these to work
      isTimeChange={false}
      isRoomChange={false}
      isSub={false}
    />
  );
};

export const PurePeriod: React.FC<{
  name: string;
  time: string;
  teacher: string;
  room: string;
  isTimeChange?: boolean;
  isRoomChange?: boolean;
  isSub?: boolean;
}> = ({
  name: className,
  time,
  teacher,
  room,
  isTimeChange,
  isRoomChange,
  isSub,
}) => {
  const mutedTextColor = useMutedTextColor();
  const cardHoverColor = useCardHoverColor();

  return (
    <Flex
      w="100%"
      px={3}
      py={4}
      borderRadius={10}
      transitionDuration="100ms"
      transitionTimingFunction="ease-out"
      _hover={{ backgroundColor: cardHoverColor }}
    >
      <Box alignSelf="center">
        <Text fontSize="1.3rem">{className}</Text>
        <HStack spacing={1} fontWeight="light">
          <Text>at</Text>
          <Text color={isTimeChange ? "blue.300" : undefined}>{time}</Text>
          <Text color={mutedTextColor}>with</Text>
          <Text color={isSub ? "blue.300" : mutedTextColor}>{teacher}</Text>
        </HStack>
      </Box>
      <Spacer minW="12px" />
      <Text
        color={isRoomChange ? "blue.300" : undefined}
        fontSize="1.2rem"
        alignSelf="center"
      >
        {room}
      </Text>
    </Flex>
  );
};

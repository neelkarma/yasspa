import React from "react";
import { Box, Flex, Spacer, Heading, Text, HStack } from "@chakra-ui/react";

const Period: React.FC<{
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
  return (
    <Flex
      width="100%"
      px={3}
      py={4}
      borderRadius={10}
      _hover={{ backgroundColor: "gray.600" }}
    >
      <Box alignSelf="center">
        <Text fontSize="1.3rem">{className}</Text>
        <HStack spacing={1} fontWeight="light">
          <Text>at</Text>
          <Text color={isTimeChange ? "blue.300" : undefined}>{time}</Text>
          <Text color="gray.400">with</Text>
          <Text color={isSub ? "blue.300" : "gray.400"}>{teacher}</Text>
        </HStack>
      </Box>
      <Spacer />
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

const Break: React.FC<{
  type: "Recess" | "Lunch";
  time: string;
}> = ({ type, time }) => {
  return (
    <Flex
      color="gray.400"
      fontSize="1.2rem"
      px={3}
      py={4}
      animation="forwards 1s"
      borderRadius={10}
      _hover={{ backgroundColor: "gray.600" }}
    >
      <Text>{type}</Text>
      <Spacer />
      <Text>{time}</Text>
    </Flex>
  );
};

const Timetable: React.FC<{}> = () => {
  return (
    <Box
      borderColor="gray.600"
      borderWidth="1px"
      borderRadius={15}
      backgroundColor="gray.700"
      h={{ sm: undefined, lg: "100%" }}
      w={{ md: "100%", lg: "430px" }}
      p={5}
    >
      <Box py={10} textAlign="center" fontWeight="extrabold">
        <Heading>Roll Call in</Heading>
        <Heading fontSize="5rem">9:48:27</Heading>
      </Box>
      <Period
        name="9W Music Adv"
        time="09:05"
        teacher="Ms R Miller"
        room="201"
      />
      <Period name="9 Maths B" time="10:10" teacher="Bui" room="107" isSub />
      <Break type="Lunch" time="11:10" />
      <Period
        name="9 Science 5"
        time="11:50"
        teacher="Ms A Karagiannis"
        room="302"
        isRoomChange
      />
      <Period
        name="9 Values Ed 9"
        time="12:55"
        teacher="Mr R Boland"
        room="802"
      />
      <Break type="Recess" time="13:55" />
      <Period
        name="9 English 5"
        time="14:15"
        teacher="Ms M Jollie"
        room="801"
      />
    </Box>
  );
};

export default Timetable;

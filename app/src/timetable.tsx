import React from "react";
import { Box, Flex, Spacer, Heading, Text } from "@chakra-ui/react";

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
    <Flex>
      <Box>
        <Text>{className}</Text>
        <Text>
          at {time} with {teacher}
        </Text>
      </Box>
      <Spacer />
      <Text>{room}</Text>
    </Flex>
  );
};

const Break: React.FC<{
  type: "Recess" | "Lunch";
  time: string;
}> = ({ type, time }) => {
  return (
    <Flex>
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
      borderRadius={15}
      backgroundColor="gray.700"
      //TODO: Fix height
      h="90%"
      w={{ md: "100%", lg: "430px" }}
      p={5}
    >
      <Box py={10} textAlign="center">
        <Heading>Roll Call in</Heading>
        <Heading>9:48:27</Heading>
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

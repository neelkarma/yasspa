import React from "react";
import {
  Box,
  Flex,
  Spacer,
  Heading,
  Text,
  HStack,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useToday } from "lib/clientFetchResources";
import type { Response, Today } from "lib/clientFetchResources";

const generatePeriodProps = (
  res: Response<Today>,
  period: 1 | 2 | 3 | 4 | 5
) => ({
  name: res.data.timetable.subjects[
    `${
      res.data.timetable.timetable.periods[
        period.toString() as "1" | "2" | "3" | "4" | "5"
      ].year
    }${res.data.timetable.timetable.periods[period].title}`
  ].title,
  time: res.data.bells.find((val) => val.bell === period.toString())!.time,
  teacher: res.data.timetable.timetable.periods[period].fullTeacher,
  room: res.data.timetable.timetable.periods[period].room,
  //TODO: Get these to work
  isTimeChange: false,
  isRoomChange: false,
  isSub: false,
});

const generateBreakProps = (
  res: Response<Today>,
  type: "Recess" | "Lunch"
) => ({
  type,
  time: res.data.bells.find(
    (val) => val.bell === (type === "Recess" ? "Recess" : "Lunch 1")
  )!.time,
  isTimeChange: false, //TODO: Get this to work
});

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
      transitionDuration="100ms"
      transitionTimingFunction="ease-out"
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

const Timetable: React.FC<{}> = () => {
  const { res, error } = useToday();
  if (!res)
    return (
      <Center
        borderColor="gray.600"
        borderWidth="1px"
        borderRadius={15}
        backgroundColor="gray.700"
        h={{ sm: undefined, lg: "100%" }}
        w={{ md: "100%", lg: "430px" }}
        p={5}
      >
        <Spinner size="lg" />
      </Center>
    );
  console.log(res);
  const recessIsFirst =
    res.data.bells.findIndex((val) => val.bell === "Lunch 1") >
    res.data.bells.findIndex((val) => val.bell === "Recess");
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
      {res.data.timetable.timetable.routine
        .split("")
        .map((char, index, routine) => {
          let firstBreakHasPassed =
            index !== routine.findIndex((val) => val === "=");
          switch (char) {
            case "1":
              return <Period {...generatePeriodProps(res, 1)} key={index} />;
            case "2":
              return <Period {...generatePeriodProps(res, 2)} key={index} />;
            case "3":
              return <Period {...generatePeriodProps(res, 3)} key={index} />;
            case "4":
              return <Period {...generatePeriodProps(res, 4)} key={index} />;
            case "5":
              return <Period {...generatePeriodProps(res, 5)} key={index} />;
            case "=":
              if (firstBreakHasPassed) {
                return recessIsFirst ? (
                  <Break {...generateBreakProps(res, "Lunch")} key={index} />
                ) : (
                  <Break {...generateBreakProps(res, "Recess")} key={index} />
                );
              }
              firstBreakHasPassed = true;
              return recessIsFirst ? (
                <Break {...generateBreakProps(res, "Recess")} key={index} />
              ) : (
                <Break {...generateBreakProps(res, "Lunch")} key={index} />
              );
          }
        })}
    </Box>
  );
};

export default Timetable;

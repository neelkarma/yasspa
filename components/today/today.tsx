import { Box, Heading, Spinner, Center } from "@chakra-ui/react";
import { useToday } from "lib/clientFetchResources";
import { Period } from "./period";
import { Break } from "./break";

export const Today: React.FC<{}> = () => {
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
              return <Period data={res.data} period="1" />;
            case "2":
              return <Period data={res.data} period="2" />;
            case "3":
              return <Period data={res.data} period="3" />;
            case "4":
              return <Period data={res.data} period="4" />;
            case "5":
              return <Period data={res.data} period="5" />;
            case "=":
              if (firstBreakHasPassed) {
                return recessIsFirst ? (
                  <Break data={res.data} type="Lunch" />
                ) : (
                  <Break data={res.data} type="Recess" />
                );
              }
              firstBreakHasPassed = true;
              return recessIsFirst ? (
                <Break data={res.data} type="Recess" />
              ) : (
                <Break data={res.data} type="Lunch" />
              );
          }
        })}
    </Box>
  );
};
